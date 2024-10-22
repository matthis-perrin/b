import {prompt} from 'prompts';

import {
  askForTerraformAccountId,
  askForTerraformEnvIsDefault,
  askForTerraformEnvName,
  askForTerraformHostedZone,
} from '@src/project/ask_for_common';
import {TerraformEnv} from '@src/project/vscode_workspace';

const I_AM_DONE = 'i_am_done';

export async function askForTerraformEnvUpdate(
  envs: Record<string, TerraformEnv>
): Promise<Record<string, TerraformEnv>> {
  // Ask which project they want to update (get the index)
  const {envName} = await prompt({
    type: 'select',
    name: 'envName',
    message: 'Which env do you want to update',
    choices: [
      ...Object.keys(envs).map(name => ({value: name, title: name})),
      {title: `I'm done`, value: I_AM_DONE},
    ],
  });
  const env = envs[envName];
  if (!env) {
    return envs;
  }

  // Ask for the updates
  let hasChanged = true;
  let newEnvs = envs;
  while (hasChanged) {
    const nextNewEnvs = await askForWorkspaceEnvUpdate(envName as string, newEnvs);
    hasChanged = JSON.stringify(nextNewEnvs) !== JSON.stringify(newEnvs);
    newEnvs = nextNewEnvs;
  }

  // Update the envs
  return newEnvs;
}

async function askForWorkspaceEnvUpdate(
  envName: string,
  envs: Record<string, TerraformEnv>
): Promise<Record<string, TerraformEnv>> {
  const env = envs[envName];
  if (!env) {
    return envs;
  }
  const {accountId, hostedZone} = env;
  const defaultEnv = Object.entries(envs).find(([_, {isDefault}]) => isDefault)?.[0];
  const {attribute} = await prompt({
    type: 'select',
    name: 'attribute',
    message: 'What do you want to update?',
    choices: [
      {title: `Name of the env: ${envName}`, value: 'envName'},
      {title: `AWS account ID: ${accountId ?? '<not set>'}`, value: 'accountId'},
      {
        title: `Is it the default env?: default env is ${defaultEnv ?? 'not set'}`,
        value: 'isDefault',
      },
      {title: `Hosted zone: ${hostedZone}`, value: 'hostedZone'},
      {title: `I'm done`, value: I_AM_DONE},
    ],
  });

  if (attribute === undefined || attribute === I_AM_DONE) {
    return envs;
  }

  if (attribute === 'envName') {
    const newEnvName = (await askForTerraformEnvName()) ?? envName;
    return Object.fromEntries([
      ...Object.entries(envs).filter(([name]) => name !== envName),
      [newEnvName, env],
    ]);
  }

  if (attribute === 'accountId') {
    const accountId = await askForTerraformAccountId();
    return {...envs, [envName]: {...env, accountId}};
  }

  if (attribute === 'isDefault') {
    const isDefault = await askForTerraformEnvIsDefault();
    return {...envs, [envName]: {...env, isDefault}};
  }

  if (attribute === 'hostedZone') {
    const hostedZone = await askForTerraformHostedZone();
    return {...envs, [envName]: {...env, hostedZone}};
  }

  return envs;
}
