import {Configuration} from 'webpack';

import {terserPlugin} from '../plugins/terser_plugin';
import {isProd} from '../utils';

export function baseConfig(): Configuration {
  return {
    mode: 'none',
    devtool: isProd() ? 'source-map' : 'eval',
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    stats: {
      preset: 'errors-warnings',
      assets: true,
      timings: true,
    },
    optimization: {
      minimize: isProd(),
      minimizer: [terserPlugin()],
    },
    experiments: {
      backCompat: true,
    },
  };
}
