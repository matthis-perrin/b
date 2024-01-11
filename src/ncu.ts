/* eslint-disable import/no-named-as-default-member */
import {readdir, readFile} from 'node:fs/promises';
import {join, resolve} from 'node:path';

// eslint-disable-next-line @typescript-eslint/no-restricted-imports, node/file-extension-in-import
import {removeUndefined} from './type_utils.js';
// eslint-disable-next-line @typescript-eslint/no-restricted-imports, node/file-extension-in-import
import {table} from './webpack-runner/text_table.js';
// eslint-disable-next-line import/default
import colors from 'ansi-colors';
import packageMetadata from 'package-json';
import {satisfies} from 'semver';

function sameVersion(v1: string, v2: string): boolean {
  // eslint-disable-next-line unicorn/no-for-loop
  for (let index = 0; index < v1.length; index++) {
    if (v1[index] !== 'x' && v2[index] !== 'x' && v1[index] !== v2[index]) {
      return false;
    }
  }
  return true;
}

export async function check(): Promise<void> {
  const packagePath = join(resolve('.'), 'packages');
  const packageDirs = await readdir(packagePath);
  const packageJsonFiles = await Promise.all(
    packageDirs.map(async d => readFile(join(packagePath, d, 'package.json')))
  );
  const dependencies = packageJsonFiles.flatMap(f => [
    (JSON.parse(f.toString()).dependencies ?? {}) as Record<string, string>,
    (JSON.parse(f.toString()).devDependencies ?? {}) as Record<string, string>,
  ]);
  const flatDependencies: Record<string, [string, number]> = {};
  const errors: string[] = [];
  for (const [index, deps] of Object.entries(dependencies)) {
    for (const [name, version] of Object.entries(deps)) {
      const current = flatDependencies[name];
      if (current !== undefined && !sameVersion(current[0], version)) {
        errors.push(
          `Package ${name} has version ${version} in ${
            packageDirs[parseFloat(index)]
          } and version ${current[0]} in ${packageDirs[current[1]]}`
        );
        continue;
      }
      flatDependencies[name] = [version, parseFloat(index)];
    }
  }

  if (errors.length > 0) {
    console.error(errors.join('\n'));
    process.exit(1); // eslint-disable-line node/no-process-exit
  }

  const res = await Promise.all(
    Object.entries(flatDependencies).map(async ([name, version]) => checkPackage(name, version[0]))
  );
  const outdated = removeUndefined(res).sort(([name1], [name2]) => name1.localeCompare(name2));
  if (outdated.length === 0) {
    console.log('Everything is up-to-date');
  } else {
    console.log(
      table(
        outdated.map(([name, v1, v2]) => [name, v1, '->', v2]),
        {align: ['l', 'r', 'l', 'l']}
      )
    );
  }
}

async function checkPackage(
  name: string,
  version: string
): Promise<[string, string, string] | undefined> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const latest = ((await packageMetadata(name)) as any).version as string;
  if (!satisfies(latest, version)) {
    return [
      name,
      [...version].map((c, i) => (latest[i] !== c ? colors.red(c) : c)).join(''),
      [...latest].map((c, i) => (version[i] !== c ? colors.green(c) : c)).join(''),
    ];
  }
  return undefined;
}

check().catch(console.error);
/* eslint-enable import/no-named-as-default-member */
