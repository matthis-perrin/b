import {join, resolve} from 'node:path';

import packageMetadata from 'package-json';
import {satisfies} from 'semver';

import {readdir, readFile} from '@src/fs';

export async function check(): Promise<void> {
  const packagePath = join(resolve('.'), 'packages');
  const packageDirs = await readdir(packagePath);
  const packageJsonFiles = await Promise.all(
    packageDirs.map(async d => readFile(join(packagePath, d, 'package.json')))
  );
  const dependencies = packageJsonFiles.map(
    f => (JSON.parse(f.toString()).dependencies ?? {}) as Record<string, string>
  );
  const flatDependencies: Record<string, [string, number]> = {};
  const errors: string[] = [];
  for (const [index, deps] of Object.entries(dependencies)) {
    for (const [name, version] of Object.entries(deps)) {
      const current = flatDependencies[name];
      if (current !== undefined && current[0] !== version) {
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
  const outdated = res.filter(r => r !== undefined) as [string, string, string][];
  if (outdated.length === 0) {
    console.log('Everything is up-to-date');
  } else {
    const maxNameLength = Math.max(...outdated.map(o => o[0].length));
    console.log(
      `\n${outdated.map(o => `${padRight(o[0], maxNameLength)} ${o[1]} -> ${o[2]}`).join('\n')}\n`
    );
  }
}

function padRight(str: string, len: number): string {
  let res = str;
  while (res.length < len) {
    res = `${res} `;
  }
  return res;
}

async function checkPackage(
  name: string,
  version: string
): Promise<[string, string, string] | undefined> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const latest = ((await packageMetadata(name)) as any).version as string;
  if (!satisfies(latest, version)) {
    return [name, version, latest];
  }
  return undefined;
}

check().catch(console.error);
