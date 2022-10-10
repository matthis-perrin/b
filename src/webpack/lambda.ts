import {Configuration} from 'webpack';

import {nodeConfig} from '@src/webpack/configs/node_config';
import {lambdaServerPlugin} from '@src/webpack/plugins/lambda_server_plugin';

export function config(context?: string): Configuration {
  const baseConfig = nodeConfig({context, isLib: true});
  return {
    ...baseConfig,
    plugins: [...(baseConfig.plugins ?? []), lambdaServerPlugin()],
  };
}
