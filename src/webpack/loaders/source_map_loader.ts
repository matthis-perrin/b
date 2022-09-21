/* eslint-disable import/no-unassigned-import */
import '@babel/core';
import '@babel/preset-env';
import '@babel/preset-typescript';
import 'babel-loader';
import 'source-map-loader';

import {WebpackLoader} from '@src/webpack/models';
/* eslint-enable import/no-unassigned-import */

export function sourceMapLoader(): WebpackLoader {
  return {
    test: /\.js$/u,
    use: ['source-map-loader'],
    enforce: 'pre',
  };
}
