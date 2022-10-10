import {Configuration} from 'webpack';

import {nodeConfig} from '@src/webpack/configs/node_config';

export function config(context?: string): Configuration {
  return nodeConfig({context, isLib: true});
}
