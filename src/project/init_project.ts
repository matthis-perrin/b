import {join} from 'path';
import {cwd} from 'process';
import {mkdir} from 'fs/promises';

import {ProjectName, WorkspaceFragment, WorkspaceFragmentType, WorkspaceName} from '../models';
import {generateWorkspace, getProjectsFromWorkspaceFragment} from './generate_workspace';
import {neverHappens} from '../type_utils';
import {rmDir} from '../fs';

async function cancel(workspacePath?: string): Promise<never> {
  console.log('Cancelling...');
  if (workspacePath) {
    await rmDir(workspacePath);
  }
  process.exit(0);
}

async function initProject(): Promise<void> {
  const prompts = require('prompts');
  let workspacePath = cwd();

  // Ask for workspace name and create folder if directory is not empty
  const workspaceName = (
    await prompts({
      type: 'text',
      name: 'workspaceName',
      message: 'Workspace name',
      validate: (v: string) => v.length > 0,
    })
  ).workspaceName;
  if (typeof workspaceName !== 'string') {
    cancel();
  }
  workspacePath = join(workspacePath, workspaceName);
  await mkdir(workspacePath);

  try {
    const frags: WorkspaceFragment[] = [];
    const takenNames = ['terraform'];
    while (true) {
      let frag;
      try {
        frag = await askForWorkspaceFragment(takenNames);
      } catch (err) {
        console.error(String(err));
        continue;
      }
      if (frag) {
        frags.push(frag);
        takenNames.push(...getProjectsFromWorkspaceFragment(frag).map(p => p.projectName));
      } else {
        break;
      }
    }

    const name = workspaceName as WorkspaceName;
    await generateWorkspace(workspacePath, name, frags);
  } catch (err) {
    console.error(String(err));
    cancel(workspaceName);
  }
}

async function askForWorkspaceFragment(
  takenNames: string[]
): Promise<WorkspaceFragment | undefined> {
  const prompts = require('prompts');

  const DONE_GENERATING = 'done_generating';
  const {workspaceFragmentType} = await prompts({
    type: 'select',
    name: 'workspaceFragmentType',
    message: 'Choose a type of project to add to the workspace',
    choices: [
      {title: 'Web App', value: WorkspaceFragmentType.WebApp},
      {title: 'Static Website', value: WorkspaceFragmentType.StaticWebsite},
      {title: 'Standalone Lambda', value: WorkspaceFragmentType.StandaloneLambda},
      {title: `I'm done`, value: DONE_GENERATING},
    ],
  });
  if (workspaceFragmentType === undefined || workspaceFragmentType === DONE_GENERATING) {
    return undefined;
  }
  const type = workspaceFragmentType as WorkspaceFragmentType;

  if (type === WorkspaceFragmentType.StaticWebsite) {
    const websiteName = await askForProjectName('Website project name', 'website', takenNames);
    return {type, websiteName};
  } else if (type === WorkspaceFragmentType.StandaloneLambda) {
    const lambdaName = await askForProjectName('Lambda project name', 'lambda', takenNames);
    return {type, lambdaName};
  } else if (type === WorkspaceFragmentType.WebApp) {
    const websiteName = await askForProjectName('Frontend project name', 'frontend', takenNames);
    const lambdaName = await askForProjectName('Backend project name', 'backend', takenNames);
    return {type, websiteName, lambdaName};
  } else {
    neverHappens(type, 'WorkspaceFragmentType');
  }
}

async function askForProjectName(
  question: string,
  defaultValue: string,
  takenNames: string[]
): Promise<ProjectName> {
  const prompts = require('prompts');

  let initial = defaultValue;
  if (takenNames.includes(initial)) {
    let index = 2;
    while (takenNames.includes(initial)) {
      initial = `${defaultValue}_${index}`;
      index++;
    }
  }

  const value = (
    await prompts({
      type: 'text',
      name: 'value',
      message: question,
      initial,
      validate: (v: string) => v.length > 0,
    })
  ).value;
  if (typeof value !== 'string') {
    throw new Error(`${question} is required`);
  }
  if (takenNames.includes(value)) {
    throw new Error(`${value} is taken`);
  }
  return value as ProjectName;
}

initProject().catch(console.error);
