import {prompt} from 'prompts';

import {WorkspaceFragment, WorkspaceFragmentType} from '@src/models';
import {
  askForAlarmEmail,
  askForAuthentication,
  askForCloudwatchTrigger,
  askForDomainName,
  askForProjectName,
} from '@src/project/ask_for_common';
import {getProjectsFromWorkspaceFragment} from '@src/project/generate_workspace';
import {neverHappens} from '@src/type_utils';

const I_AM_DONE = 'i_am_done';

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

export async function askForNewWorkspaceFragment(
  frags: WorkspaceFragment[]
): Promise<WorkspaceFragment[]> {
  const takenNames = [
    'terraform',
    'shared',
    'shared-web',
    'shared-node',
    ...frags.flatMap(frag => getProjectsFromWorkspaceFragment(frag).map(p => p.projectName)),
  ];

  const {workspaceFragmentType} = await prompt({
    type: 'select',
    name: 'workspaceFragmentType',
    message: 'Choose a type of project to add to the workspace',
    choices: [
      ...Object.entries(WorkspaceFragmentTypeToString).map(([value, title]) => ({value, title})),
      {title: `I'm done`, value: I_AM_DONE},
    ],
  });
  if (workspaceFragmentType === undefined || workspaceFragmentType === I_AM_DONE) {
    return frags;
  }

  const type = workspaceFragmentType as SelectableWorkspaceFragmentType;

  if (type === WorkspaceFragmentType.StaticWebsite) {
    const websiteName = await askForProjectName('Website project name', 'website', takenNames);
    const domain = await askForDomainName();
    return [...frags, {type, websiteName, domain}];
  } else if (type === WorkspaceFragmentType.StandaloneLambda) {
    const lambdaName = await askForProjectName('Lambda project name', 'lambda', takenNames);
    const alarmEmail = await askForAlarmEmail(true);
    const cloudwatchTriggerMinutes = await askForCloudwatchTrigger();
    return [...frags, {type, lambdaName, alarmEmail, cloudwatchTriggerMinutes}];
  } else if (type === WorkspaceFragmentType.ApiLambda) {
    const apiName = await askForProjectName('API name', 'api', takenNames);
    const alarmEmail = await askForAlarmEmail(false);
    const domain = await askForDomainName();
    return [...frags, {type, apiName, alarmEmail, domain}];
  } else if (type === WorkspaceFragmentType.WebApp) {
    const appName = await askForProjectName('App name', 'app', takenNames);
    const alarmEmail = await askForAlarmEmail(false);
    const domain = await askForDomainName();
    const authentication = await askForAuthentication();
    return [...frags, {type, appName, alarmEmail, domain, authentication}];
  }
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  else if (type === WorkspaceFragmentType.NodeScript) {
    const scriptName = await askForProjectName('Script project name', 'script', takenNames);
    return [...frags, {type, scriptName}];
  }
  neverHappens(type, `Unknown WorkspaceFragmentType "${type}"`);
}
