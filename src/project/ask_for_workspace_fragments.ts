import {prompt} from 'prompts';

import {WorkspaceFragment} from '@src/models';
import {askForNewWorkspaceFragment} from '@src/project/ask_for_new_workspace_fragment';
import {askForWorkspaceUpdate} from '@src/project/ask_for_workspace_update';

const I_AM_DONE = 'i_am_done';

export async function askForWorkspaceFragments(
  frags: WorkspaceFragment[]
): Promise<WorkspaceFragment[]> {
  const {action} = await prompt({
    type: 'select',
    name: 'action',
    message: 'What do you want to do',
    choices: [
      {title: `Add a project`, value: 'add'},
      {title: `Update a project`, value: 'update'},
      {title: `I'm done`, value: I_AM_DONE},
    ],
  });

  if (action === undefined || action === I_AM_DONE) {
    return frags;
  }

  if (action === 'add') {
    const newFrags = await askForNewWorkspaceFragment(frags);
    return await askForWorkspaceFragments(newFrags);
  }

  if (action === 'update') {
    const newFrags = await askForWorkspaceUpdate(frags);
    return await askForWorkspaceFragments(newFrags);
  }

  return frags;
}
