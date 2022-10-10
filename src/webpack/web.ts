import {Configuration} from 'webpack';

import {webConfig} from '@src/webpack/configs/web_config';

export function config(context?: string): Configuration {
  return webConfig({context});
}
