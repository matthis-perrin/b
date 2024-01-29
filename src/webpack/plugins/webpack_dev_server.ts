import {appendFileSync} from 'node:fs';
import {ServerResponse} from 'node:http';
import {join} from 'node:path';
import zlib from 'node:zlib';

import {Configuration} from 'webpack-dev-server';

import {error} from '@src/logger';
import {getPort, initLogFile} from '@src/webpack/utils';

export interface WebpackDevServerStartEvent {
  event: 'start';
  port: number;
}

export type WebpackDevServerEvent = WebpackDevServerStartEvent;
export type FullWebpackDevServerEvent = {t: string} & WebpackDevServerEvent;

export function webpackDevServer(context: string): Configuration {
  const port = getPort(context);

  let logFile: string | undefined;
  let logsSaved: WebpackDevServerEvent[] = [];
  initLogFile(context, 'webpack_dev_server.txt')
    .then(file => {
      logFile = file;
      for (const logEvent of logsSaved) {
        log(logEvent);
      }
      logsSaved = [];
    })
    .catch(error);
  function log(event: WebpackDevServerEvent): void {
    if (logFile === undefined) {
      logsSaved.push(event);
    } else {
      appendFileSync(logFile, `${JSON.stringify({t: new Date().toISOString(), ...event})}\n`);
    }
  }

  return {
    static: join(context, 'dist'),
    compress: true,
    hot: true,
    port,
    client: {
      logging: 'none',
      overlay: false,
    },
    setupMiddlewares: middlewares => {
      return [
        (req: unknown, res: ServerResponse, next: () => void) => {
          const originalSetHeader = res.setHeader;
          res.setHeader = function (name: string, value: string | number | readonly string[]) {
            if (!/content-length/iu.test(name)) {
              originalSetHeader.call(res, name, value);
            }
            return res;
          };

          const chunks: unknown[] = [];
          res.write = function (chunk: unknown) {
            chunks.push(chunk);
            return true;
          } as unknown as typeof res.write;

          const originalEnd = res.end;
          res.end = function (chunk: unknown, enc: BufferEncoding) {
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (chunk) {
              chunks.push(chunk);
            }
            const content = Buffer.isBuffer(chunks[0])
              ? Buffer.concat(chunks as Buffer[])
              : chunks.join('');
            const decodedContent = decoding(res, content);
            const contentString = Buffer.isBuffer(decodedContent)
              ? decodedContent.toString()
              : decodedContent;
            const newContent = contentString.replaceAll('{{PUBLIC_PATH}}', '');
            const encodedContent = encoding(res, newContent);
            if (!res.headersSent) {
              res.setHeader('content-length', content.length);
            }
            return originalEnd.call(res, encodedContent, enc);
          } as unknown as typeof res.end;

          next();
        },
        ...middlewares,
      ];
    },
    devMiddleware: {
      writeToDisk: true,
    },
    onListening: () => log({event: 'start', port}),
  };
}

function encoding(res: ServerResponse, content: Buffer | string): Buffer | string {
  const contentEncoding = res.getHeader('content-encoding');
  if (contentEncoding === 'gzip') {
    // eslint-disable-next-line node/no-sync
    return zlib.gzipSync(content);
  } else if (contentEncoding === 'deflate') {
    // eslint-disable-next-line node/no-sync
    return zlib.deflateSync(content);
  }
  return content;
}

function decoding(res: ServerResponse, content: Buffer | string): Buffer | string {
  const contentEncoding = res.getHeader('content-encoding');
  if (contentEncoding === 'gzip') {
    // eslint-disable-next-line node/no-sync
    return zlib.gunzipSync(content);
  } else if (contentEncoding === 'deflate') {
    // eslint-disable-next-line node/no-sync
    return zlib.inflateSync(content);
  }
  return content;
}
