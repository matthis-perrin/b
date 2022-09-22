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
    externals: (ctx, cb) => {
      const {request, context} = ctx;
      const resolver = ctx.getResolve?.();
      if (!resolver) {
        return cb(new Error('No resolver when checking for externals'));
      }
      (resolver as (ctx: string, req: string) => Promise<string>)(context ?? '', request ?? '')
        .then(res => (res.includes('/node_modules/') ? cb(undefined, request) : cb()))
        .catch(() => cb(undefined, request));
    },
    experiments: {
      backCompat: true,
    },
  };
}
