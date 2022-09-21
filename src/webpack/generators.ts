import {join} from 'path';
import {fileURLToPath} from 'url';

import {cleanDir, writeJsonFile} from '../fs';
import {RuntimeType} from '../models';
import {compile} from '../packager';
import {PACKAGE_VERSIONS} from '../versions';
import {nodeConfig} from './configs/node_config';
import {webConfig} from './configs/web_config';

export async function generateForType(path: string, type: RuntimeType): Promise<void> {
  await cleanDir(path);
  await Promise.all([
    writeJsonFile(join(path, 'package.json'), generatePackageJson(type)),
    writeWebpackConfig(type, path),
  ]);
}

function generatePackageJson(type: RuntimeType): Record<string, unknown> {
  const {dependencies} =
    type === RuntimeType.Web ? webConfig() : nodeConfig({isLambda: type === RuntimeType.Lambda});
  return {
    name: `@matthis/webpack-${type}`,
    version: PACKAGE_VERSIONS.webpack,
    license: 'UNLICENSED',
    type: 'module',
    main: 'index.js',
    dependencies,
  };
}

async function writeWebpackConfig(type: RuntimeType, path: string): Promise<void> {
  const entry = join(fileURLToPath(import.meta.url), `../${type}.ts`);
  const dst = join(path);
  await compile(entry, dst, true);
}
