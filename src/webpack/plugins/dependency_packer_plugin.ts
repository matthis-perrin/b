import {exec} from 'node:child_process';
import {writeFile} from 'node:fs/promises';

import {Compiler} from 'webpack';

import {globalError} from '@src/global_error';
import {error, log} from '@src/logger';
import {WebpackPlugin} from '@src/webpack/models';
import {findPackageJson} from '@src/webpack/utils';

interface DependencyPackerPluginOptions {
  packageJsonProperties?: Record<string, unknown>;
  disableYarnRun?: boolean;
}

class DependencyPackerPlugin {
  public constructor(private readonly opts: DependencyPackerPluginOptions = {}) {}

  public apply(compiler: Compiler): void {
    const name = 'DependencyPackerPlugin';
    const depMap = new Map<string, string>();

    compiler.resolverFactory.hooks.resolver.for('normal').tap(name, resolver => {
      resolver.hooks.result.tap(name, result => {
        if (
          result.descriptionFileRoot !== undefined &&
          !result.descriptionFileRoot.includes('/node_modules/')
        ) {
          return result;
        }
        if (
          result.descriptionFileData &&
          'name' in result.descriptionFileData &&
          'version' in result.descriptionFileData
        ) {
          const {name, version} = result.descriptionFileData as {name: string; version: string};
          depMap.set(name, version);
        } else {
          log('failure to identify module', result.descriptionFileData);
        }
        return result;
      });
    });

    compiler.hooks.beforeRun.tap(name, () => depMap.clear());
    // compiler.hooks.compilation.tap(name, compilation => {
    //   // compilation.hooks.finishModules.tapPromise(name, async modules => {
    //   //   await Promise.allSettled(
    //   //     [...modules].map(async m => {
    //   //       if (!('userRequest' in m)) {
    //   //         return;
    //   //       }
    //   //       // log(
    //   //       //   compilation.resolverFactory
    //   //       //     .get('normal')
    //   //       //     .resolveSync(m.context, compiler.context, m.request)
    //   //       // );
    //   //       const module = m as ExternalModule | NormalModule;
    //   //       const request = module.userRequest;
    //   //       if (request.startsWith('node:')) {
    //   //         return;
    //   //       }
    //   //       const res = await matcherAsync(module.userRequest);
    //   //       if (res === undefined) {
    //   //         return;
    //   //       }
    //   //       const packageJson = await findPackageJson(res);
    //   //       if (packageJson === undefined) {
    //   //         return;
    //   //       }
    //   //       depMap.set(packageJson['name'] as string, packageJson['version'] as string);
    //   //     })
    //   //   );
    //   // });
    // });
    compiler.hooks.done.tapPromise(name, async stats => {
      const dependencies = Object.fromEntries(
        [...depMap.entries()].sort((e1, e2) => e1[0].localeCompare(e2[0]))
      );

      let {name, version, ...extraProps} = this.opts.packageJsonProperties ?? {};

      if (name === undefined || version === undefined) {
        const entryPoints = Object.values(stats.compilation.compiler.options.entry);
        const [firstEntryPoint] = entryPoints;
        if (firstEntryPoint === undefined) {
          return;
        }
        const entryPoint = firstEntryPoint.import.at(-1) as string;
        const entryPackageJson = await findPackageJson(entryPoint);
        if (!entryPackageJson) {
          globalError(`Failure to retrieve entryPoint's package.json for ${entryPoint}`);
          return;
        }

        name = entryPackageJson['name'] as string;
        version = entryPackageJson['version'] as string;
      }

      const outputDirectory = stats.compilation.compiler.options.output.path as string;
      await writeFile(
        `${outputDirectory}/package.json`,
        JSON.stringify(
          {
            name,
            version,
            type: 'module',
            main: 'index.js',
            ...extraProps,
            dependencies,
          },
          undefined,
          2
        )
      );
      if (!this.opts.disableYarnRun) {
        await yarnInstall(outputDirectory);
      }
    });
  }
}

async function yarnInstall(path: string): Promise<void> {
  return new Promise((resolve, reject) => {
    exec(`yarn install --non-interactive --production`, {cwd: path}, (err, stdout, stderr) => {
      if (!err) {
        resolve();
      } else {
        error(`Failure to run \`yarn install\` at "${path}"\n${stderr}`);
        reject(new Error(stderr));
      }
    });
  });
}

export function dependencyPackerPlugin(opts?: DependencyPackerPluginOptions): WebpackPlugin {
  return new DependencyPackerPlugin(opts);
}
