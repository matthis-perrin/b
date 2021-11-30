//   'source-map-loader': '3.0.x',

import {isSelenium, WebpackConfigFragment} from './utils';

export function babelLoaderWeb(): WebpackConfigFragment {
  return {
    dependencies: {
      '@babel/core': '7.16.x',
      '@babel/preset-env': '7.16.x',
      '@babel/preset-react': '7.16.x',
      '@babel/preset-typescript': '7.16.x',
      'babel-loader': '8.2.x',
      'babel-plugin-react-remove-properties': '0.3.x',
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
        plugins: isSelenium() ? [] : [['react-remove-properties', {properties: ['data-test-id']}]],
      },
    }),
  };
}

export function babelLoaderNode(): WebpackConfigFragment {
  return {
    dependencies: {
      '@babel/core': '7.16.x',
      '@babel/preset-env': '7.16.x',
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
              targets: {
                node: 16,
              },
            },
          ],
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
