import {terserPlugin} from './plugins';
import {getDistDir, isProd, WebpackConfigFragment} from './utils';

export function baseConfig(opts: {hashOutput: boolean}): WebpackConfigFragment {
  const {hashOutput} = opts;
  const terserPluginConfig = terserPlugin();
  return {
    dependencies: {
      webpack: '5.64.x',
      'webpack-cli': '4.9.x',
      ...terserPluginConfig.dependencies,
    },
    config: () => ({
      mode: 'none',
      devtool: isProd() ? 'source-map' : 'eval',
      output: {
        path: getDistDir(),
        filename: `[name]${hashOutput ? '.[contenthash]' : ''}.js`,
        clean: true,
      },

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
        minimizer: [terserPluginConfig.config()],
      },
      experiments: {
        backCompat: true,
      },
    }),
  };
}
