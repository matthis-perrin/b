import {join} from 'node:path';

import HtmlWebpackPlugin from 'html-webpack-plugin';

import {WebpackPlugin} from '@src/webpack/models';
import {isProd} from '@src/webpack/utils';

export function htmlPlugin(context: string, publicUrl: string): WebpackPlugin {
  return new HtmlWebpackPlugin({
    template: join(context, 'src/index.html'),
    publicPath: publicUrl,
    minify: isProd(),
  });
}
