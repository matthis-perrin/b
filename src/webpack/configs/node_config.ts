import {join} from 'node:path';

import {Configuration} from 'webpack';

import {baseConfig} from '@src/webpack/configs/base_config';
import {babelLoaderNode} from '@src/webpack/loaders/babel_loader_node';
import {sourceMapLoader} from '@src/webpack/loaders/source_map_loader';
import {cleanTerminalPlugin} from '@src/webpack/plugins/clean_terminal_plugin';
import {definePlugin} from '@src/webpack/plugins/define_plugin';
import {
  dependencyPackerPlugin,
  DependencyPackerPluginOptions,
} from '@src/webpack/plugins/dependency_packer_plugin';
import {lambdaServerPlugin} from '@src/webpack/plugins/lambda_server_plugin';
import {getDistDir, getProjectDir} from '@src/webpack/utils';

export function nodeConfig(opts: {
  isLambda: boolean;
  packageOptions?: DependencyPackerPluginOptions;
}): Configuration {
  const {isLambda, packageOptions} = opts;
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
      ...(isLambda ? {library: 'handler', libraryTarget: 'umd'} : {}),
    },
    module: {
      rules: [babelLoaderNode(), sourceMapLoader()],
    },
    plugins: [
      ...(base.plugins ?? []),
      definePlugin(),
      cleanTerminalPlugin(),
      lambdaServerPlugin(),
      dependencyPackerPlugin(packageOptions),
    ],
    experiments: {
      outputModule: true,
    },
  };
}
