import {prompt} from 'prompts';

import {WorkspaceFragment, WorkspaceFragmentRegistry, WorkspaceFragmentType} from '@src/models';
import {
  askForAlarmEmailValue,
  askForAuthentication,
  askForCloudwatchTriggerValue,
  askForDomainNameValue,
} from '@src/project/ask_for_common';
import {neverHappens} from '@src/type_utils';

const I_AM_DONE = 'i_am_done';

export async function askForWorkspaceUpdate(
  frags: WorkspaceFragment[]
): Promise<WorkspaceFragment[]> {
  // Ask which project they want to update (get the index)
  const {workspaceFragmentIndex} = await prompt({
    type: 'select',
    name: 'workspaceFragmentIndex',
    message: 'Which project do you want to update',
    choices: [
      ...frags.map((frag, index) => ({value: index, title: workspaceFragmentString(frag)})),
      {title: `I'm done`, value: I_AM_DONE},
    ],
  });
  if (workspaceFragmentIndex === undefined || workspaceFragmentIndex === I_AM_DONE) {
    return frags;
  }

  // Retrieve the workspace fragment
  const index = workspaceFragmentIndex as number;
  const frag = frags[index];
  if (!frag) {
    return frags;
  }

  // Ask for the updates
  let hasChanged = true;
  let newFrag = frag;
  while (hasChanged) {
    const nextNewFrag = await askForWorkspaceFragmentUpdate(newFrag);
    hasChanged = nextNewFrag !== newFrag;
    newFrag = nextNewFrag;
  }

  // Update the workspace
  const newFrags = [...frags];
  newFrags[index] = newFrag;
  return newFrags;
}

async function askForWorkspaceFragmentUpdate(frag: WorkspaceFragment): Promise<WorkspaceFragment> {
  // Base fragments can not be updated
  if (
    frag.type === WorkspaceFragmentType.Shared ||
    frag.type === WorkspaceFragmentType.SharedNode ||
    frag.type === WorkspaceFragmentType.SharedWeb
  ) {
    return frag;
  }

  if (frag.type === WorkspaceFragmentType.StaticWebsite) {
    return await askForStaticWebsiteFragmentUpdate(frag);
  } else if (frag.type === WorkspaceFragmentType.StandaloneLambda) {
    return await askForStandaloneLambdaFragmentUpdate(frag);
  } else if (frag.type === WorkspaceFragmentType.ApiLambda) {
    return await askForApiLambdaFragmentUpdate(frag);
  } else if (frag.type === WorkspaceFragmentType.WebApp) {
    return await askForWebAppFragmentUpdate(frag);
  }
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  else if (frag.type === WorkspaceFragmentType.NodeScript) {
    return await askForNodeScriptFragmentUpdate(frag);
  }
  neverHappens(frag);
}

async function askForStaticWebsiteFragmentUpdate(
  frag: WorkspaceFragmentRegistry['static-website']
): Promise<WorkspaceFragmentRegistry['static-website']> {
  const {type, websiteName, domain} = frag;
  const {attribute} = await prompt({
    type: 'select',
    name: 'attribute',
    message: 'What do you want to update?',
    choices: [
      {title: `Domain name: ${domain ?? '<not set>'}`, value: 'domain'},
      {title: `I'm done`, value: I_AM_DONE},
    ],
  });

  if (attribute === undefined || attribute === I_AM_DONE) {
    return frag;
  }

  if (attribute === 'domain') {
    const domain = await askForDomainNameValue();
    return {type, websiteName, domain};
  }

  return frag;
}

async function askForStandaloneLambdaFragmentUpdate(
  frag: WorkspaceFragmentRegistry['standalone-lambda']
): Promise<WorkspaceFragmentRegistry['standalone-lambda']> {
  const {type, lambdaName, alarmEmail, cloudwatchTriggerMinutes} = frag;
  const {attribute} = await prompt({
    type: 'select',
    name: 'attribute',
    message: 'What do you want to update?',
    choices: [
      {title: `Alarm email: ${alarmEmail ?? '<not set>'}`, value: 'alarmEmail'},
      {
        title: `Cloudwatch trigger (in min): ${cloudwatchTriggerMinutes ?? '<not set>'}`,
        value: 'cloudwatchTriggerMinutes',
      },
      {title: `I'm done`, value: I_AM_DONE},
    ],
  });

  if (attribute === undefined || attribute === I_AM_DONE) {
    return frag;
  }

  if (attribute === 'alarmEmail') {
    const alarmEmail = await askForAlarmEmailValue();
    return {type, lambdaName, alarmEmail, cloudwatchTriggerMinutes};
  }

  if (attribute === 'cloudwatchTriggerMinutes') {
    const cloudwatchTriggerMinutes = await askForCloudwatchTriggerValue();
    return {type, lambdaName, alarmEmail, cloudwatchTriggerMinutes};
  }

  return frag;
}

