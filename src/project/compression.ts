import {Readable} from 'node:stream';
import {createGunzip, gunzip, gzip} from 'node:zlib';

export async function compress(content: Buffer): Promise<Buffer> {
  return await new Promise((resolve, reject) => {
    gzip(content, (err, res) => {
      if (!err) {
        resolve(res);
      } else {
        reject(err);
      }
    });
  });
}

export async function decompress(content: Buffer): Promise<Buffer> {
  return await new Promise((resolve, reject) => {
    gunzip(content, (err, res) => {
      if (!err) {
        resolve(res);
      } else {
        reject(err);
      }
    });
  });
}

export function decompressStream(data: Readable): Readable {
  return data.pipe(createGunzip());
}
