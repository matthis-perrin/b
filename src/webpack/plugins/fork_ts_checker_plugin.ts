import {join} from 'node:path';

import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

import {WebpackPlugin} from '@src/webpack/models';

export function forkTsCheckerPlugin(context: string): WebpackPlugin {
  return new ForkTsCheckerWebpackPlugin({
    typescript: {
      diagnosticOptions: {
        syntactic: true,
        semantic: true,
        declaration: false,
        global: true,
      },
      mode: 'readonly',
      configFile: join(context, 'tsconfig.json'),
    },
    formatter: 'basic',
    logger: {log: () => {}, error: () => {}},
  });
}
