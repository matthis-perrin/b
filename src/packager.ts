import webpack, {DefinePlugin} from 'webpack'; // eslint-disable-line import/no-named-as-default

import {nodeConfig} from '@src/webpack/configs/node_config';

export async function compile(
  entry: string,
  dst: string,
  isLib: boolean,
  name: string,
  version: string
): Promise<void> {
  const baseConfig = nodeConfig({isLib, packageOptions: {name, version}});
  const plugins = (baseConfig.plugins ?? []).filter(p => !(p instanceof DefinePlugin));
  const config = {
    ...baseConfig,
    entry: {index: entry},
    output: {...baseConfig.output, path: dst},
    plugins,
  };

  return new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
      if (err) {
        console.error(`Failure to compile ${entry}`);
        reject(err);
      } else if (stats?.hasErrors()) {
        console.error(`Failure to compile ${entry}`);
        reject(new Error(stats.toString({errorDetails: true})));
      } else {
        resolve();
      }
    });
  });
}
