import {appendFileSync} from 'node:fs';

import webpack, {Configuration} from 'webpack';

export async function compile(entry: string, dst: string, isLib: boolean): Promise<void> {
  const libOption = isLib
    ? {
        library: {
          type: 'module',
          // export: 'default',
        },
      }
    : {};
  const config: Configuration = {
    mode: 'none',
    target: 'node',
    entry,
    output: {
      path: dst,
      filename: 'index.js',
      chunkFormat: 'module',
      ...libOption,
    },
    module: {rules: [{test: /\.ts$/u, loader: 'ts-loader'}]},
    resolve: {extensions: ['.ts', '.js']},
    externalsType: 'module',
    externals: ({request, context}, callback) => {
      request?.startsWith('./') ||
      request?.startsWith('@src/') ||
      request?.startsWith('@shared/') ||
      request?.startsWith('@shared-node/') ||
      request?.startsWith('@shared-web/') ||
      request?.startsWith('../') ||
      request === entry
        ? callback()
        : callback(undefined, request);
    },
    node: {
      __dirname: false, // eslint-disable-line @typescript-eslint/naming-convention
      __filename: false, // eslint-disable-line @typescript-eslint/naming-convention
    },
    experiments: {
      outputModule: true,
    },
    optimization: {
      usedExports: true,
    },
  };

  return new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
      if (err) {
        console.error(`Failure to compile ${entry}`);
        reject(err);
      } else if (stats?.hasErrors()) {
        console.error(`Failure to compile ${entry}`);
        reject(new Error(stats.toString({errorDetails: true})));
      } else {
        resolve();
      }
    });
  });
}
