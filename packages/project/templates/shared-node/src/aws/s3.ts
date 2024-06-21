import {
  GetObjectCommand,
  HeadObjectCommand,
  HeadObjectOutput,
  ListObjectsV2Command,
  ListObjectsV2Output,
  NoSuchKey,
  NotFound,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import {getSignedUrl} from '@aws-sdk/s3-request-presigner';

import {REGION} from '@shared/env';

import {credentialsProvider} from '@shared-node/aws/credentials';
import {compress as gzipCompress, decompress as gzipDecompress} from '@shared-node/lib/gzip';

let client: S3Client | undefined;
function getClient(): S3Client {
  if (!client) {
    client = new S3Client({region: REGION, credentials: credentialsProvider()});
  }
  return client;
}

export async function putObject(options: {
  bucket: string;
  key: string;
  body: string | Buffer;
  compress?: boolean;
}): Promise<void> {
  const {bucket, key, body, compress} = options;
  const contentEncodingHeader = compress ? 'gzip' : undefined;
  const finalBody = compress ? await gzipCompress(body) : body;
  await getClient().send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: finalBody,
      ContentEncoding: contentEncodingHeader,
    })
  );
}

export const NotFoundError = NotFound;

export async function headObject(options: {
  bucket: string;
  key: string;
}): Promise<HeadObjectOutput | undefined> {
  const {bucket, key} = options;
  try {
    const res = await getClient().send(new HeadObjectCommand({Bucket: bucket, Key: key}));
    return res;
  } catch (err: unknown) {
    if (err instanceof NotFoundError) {
      return undefined;
    }
    throw err;
  }
}

export async function getObject(options: {
  bucket: string;
  key: string;
  noDecompress?: boolean;
}): Promise<string | undefined> {
  const {bucket, key, noDecompress} = options;
  try {
    const res = await getClient().send(new GetObjectCommand({Bucket: bucket, Key: key}));
    const body = await (noDecompress
      ? res.Body?.transformToString()
      : res.Body?.transformToByteArray()
          .then(async arr => gzipDecompress(arr))
          .then(buff => buff.toString()));
    if (body === undefined) {
      throw new Error('Failure to retrieve object body');
    }
    return body;
  } catch (err: unknown) {
    if (err instanceof NoSuchKey) {
      return undefined;
    }
    throw err;
  }
}

export async function getPresignedUploadUrl(
  bucket: string,
  key: string,
  opts?: {expiresInSeconds?: number; contentType?: string}
): Promise<string> {
  const {expiresInSeconds, contentType} = opts ?? {};
  return getSignedUrl(
    getClient(),
    new PutObjectCommand({Bucket: bucket, Key: key, ContentType: contentType}),
    {
      expiresIn: expiresInSeconds,
    }
  );
}

export async function getPresignedDownloadUrl(
  bucket: string,
  key: string,
  opts?: {expiresInSeconds?: number; responseContentDisposition?: string}
): Promise<string> {
  const o = opts ?? {};
  return getSignedUrl(
    getClient(),
    new GetObjectCommand({
      Bucket: bucket,
      Key: key,
      ResponseContentDisposition: o.responseContentDisposition,
    }),
    {
      expiresIn: o.expiresInSeconds,
    }
  );
}

export async function listObjects(options: {
  bucket: string;
  prefix?: string;
  startAfter?: string;
  limit?: number;
  continuationToken?: string;
}): Promise<ListObjectsV2Output> {
  const {bucket, prefix, startAfter, limit, continuationToken} = options;
  return getClient().send(
    new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: prefix,
      StartAfter: startAfter,
      MaxKeys: limit,
      ContinuationToken: continuationToken,
    })
  );
}
