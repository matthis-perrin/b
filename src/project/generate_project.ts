import {execSync} from 'child_process';
import {join} from 'path';

import {cp} from '../fs';
import {PROJECT_TYPE_TO_METADATA, RuntimeType} from '../models';
import {WorkspaceProject} from './generate_workspace';

// eslint-disable-next-line unicorn/prefer-module
const TEMPLATES_PATH = join(__dirname, './templates');

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
