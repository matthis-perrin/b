// eslint-disable-next-line import/no-unassigned-import
import 'webpack-dev-server';

import {join} from 'node:path';

import {Configuration} from 'webpack';

import {baseConfig} from '@src/webpack/configs/base_config';
import {babelLoaderWeb} from '@src/webpack/loaders/babel_loader_web';
import {sourceMapLoader} from '@src/webpack/loaders/source_map_loader';
import {cleanTerminalPlugin} from '@src/webpack/plugins/clean_terminal_plugin';
import {definePlugin} from '@src/webpack/plugins/define_plugin';
import {eslintPlugin} from '@src/webpack/plugins/eslint_plugin';
import {forkTsCheckerPlugin} from '@src/webpack/plugins/fork_ts_checker_plugin';
import {htmlPlugin} from '@src/webpack/plugins/html_plugin';
import {getDistDir, getProjectDir, isProd} from '@src/webpack/utils';

export function webConfig(): Configuration {
  const base = baseConfig();
  return {
    ...base,
    target: 'web',
    entry: {
      main: join(getProjectDir(), `src/index.tsx`),
    },
    output: {
      path: getDistDir(),
      filename: `[name].[contenthash].js`,
      clean: true,
      publicPath: '/',
    },
    module: {
      rules: [babelLoaderWeb(), sourceMapLoader()],
    },
    plugins: [
      definePlugin(),
      htmlPlugin(),
      forkTsCheckerPlugin(),
      eslintPlugin(),
      cleanTerminalPlugin(),
    ],
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
