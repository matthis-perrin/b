import packageMetadata from 'package-json';
import {join, resolve} from 'path';
import {satisfies} from 'semver';
import {ESLINT_VERSION, REACT_VERSION} from './versions';
import {PLUGINS_FOR_TYPE} from './eslint/plugins';
import {readdir, readFile} from './fs';

export async function check(): Promise<void> {
  const packagePath = join(resolve('.'), 'packages');
  const packageDirs = await readdir(packagePath);
  const packageJsonFiles = await Promise.all(
    packageDirs.map(d => readFile(join(packagePath, d, 'package.json')))
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
    process.exit(1);
  }

  const res = await Promise.all(
    Object.entries(flatDependencies).map(([name, version]) => checkPackage(name, version[0]))
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
  const latest = ((await packageMetadata(name)) as any).version;
  if (!satisfies(latest, version)) {
    return [name, version, latest];
  }
  return;
}

check().catch(console.error);
