import {Configuration} from 'webpack';

import {nodeConfig} from '@src/webpack/common-configs/node_config';

export function config(opts: {context: string; watch: boolean}): Configuration {
  return nodeConfig({...opts, isLib: false});
}
