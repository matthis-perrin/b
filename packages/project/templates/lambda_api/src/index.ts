interface LambdaEvent {
  rawPath: string;
  queryStringParameters?: Record<string, string>;
  headers: Record<string, string>;
  requestContext: {
    http: {
      method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    };
  };
  body: string | null;
}

interface LambdaResponse {
  headers?: Record<string, string>;
  statusCode: number;
  body: string;
}

function normalizePath(path: string): string {
  const withLeading = path.startsWith('/') ? path : `/${path}`;
  const withoutTrailing =
    withLeading.length > 1 && withLeading.endsWith('/') ? withLeading.slice(0, -1) : withLeading;
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
  const method = event.requestContext.http.method.toUpperCase();
  const path = normalizePath(event.rawPath);
  const body = parseBody(event.body);

  if (method === 'GET' && (path === '/' || path === '/index.html')) {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      // eslint-disable-next-line node/no-process-env
      body: '<html><body><h1>INDEX.HTML</h1></body></html>',
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(event),
  };
}
