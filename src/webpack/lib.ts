import {Configuration} from 'webpack';

import {baseConfig} from '@src/webpack/configs/base_config';

export function config(context?: string): Configuration {
  return baseConfig(context);
}
