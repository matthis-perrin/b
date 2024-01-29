import {ChildProcess, fork} from 'node:child_process';
import {join} from 'node:path';

import {Compiler} from 'webpack';

import {readFile} from '@src/fs';
import {md5} from '@src/hash';
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

class LambdaServerPlugin extends StandalonePlugin {
  protected name = 'LambdaServerPlugin';
  private runtime: ChildProcess | undefined;
  private handlerHash: string | undefined;

  protected async setup(compiler: Compiler): Promise<void> {
    // Only starts the lambda server in watch mode
    if (!compiler.options.watch) {
      return;
    }

    const runtimeLogFile = await initLogFile(compiler.context, 'lambda_server_runtime.txt');
    const appLogFile = await initLogFile(compiler.context, 'lambda_server_log.txt');
    const handlerPath = join(compiler.context, 'dist/index.js');
    const port = getPort(compiler.context);

    compiler.hooks.done.tapPromise(this.name, async () => {
      const newHash = md5(await readFile(handlerPath));
      if (this.handlerHash === newHash) {
        return;
      }
      this.handlerHash = newHash;
      if (this.runtime && !this.runtime.killed) {
        this.runtime.kill();
      }
      this.runtime = fork('./node_modules/@matthis/lambda-server-runtime/index.js', {
        env: {
          PORT: String(port),
          RUNTIME_LOG_FILE: runtimeLogFile,
          APP_LOG_FILE: appLogFile,
          HANDLER_PATH: handlerPath,
        },
      });
    });
  }

  protected teardown(): void {
    if (this.runtime && !this.runtime.killed) {
      this.runtime.kill();
      this.runtime = undefined;
    }
  }
}

export function lambdaServerPlugin(): WebpackPlugin {
  return new LambdaServerPlugin();
}
