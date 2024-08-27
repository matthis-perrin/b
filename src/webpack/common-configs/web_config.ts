import {readFileSync} from 'node:fs';
import {basename, join} from 'node:path';

import {Configuration} from 'webpack';

import {baseConfig} from '@src/webpack/common-configs/base_config';
import {babelLoaderWeb} from '@src/webpack/loaders/babel_loader_web';
import {imagesLoader} from '@src/webpack/loaders/images_loader';
import {sourceMapLoader} from '@src/webpack/loaders/source_map_loader';
import {faviconsWebpackPlugin} from '@src/webpack/plugins/favicons_webpack_plugin';
import {htmlPlugin} from '@src/webpack/plugins/html_plugin';
import {webpackDevServer} from '@src/webpack/plugins/webpack_dev_server';
import {isProd} from '@src/webpack/utils';

export function webConfig(opts: {context: string; watch: boolean}): Configuration {
  const {context, watch} = opts;
  const base = baseConfig({context, watch});

  // Hack to retrieve the public url from the env variables
  const envVariableFilePath = join(context, '../shared/src/env.ts');
  const domainNameEnvVariable = `${basename(context).toUpperCase()}_CLOUDFRONT_DOMAIN_NAME`;
  const match = new RegExp(
    `export const ${domainNameEnvVariable} =\\s*'(?<domainName>[^']*)'`,
    'u'
  ).exec(readFileSync(envVariableFilePath).toString());
  const domainName = match?.[1] ?? 'domain-not-found';
  const publicUrl = `http${isProd() ? 's' : ''}://${domainName}`;

  return {
    ...base,
    target: 'web',
    entry: {main: join(context, 'src/index.tsx')},
    output: {
      path: join(context, 'dist'),
      filename: `[name].[contenthash].js`,
      clean: true,
      publicPath: '/',
    },
    module: {
      rules: [babelLoaderWeb(), sourceMapLoader(), imagesLoader()],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      modules: ['node_modules', '../shared-web/node_modules', '../shared/node_modules'],
      alias: {
        '@src': join(context, 'src'),
        '@shared': join(context, '../shared/src'),
        '@shared-web': join(context, '../shared-web/src'),
      },
    },
    plugins: [
      ...(base.plugins ?? []),
      htmlPlugin(context, publicUrl),
      faviconsWebpackPlugin(context, publicUrl),
    ],
    devServer: watch ? webpackDevServer(context) : undefined,
    optimization: {
      ...base.optimization,
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[/\\]node_modules[/\\]/u,
            chunks: 'initial',
            name: 'vendor',
            enforce: true,
          },
        },
      },
    },
  };
}
