import {join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

import {cleanDir, writeRawFile} from '@src/fs';
import {compile} from '@src/packager';
import {copyTemplatesDirs} from '@src/templates';
import {PACKAGE_VERSIONS} from '@src/versions';

export async function projectPackage(): Promise<void> {
  const path = join(resolve('.'), 'packages', `project`);
  await cleanDir(path);
  await writeScript(path);
  await Promise.all([
    copyTemplatesDirs(join(path, 'templates')),
    writeRawFile(
      join(path, 'index.mjs'),
      `#!/usr/bin/env node\nimport ('${join(path, 'index.js')}');`
    ),
  ]);
}

async function writeScript(path: string): Promise<void> {
  const entry = join(fileURLToPath(import.meta.url), `../init_project.ts`);
  const dst = join(path);
  await compile(entry, dst, false, {
    name: '@matthis/project',
    version: PACKAGE_VERSIONS.project,
    bin: './index.mjs',
  });
}
