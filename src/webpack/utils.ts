import {readdir, readFile, stat} from 'node:fs/promises';
import {join, resolve} from 'node:path';

export interface WebpackConfigFragment {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: () => any;
  dependencies: Record<string, string>;
}

export function isProd(): boolean {
  return process.env['NODE_ENV'] === 'production'; // eslint-disable-line node/no-process-env
}

export function isSelenium(): boolean {
  return process.env['IS_SELENIUM'] === '1'; // eslint-disable-line node/no-process-env
}

export function getEnv(): 'production' | 'development' {
  return isProd() ? 'production' : 'development';
}

const packageJsonCache = new Map<string, Record<string, unknown> | undefined>();

export async function findPackageJson(p: string): Promise<Record<string, unknown> | undefined> {
  if (packageJsonCache.has(p)) {
    return packageJsonCache.get(p);
  }
  try {
    const pStat = await stat(p);
    if (pStat.isDirectory()) {
      const dir = await readdir(p);
      if (dir.includes('package.json')) {
        const fileContent = await readFile(join(p, 'package.json'));
        const json = JSON.parse(fileContent.toString()) as Record<string, unknown>;
        packageJsonCache.set(p, json);
        return json;
      }
      if (p === '/') {
        return undefined;
      }
    }
    const res = await findPackageJson(resolve(`${p}/..`));
    packageJsonCache.set(p, res);
    return res;
  } catch (err: unknown) {
    console.log('findPackageJson');
    console.log(err);
    packageJsonCache.set(p, undefined);
    return undefined;
  }
}
