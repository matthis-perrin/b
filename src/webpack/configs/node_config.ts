import {join} from 'node:path';

import {Configuration} from 'webpack';

import {baseConfig} from '@src/webpack/configs/base_config';
import {babelLoaderNode} from '@src/webpack/loaders/babel_loader_node';
import {sourceMapLoader} from '@src/webpack/loaders/source_map_loader';
import {dependencyPackerPlugin} from '@src/webpack/plugins/dependency_packer_plugin';

export function nodeConfig(opts: {
  context?: string;
  isLib: boolean;
  noEntry?: boolean;
  packageJsonProperties?: Record<string, unknown>;
}): Configuration {
  const {context = process.cwd(), isLib, noEntry, packageJsonProperties} = opts;
  const base = baseConfig(context);
  return {
    ...base,
    target: 'node',
    entry: noEntry ? {} : {index: join(context, `src/index.ts`)},
    output: {
      path: join(context, 'dist'),
      filename: `[name].js`,
      clean: true,
      chunkFormat: 'module',
      ...(isLib ? {library: {type: 'module'}} : {}),
    },
    module: {
      rules: [babelLoaderNode(), sourceMapLoader()],
    },
    plugins: [...(base.plugins ?? []), dependencyPackerPlugin(packageJsonProperties)],
    experiments: {
      outputModule: true,
    },
  };
}
