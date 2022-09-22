import webpack from 'webpack'; // eslint-disable-line import/no-named-as-default

import {nodeConfig} from '@src/webpack/configs/node_config';

export async function compile(
  entry: string,
  dst: string,
  isLib: boolean,
  name: string,
  version: string
): Promise<void> {
  const libOption = isLib
    ? {
        library: {
          type: 'module',
        },
      }
    : {};
  const baseConfig = nodeConfig({isLambda: false, packageOptions: {name, version}});
  const config = {
    ...baseConfig,
    entry: {index: entry},
    output: {...baseConfig.output, path: dst, ...libOption},
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
