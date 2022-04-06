import {ListBucketsCommand, S3Client} from '@aws-sdk/client-s3';

interface LambdaEvent {
  path: string;
  headers: Record<string, string>;
  httpMethod: string;
  body: string | null;
}

interface LambdaResponse {
  headers?: Record<string, string>;
  statusCode: number;
  body: string;
}

function normalizePath(path: string): string {
  const withLeading = path.startsWith('/') ? path : `/${path}`;
  const withoutTrailing = withLeading.endsWith('/') ? withLeading.slice(0, -1) : withLeading;
  return withoutTrailing;
}

function parseBody(body: string | null): Record<string, unknown> {
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

export async function handler(event: LambdaEvent): Promise<LambdaResponse> {
  const method = event.httpMethod.toUpperCase();
  const path = normalizePath(event.path);
  const body = parseBody(event.body);

  if (method === 'GET' && (path === '' || path === '/' || path === '/index.html')) {
    return {
      statusCode: 200,
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'text/html',
      },
      // eslint-disable-next-line node/no-process-env
      body: process.env.INDEX_HTML ?? '',
    };
  }

  const client = new S3Client({});
  const command = new ListBucketsCommand({});
  const response = await client.send(command);

  return {
    statusCode: 200,
    body: JSON.stringify({method, path, body, buckets: response.Buckets?.map(b => b.Name)}),
  };
}
