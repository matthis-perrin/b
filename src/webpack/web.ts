import {join} from 'path';
import {baseConfig} from './common/base';
import {babelLoaderWeb, sourceMapLoader} from './common/loaders';
import {definePlugin, htmlPlugin, forkTsCheckerPlugin, cleanTerminalPlugin} from './common/plugins';
import {getDistDir, getProjectDir, isProd, WebpackConfigFragment} from './common/utils';

export function webConfig(): WebpackConfigFragment {
  const base = baseConfig({hashOutput: true});
  const define = definePlugin();
  const html = htmlPlugin();
  const forkTsChecker = forkTsCheckerPlugin();
  const cleanTerminal = cleanTerminalPlugin();
  const babel = babelLoaderWeb();
  const sourceMap = sourceMapLoader();

  const baseWebpackConfig = base.config();

  return {
    dependencies: {
      'webpack-dev-server': '4.4.x',
      ...base.dependencies,
      ...define.dependencies,
      ...html.dependencies,
      ...forkTsChecker.dependencies,
      ...cleanTerminal.dependencies,
      ...babel.dependencies,
      ...sourceMap.dependencies,
    },
    config: () => ({
      ...baseWebpackConfig,
      target: 'web',
      entry: {
        main: join(getProjectDir(), `src/index.tsx`),
      },
      module: {
        rules: [babel.config(), sourceMap.config()],
      },
      plugins: [define.config(), html.config(), forkTsChecker.config(), cleanTerminal.config()],
      devServer: !isProd()
        ? {
            static: getDistDir(),
            compress: true,
            port: 3000,
            hot: true,
          }
        : undefined,
      optimization: {
        ...baseWebpackConfig.optimization,
        splitChunks: {
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              chunks: 'initial',
              name: 'vendor',
              enforce: true,
            },
          },
        },
      },
    }),
  };
}
