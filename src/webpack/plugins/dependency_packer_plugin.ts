import {writeFile} from 'node:fs/promises';

import {createMatchPathAsync, loadConfig} from 'tsconfig-paths';
import {Compiler, ExternalModule, NormalModule} from 'webpack';

import {WebpackPlugin} from '@src/webpack/models';
import {findPackageJson} from '@src/webpack/utils';

class DependencyPackerPlugin {
  public constructor(private readonly packageJsonProperties: Record<string, unknown> = {}) {}

  public apply(compiler: Compiler): void {
    const name = 'DependencyPackerPlugin';
    const depMap = new Map<string, string>();

    const loadResult = loadConfig(process.cwd());
    if (loadResult.resultType === 'failed') {
      return;
    }
    const matcher = createMatchPathAsync(loadResult.absoluteBaseUrl, loadResult.paths);
    const matcherAsync = async (req: string): Promise<string | undefined> => {
      return new Promise<string | undefined>(resolve => {
        matcher(req, undefined, undefined, undefined, (err, res) => {
          resolve(err || res === undefined ? undefined : res);
        });
      });
    };

    compiler.hooks.beforeRun.tap(name, () => depMap.clear());
    compiler.hooks.compilation.tap(name, compilation => {
      compilation.hooks.finishModules.tapPromise(name, async modules => {
        await Promise.allSettled(
          [...modules].map(async m => {
            if (!('userRequest' in m)) {
              return;
            }
            const module = m as ExternalModule | NormalModule;
            const res = await matcherAsync(module.userRequest);
            if (res === undefined) {
              return;
            }
            const packageJson = await findPackageJson(res);
            if (packageJson === undefined) {
              return;
            }
            depMap.set(packageJson['name'] as string, packageJson['version'] as string);
          })
        );
      });
    });
    compiler.hooks.done.tapPromise(name, async stats => {
      if (stats.hasErrors()) {
        return;
      }
      const dependencies = Object.fromEntries(
        [...depMap.entries()].sort((e1, e2) => e1[0].localeCompare(e2[0]))
      );

      let {name, version, ...extraProps} = this.packageJsonProperties;

      if (name === undefined || version === undefined) {
        const entryPoints = Object.values(stats.compilation.compiler.options.entry);
        const entryPoint = entryPoints[0].import.at(-1) as string;
        const entryPackageJson = await findPackageJson(entryPoint);
        if (!entryPackageJson) {
          console.error(`Failure to retrieve entryPoint's package.json for ${entryPoint}`);
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
    });
  }
}

export function dependencyPackerPlugin(
  packageJsonProperties?: Record<string, unknown>
): WebpackPlugin {
  return new DependencyPackerPlugin(packageJsonProperties);
}
