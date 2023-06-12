import webpack from 'webpack'; // eslint-disable-line import/no-named-as-default

import {WebpackPlugin} from '@src/webpack/models';
import {getEnv} from '@src/webpack/utils';

export function definePlugin(): WebpackPlugin {
  const envPrefix = 'MATTHIS_';
  const extraEnv = Object.fromEntries(
    Object.entries(process.env) // eslint-disable-line node/no-process-env
      .filter(([name]) => name.startsWith(envPrefix))
      .map(([name, value]) => [String(name.slice(envPrefix.length)), JSON.stringify(value)])
  );
  return new webpack.DefinePlugin({
    /* eslint-disable @typescript-eslint/naming-convention */
    NODE_ENV: JSON.stringify(getEnv()),
    'process.env.NODE_ENV': JSON.stringify(getEnv()),
    /* eslint-enable @typescript-eslint/naming-convention */
    ...extraEnv,
  });
}
