import {execSync} from 'node:child_process';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';

import {cp} from '@src/fs';
import {PROJECT_TYPE_TO_METADATA, RuntimeType} from '@src/models';
import {WorkspaceProject} from '@src/project/generate_workspace';

const TEMPLATES_PATH = join(fileURLToPath(import.meta.url), '../../../templates');

export async function generateProject(dst: string, project: WorkspaceProject): Promise<void> {
  const {projectName, type} = project;
  // Copy template files
  await cp(join(TEMPLATES_PATH, type), dst);

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
