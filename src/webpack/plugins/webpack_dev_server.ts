import {appendFileSync} from 'node:fs';
import {join} from 'node:path';

import {Configuration} from 'webpack-dev-server';

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
    .catch(console.error);
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
    devMiddleware: {
      writeToDisk: true,
    },
    onListening: () => log({event: 'start', port}),
  };
}
