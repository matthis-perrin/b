import {readFile} from 'node:fs/promises';

import {GetObjectCommand, S3Client} from '@aws-sdk/client-s3';

import {HttpError} from '@shared/api/core/api_errors';
import {createRouter} from '@shared/api/core/api_router';
import {ApiContext} from '@shared/api/core/api_types';
import {
  CODE_BUCKET,
  __FRONTEND_NAME_UPPERCASE___CLOUDFRONT_DOMAIN_NAME,
  NODE_ENV,
} from '@shared/env';

import {testHandler} from '@src/handlers/test_handlers';

interface LambdaEvent {
  headers: Record<string, string | string[]>;
  queryStringParameters?: Record<string, string>;
  requestContext: {
    http: {
      method: string;
      path: string;
    };
    timeEpoch: number;
  };
  body?: string;
}

interface LambdaResponse {
  headers?: Record<string, string | undefined>;
  statusCode: number;
  body: string;
  isBase64Encoded?: boolean;
}

function normalizePath(path: string): string {
  const withLeading = path.startsWith('/') ? path : `/${path}`;
  const withoutTrailing = withLeading.endsWith('/') ? withLeading.slice(0, -1) : withLeading;
  return withoutTrailing;
}

let indexHtmlCache: string | undefined;
const s3Client = new S3Client();
const replacePublicPath = (str: string): string => str.replaceAll('{{PUBLIC_PATH}}', frontendUrl);
async function getIndex(): Promise<string> {
  if (indexHtmlCache !== undefined) {
    return indexHtmlCache;
  }
  if (NODE_ENV === 'development') {
    // return (await readdir('.')).join('\n');
    const buffer = await readFile('./__FRONTEND_NAME__/dist/index.html');
    // eslint-disable-next-line require-atomic-updates
    indexHtmlCache = replacePublicPath(buffer.toString());
    return indexHtmlCache;
  }
  const res = await s3Client.send(
    new GetObjectCommand({Bucket: CODE_BUCKET, Key: `__FRONTEND_NAME__/index.html`})
  );
  const indexHtml = await res.Body?.transformToString();
  if (indexHtml === undefined) {
    return '';
  }
  // eslint-disable-next-line require-atomic-updates
  indexHtmlCache = replacePublicPath(indexHtml);
  return indexHtmlCache;
}

function parseBody(body?: string | null): Record<string, unknown> {
  let jsonBody = {};
  if (typeof body === 'string') {
    try {
      jsonBody = JSON.parse(body);
    } catch {
      // leave jsonBody as an empty object
    }
  }
  return jsonBody;
}

const httpProtocol = `http${NODE_ENV === 'development' ? '' : 's'}://`;
const frontendUrl = `${httpProtocol}${__FRONTEND_NAME_UPPERCASE___CLOUDFRONT_DOMAIN_NAME}`;
const allowedOrigin = new Set([frontendUrl]);

// Create API router
const router = createRouter('__PROJECT_NAME__', {
  'GET /test': testHandler,
});

export async function handler(event: LambdaEvent): Promise<LambdaResponse> {
  // Extract event info
  const {headers, requestContext, queryStringParameters} = event;
  const origin =
    (Array.isArray(headers['origin']) ? headers['origin'][0] : headers['origin']) ?? '';
  const {http} = requestContext;
  const method = http.method.toUpperCase();
  const path = normalizePath(http.path);

  // Utility to build a response
  const res = (
    body: string,
    opts?: {
      statusCode?: number;
      contentType?: string;
      extraHeaders?: Record<string, string>;
      isBase64Encoded?: boolean;
    }
  ): LambdaResponse => {
    const {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      statusCode = 200,
      contentType = 'application/json',
      extraHeaders = {},
      isBase64Encoded,
    } = opts ?? {};
    const corsHeaders = allowedOrigin.has(origin)
      ? {
          'Access-Control-Allow-Origin': allowedOrigin.has(origin) ? origin : undefined,
          'Access-Control-Allow-Headers': 'content-type',
        }
      : {};
    return {
      statusCode,
      headers: {
        'Content-Type': contentType,
        ...corsHeaders,
        ...extraHeaders,
      },
      body,
      isBase64Encoded,
    };
  };

  // Handle CORS
  if (method === 'OPTIONS') {
    return res('');
  }

  // Serve static resources
  if (method === 'GET' && (path === '' || path === '/' || path === '/index.html')) {
    return res(await getIndex(), {contentType: 'text/html'});
  }

  // Serve favicon.ico
  if (method === 'GET' && path === '/favicon.ico') {
    return res('TODO:FETCH-FROM-S3', {contentType: 'image/ico', isBase64Encoded: true});
  }

  // Serve favicon.png
  if (method === 'GET' && path === '/favicon.png') {
    return res('TODO:FETCH-FROM-S3', {contentType: 'image/png', isBase64Encoded: true});
  }

  // Serve manifest.webmanifest
  if (method === 'GET' && path === '/manifest.webmanifest') {
    const sizes = ['36', '48', '72', '96', '144', '192', '256', '384', '512'];
    return res(
      JSON.stringify({
        name: '__PROJECT_NAME__',
        short_name: '__PROJECT_NAME__',
        start_url: '.',
        display: 'standalone',
        background_color: '#ccc',
        icons: sizes.map(size => ({
          src: '/favicon.png',
          sizes: `${size}x${size}`,
          type: 'image/png',
          purpose: 'any',
        })),
        description: '__PROJECT_NAME__',
      }),
      {contentType: 'application/json'}
    );
  }

  // Handle API calls
  console.log(event);
  const body = method === 'GET' ? queryStringParameters ?? {} : parseBody(event.body);
  const extraHeaders: Record<string, string> = {};
  const context: ApiContext = {
    getRequestHeader: headerName => headers[headerName.toLowerCase()],
    setResponseHeader: (headerName, headerValue) => {
      extraHeaders[headerName] = headerValue;
    },
  };
  try {
    const routerRes = await router(path, method, body, context);
    return res(JSON.stringify(routerRes), {extraHeaders});
  } catch (err: unknown) {
    if (err instanceof HttpError) {
      const {statusCode, userMessage, stack, extra} = err;
      console.log(statusCode, extra, stack);
      return res(JSON.stringify({err: userMessage}), {statusCode, extraHeaders});
    } else if (err instanceof Error && err.message === 'NOT_FOUND') {
      return res(await getIndex(), {contentType: 'text/html'});
    }
    console.error(err);
    return res(JSON.stringify({err: 'internal error'}), {statusCode: 500, extraHeaders});
  }
}
