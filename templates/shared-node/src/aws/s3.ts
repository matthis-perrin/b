import {
  GetObjectCommand,
  HeadObjectCommand,
  HeadObjectOutput,
  NoSuchKey,
  NotFound,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

import {REGION} from '@shared/env';

import {readCredentials} from '@shared-node/aws/credentials';
import {compress as gzipCompress, decompress as gzipDecompress} from '@shared-node/gzip';

const client = new S3Client({region: REGION, credentials: readCredentials()});

export async function putObject(options: {
  bucket: string;
  key: string;
  body: string | Buffer;
  compress?: boolean;
}): Promise<void> {
  const {bucket, key, body, compress} = options;
  const contentEncodingHeader = compress ? 'gzip' : undefined;
  const finalBody = compress ? await gzipCompress(body) : body;
  await client.send(
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
}): Promise<HeadObjectOutput> {
  const {bucket, key} = options;
  const res = await client.send(new HeadObjectCommand({Bucket: bucket, Key: key}));
  return res;
}

export async function getObject(options: {
  bucket: string;
  key: string;
}): Promise<string | undefined> {
  const {bucket, key} = options;
  try {
    const res = await client.send(new GetObjectCommand({Bucket: bucket, Key: key}));
    const content = await res.Body?.transformToByteArray();
    if (content === undefined) {
      throw new Error('Failure to retrieve object body');
    }
    const body = await gzipDecompress(content);
    return body.toString();
  } catch (err: unknown) {
    if (err instanceof NoSuchKey) {
      return undefined;
    }
    throw err;
  }
}
