import {join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

import {cleanDir, readFile, writeRawFile} from '@src/fs';
import {compile} from '@src/packager';
import {copyTemplatesDirs} from '@src/templates';
import {PACKAGE_VERSIONS} from '@src/versions';

const PROJECT_PACKAGE = join(resolve('.'), 'packages', `project`);

export async function projectPackage(): Promise<void> {
  await cleanDir(PROJECT_PACKAGE);
  await writeScript(PROJECT_PACKAGE);
  await Promise.all([
    copyTemplatesDirs(join(PROJECT_PACKAGE, 'templates')),
    copyScript('build.js'),
    copyScript('deploy.js'),
    copyScript('setup.js'),
  ]);
}

async function writeScript(path: string): Promise<void> {
  const entry = join(fileURLToPath(import.meta.url), `../../src/project/init_project.ts`);
  const dst = join(path);
  await compile(entry, dst, false, {
    name: '@matthis/project',
    version: PACKAGE_VERSIONS.project,
    license: 'UNLICENSED',
    bin: './index.js',
  });
  const scriptPath = join(dst, 'index.js');
  const scriptContent = await readFile(scriptPath);
  await writeRawFile(
    scriptPath,
    `#!/usr/bin/env node --experimental-modules --no-warnings\n${scriptContent.toString()}`
  );
}

const SCRIPTS_DIR = join(fileURLToPath(import.meta.url), '../../src/project/scripts');
async function copyScript(name: string): Promise<void> {
  const content = await readFile(join(SCRIPTS_DIR, name));
  await writeRawFile(join(PROJECT_PACKAGE, 'scripts', name), content.toString());
}
