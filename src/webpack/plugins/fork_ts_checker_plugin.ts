import {join} from 'node:path';

import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

import {WebpackPlugin} from '@src/webpack/models';

export function forkTsCheckerPlugin(context: string): WebpackPlugin {
  return new ForkTsCheckerWebpackPlugin({
    typescript: {
      diagnosticOptions: {
        syntactic: true,
        semantic: true,
        declaration: true,
        global: true,
      },
      mode: 'readonly',
      configFile: join(context, 'tsconfig.json'),
      configOverwrite: {
        include: ['src'],
      },
    },
    formatter: 'basic',
    logger: {log: () => {}, error: () => {}},
  });
}
