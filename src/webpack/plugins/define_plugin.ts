import webpack from 'webpack'; // eslint-disable-line import/no-named-as-default

import {WebpackPlugin} from '@src/webpack/models';

export function definePlugin(): WebpackPlugin {
  return new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"',
  });
}
