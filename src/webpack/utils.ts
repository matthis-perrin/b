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

export function getProjectDir(): string {
  return join(resolve('.'));
}

export function getDistDir(): string {
  return join(getProjectDir(), 'dist');
}
