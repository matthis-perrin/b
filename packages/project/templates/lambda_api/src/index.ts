import {ListBucketsCommand, S3Client} from '@aws-sdk/client-s3';

export interface APIGatewayProxyEventBase<TAuthorizerContext> {
  body: string | null;
  headers: {[name: string]: string | undefined};
  multiValueHeaders: {[name: string]: string[] | undefined};
  httpMethod: string;
  isBase64Encoded: boolean;
  path: string;
  pathParameters: {[name: string]: string | undefined} | null;
  queryStringParameters: {[name: string]: string | undefined} | null;
  multiValueQueryStringParameters: {[name: string]: string[] | undefined} | null;
  stageVariables: {[name: string]: string | undefined} | null;
  resource: string;
}

/**
* Works with Lambda Proxy Integration for Rest API or HTTP API integration Payload Format version 1.0
* @see - https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html
*/
export interface APIGatewayProxyResult {
  statusCode: number;
  headers?: {
      [header: string]: boolean | number | string;
  } | undefined;
  multiValueHeaders?: {
      [header: string]: Array<boolean | number | string>;
  } | undefined;
  body: string;
  isBase64Encoded?: boolean | undefined;
}

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
