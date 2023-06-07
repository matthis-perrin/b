import {execSync} from 'node:child_process';
import {writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';

import {cp, listFiles, readFile, writeJsonFile} from '@src/fs';
import {PROJECT_TYPE_TO_METADATA, RuntimeType} from '@src/models';
import {WorkspaceProject} from '@src/project/generate_workspace';

const TEMPLATES_PATH = join(fileURLToPath(import.meta.url), '../templates');

export async function generateProject(dst: string, project: WorkspaceProject): Promise<void> {
  const {projectName, type} = project;
  // Copy template files
  await cp(join(TEMPLATES_PATH, type), dst);

  // Replace name in package.json
  const packageJsonPath = join(dst, 'package.json');
  const packageJsonbuffer = await readFile(packageJsonPath);
  const packageJson = JSON.parse(packageJsonbuffer.toString());
  packageJson['name'] = projectName;
  await writeJsonFile(packageJsonPath, packageJson);

  // Replace variables
  const files = await listFiles(dst);
  await Promise.all(
    files.map(async file => {
      const buffer = await readFile(file);
      const content = buffer.toString();
      const newContent = content.replaceAll('{{PROJECT_NAME}}', projectName);
      if (newContent !== content) {
        await writeFile(file, newContent);
      }
    })
  );

  // Post generation script for React Native project
  if (PROJECT_TYPE_TO_METADATA[type].runtimeType === RuntimeType.ReactNative) {
    console.log('Running post install script');
    const commands = [
      `pushd ${dst}`,
      `npx --yes react-native init ${projectName}`,
      `mv ${projectName}/ios .`,
      `mv ${projectName}/android .`,
      `rm -rf ${projectName}`,
      `popd`,
    ];
    execSync(commands.join(' && '));
  }
}
