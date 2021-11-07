//   'source-map-loader': '3.0.x',

import {WebpackConfigFragment} from './utils';

export function babelLoader(): WebpackConfigFragment {
  return {
    dependencies: {
      '@babel/core': '7.16.x',
      '@babel/preset-env': '7.16.x',
      '@babel/preset-react': '7.16.x',
      '@babel/preset-typescript': '7.16.x',
      'babel-loader': '8.2.x',
    },
    config: () => ({
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
          ['@babel/preset-react'],
          ['@babel/preset-typescript'],
        ],
      },
    }),
  };
}

export function sourceMapLoader(): WebpackConfigFragment {
  return {
    dependencies: {
      'source-map-loader': '3.0.x',
    },
    config: () => ({
      test: /\.js$/,
      use: ['source-map-loader'],
      enforce: 'pre',
    }),
  };
}