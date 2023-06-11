import {exec} from 'node:child_process';
import {randomUUID} from 'node:crypto';
import {appendFileSync} from 'node:fs';
import {createServer, IncomingMessage, Server, ServerResponse} from 'node:http';
import {join} from 'node:path';

import {Compiler} from 'webpack';

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
}

export interface LambdaServerResponseEvent {
  event: 'response';
  path: string;
  method: string;
  duration: number;
  statusCode: number;
  byteLength: number;
}

export type LambdaServerEvent =
  | LambdaServerStartEvent
  | LambdaServerErrorEvent
  | LambdaServerRequestEvent
  | LambdaServerResponseEvent;
export type FullLambdaServerEvent = {t: string} & LambdaServerEvent;

class LambdaServerPlugin extends StandalonePlugin {
  protected name = 'LambdaServerPlugin';
  private server: Server | undefined;
  private runtimeLogFile?: string;
  private appLogFile?: string;

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
        const method = req.method ?? '';

        const internalError = (err: string): void => {
          this.runtimeLog({event: 'error', err, path: url, method});
          res.statusCode = 500;
          res.end();
        };

        try {
          // Log the request
          this.runtimeLog({event: 'request', path: url, method});

          // Parse body
          let body: string | undefined;
          req.on('data', chunk => {
            if (body === undefined) {
              body = '';
            }
            body += chunk;
          });

          // Parse URL
          const parsedUrl = new URL(`http://localhost${url}`);
          const rawQueryString = parsedUrl.search.slice(1);
          const queryStringParameters = Object.fromEntries(parsedUrl.searchParams.entries());

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

          const sendRes = (
            body: string,
            duration: number,
            // eslint-disable-next-line @typescript-eslint/no-magic-numbers
            statusCode = 200,
            headers?: Record<string, string>
          ): void => {
            this.runtimeLog({
              event: 'response',
              path: url,
              method,
              statusCode,
              duration,
              byteLength: body.length,
            });
            res.statusCode = statusCode;
            for (const [headerName, headerValue] of Object.entries(headers ?? {})) {
              res.setHeader(headerName, headerValue);
            }
            res.write(body);
            res.end();
          };

          const TOKEN = randomUUID();

          const handlerPath = join(this.context, 'dist/index.js');
          const commandJs = `
(async () => {
  try {
    const {handler} = await import('${handlerPath}');
    const json = await handler(JSON.parse(atob('${btoa(JSON.stringify(event))}')));
    process.stdout.write(\`${TOKEN}\${JSON.stringify(json)}${TOKEN}\`);
  }
  catch (err) {
    process.stderr.write(\`${TOKEN}\${String(err)}${TOKEN}\`);
  }
})()
        `.trim();

          req.on('end', () => {
            const command = [`node -e "eval(atob('${btoa(commandJs)}'))"`].join('');

            const startTs = Date.now();
            exec(
              command,
              {
                /* eslint-disable @typescript-eslint/naming-convention */
                env: {
                  AWS_CONFIG_FILE: join(this.context, '../terraform/.aws-credentials'),
                  PATH: process.env['PATH'], // eslint-disable-line node/no-process-env
                },
                /* eslint-enable @typescript-eslint/naming-convention */
              },
              (error, stdout, stderr) => {
                const duration = Date.now() - startTs;
                const infoOutput = this.parseOutput(stdout, TOKEN);
                const errOutput = this.parseOutput(stderr, TOKEN);
                this.appLog(infoOutput.logs);
                this.appLog(errOutput.logs);

                const err = error ? String(error) : errOutput.result;
                if (err !== undefined) {
                  return internalError(err.split('\n')[0] ?? err);
                }

                const stdoutRes = infoOutput.result ?? '';
                try {
                  if (stdoutRes === 'undefined') {
                    return internalError(`Lambda returned undefined`);
                  }
                  const result = JSON.parse(stdoutRes);
                  if (typeof result === 'undefined') {
                    return internalError(`Invalid response: ${stdoutRes}`);
                  }

                  res.setHeader('Content-Type', 'application/json');
                  // eslint-disable-next-line no-null/no-null
                  if (typeof result === 'object' && result !== null && !Array.isArray(result)) {
                    const {body, headers, statusCode} = result;
                    if (!('statusCode' in result)) {
                      return sendRes(stdoutRes, duration);
                    } else if (typeof statusCode !== 'number') {
                      return internalError(
                        `statusCode ${JSON.stringify(statusCode)} is not a number`
                      );
                    }
                    const resBody = typeof body === 'string' ? body : JSON.stringify(body);
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    return sendRes(resBody, duration, statusCode, headers);
                  } else if (typeof result === 'string') {
                    return sendRes(result, duration);
                  }
                  return sendRes(stdoutRes, duration);
                } catch (err: unknown) {
                  return internalError(String(err));
                }
              }
            );
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

  private appLog(log: string): void {
    if (this.appLogFile === undefined || log.length === 0) {
      return;
    }
    appendFileSync(this.appLogFile, `${log}\n`);
  }
}

export function lambdaServerPlugin(): WebpackPlugin {
  return new LambdaServerPlugin();
}
