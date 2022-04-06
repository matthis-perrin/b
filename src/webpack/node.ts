import {join} from 'path';
import {baseConfig} from './common/base';
import {babelLoaderNode, sourceMapLoader} from './common/loaders';
import {
  definePlugin,
  forkTsCheckerPlugin,
  cleanTerminalPlugin,
  eslintPlugin,
} from './common/plugins';
import {getProjectDir, WebpackConfigFragment} from './common/utils';
import {LambdaServerPlugin} from './lambda_server_plugin';

export function nodeConfig(opts: {isLambda: boolean}): WebpackConfigFragment {
  const {isLambda} = opts;
  const base = baseConfig({hashOutput: false, libraryExportName: isLambda ? 'handler' : undefined});
  const define = definePlugin();
  const forkTsChecker = forkTsCheckerPlugin();
  const eslint = eslintPlugin();
  const cleanTerminal = cleanTerminalPlugin();
  const babel = babelLoaderNode();
  const sourceMap = sourceMapLoader();

  const entry = join(getProjectDir(), `src/index.ts`);

  return {
    dependencies: {
      ...base.dependencies,
      ...define.dependencies,
      ...forkTsChecker.dependencies,
      ...eslint.dependencies,
      ...cleanTerminal.dependencies,
      ...babel.dependencies,
      ...sourceMap.dependencies,
    },
    config: () => {
      const plugins = [
        define.config(),
        forkTsChecker.config(),
        eslint.config(),
        cleanTerminal.config(),
        new LambdaServerPlugin(),
      ];
      return {
        ...base.config(),
        target: 'node',
        entry: {main: entry},
        module: {
          rules: [babel.config(), sourceMap.config()],
        },
        plugins,
        externals: (
          ctx: {request: string; context: string},
          cb: (err?: Error | null, result?: string) => void
        ) => {
          const {request, context} = ctx;
          if ((request.startsWith('.') && !context.includes('node_modules')) || request === entry) {
            return cb();
          }
          return cb(null, 'commonjs ' + request);
        },
      };
    },
  };
}
