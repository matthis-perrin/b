import {join} from 'node:path';

import {Configuration} from 'webpack';

import {baseConfig} from '@src/webpack/common-configs/base_config';
import {babelLoaderNode} from '@src/webpack/loaders/babel_loader_node';
import {sourceMapLoader} from '@src/webpack/loaders/source_map_loader';
import {dependencyPackerPlugin} from '@src/webpack/plugins/dependency_packer_plugin';
import {findPackageJson} from '@src/webpack/utils';

export function nodeConfig(opts: {
  context: string;
  watch: boolean;
  isLib: boolean;
  noEntry?: boolean;
  packageJsonProperties?: Record<string, unknown>;
}): Configuration {
  const {context, watch, isLib, noEntry, packageJsonProperties} = opts;
  const base = baseConfig({context, watch});
  return {
    ...base,
    target: 'node',
    entry: noEntry ? {} : {index: join(context, `src/index.ts`)},
    output: {
      path: join(context, 'dist'),
      filename: `[name].js`,
      clean: {
        keep: fileName => fileName.startsWith('node_modules') || fileName === 'yarn.lock',
      },
      chunkFormat: 'module',
      ...(isLib ? {library: {type: 'module'}} : {}),
    },
    module: {
      rules: [babelLoaderNode(), sourceMapLoader()],
      parser: {
        javascript: {importMeta: false},
      },
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      modules: ['node_modules', '../shared-node/node_modules', '../shared/node_modules'],
      alias: {
        '@src': join(context, 'src'),
        '@shared': join(context, '../shared/src'),
        '@shared-node': join(context, '../shared-node/src'),
      },
    },
    plugins: [...(base.plugins ?? []), dependencyPackerPlugin(packageJsonProperties)],
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
      ...base.experiments,
      outputModule: true,
    },
  };
}