async function askForApiLambdaFragmentUpdate(
  frag: WorkspaceFragmentRegistry['api-lambda']
): Promise<WorkspaceFragmentRegistry['api-lambda']> {
  const {type, apiName, alarmEmail, domain} = frag;
  const {attribute} = await prompt({
    type: 'select',
    name: 'attribute',
    message: 'What do you want to update?',
    choices: [
      {title: `Domain name: ${domain ?? '<not set>'}`, value: 'domain'},
      {title: `Alarm email: ${alarmEmail ?? '<not set>'}`, value: 'alarmEmail'},
      {title: `I'm done`, value: I_AM_DONE},
    ],
  });

  if (attribute === undefined || attribute === I_AM_DONE) {
    return frag;
  }

  if (attribute === 'domain') {
    const domain = await askForDomainNameValue();
    return {type, apiName, alarmEmail, domain};
  }

  if (attribute === 'alarmEmail') {
    const alarmEmail = await askForAlarmEmailValue();
    return {type, apiName, alarmEmail, domain};
  }

  return frag;
}

async function askForWebAppFragmentUpdate(
  frag: WorkspaceFragmentRegistry['web-app']
): Promise<WorkspaceFragmentRegistry['web-app']> {
  const {type, appName, alarmEmail, authentication, domain} = frag;
  const {attribute} = await prompt({
    type: 'select',
    name: 'attribute',
    message: 'What do you want to update?',
    choices: [
      {title: `Domain name: ${domain ?? '<not set>'}`, value: 'domain'},
      {title: `Alarm email: ${alarmEmail ?? '<not set>'}`, value: 'alarmEmail'},
      {title: `Authentication: ${authentication.enabled ? 'yes' : 'no'}`, value: 'authentication'},
      {title: `I'm done`, value: I_AM_DONE},
    ],
  });

  if (attribute === undefined || attribute === I_AM_DONE) {
    return frag;
  }

  if (attribute === 'domain') {
    const domain = await askForDomainNameValue();
    return {type, appName, alarmEmail, authentication, domain};
  }

  if (attribute === 'alarmEmail') {
    const alarmEmail = await askForAlarmEmailValue();
    return {type, appName, alarmEmail, authentication, domain};
  }

  if (attribute === 'authentication') {
    const authentication = await askForAuthentication();
    return {type, appName, alarmEmail, authentication, domain};
  }

  return frag;
}

async function askForNodeScriptFragmentUpdate(
  frag: WorkspaceFragmentRegistry['node-script']
): Promise<WorkspaceFragmentRegistry['node-script']> {
  // const {type, scriptName} = frag;
  const {attribute} = await prompt({
    type: 'select',
    name: 'attribute',
    message: 'What do you want to update?',
    choices: [{title: `I'm done`, value: I_AM_DONE}],
  });

  if (attribute === undefined || attribute === I_AM_DONE) {
    return frag;
  }

  return frag;
}

function workspaceFragmentString(frag: WorkspaceFragment): string {
  if (frag.type === WorkspaceFragmentType.Shared) {
    return 'shared';
  } else if (frag.type === WorkspaceFragmentType.SharedNode) {
    return 'shared-node';
  } else if (frag.type === WorkspaceFragmentType.SharedWeb) {
    return 'shared-web';
  } else if (frag.type === WorkspaceFragmentType.ApiLambda) {
    return `${frag.apiName} (lambda api)`;
  } else if (frag.type === WorkspaceFragmentType.NodeScript) {
    return `${frag.scriptName} (node script)`;
  } else if (frag.type === WorkspaceFragmentType.StandaloneLambda) {
    return `${frag.lambdaName} (lambda function)`;
  } else if (frag.type === WorkspaceFragmentType.StaticWebsite) {
    return `${frag.websiteName} (static website)`;
  }
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  else if (frag.type === WorkspaceFragmentType.WebApp) {
    return `${frag.appName} (web app)`;
  }
  neverHappens(frag);
}
