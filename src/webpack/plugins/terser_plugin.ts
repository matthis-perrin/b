import TerserWebpackPlugin from 'terser-webpack-plugin';

import {WebpackPlugin} from '@src/webpack/models';

export function terserPlugin(): WebpackPlugin {
  return new TerserWebpackPlugin({
    terserOptions: {
      format: {
        comments: false,
      },
    },
    extractComments: false,
  });
}
