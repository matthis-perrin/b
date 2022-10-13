import {Compiler, Configuration, ExternalModule} from 'webpack';

import {cleanTerminalPlugin} from '@src/webpack/plugins/clean_terminal_plugin';
import {definePlugin} from '@src/webpack/plugins/define_plugin';
import {eslintPlugin} from '@src/webpack/plugins/eslint_plugin';
import {forkTsCheckerPlugin} from '@src/webpack/plugins/fork_ts_checker_plugin';
import {terserPlugin} from '@src/webpack/plugins/terser_plugin';
import {getTsConfigAlias} from '@src/webpack/plugins/ts_config_alias';
import {findPackageJson, isProd} from '@src/webpack/utils';

export function baseConfig(contextOpt?: string): Configuration {
  const context = contextOpt ?? process.cwd();

  return {
    mode: 'none',
    context,
    entry: {},
    // devtool: isProd() ? 'source-map' : 'eval',
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: getTsConfigAlias(context),
    },
    plugins: [forkTsCheckerPlugin(context), eslintPlugin(), definePlugin(), cleanTerminalPlugin()],
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
      const {request, context, contextInfo, getResolve} = ctx;
      if (request === undefined) {
        return cb();
      }
      if (request.startsWith('node:')) {
        return cb(undefined, `node-commonjs ${request}`);
      }

      const resolver = getResolve?.();
      if (!resolver) {
        return cb(new Error('No resolver when checking for externals'));
      }
      (resolver as (ctx: string, req: string) => Promise<string>)(context ?? '', request)
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
        .catch(() => {
          cb(new Error(`Can't resolve '${request}' in '${contextInfo?.issuer}'`));
        });
    },
    experiments: {
      backCompat: true,
    },
  };
}
