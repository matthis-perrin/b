import {join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

import {cleanDir} from '@src/fs';
import {compile} from '@src/packager';
import {PACKAGE_VERSIONS} from '@src/versions';

export async function lambdaServerRuntimePackage(): Promise<void> {
  const path = join(resolve('.'), 'packages', `lambda-server-runtime`);
  await cleanDir(path);
  await writeScript(path);
}

async function writeScript(path: string): Promise<void> {
  const entry = join(fileURLToPath(import.meta.url), `../../src/lambda-server-runtime/runtime.ts`);
  const dst = join(path);
  await compile(entry, dst, true, {
    name: '@matthis/lambda-server-runtime',
    version: PACKAGE_VERSIONS.lambdaServerRuntime,
  });
}
