import {join, resolve} from 'path';
import {cleanDir, cp, readFile, writeFile, writeJsonFile, writeRawFile} from '../fs';
import {compile} from '../packager';
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
    cp(join(__dirname, 'templates'), join(path)),
    writeFile(indexPath, `#!/usr/bin/env node\n${await readFile(indexPath)}`),
  ]);
}

function generatePackageJson(): Record<string, unknown> {
  return {
    name: `@matthis/project`,
    version: PACKAGE_VERSIONS.project,
    license: 'UNLICENSED',
    bin: {
      main: './index.js',
    },
    dependencies: {
      prompts: '2.4.x',
    },
  };
}

async function writeScript(path: string): Promise<void> {
  const entry = join(__dirname, `init_project.ts`);
  const dst = join(path);
  await compile(entry, dst);
}
