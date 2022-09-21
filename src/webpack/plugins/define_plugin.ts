import webpack from 'webpack';

import {WebpackPlugin} from '../models';
import {getEnv} from '../utils';

export function definePlugin(): WebpackPlugin {
  const envPrefix = 'MATTHIS_';
  const extraEnv = Object.fromEntries(
    Object.entries(process.env) // eslint-disable-line node/no-process-env
      .filter(([name]) => name.startsWith(envPrefix))
      .map(([name, value]) => [`process.env.${name.slice(envPrefix.length)}`, value])
  );
  return new webpack.DefinePlugin({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'process.env.NODE_ENV': JSON.stringify(getEnv()),
    ...extraEnv,
  });
}
