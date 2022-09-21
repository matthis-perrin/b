import {Configuration} from 'webpack';

// import {dependencyPackerPlugin} from '@src/webpack/plugins/dependency_packer_plugin';
import {terserPlugin} from '@src/webpack/plugins/terser_plugin';
import {tsconfigPathsPlugin} from '@src/webpack/plugins/tsconfig_paths_plugin';
import {isProd} from '@src/webpack/utils';

export function baseConfig(): Configuration {
  return {
    mode: 'none',
    devtool: isProd() ? 'source-map' : 'eval',
    resolve: {
      plugins: [tsconfigPathsPlugin()],
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
