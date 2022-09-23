import {nodeConfig} from './configs/node_config';

import {lambdaServerPlugin} from '@src/webpack/plugins/lambda_server_plugin';

const baseConfig = nodeConfig({isLib: true});
const config = {...baseConfig, plugins: [...(baseConfig.plugins ?? []), lambdaServerPlugin()]};

// eslint-disable-next-line import/no-default-export
export default config;
