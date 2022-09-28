import {join} from 'node:path';

import {Configuration} from 'webpack';

import {baseConfig} from '@src/webpack/configs/base_config';
import {babelLoaderNode} from '@src/webpack/loaders/babel_loader_node';
import {sourceMapLoader} from '@src/webpack/loaders/source_map_loader';
import {dependencyPackerPlugin} from '@src/webpack/plugins/dependency_packer_plugin';
import {getDistDir, getProjectDir} from '@src/webpack/utils';

export function nodeConfig(opts: {
  isLib: boolean;
  packageJsonProperties?: Record<string, unknown>;
}): Configuration {
  const {isLib, packageJsonProperties} = opts;
  const base = baseConfig();
  return {
    ...base,
    target: 'node',
    entry: {index: join(getProjectDir(), `src/index.ts`)},
    output: {
      path: getDistDir(),
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
