/* eslint-disable import/no-unassigned-import */
import '@babel/core';
import '@babel/preset-env';
import '@babel/preset-typescript';
import 'babel-loader';
import '@babel/preset-react';
import 'babel-plugin-react-remove-properties';

import {WebpackLoader} from '@src/webpack/models';
import {isSelenium} from '@src/webpack/utils';
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
            corejs: {version: '3.10'},
          },
        ],
        ['@babel/preset-react', {runtime: 'automatic'}],
        ['@babel/preset-typescript'],
      ],
      plugins: isSelenium() ? [] : [['react-remove-properties', {properties: ['data-test-id']}]],
    },
  };
}
