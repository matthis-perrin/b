import {join} from 'node:path';

import {Configuration} from 'webpack';

import {baseConfig} from '@src/webpack/configs/base_config';
import {babelLoaderNode} from '@src/webpack/loaders/babel_loader_node';
import {sourceMapLoader} from '@src/webpack/loaders/source_map_loader';
import {cleanTerminalPlugin} from '@src/webpack/plugins/clean_terminal_plugin';
import {definePlugin} from '@src/webpack/plugins/define_plugin';
import {dependencyPackerPlugin} from '@src/webpack/plugins/dependency_packer_plugin';
import {eslintPlugin} from '@src/webpack/plugins/eslint_plugin';
import {forkTsCheckerPlugin} from '@src/webpack/plugins/fork_ts_checker_plugin';
import {lambdaServerPlugin} from '@src/webpack/plugins/lambda_server_plugin';
import {getDistDir, getProjectDir} from '@src/webpack/utils';

export function nodeConfig(opts: {isLambda: boolean}): Configuration {
  const {isLambda} = opts;
  const entry = join(getProjectDir(), `src/index.ts`);
  return {
    ...baseConfig(),
    target: 'node',
    entry: {main: entry},
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
      definePlugin(),
      forkTsCheckerPlugin(),
      eslintPlugin(),
      cleanTerminalPlugin(),
      lambdaServerPlugin(),
      dependencyPackerPlugin(),
    ],
    externalsType: 'module',
    experiments: {
      outputModule: true,
    },
  };
}
