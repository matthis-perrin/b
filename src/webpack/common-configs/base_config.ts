import {Configuration} from 'webpack';

import {definePlugin} from '@src/webpack/plugins/define_plugin';
import {eslintPlugin} from '@src/webpack/plugins/eslint_plugin';
import {forkTsCheckerPlugin} from '@src/webpack/plugins/fork_ts_checker_plugin';
import {terserPlugin} from '@src/webpack/plugins/terser_plugin';
import {YarnPlugin} from '@src/webpack/plugins/yarn_plugin';
import {isProd} from '@src/webpack/utils';

export function baseConfig(opts: {context: string; watch: boolean}): Configuration {
  const {context} = opts;

  return {
    mode: 'none',
    context,
    entry: {},
    devtool: 'source-map',
    plugins: [new YarnPlugin(), forkTsCheckerPlugin(context), eslintPlugin(), definePlugin()],
    stats: false,
    infrastructureLogging: {level: 'error'},
    optimization: {
      minimize: isProd(),
      minimizer: [terserPlugin()],
    },
    experiments: {
      backCompat: true,
    },
  };
}
