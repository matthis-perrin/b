import {join} from 'node:path';

import {Configuration, webpack} from 'webpack';

import {formatError} from '@src/webpack-runner/formatter';

interface RunWebpacksOptions {
  projectPaths: string[];
}
export async function runWebpacks(opts: RunWebpacksOptions): Promise<void> {
  const configs: Configuration[] = await Promise.all(
    opts.projectPaths.map(async projectPath =>
      // eslint-disable-next-line import/dynamic-import-chunkname, node/no-unsupported-features/es-syntax
      import(/*webpackIgnore: true*/ join(projectPath, 'webpack.config.js')).then(({getConfig}) =>
        getConfig(projectPath)
      )
    )
  );
  webpack(
    configs.map(c => ({...c, watch: false})),
    (err, res) => {
      try {
        if (err || !res) {
          console.log('####### ERROR #######');
          console.log(err);
          console.log('#####################');
          return;
        }
        res.stats.map(stats => {
          const {errors, warnings} = stats.compilation;

          for (const error of errors) {
            formatError(error, 'error');
          }
          for (const warning of warnings) {
            formatError(warning, 'warning');
          }

          return undefined;
        });
      } catch (err: unknown) {
        console.log('Failed to handled webpack result');
        console.log(err);
      }
    }
  );
}
