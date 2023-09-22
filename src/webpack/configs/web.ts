import {Configuration} from 'webpack';

import {webConfig} from '@src/webpack/common-configs/web_config';

export function config(opts: Parameters<typeof webConfig>[0]): Configuration {
  return webConfig(opts);
}
