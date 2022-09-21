import {join} from 'path';
import {Configuration} from 'webpack';

import {babelLoaderNode} from '../loaders/babel_loader_node';
import {sourceMapLoader} from '../loaders/source_map_loader';
import {cleanTerminalPlugin} from '../plugins/clean_terminal_plugin';
import {definePlugin} from '../plugins/define_plugin';
import {dependencyPackerPlugin} from '../plugins/dependency_packer_plugin';
import {eslintPlugin} from '../plugins/eslint_plugin';
import {forkTsCheckerPlugin} from '../plugins/fork_ts_checker_plugin';
import {LambdaServerPlugin} from '../plugins/lambda_server_plugin';
import {getDistDir, getProjectDir} from '../utils';
import {baseConfig} from './base_config';

export function nodeConfig(opts: {isLambda: boolean}): Configuration {
  const {isLambda} = opts;
  const entry = join(getProjectDir(), `src/index.ts`);
  return {
    ...baseConfig(),
    target: 'node',
    entry: {main: entry},
    output: {
      path: getDistDir(),
      filename: `[name].mjs`,
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
      new LambdaServerPlugin(),
      dependencyPackerPlugin(),
    ],
    externalsType: 'module',
    externals: (ctx, cb) => {
      const {request, context} = ctx;
      if ((request?.startsWith('.') && !context?.includes('node_modules')) || request === entry) {
        return cb();
      }
      return cb(undefined, request);
    },
    experiments: {
      outputModule: true,
    },
  };
}
