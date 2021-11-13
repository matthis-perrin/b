import {terserPlugin} from './plugins';
import {getDistDir, isProd, WebpackConfigFragment} from './utils';

export function baseConfig(): WebpackConfigFragment {
  const terserPluginConfig = terserPlugin();
  return {
    dependencies: {
      webpack: '5.61.x',
      'webpack-cli': '4.9.x',
      ...terserPluginConfig.dependencies,
    },
    config: () => ({
      mode: 'none',
      devtool: isProd() ? 'source-map' : 'eval',
      output: {
        path: getDistDir(),
        filename: '[name].[contenthash].js',
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
        splitChunks: {
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              chunks: 'initial',
              name: 'vendor',
              enforce: true,
            },
          },
        },
        minimize: isProd(),
        minimizer: [terserPluginConfig.config()],
      },
    }),
  };
}
