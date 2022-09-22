import {mkdir} from 'node:fs/promises';
import {basename, join} from 'node:path';

import {prompt} from 'prompts';

import {maybeReadFile, rmDir} from '@src/fs';
import {ProjectName, WorkspaceFragment, WorkspaceFragmentType, WorkspaceName} from '@src/models';
import {generateWorkspace, getProjectsFromWorkspaceFragment} from '@src/project/generate_workspace';
import {neverHappens} from '@src/type_utils';

async function cancel(workspacePath?: string): Promise<never> {
  console.log('Cancelling...');
  if (workspacePath !== undefined) {
    await rmDir(workspacePath);
  }
  // eslint-disable-next-line node/no-process-exit
  process.exit(0);
}

async function initProject(): Promise<void> {
  let workspaceName: string;
  let workspacePath = process.cwd();
  const frags: WorkspaceFragment[] = [];
  const takenNames = ['terraform'];
  const alreadyGenerated: ProjectName[] = [];

  // Check if we are already in a workspace
  const workspaceContent = await maybeReadFile(join(workspacePath, 'app.code-workspace'));
  const workspaceJson = workspaceContent === undefined ? {} : JSON.parse(workspaceContent);
  const workspaceProjects = Array.isArray(workspaceJson.projects)
    ? workspaceJson.projects
    : undefined;
  if (workspaceProjects !== undefined) {
    workspaceName = basename(workspacePath);
    for (const project of workspaceProjects as WorkspaceFragment[]) {
      frags.push(project);
      const projectNames = getProjectsFromWorkspaceFragment(project).map(p => p.projectName);
      takenNames.push(...projectNames);
      alreadyGenerated.push(...projectNames);
    }
  } else {
    // Ask for workspace name
    const promptResponse = await prompt({
      type: 'text',
      name: 'workspaceName',
      message: 'Workspace name',
      validate: (v: string) => v.length > 0,
    });
    workspaceName = promptResponse.workspaceName;

    if (typeof workspaceName !== 'string') {
      return cancel();
    }

    workspacePath = join(workspacePath, workspaceName);
    await mkdir(workspacePath);
  }

  try {
    while (true) {
      let frag;
      try {
        // eslint-disable-next-line no-await-in-loop
        frag = await askForWorkspaceFragment(takenNames);
      } catch (err: unknown) {
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

    await generateWorkspace(workspacePath, name, frags, alreadyGenerated);
  } catch (err: unknown) {
    console.error(String(err));
    await cancel(workspaceName);
  }
}

async function askForWorkspaceFragment(
  takenNames: string[]
): Promise<WorkspaceFragment | undefined> {
  const DONE_GENERATING = 'done_generating';
  const {workspaceFragmentType} = await prompt({
    type: 'select',
    name: 'workspaceFragmentType',
    message: 'Choose a type of project to add to the workspace',
    choices: [
      {title: 'Web App', value: WorkspaceFragmentType.WebApp},
      {title: 'Static Website', value: WorkspaceFragmentType.StaticWebsite},
      {title: 'Standalone Lambda', value: WorkspaceFragmentType.StandaloneLambda},
      {title: 'Node lib', value: WorkspaceFragmentType.NodeLib},
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
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  } else if (type === WorkspaceFragmentType.NodeLib) {
    const libName = await askForProjectName('Lib project name', 'lib', takenNames);
    return {type, libName};
  }
  neverHappens(type, `Unknown WorkspaceFragmentType "${type}"`);
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

  const {value} = await prompts({
    type: 'text',
    name: 'value',
    message: question,
    initial,
    validate: (v: string) => v.length > 0,
  });
  if (typeof value !== 'string') {
    throw new Error(`${question} is required`);
  }
  if (takenNames.includes(value)) {
    throw new Error(`${value} is taken`);
  }
  return value as ProjectName;
}

initProject().catch(console.error);
