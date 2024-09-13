/* eslint-disable import/no-unassigned-import */
import '@babel/core';
import '@babel/preset-env';
import '@babel/preset-typescript';
import 'babel-loader';
import '@babel/preset-react';
import 'babel-plugin-styled-components';

import {CORE_JS_VERSION} from '@src/versions';
import {WebpackLoader} from '@src/webpack/models';
/* eslint-enable import/no-unassigned-import */

export function babelLoaderWeb(): WebpackLoader {
  return {
    test: /\.tsx?$/u,
    exclude: /\/node_modules\//u,
    loader: 'babel-loader',
    options: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: '> 10%',
            bugfixes: true,
            useBuiltIns: 'usage',
            corejs: {version: CORE_JS_VERSION},
          },
        ],
        ['@babel/preset-react', {runtime: 'automatic'}],
        ['@babel/preset-typescript'],
      ],
      plugins: [
        [
          'babel-plugin-styled-components',
          {
            pure: true,
          },
        ],
      ],
    },
  };
}
