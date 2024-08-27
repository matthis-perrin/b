import {mkdir} from 'node:fs/promises';
import {basename, join} from 'node:path';

import {rmDir} from '@src/fs';
import {error, log} from '@src/logger';
import {
  WorkspaceFragment,
  WorkspaceFragmentRegistry,
  WorkspaceFragmentType,
  WorkspaceName,
} from '@src/models';
import {askForWorkspaceName} from '@src/project/ask_for_common';
import {askForWorkspaceFragments} from '@src/project/ask_for_workspace_fragments';
import {generateWorkspace} from '@src/project/generate_workspace';
import {readWorkspace} from '@src/project/vscode_workspace';
import {neverHappens} from '@src/type_utils';

async function initProject(): Promise<void> {
  let workspaceName: string;
  let workspacePath = process.cwd();
  let frags: WorkspaceFragment[] = [];

  // Check if we are already in a workspace, otherwise ask for the workspace name
  const workspace = await readWorkspace(workspacePath);
  if (workspace !== undefined) {
    workspaceName = basename(workspacePath);
    frags = removeBaseFragments(workspace.fragments);
  } else {
    workspaceName = await askForWorkspaceName();
    workspacePath = join(workspacePath, workspaceName);
    await mkdir(workspacePath);
  }

  // Ask for changes on the workspace
  while (true) {
    try {
      frags = await askForWorkspaceFragments(frags);
      break;
    } catch (err: unknown) {
      error(String(err));
    }
  }

  const name = workspaceName as WorkspaceName;
  await generateWorkspace(workspacePath, name, refreshBaseFragments(frags), workspace);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function cancel(workspacePath?: string): Promise<never> {
  log('Cancelling...');
  if (workspacePath !== undefined) {
    await rmDir(workspacePath);
  }
  // eslint-disable-next-line n/no-process-exit
  process.exit(0);
}

type BaseFragment =
  | WorkspaceFragmentRegistry['shared']
  | WorkspaceFragmentRegistry['shared-node']
  | WorkspaceFragmentRegistry['shared-web'];
type NonBaseFragment = Exclude<WorkspaceFragment, BaseFragment>;

function removeBaseFragments(frags: WorkspaceFragment[]): NonBaseFragment[] {
  return frags.filter(
    frag =>
      ![
        WorkspaceFragmentType.Shared,
        WorkspaceFragmentType.SharedNode,
        WorkspaceFragmentType.SharedWeb,
      ].includes(frag.type)
  ) as NonBaseFragment[];
}

function refreshBaseFragments(frags: WorkspaceFragment[]): WorkspaceFragment[] {
  // Remove base fragments
  const newFrags: WorkspaceFragment[] = removeBaseFragments(frags);

  // Analyze what type of base fragments we need
  let needSharedWeb = false;
  let needSharedNode = false;
  for (const frag of frags) {
    if (
      frag.type === WorkspaceFragmentType.Shared ||
      frag.type === WorkspaceFragmentType.SharedNode ||
      frag.type === WorkspaceFragmentType.SharedWeb
    ) {
      // should never happen
    } else if (
      frag.type === WorkspaceFragmentType.ApiLambda ||
      frag.type === WorkspaceFragmentType.NodeScript ||
      frag.type === WorkspaceFragmentType.StandaloneLambda
    ) {
      needSharedNode = true;
    } else if (frag.type === WorkspaceFragmentType.WebApp) {
      needSharedNode = true;
      needSharedWeb = true;
    }
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    else if (frag.type === WorkspaceFragmentType.StaticWebsite) {
      needSharedWeb = true;
    } else {
      neverHappens(frag);
    }
  }

  // Add the necessary fragments
  newFrags.push({type: WorkspaceFragmentType.Shared});
  if (needSharedNode) {
    newFrags.push({type: WorkspaceFragmentType.SharedNode});
  }
  if (needSharedWeb) {
    newFrags.push({type: WorkspaceFragmentType.SharedWeb});
  }
  return newFrags;
}

initProject().catch(error);
