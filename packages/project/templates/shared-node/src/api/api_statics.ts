import {readFile} from 'node:fs/promises';

import {GetObjectCommand, S3Client} from '@aws-sdk/client-s3';

import {CODE_BUCKET, NODE_ENV} from '@shared/env';

import {ApiRequest, ApiResponse} from '@shared-node/api/api_interface';

export async function handleStatics(
  req: ApiRequest,
  opts: {
    frontendName: string;
    frontendDomain: string;
  }
): Promise<ApiResponse | undefined> {
  const {method, path} = req;
  const {frontendName, frontendDomain} = opts;

  // Serve static resources
  if (method === 'GET' && (path === '' || path === '/' || path === '/index.html')) {
    return getIndex({frontendName, frontendDomain});
  }

  // Serve favicon.ico
  if (method === 'GET' && path === '/favicon.ico') {
    return {body: 'TODO:FETCH-FROM-S3', opts: {contentType: 'image/ico', isBase64Encoded: true}};
  }

  // Serve favicon.png
  if (method === 'GET' && path === '/favicon.png') {
    return {body: 'TODO:FETCH-FROM-S3', opts: {contentType: 'image/png', isBase64Encoded: true}};
  }

  // Serve manifest.webmanifest
  if (method === 'GET' && path === '/manifest.webmanifest') {
    const sizes = ['36', '48', '72', '96', '144', '192', '256', '384', '512'];
    return {
      body: JSON.stringify({
        name: 'backend_a',
        short_name: 'backend_a',
        start_url: '.',
        display: 'standalone',
        background_color: '#ccc',
        icons: sizes.map(size => ({
          src: '/favicon.png',
          sizes: `${size}x${size}`,
          type: 'image/png',
          purpose: 'any',
        })),
        description: 'backend_a',
      }),
      opts: {contentType: 'application/json'},
    };
  }

  return undefined;
}

let indexHtmlCache: string | undefined;
const s3Client = new S3Client();

export async function getIndex(opts: {
  frontendName: string;
  frontendDomain: string;
}): Promise<ApiResponse> {
  const {frontendName, frontendDomain} = opts;
  if (indexHtmlCache !== undefined) {
    return {body: indexHtmlCache, opts: {contentType: 'text/html'}};
  }
  const httpProtocol = `http${NODE_ENV === 'development' ? '' : 's'}://`;
  const frontendUrl = `${httpProtocol}${frontendDomain}`;
  const replacePublicPath = (str: string): string => str.replaceAll('{{PUBLIC_PATH}}', frontendUrl);
  if (NODE_ENV === 'development') {
    const buffer = await readFile(`./${frontendName}/dist/index.html`);
    // eslint-disable-next-line require-atomic-updates
    indexHtmlCache = replacePublicPath(buffer.toString());
    return {body: indexHtmlCache, opts: {contentType: 'text/html'}};
  }
  const res = await s3Client.send(
    new GetObjectCommand({Bucket: CODE_BUCKET, Key: `${frontendName}/index.html`})
  );
  const indexHtml = await res.Body?.transformToString();
  if (indexHtml === undefined) {
    return {body: '', opts: {contentType: 'text/html'}};
  }
  // eslint-disable-next-line require-atomic-updates
  indexHtmlCache = replacePublicPath(indexHtml);
  return {body: indexHtmlCache, opts: {contentType: 'text/html'}};
}
