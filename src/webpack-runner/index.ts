import {join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

import {cleanDir} from '@src/fs';
import {compile} from '@src/packager';
import {PACKAGE_VERSIONS} from '@src/versions';

export async function webpackRunnerPackage(): Promise<void> {
  const path = join(resolve('.'), 'packages', `webpack-runner`);
  await cleanDir(path);
  await writeScript(path);
}

async function writeScript(path: string): Promise<void> {
  const entry = join(fileURLToPath(import.meta.url), `../runner.ts`);
  const dst = join(path);
  await compile(entry, dst, true, {
    name: '@matthis/webpack-runner',
    version: PACKAGE_VERSIONS.runner,
  });
}
