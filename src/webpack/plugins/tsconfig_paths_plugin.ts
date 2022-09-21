import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

import {WebpackResolver} from '@src/webpack/models';

export function tsconfigPathsPlugin(): WebpackResolver {
  return new TsconfigPathsPlugin({});
}
