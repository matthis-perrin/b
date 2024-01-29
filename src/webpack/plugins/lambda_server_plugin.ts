import {randomUUID} from 'node:crypto';
import {appendFileSync, writeFileSync} from 'node:fs';
import {createServer, IncomingMessage, Server, ServerResponse} from 'node:http';
import {join} from 'node:path';

import {Compiler} from 'webpack';

import {maybeReadFile} from '@src/fs';
import {md5} from '@src/hash';
import {asMap, errorAndStackAsString} from '@src/type_utils';
import {WebpackPlugin} from '@src/webpack/models';
import {StandalonePlugin} from '@src/webpack/plugins/standalone_plugin';
import {getPort, initLogFile} from '@src/webpack/utils';

export interface LambdaServerStartEvent {
  event: 'start';
  port: number;
}

export interface LambdaServerErrorEvent {
  event: 'error';
  path: string;
  method: string;
  err: string;
}

export interface LambdaServerRequestEvent {
  event: 'request';
  path: string;
  method: string;
  bodyLength: number;
}

export interface LambdaServerResponseEvent {
  event: 'response';
  path: string;
  method: string;
  duration: number;
  statusCode: number;
  headers: Record<string, string>;
  bodyLength: number;
}

export type LambdaServerEvent =
  | LambdaServerStartEvent
  | LambdaServerErrorEvent
  | LambdaServerRequestEvent
  | LambdaServerResponseEvent;
export type FullLambdaServerEvent = {t: string} & LambdaServerEvent;

interface LambdaHandler {
  hash: string;
  fn: Function;
}

class LambdaServerPlugin extends StandalonePlugin {
  protected name = 'LambdaServerPlugin';
  private server: Server | undefined;
  private runtimeLogFile?: string;
  private appLogFile?: string;

  private handler: LambdaHandler | undefined;

