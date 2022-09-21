/* eslint-disable import/no-unassigned-import */
import '@babel/core';
import '@babel/preset-env';
import '@babel/preset-typescript';
import 'babel-loader';

import {WebpackLoader} from '../models';
/* eslint-enable import/no-unassigned-import */

export function babelLoaderNode(): WebpackLoader {
  return {
    test: /\.tsx?$/u,
    exclude: /\/node_modules\//u,
    loader: 'babel-loader',
    options: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 16,
            },
          },
        ],
        ['@babel/preset-typescript'],
      ],
    },
  };
}
