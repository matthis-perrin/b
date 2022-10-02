// eslint-disable-next-line import/no-unassigned-import
import 'webpack-dev-server';

import {join} from 'node:path';

import {Configuration} from 'webpack';

import {baseConfig} from '@src/webpack/configs/base_config';
import {babelLoaderWeb} from '@src/webpack/loaders/babel_loader_web';
import {sourceMapLoader} from '@src/webpack/loaders/source_map_loader';
import {htmlPlugin} from '@src/webpack/plugins/html_plugin';
import {getDistDir, getProjectDir, isProd} from '@src/webpack/utils';

export function webConfig(): Configuration {
  const base = baseConfig();
  return {
    ...base,
    target: 'web',
    entry: {main: join(getProjectDir(), `src/index.tsx`)},
    output: {
      path: getDistDir(),
      filename: `[name].[contenthash].js`,
      clean: true,
      publicPath: '/',
    },
    module: {
      rules: [babelLoaderWeb(), sourceMapLoader()],
    },
    plugins: [...(base.plugins ?? []), htmlPlugin()],
    devServer: !isProd()
      ? {
          static: getDistDir(),
          compress: true,
          hot: true,
          open: true,
        }
      : undefined,
    optimization: {
      ...base.optimization,
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[/\\]node_modules[/\\]/u,
            chunks: 'initial',
            name: 'vendor',
            enforce: true,
          },
        },
      },
    },
  };
}