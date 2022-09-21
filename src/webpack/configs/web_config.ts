// eslint-disable-next-line import/no-unassigned-import
import 'webpack-dev-server';

import {join} from 'path';
import {Configuration} from 'webpack';

import {babelLoaderWeb} from '../loaders/babel_loader_web';
import {sourceMapLoader} from '../loaders/source_map_loader';
import {cleanTerminalPlugin} from '../plugins/clean_terminal_plugin';
import {definePlugin} from '../plugins/define_plugin';
import {eslintPlugin} from '../plugins/eslint_plugin';
import {forkTsCheckerPlugin} from '../plugins/fork_ts_checker_plugin';
import {htmlPlugin} from '../plugins/html_plugin';
import {getDistDir, getProjectDir, isProd} from '../utils';
import {baseConfig} from './base_config';

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
