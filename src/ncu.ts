import packageMetadata from 'package-json';
import {satisfies} from 'semver';
import {ESLINT_VERSION, REACT_VERSION} from './constants';
import {PLUGINS_FOR_TYPE} from './plugins';

export async function check(): Promise<void> {
  const deps = [...new Set(Object.values(PLUGINS_FOR_TYPE).flat()).values()]
    .map(plugin => Object.entries(plugin.dependencies))
    .flat();

  const res = await Promise.all([
    checkPackage('eslint', ESLINT_VERSION),
    checkPackage('react', REACT_VERSION),
    ...deps.map(dep => checkPackage(dep[0], dep[1])),
  ]);
  const outdated = res.filter(r => r !== undefined) as [string, string, string][];
  if (outdated.length === 0) {
    console.log('Everything is up-to-date');
  } else {
    const maxNameLength = Math.max(...outdated.map(o => o[0].length));
    console.log(
      `\n${outdated.map(o => `${padRight(o[0], maxNameLength)} ${o[1]} ${o[2]}`).join('\n')}\n`
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
