import {readdir, readFile, stat, writeFile} from 'node:fs/promises';
import {join, resolve} from 'node:path';

import {createMatchPathAsync, loadConfig} from 'tsconfig-paths';
import {Compiler, ExternalModule, NormalModule} from 'webpack';

import {WebpackPlugin} from '@src/webpack/models';

async function findPackageJsonVersion(
  p: string
): Promise<{name: string; version: string} | undefined> {
  const pStat = await stat(p);
  if (pStat.isDirectory()) {
    const dir = await readdir(p);
    if (dir.includes('package.json')) {
      const fileContent = await readFile(join(p, 'package.json'));
      const {name, version} = JSON.parse(fileContent.toString());
      return {name, version};
    }
    if (p === '/') {
      return undefined;
    }
  }
  return findPackageJsonVersion(resolve(`${p}/..`));
}

class DependencyPackerPlugin {
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
            const dep = await findPackageJsonVersion(res);
            if (dep === undefined) {
              return;
            }
            depMap.set(dep.name, dep.version);
          })
        );
      });
    });
    compiler.hooks.done.tapPromise(name, async stats => {
      if (stats.hasErrors()) {
        return;
      }
      const outputDirectory = stats.compilation.compiler.options.output.path;
      const dependencies = Object.fromEntries(
        [...depMap.entries()].sort((e1, e2) => e1[0].localeCompare(e2[0]))
      );
      await writeFile(
        `${outputDirectory}/package.json`,
        JSON.stringify(
          {
            type: 'module',
            dependencies,
          },
          undefined,
          2
        )
      );
    });
  }
}

export function dependencyPackerPlugin(): WebpackPlugin {
  return new DependencyPackerPlugin();
}
