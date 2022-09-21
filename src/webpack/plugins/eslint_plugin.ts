import {join} from 'node:path';

import EslintWebpackPlugin from 'eslint-webpack-plugin';

import {WebpackPlugin} from '../models';
import {getProjectDir} from '../utils';

export function eslintPlugin(): WebpackPlugin {
  return new EslintWebpackPlugin({
    extensions: ['ts', 'tsx'],
    files: [join(getProjectDir(), 'src/**/*.ts*')],
    threads: true,
  });
}
