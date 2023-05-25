import webpack, {DefinePlugin} from 'webpack'; // eslint-disable-line import/no-named-as-default

import {nodeConfig} from '@src/webpack/configs/node_config';
import {YarnPlugin} from '@src/webpack/plugins/yarn_plugin';

export async function compile(
  entry: string,
  dst: string,
  isLib: boolean,
  packageJsonProperties: Record<string, unknown> = {}
): Promise<void> {
  const baseConfig = nodeConfig({
    context: process.cwd(),
    watch: false,
    isLib,
    packageJsonProperties,
  });
  const plugins = (baseConfig.plugins ?? []).filter(
    p => !(p instanceof DefinePlugin || p instanceof YarnPlugin)
  );
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
      } else if (stats?.hasErrors() || stats?.hasWarnings()) {
        const {errors = [], warnings = []} = stats.toJson({errors: true, warnings: true});
        console.log('-------');
        console.log(`Compiled ${entry} with errors:`);
        console.log(errors.map(err => `${err.file}:${err.loc}\n[error] ${err.message}`).join('\n'));
        console.log(
          warnings.map(warn => `${warn.file}:${warn.loc}\n[warning] ${warn.message}`).join('\n')
        );
        console.log('-------');
      }
      resolve();
    });
  });
}
