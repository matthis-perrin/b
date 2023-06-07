import {mkdir} from 'node:fs/promises';
import {basename, join} from 'node:path';

import {prompt} from 'prompts';

import {rmDir} from '@src/fs';
import {ProjectName, WorkspaceFragment, WorkspaceFragmentType, WorkspaceName} from '@src/models';
import {generateWorkspace, getProjectsFromWorkspaceFragment} from '@src/project/generate_workspace';
import {readProjectsFromWorkspace} from '@src/project/vscode_workspace';
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
  const workspaceProjects = await readProjectsFromWorkspace(workspacePath);
  if (workspaceProjects !== undefined) {
    workspaceName = basename(workspacePath);
    for (const project of workspaceProjects) {
      frags.push(project);
      const projectNames = getProjectsFromWorkspaceFragment(project).map(p => p.projectName);
      takenNames.push(...projectNames);
      alreadyGenerated.push(...projectNames);
    }
  } else {
    frags.push({type: WorkspaceFragmentType.Shared});
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

type SelectableWorkspaceFragmentType = Exclude<WorkspaceFragmentType, WorkspaceFragmentType.Shared>;

const WorkspaceFragmentTypeToString: Record<SelectableWorkspaceFragmentType, string> = {
  [WorkspaceFragmentType.WebApp]: 'Web App',
  [WorkspaceFragmentType.StaticWebsite]: 'Static Website',
  [WorkspaceFragmentType.StandaloneLambda]: 'Standalone Lambda',
  [WorkspaceFragmentType.NodeLib]: 'Node Lib',
  [WorkspaceFragmentType.NodeScript]: 'Node Script',
};

async function askForWorkspaceFragment(
  takenNames: string[]
): Promise<WorkspaceFragment | undefined> {
  const DONE_GENERATING = 'done_generating';
  const {workspaceFragmentType} = await prompt({
    type: 'select',
    name: 'workspaceFragmentType',
    message: 'Choose a type of project to add to the workspace',
    choices: [
      ...Object.entries(WorkspaceFragmentTypeToString).map(([value, title]) => ({value, title})),
      {title: `I'm done`, value: DONE_GENERATING},
    ],
  });
  if (workspaceFragmentType === undefined || workspaceFragmentType === DONE_GENERATING) {
    return undefined;
  }
  const type = workspaceFragmentType as SelectableWorkspaceFragmentType;

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
  } else if (type === WorkspaceFragmentType.NodeLib) {
    const libName = await askForProjectName('Lib project name', 'lib', takenNames);
    return {type, libName};
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  } else if (type === WorkspaceFragmentType.NodeScript) {
    const scriptName = await askForProjectName('Script project name', 'script', takenNames);
    return {type, scriptName};
  }
  neverHappens(type, `Unknown WorkspaceFragmentType "${type}"`);
}

const VALID_PROJECT_NAME = /^[a-zA-Z0-9_]+$/u;

async function askForProjectName(
  question: string,
  defaultValue: string,
  takenNames: string[]
): Promise<ProjectName> {
  let initial = defaultValue;
  if (takenNames.includes(initial)) {
    let index = 2;
    while (takenNames.includes(initial)) {
      initial = `${defaultValue}_${index}`;
      index++;
    }
  }

  const {value} = await prompt({
    type: 'text',
    name: 'value',
    message: question,
    initial,
    validate: (v: string) => v.length > 0,
  });
  if (typeof value !== 'string') {
    throw new Error(`${question} is required`);
  }
  if (!VALID_PROJECT_NAME.test(value)) {
    throw new Error(`Invalid project name "${value}". Allowed characters are a-z, A-Z, 0-9 and _`);
  }
  if (takenNames.includes(value)) {
    throw new Error(`${value} is taken`);
  }
  return value as ProjectName;
}

initProject().catch(console.error);
