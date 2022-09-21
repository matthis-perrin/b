import {join, resolve} from 'path';
import {fileURLToPath} from 'url';

import {cleanDir, readFile, writeJsonFile, writeRawFile} from '../fs';
import {compile} from '../packager';
import {copyTemplatesDirs} from '../templates';
import {PACKAGE_VERSIONS} from '../versions';

export async function projectPackage(): Promise<void> {
  const path = join(resolve('.'), 'packages', `project`);
  await cleanDir(path);
  await Promise.all([
    writeJsonFile(join(path, 'package.json'), generatePackageJson()),
    writeScript(path),
  ]);
  const indexPath = join(path, 'index.js');
  await Promise.all([
    copyTemplatesDirs(join(path, 'templates')),
    writeRawFile(indexPath, `#!/usr/bin/env node\n${await readFile(indexPath)}`),
  ]);
}

function generatePackageJson(): Record<string, unknown> {
  return {
    name: `@matthis/project`,
    version: PACKAGE_VERSIONS.project,
    license: 'UNLICENSED',
    type: 'module',
    bin: {
      main: './index.js',
    },
    dependencies: {
      prettier: '2.6.x',
      prompts: '2.4.x',
    },
  };
}

async function writeScript(path: string): Promise<void> {
  const entry = join(fileURLToPath(import.meta.url), `../init_project.ts`);
  const dst = join(path);
  await compile(entry, dst, false);
}
