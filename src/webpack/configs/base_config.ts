import {Configuration} from 'webpack';

import {cleanTerminalPlugin} from '@src/webpack/plugins/clean_terminal_plugin';
import {definePlugin} from '@src/webpack/plugins/define_plugin';
import {eslintPlugin} from '@src/webpack/plugins/eslint_plugin';
import {forkTsCheckerPlugin} from '@src/webpack/plugins/fork_ts_checker_plugin';
import {terserPlugin} from '@src/webpack/plugins/terser_plugin';
import {tsconfigPathsPlugin} from '@src/webpack/plugins/tsconfig_paths_plugin';
import {findPackageJson, isProd} from '@src/webpack/utils';

export function baseConfig(): Configuration {
  return {
    mode: 'none',
    // devtool: isProd() ? 'source-map' : 'eval',
    resolve: {
      plugins: [tsconfigPathsPlugin()],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    plugins: [forkTsCheckerPlugin(), eslintPlugin(), definePlugin(), cleanTerminalPlugin()],
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
        .then(res => {
          if (!res.includes('/node_modules/')) {
            return cb();
          }
          findPackageJson(res)
            .then(packageJson => {
              if (packageJson && packageJson['type'] === 'module') {
                return cb(undefined, `module ${request}`);
              }
              cb(undefined, `node-commonjs ${request}`);
            })
            .catch(() => cb(undefined, `node-commonjs ${request}`));
        })
        .catch((err: unknown) => {
          if (!request?.startsWith('node:')) {
            console.log(String(err));
          }
          cb(undefined, `node-commonjs ${request}`);
        });
    },
    experiments: {
      backCompat: true,
    },
  };
}