  protected async setup(compiler: Compiler): Promise<void> {
    // Only starts the lambda server in watch mode
    if (!compiler.options.watch) {
      return;
    }

    this.runtimeLogFile = await initLogFile(compiler.context, 'lambda_server_runtime.txt');
    this.appLogFile = await initLogFile(compiler.context, 'lambda_server_log.txt');

    return new Promise<void>((resolve, reject) => {
      const port = getPort(compiler.context);
      this.server = createServer((req: IncomingMessage, res: ServerResponse) => {
        const url = req.url ?? '';

        if (url.startsWith('/favicon')) {
          res.end();
          return;
        }

        const method = req.method ?? '';

        const internalError = (err: string): void => {
          this.runtimeLog({event: 'error', err, path: url, method});
          res.statusCode = 500;
          res.end();
        };

        try {
          // Parse body
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });

          // Parse URL
          const parsedUrl = new URL(`http://localhost${url}`);
          const rawQueryString = parsedUrl.search.slice(1);
          const queryStringParameters = Object.fromEntries([
            ...new URLSearchParams(decodeURIComponent(rawQueryString)).entries(),
          ]);

          const sendRes = (
            body: string | Buffer,
            duration: number,
            // eslint-disable-next-line @typescript-eslint/no-magic-numbers
            statusCode = 200,
            headers: Record<string, string> = {}
          ): void => {
            this.runtimeLog({
              event: 'response',
              path: url,
              method,
              statusCode,
              duration,
              headers,
              bodyLength: body.length,
            });
            res.statusCode = statusCode;
            for (const [headerName, headerValue] of Object.entries(headers)) {
              res.setHeader(headerName, headerValue);
            }
            res.write(body);
            res.end();
          };

          req.on('end', () => {
            // Log the request
            this.runtimeLog({event: 'request', path: url, method, bodyLength: body.length});

            // Create the lambda event
            const event = {
              version: '2.0',
              routeKey: '$default',
              rawPath: parsedUrl.pathname,
              rawQueryString,
              headers: req.headers,
              queryStringParameters,
              requestContext: {
                accountId: 'anonymous',
                // apiId: 'rqez6mmiihukf4yvq2l7rrq2340xpkvp',
                // domainName: 'rqez6mmiihukf4yvq2l7rrq2340xpkvp.lambda-url.eu-west-3.on.aws',
                // domainPrefix: 'rqez6mmiihukf4yvq2l7rrq2340xpkvp',
                http: {
                  method,
                  path: parsedUrl.pathname,
                  // protocol: 'HTTP/1.1',
                  // sourceIp: '88.138.164.86',
                  userAgent: req.headers['user-agent'],
                },
                requestId: randomUUID(),
                routeKey: '$default',
                stage: '$default',
                timeEpoch: Date.now(),
              },
              body,
              isBase64Encoded: false,
            };

            // Run the handler
            this.loadHandler()
              .then(handler => {
                if (!handler) {
                  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                  sendRes('Lambda handler not found', 0, 404);
                  return;
                }
                const startTs = Date.now();
                Promise.resolve(handler.fn(event))
                  .then(handlerRes => {
                    const duration = Date.now() - startTs;
                    try {
                      if (handlerRes === undefined) {
                        return internalError(`Invalid response: ${JSON.stringify(handlerRes)}`);
                      }
                      res.setHeader('Content-Type', 'application/json');
                      if (
                        typeof handlerRes === 'object' &&
                        // eslint-disable-next-line no-null/no-null
                        handlerRes !== null &&
                        !Array.isArray(handlerRes)
                      ) {
                        const {body, headers, statusCode, isBase64Encoded} = handlerRes;
                        if (!('statusCode' in handlerRes)) {
                          return sendRes(JSON.stringify(handlerRes), duration);
                        } else if (typeof statusCode !== 'number') {
                          return internalError(
                            `statusCode ${JSON.stringify(statusCode)} is not a number`
                          );
                        }
                        const resBody =
                          typeof body === 'string'
                            ? typeof isBase64Encoded === 'boolean' && isBase64Encoded
                              ? Buffer.from(body, 'base64')
                              : body
                            : JSON.stringify(body);
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                        return sendRes(resBody, duration, statusCode, headers);
                      } else if (typeof handlerRes === 'string') {
                        return sendRes(handlerRes, duration);
                      }
                      return sendRes(JSON.stringify(handlerRes), duration);
                    } catch (err: unknown) {
                      return internalError(errorAndStackAsString(err));
                    }
                  })
                  .catch((err: unknown) => {
                    return internalError(errorAndStackAsString(err));
                  });
              })
              .catch((err): void => {
                internalError(`Error while loading handler: ${errorAndStackAsString(err)}`);
              });
          });
        } catch (err: unknown) {
          internalError(String(err));
        }
      })
        .listen(port)
        .on('error', err => {
          reject(err);
        })
        .on('listening', () => {
          resolve();
          this.runtimeLog({event: 'start', port});
        });
    });
  }

  protected async teardown(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.server?.close(err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  // Parse the output (stdout or stderr) of a script and extract the data
  // that is wrapped by the value of `token`.
  // parseOutput('Hello###foo###World', '###') => {result: 'foo', logs: 'HelloWorld'}
  // parseOutput('Hello World', '###') => {result: undefined, logs: 'Hello World'}
  private parseOutput(output: string, token: string): {result?: string; logs: string} {
    const tokenIndex1 = output.indexOf(token);
    if (tokenIndex1 !== -1) {
      const tokenIndex2 = output.indexOf(token, tokenIndex1 + token.length);
      if (tokenIndex1 !== -1) {
        return {
          result: output.slice(tokenIndex1 + token.length, tokenIndex2),
          logs: (output.slice(0, tokenIndex1) + output.slice(tokenIndex2 + token.length)).trim(),
        };
      }
    }
    return {logs: output.trim()};
  }

  private runtimeLog(event: LambdaServerEvent): void {
    if (this.runtimeLogFile === undefined) {
      return;
    }
    appendFileSync(
      this.runtimeLogFile,
      `${JSON.stringify({t: new Date().toISOString(), ...event})}\n`
    );
  }

  private appLog(
    appendFileSync: (file: string, content: string) => void,
    log: string | string[]
  ): void {
    const logs = Array.isArray(log) ? log : [log];
    if (this.appLogFile === undefined || logs.length === 0) {
      return;
    }
    appendFileSync(
      this.appLogFile,
      logs.map(log => `[${new Date().toISOString()}] ${log}\n`).join('')
    );
  }

  private clearLogs(): void {
    if (this.appLogFile !== undefined) {
      writeFileSync(this.appLogFile, '');
    }
    if (this.runtimeLogFile !== undefined) {
      writeFileSync(this.runtimeLogFile, '');
    }
  }

  private async loadHandler(): Promise<LambdaHandler | undefined> {
    // Find the handler source file and compute its hash
    const handlerPath = join(this.context, 'dist/index.js');
    const handlerSource = await maybeReadFile(handlerPath);
    if (handlerSource === undefined) {
      // handler has never been compiled
      this.handler = undefined;
      return undefined;
    }
    const handlerHash = md5(handlerSource);

    // If the hash is the same as the previously loaded handler, return the cached version
    if (this.handler?.hash === handlerHash) {
      return this.handler;
    }

    // If the hash changed (or if this is the first time), we load and validate the lambda handler.
    // (Override the handler calls to the console)
    const logger = this.appLog.bind(this, appendFileSync);
    console.log = (...args: unknown[]) => logger(args.map(arg => JSON.stringify(arg)));
    console.error = (...args: unknown[]) => logger(args.map(arg => JSON.stringify(arg)));
    // eslint-disable-next-line node/no-unsupported-features/es-syntax, import/dynamic-import-chunkname
    const imported = await import(/* webpackIgnore: true */ `${handlerPath}?v=${Date.now()}`);
    const importedHandler = asMap(imported)?.['handler'];
    if (typeof importedHandler !== 'function') {
      // Invalid export
      this.handler = undefined;
      return undefined;
    }

    // Everything looks correct, save in the cache and return
    this.clearLogs();
    logger('*** Handler loaded ***');
    this.handler = {
      hash: handlerHash,
      fn: importedHandler,
    };
    return this.handler;
  }
}

export function lambdaServerPlugin(): WebpackPlugin {
  return new LambdaServerPlugin();
}
