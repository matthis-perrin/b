import {join} from 'node:path';

import HtmlWebpackPlugin from 'html-webpack-plugin';

import {WebpackPlugin} from '@src/webpack/models';
import {getProjectDir, isProd} from '@src/webpack/utils';

export function htmlPlugin(): WebpackPlugin {
  return new HtmlWebpackPlugin({
    template: join(getProjectDir(), 'src/index.html'),
    minify: isProd(),
  });
}
