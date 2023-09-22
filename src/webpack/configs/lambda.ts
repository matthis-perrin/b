import {Configuration} from 'webpack';

import {nodeConfig} from '@src/webpack/common-configs/node_config';
import {lambdaServerPlugin} from '@src/webpack/plugins/lambda_server_plugin';

export function config(opts: {context: string; watch: boolean}): Configuration {
  const baseConfig = nodeConfig({...opts, isLib: true});
  return {
    ...baseConfig,
    plugins: [...(baseConfig.plugins ?? []), lambdaServerPlugin()],
  };
}
