import {createHash} from 'node:crypto';
import {mkdir, readdir, readFile, rm, stat} from 'node:fs/promises';
import {join, resolve} from 'node:path';

import {exists, rmDir} from '@src/fs';
import {log} from '@src/logger';

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
    log('findPackageJson');
    log(err);
    packageJsonCache.set(p, undefined);
    return undefined;
  }
}

export function getPort(context: string): number {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const hexHash = createHash('md5').update(context).digest('hex').slice(0, 4);
  const port = 1024 + Math.floor(parseInt(hexHash, 16) / 2);
  return port;
}

export async function initLogFile(context: string, logFileName: string): Promise<string> {
  // Find the root of the project and create the log dir there
  try {
    const root = await lookupRoot(context);
    const logDir = join(root, 'log');
    await rmDir(logDir);
    await mkdir(logDir, {recursive: true});
    const logFile = join(logDir, logFileName);
    if (await exists(logFile)) {
      await rm(logFile);
    }
    return logFile;
  } catch {
    throw new Error(`Failure to identify project root from ${context}`);
  }
}

async function lookupRoot(fromPath: string): Promise<string> {
  if (await exists(join(fromPath, 'package.json'))) {
    return fromPath;
  }
  const parent = join(fromPath, '..');
  if (parent === fromPath) {
    throw new Error('Failure to lookup root');
  }
  return lookupRoot(parent);
}
