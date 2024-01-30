import {readFile} from 'node:fs/promises';

import {GetObjectCommand, S3Client} from '@aws-sdk/client-s3';

import {CODE_BUCKET, NODE_ENV} from '@shared/env';

import {ApiRequest, ApiResponse} from '@shared-node/api/api_interface';

export async function handleStatics(
  req: ApiRequest,
  opts: {frontendName: string}
): Promise<ApiResponse | undefined> {
  const {method, path} = req;
  const {frontendName} = opts;

  // Serve static resources
  if (method === 'GET' && (path === '' || path === '/' || path === '/index.html')) {
    return getIndex({frontendName});
  }

  return undefined;
}

let indexHtmlCache: string | undefined;
const s3Client = new S3Client();

export async function getIndex(opts: {frontendName: string}): Promise<ApiResponse> {
  const {frontendName} = opts;
  if (indexHtmlCache !== undefined && NODE_ENV !== 'development') {
    return {body: indexHtmlCache, opts: {contentType: 'text/html'}};
  }
  if (NODE_ENV === 'development') {
    const buffer = await readFile(`./${frontendName}/dist/index.html`);
    // eslint-disable-next-line require-atomic-updates
    indexHtmlCache = buffer.toString();
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
  indexHtmlCache = indexHtml;
  return {body: indexHtmlCache, opts: {contentType: 'text/html'}};
}
