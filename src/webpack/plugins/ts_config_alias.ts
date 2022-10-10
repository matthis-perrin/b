import {existsSync, readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';

interface TsConfig {
  extends?: string;
  compilerOptions?: {
    paths?: Record<string, string[]>;
  };
  [key: string]: unknown;
}

function loadConfig(path: string): TsConfig {
  const config = JSON.parse(readFileSync(path).toString()) as TsConfig;
  if (typeof config.extends !== 'string') {
    return config;
  }
  let extendConfig: TsConfig = {};
  let dir = dirname(path);
  const extendPath = config.extends + (config.extends.endsWith('.json') ? '' : '.json');
  if (extendPath.startsWith('./')) {
    extendConfig = loadConfig(join(dir, extendPath));
  } else {
    while (true) {
      const pathToTry = join(dir, 'node_modules', extendPath);
      if (existsSync(pathToTry)) {
        extendConfig = loadConfig(pathToTry);
        break;
      }
      const newDir = join(dir, '..');
      if (newDir === dir) {
        break;
      }
      dir = newDir;
    }
  }
  delete config.extends;
  return {
    ...extendConfig,
    ...config,
    compilerOptions: {
      ...extendConfig.compilerOptions,
      ...config.compilerOptions,
    },
  };
}

export function getTsConfigAlias(context: string): Record<string, string[]> {
  const tsconfigPath = join(context, 'tsconfig.json');
  const {paths = {}} = loadConfig(tsconfigPath)['compilerOptions'] ?? {};
  const alias: Record<string, string[]> = {};

  for (const item of Object.keys(paths)) {
    const key = item.replace('/*', '');
    const value = paths[item]?.map(v => join(context, v.replace('/*', '').replace('*', ''))) ?? [];
    alias[key] = value;
  }
  return alias;
}
