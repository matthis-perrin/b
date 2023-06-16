import webpack from 'webpack'; // eslint-disable-line import/no-named-as-default

import {WebpackPlugin} from '@src/webpack/models';

export function definePlugin(): WebpackPlugin {
  const envPrefix = 'MATTHIS_';
  const envVariables = Object.fromEntries(
    Object.entries(process.env) // eslint-disable-line node/no-process-env
      .filter(([name]) => name.startsWith(envPrefix))
      .map(([name, value]) => [String(name.slice(envPrefix.length)), JSON.stringify(value)])
  );
  return new webpack.DefinePlugin(envVariables);
}
