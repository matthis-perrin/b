import {prompt} from 'prompts';

import {ProjectName, WebAppAuthentication} from '@src/models';
import {DEFAULT_REGION} from '@src/project/generate_workspace';
import {asStringOrThrow} from '@src/type_utils';

//
// WORKSPACE NAME
//

export async function askForWorkspaceName(): Promise<string> {
  const {workspaceName} = await prompt({
    type: 'text',
    name: 'workspaceName',
    message: 'Workspace name',
    validate: (v: string) => v.length > 0,
  });
  return asStringOrThrow(workspaceName);
}

//
// WORKSPACE REGION
//

export async function askForWorkspaceRegion(): Promise<string> {
  const {workspaceRegion} = await prompt({
    type: 'text',
    name: 'workspaceRegion',
    message: 'AWS Region',
    initial: DEFAULT_REGION,
    validate: (v: string) => v.length > 0,
  });
  return asStringOrThrow(workspaceRegion);
}

//
// PROJECT NAME
//

const VALID_PROJECT_NAME = /^[a-zA-Z0-9_]+$/u;

export async function askForProjectName(
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

//
// ALARM EMAIL
//

export async function askForAlarmEmail(defaultVal: boolean): Promise<string | undefined> {
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
  });
  if (typeof email.value !== 'string') {
    return undefined;
  }
  return email.value;
}

export async function askForAlarmEmailValue(): Promise<string | undefined> {
  const email = await prompt({
    type: 'text',
    name: 'value',
    message: 'Enter the email the alarm will be sent to (leave empty for no alarm).',
  });
  if (typeof email.value !== 'string') {
    return undefined;
  }
  return email.value;
}

//
// DOMAIN NAME
//

export async function askForDomainName(): Promise<string | undefined> {
  const useDomain = await prompt({
    type: 'confirm',
    name: 'value',
    message: 'Use a custom domain?',
  });
  if (useDomain.value !== true) {
    return undefined;
  }
  return await askForDomainNameValue();
}

export async function askForDomainNameValue(): Promise<string | undefined> {
  const domain = await prompt({
    type: 'text',
    name: 'value',
    message: 'Enter the domain name (leave empty for no domain).',
  });
  if (typeof domain.value !== 'string' || domain.value.length === 0) {
    return undefined;
  }
  return domain.value;
}

//
// AUTHENTICATION
//

export async function askForAuthentication(): Promise<WebAppAuthentication> {
  const authenticationEnabled = await prompt({
    type: 'confirm',
    name: 'value',
    message: 'Use authentication?',
  });
  return {enabled: authenticationEnabled.value === true};
}

//
// CLOUDWATCH TRIGGER
//

export async function askForCloudwatchTrigger(): Promise<number | undefined> {
  const trigger = await prompt({
    type: 'confirm',
    name: 'value',
    message: 'Add a Cloudwatch trigger?',
    initial: true,
  });
  if (trigger.value !== true) {
    return undefined;
  }
  return await askForCloudwatchTriggerValue();
}

export async function askForCloudwatchTriggerValue(): Promise<number | undefined> {
  const minutes = await prompt({
    type: 'text',
    name: 'value',
    message: 'Enter the trigger period in minutes (leave empty for no trigger)',
    initial: 1,
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const minutesValue = parseFloat(minutes.value);
  if (Number.isNaN(minutesValue) || minutesValue <= 0) {
    return undefined;
  }
  return minutesValue;
}
