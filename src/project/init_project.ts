import {mkdir} from 'node:fs/promises';
import {basename, join} from 'node:path';

import {prompt} from 'prompts';

import {rmDir} from '@src/fs';
import {error, log} from '@src/logger';
import {ProjectName, WorkspaceFragment, WorkspaceFragmentType, WorkspaceName} from '@src/models';
import {generateWorkspace, getProjectsFromWorkspaceFragment} from '@src/project/generate_workspace';
import {readWorkspace} from '@src/project/vscode_workspace';
import {neverHappens} from '@src/type_utils';

async function cancel(workspacePath?: string): Promise<never> {
  log('Cancelling...');
  if (workspacePath !== undefined) {
    await rmDir(workspacePath);
  }
  // eslint-disable-next-line node/no-process-exit
  process.exit(0);
}

const BASE_FRAGMENTS = [
  {type: WorkspaceFragmentType.Shared},
  {type: WorkspaceFragmentType.SharedNode},
  {type: WorkspaceFragmentType.SharedWeb},
] as const;

async function initProject(): Promise<void> {
  let workspaceName: string;
  let workspacePath = process.cwd();
  const frags: WorkspaceFragment[] = [];
  const takenNames = ['terraform'];

  // Check if we are already in a workspace
  const workspace = await readWorkspace(workspacePath);
  if (workspace !== undefined) {
    for (const baseFrag of BASE_FRAGMENTS) {
      if (!workspace.fragments.find(f => f.type === baseFrag.type)) {
        frags.push(baseFrag);
      }
    }
    workspaceName = basename(workspacePath);
    for (const fragment of workspace.fragments) {
      frags.push(fragment);
      const projectNames = getProjectsFromWorkspaceFragment(fragment, workspace.fragments).map(
        p => p.projectName
      );
      takenNames.push(...projectNames);
    }
  } else {
    frags.push(...BASE_FRAGMENTS);
    // Ask for workspace name
    const {workspaceName: newWorkspaceName} = await prompt({
      type: 'text',
      name: 'workspaceName',
      message: 'Workspace name',
      validate: (v: string) => v.length > 0,
    });
    workspaceName = newWorkspaceName;

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
        frag = await askForWorkspaceFragment(takenNames);
      } catch (err: unknown) {
        error(String(err));
        continue;
      }
      if (frag) {
        frags.push(frag);
        takenNames.push(...getProjectsFromWorkspaceFragment(frag, frags).map(p => p.projectName));
      } else {
        break;
      }
    }

    const name = workspaceName as WorkspaceName;

    await generateWorkspace(workspacePath, name, frags, workspace);
  } catch (err: unknown) {
    error(String(err));
    await cancel(workspaceName);
  }
}

type SelectableWorkspaceFragmentType = Exclude<
  WorkspaceFragmentType,
  WorkspaceFragmentType.Shared | WorkspaceFragmentType.SharedNode | WorkspaceFragmentType.SharedWeb
>;

const WorkspaceFragmentTypeToString: Record<SelectableWorkspaceFragmentType, string> = {
  [WorkspaceFragmentType.WebApp]: 'Web App',
  [WorkspaceFragmentType.StaticWebsite]: 'Static Website',
  [WorkspaceFragmentType.StandaloneLambda]: 'Standalone Lambda',
  [WorkspaceFragmentType.ApiLambda]: 'API Lambda',
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
    const alarmEmail = await askForAlarmEmail(true);
    const cloudwatchTriggerMinutes = await askForCloudwatchTrigger();
    return {type, lambdaName, alarmEmail, cloudwatchTriggerMinutes};
  } else if (type === WorkspaceFragmentType.ApiLambda) {
    const lambdaName = await askForProjectName('Lambda project name', 'lambda', takenNames);
    const alarmEmail = await askForAlarmEmail(false);
    return {type, lambdaName, alarmEmail};
  } else if (type === WorkspaceFragmentType.WebApp) {
    const websiteName = await askForProjectName('Frontend project name', 'frontend', takenNames);
    const lambdaName = await askForProjectName('Backend project name', 'backend', takenNames);
    const alarmEmail = await askForAlarmEmail(false);
    return {type, websiteName, lambdaName, alarmEmail};
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

let alarmEmailDefault: string | undefined;

async function askForAlarmEmail(defaultVal: boolean): Promise<string | undefined> {
  const alarm = await prompt({
    type: 'confirm',
    name: 'value',
    message: 'Add an alarm when an error is logged?',
    initial: defaultVal,
  });
  if (alarm.value !== true) {
    return undefined;
  }
  const email = await prompt({
    type: 'text',
    name: 'value',
    message: 'Which email to send the alarm to?',
    initial: alarmEmailDefault,
    validate: (v: string) => v.length > 0,
  });
  if (typeof alarm.value !== 'string') {
    return undefined;
  }
  return email.value;
}

async function askForCloudwatchTrigger(): Promise<number | undefined> {
  const trigger = await prompt({
    type: 'confirm',
    name: 'value',
    message: 'Add a Cloudwatch trigger?',
    initial: true,
  });
  if (trigger.value !== true) {
    return undefined;
  }
  const minutes = await prompt({
    type: 'text',
    name: 'value',
    message: 'Trigger period (in minutes)?',
    initial: 1,
    validate: (v: number) => v >= 1 && Math.round(v) === v,
  });
  if (typeof minutes.value !== 'number') {
    return undefined;
  }
  return minutes.value;
}

initProject().catch(error);
