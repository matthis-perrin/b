import {join} from 'node:path';

import EslintWebpackPlugin from 'eslint-webpack-plugin';

import {WebpackPlugin} from '@src/webpack/models';
import {getProjectDir} from '@src/webpack/utils';

export function eslintPlugin(): WebpackPlugin {
  return new EslintWebpackPlugin({
    extensions: ['ts', 'tsx'],
    files: [join(getProjectDir(), 'src/**/*.ts*')],
    threads: true,
  });
}
