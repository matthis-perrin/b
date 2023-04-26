import {exec} from 'node:child_process';
import {createHash, randomUUID} from 'node:crypto';
import {appendFileSync} from 'node:fs';
import {mkdir, rm} from 'node:fs/promises';
import {createServer, IncomingMessage, Server, ServerResponse} from 'node:http';
import {join} from 'node:path';

import {Compiler} from 'webpack';

import {exists, rmDir} from '@src/fs';
import {WebpackPlugin} from '@src/webpack/models';
import {StandalonePlugin} from '@src/webpack/plugins/standalone_plugin';

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

    // Find the root of the project and create the log dir there
    try {
      const root = await this.lookupRoot(compiler.context);
      const logDir = join(root, 'log');
      await rmDir(logDir);
      await mkdir(logDir, {recursive: true});
      this.runtimeLogFile = join(logDir, 'lambda_server_runtime.txt');
      this.appLogFile = join(logDir, 'lambda_server_log.txt');
      if (await exists(this.runtimeLogFile)) {
        await rm(this.runtimeLogFile);
      }
    } catch {
      throw new Error(`Failure to identify project root from ${compiler.context}`);
    }

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const hexHash = createHash('md5').update(compiler.context).digest('hex').slice(0, 4);
    const port = 1024 + Math.floor(parseInt(hexHash, 16) / 2);

    return new Promise<void>((resolve, reject) => {
      this.server = createServer((req: IncomingMessage, res: ServerResponse) => {
        const url = req.url ?? '';
        const method = req.method ?? '';

        // Log the request
        this.runtimeLog({event: 'request', path: url, method});

        // Parse body
        let body = '';
        req.on('data', chunk => {
          body += chunk;
        });

        // Parse headers
        const headers: Record<string, string> = {};
        while (true) {
          const key = req.rawHeaders.shift();
          const value = req.rawHeaders.shift();
          if (key === undefined || value === undefined) {
            break;
          }
          headers[key] = value;
        }

        const handlerPath = join(this.context, 'dist/index.js');
        const bodyParam = body === '' ? 'null' : `atob('${btoa(body)}')`;
        // const headerParam = `JSON.parse(atob('${btoa(JSON.stringify(headers))}'))`;
        const headerParam = "''";

        const internalError = (err: string): void => {
          this.runtimeLog({event: 'error', err, path: url, method});
          res.statusCode = 500;
          res.end();
        };

        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        const sendRes = (body: string, duration: number, statusCode = 200): void => {
          this.runtimeLog({
            event: 'response',
            path: url,
            method,
            statusCode,
            duration,
            byteLength: body.length,
          });
          res.statusCode = statusCode;
          res.write(body);
          res.end();
        };

        const TOKEN = randomUUID();

        const commandJs = `
(async () => {
  try {
    const {handler} = await import('${handlerPath}');
    const json = await handler({httpMethod: '${method}', path: '${url}', body: ${bodyParam}, headers: ${headerParam}});
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
          exec(command, (error, stdout, stderr) => {
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
                const {body, statusCode} = result;
                if (!('statusCode' in result)) {
                  return sendRes(stdoutRes, duration);
                } else if (typeof statusCode !== 'number') {
                  return internalError(`statusCode ${JSON.stringify(statusCode)} is not a number`);
                }
                const resBody = typeof body === 'string' ? body : JSON.stringify(body);
                return sendRes(resBody, duration, statusCode);
              } else if (typeof result === 'string') {
                return sendRes(result, duration);
              }
              return sendRes(stdoutRes, duration);
            } catch (err: unknown) {
              return internalError(String(err));
            }
          });
        });
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

  private async lookupRoot(fromPath: string): Promise<string> {
    if (await exists(join(fromPath, 'package.json'))) {
      return fromPath;
    }
    const parent = join(fromPath, '..');
    if (parent === fromPath) {
      throw new Error('Failure to lookup root');
    }
    return this.lookupRoot(parent);
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
