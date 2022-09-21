import {join} from 'node:path';

import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

import {WebpackPlugin} from '@src/webpack/models';
import {getProjectDir} from '@src/webpack/utils';

export function forkTsCheckerPlugin(): WebpackPlugin {
  return new ForkTsCheckerWebpackPlugin({
    typescript: {
      diagnosticOptions: {
        semantic: true,
        syntactic: true,
      },
      mode: 'write-references',
      configFile: join(getProjectDir(), 'tsconfig.json'),
    },
  });
}
