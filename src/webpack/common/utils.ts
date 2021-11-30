import {join, resolve} from 'path';

export interface WebpackConfigFragment {
  config: () => any;
  dependencies: Record<string, string>;
}

export function isProd(): boolean {
  return process.env['NODE_ENV'] === 'production';
}

export function isSelenium(): boolean {
  return process.env['IS_SELENIUM'] === '1';
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
