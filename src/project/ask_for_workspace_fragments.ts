import {prompt} from 'prompts';

import {WorkspaceFragment} from '@src/models';
import {askForNewTerraformEnv} from '@src/project/ask_for_new_terraform_env';
import {askForNewWorkspaceFragment} from '@src/project/ask_for_new_workspace_fragment';
import {askForTerraformEnvUpdate} from '@src/project/ask_for_terraform_env_update';
import {askForWorkspaceUpdate} from '@src/project/ask_for_workspace_update';
import {TerraformEnv} from '@src/project/vscode_workspace';

const I_AM_DONE = 'i_am_done';

export async function askForWorkspaceChanges(opts: {
  frags: WorkspaceFragment[];
  envs: Record<string, TerraformEnv>;
}): Promise<{frags: WorkspaceFragment[]; envs: Record<string, TerraformEnv>}> {
  const {frags, envs} = opts;
  const {action} = await prompt({
    type: 'select',
    name: 'action',
    message: 'What do you want to do',
    choices: [
      {title: `Add a project`, value: 'add-project'},
      {title: `Update a project`, value: 'update-project'},
      {title: `Add env`, value: 'add-env'},
      {title: `Update env`, value: 'update-env'},
      {title: `I'm done`, value: I_AM_DONE},
    ],
  });

  if (action === undefined || action === I_AM_DONE) {
    return {frags, envs};
  }

  if (action === 'add-project') {
    const newFrags = await askForNewWorkspaceFragment(frags);
    return await askForWorkspaceChanges({frags: newFrags, envs});
  }

  if (action === 'update-project') {
    const newFrags = await askForWorkspaceUpdate(frags);
    return await askForWorkspaceChanges({frags: newFrags, envs});
  }

  if (action === 'add-env') {
    const newEnvs = await askForNewTerraformEnv(envs);
    return await askForWorkspaceChanges({frags, envs: newEnvs});
  }

  if (action === 'update-env') {
    const newEnvs = await askForTerraformEnvUpdate(envs);
    return await askForWorkspaceChanges({frags, envs: newEnvs});
  }

  return {frags, envs};
}
