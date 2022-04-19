import {basename, join} from 'path';
import {cwd} from 'process';
import {readdir, mkdir} from 'fs/promises';

import {ProjectType, WorkspaceType} from '../models';
import {generateWorkspace} from './generate_workspace';

export default async function initProject(): Promise<void> {
  // const prompts = require('prompts');
  let workspacePath = cwd();
  let workspaceName = basename(workspacePath);

  // Ask for project name and create folder if directory is not empty
  const content = await readdir(workspacePath);
  if (!content.every(f => f.startsWith('.'))) {
    // workspaceName = (
    //   await prompts({
    //     type: 'text',
    //     name: 'workspaceName',
    //     message: 'Project name',
    //     validate: (v: string) => v.length > 0,
    //   })
    // ).workspaceName;
    workspaceName = 'test-web-app';
    if (workspaceName === undefined) {
      throw new Error(`Project name is required`);
    }
    workspacePath = join(workspacePath, workspaceName);
    await mkdir(workspacePath);
  }

  // Ask for the type of project
  // const {workspaceType} = await prompts({
  //   type: 'select',
  //   name: 'workspaceType',
  //   message: 'Project type',
  //   choices: [
  //     {title: 'Web App', value: WorkspaceType.WebApp},
  //     {title: 'Static Website', value: WorkspaceType.StaticWebsite},
  //     {title: 'Standalone Lambda', value: WorkspaceType.StandaloneLambda},
  //   ],
  // });
  // if (workspaceType === undefined) {
  //   throw new Error(`Project type is required`);
  // }
  const workspaceType = WorkspaceType.WebApp;

  if (workspaceType === WorkspaceType.WebApp) {
    await generateWorkspace(workspacePath, workspaceName, workspaceType, [
      {name: 'frontend', type: ProjectType.Web},
      {name: 'backend', type: ProjectType.Lambda},
    ]);
  } else if (workspaceType === WorkspaceType.StaticWebsite) {
    await generateWorkspace(workspacePath, workspaceName, workspaceType, [
      {name: 'website', type: ProjectType.Web},
    ]);
  } else if (workspaceType === WorkspaceType.StandaloneLambda) {
    await generateWorkspace(workspacePath, workspaceName, workspaceType, [
      {name: 'lambda', type: ProjectType.Lambda},
    ]);
  } else {
    throw new Error(`Unknown workspaceType "${workspaceType}"`);
  }
}

initProject().catch(console.error);
