import {join} from 'node:path';
import {fileURLToPath} from 'node:url';

import {cleanDir} from '@src/fs';
import {RuntimeType} from '@src/models';
import {compile} from '@src/packager';
import {PACKAGE_VERSIONS} from '@src/versions';

export async function generateForType(path: string, type: RuntimeType): Promise<void> {
  await cleanDir(path);
  await compileWebpackConfig(type, path);
}

async function compileWebpackConfig(type: RuntimeType, path: string): Promise<void> {
  const entry = join(fileURLToPath(import.meta.url), `../../src/webpack/${type}.ts`);
  const dst = join(path);
  await compile(entry, dst, true, {
    name: `@matthis/webpack-${type}`,
    version: PACKAGE_VERSIONS.webpack,
  });
}
