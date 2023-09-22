import {Configuration} from 'webpack';

import {baseConfig} from '@src/webpack/common-configs/base_config';

export function config(opts: {context: string; watch: boolean}): Configuration {
  return baseConfig(opts);
}
