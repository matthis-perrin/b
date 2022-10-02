import {join} from 'node:path';

import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

import {WebpackPlugin} from '@src/webpack/models';
import {getProjectDir} from '@src/webpack/utils';

export function forkTsCheckerPlugin(): WebpackPlugin {
  return new ForkTsCheckerWebpackPlugin({
    typescript: {
      diagnosticOptions: {
        syntactic: true,
        semantic: true,
        declaration: true,
        global: true,
      },
      mode: 'readonly',
      configFile: join(getProjectDir(), 'tsconfig.json'),
    },
    formatter: issue => {
      issue.severity = 'warning';
      return issue.message;
    },
    logger: {log: () => {}, error: () => {}},
  });
}
