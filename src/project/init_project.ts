import {mkdir} from 'node:fs/promises';
import {join} from 'node:path';

import {error} from '@src/logger';
import {
  WorkspaceFragment,
  WorkspaceFragmentRegistry,
  WorkspaceFragmentType,
  WorkspaceName,
} from '@src/models';
import {askForWorkspaceName, askForWorkspaceRegion} from '@src/project/ask_for_common';
import {askForWorkspaceChanges} from '@src/project/ask_for_workspace_fragments';
import {generateWorkspace} from '@src/project/generate_workspace';
import {readWorkspace, WorkspaceOptions} from '@src/project/vscode_workspace';
import {neverHappens} from '@src/type_utils';

async function initProject(): Promise<void> {
  let workspaceName: WorkspaceName;
  let workspacePath = process.cwd();
  let frags: WorkspaceFragment[] = [];
  let workspaceOptions: WorkspaceOptions;

  // Check if we are already in a workspace, otherwise ask for the workspace name
  const previousWorkspace = await readWorkspace(workspacePath);
  const newProject = previousWorkspace === undefined;

  if (newProject) {
    console.log('----------------------------------');
    console.log('Ready to create a new workspace.');
    console.log(`A new directory ${workspacePath}/<workspace-name> will be created`);
    console.log('----------------------------------');
    workspaceName = await askForWorkspaceName();
    workspacePath = join(workspacePath, workspaceName);
    workspaceOptions = {workspaceName, region: await askForWorkspaceRegion(), envs: {}};
    await mkdir(workspacePath);
  } else {
    workspaceName = previousWorkspace.options.workspaceName;
    console.log('----------------------------------');
    console.log(`Existing project "${workspaceName}" detected.`);
    console.log(`We can update it if you'd like.`);
    console.log('----------------------------------');
    workspaceOptions = previousWorkspace.options;
    frags = removeBaseFragments(previousWorkspace.fragments);
  }

  // Ask for changes on the workspace
  while (true) {
    try {
      const res = await askForWorkspaceChanges({frags, envs: workspaceOptions.envs});
      frags = res.frags;
      workspaceOptions.envs = res.envs;
      break;
    } catch (err: unknown) {
      error(String(err));
    }
  }

  // Build summary of workspace
  const workspaceSummary = frags.map(f => fragmentDescription(f)).join('\n');
  const workspaceOptionsSumary = Object.entries(workspaceOptions.envs)
    .sort(([e1], [e2]) => e1.localeCompare(e2))
    .map(([name, env]) => {
      const extraInfo: string[] = [];
      if (env.accountId !== undefined) {
        extraInfo.push(`AWS account ${env.accountId}`);
      }
      if (env.hostedZone !== undefined) {
        extraInfo.push(`Hosted zone ${env.hostedZone}`);
      }
      let extraString = extraInfo.join(', ');
      if (env.isDefault) {
        extraString += ' (default)';
      }
      if (extraString.length > 0) {
        extraString = `: ${extraString}`;
      }
      return `- ${name}${extraString}`;
    })
    .join('\n');

  // Print Recap
  if (newProject) {
    console.log('----------------------------------');
    console.log(`Project "${workspaceName}" created`);
    console.log(workspaceSummary);
    console.log('----------------------------------');
    console.log(`Terraform prepared in region ${workspaceOptions.region}`);
    console.log(workspaceOptionsSumary);
    console.log('----------------------------------');
  } else {
    console.log('----------------------------------');
    console.log(`Project "${workspaceName}" updated`);
    console.log(workspaceSummary);
    console.log('----------------------------------');
    console.log(`Terraform prepared in region ${workspaceOptions.region}`);
    console.log(workspaceOptionsSumary);
    console.log('----------------------------------');
  }

  // Generate/update the project
  await generateWorkspace(
    workspacePath,
    refreshBaseFragments(frags),
    workspaceOptions,
    previousWorkspace
  );

  // Final instructions
  if (newProject) {
    console.log('----------------------------------');
    console.log(`Next steps:`);
    console.log(`- Ensure you AWS credentials are up to date and for the correct account`);
    console.log(
      `- Initialize the infrastructure: cd ${join(workspaceName, 'terraform')}; terraform init; terraform apply`
    );
    console.log(`- Start the project: cd ..; code app.code-workspace; yarn watch`);
    console.log('----------------------------------');
  } else {
    console.log('----------------------------------');
    console.log(`Next steps:`);
    console.log(`- Review the changes made by the update and run \`terraform apply\` if needed`);
    console.log(`- Start the project: code app.code-workspace; yarn watch`);
    console.log('----------------------------------');
  }
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

function fragmentDescription(frag: WorkspaceFragment): string {
  if (frag.type === WorkspaceFragmentType.Shared) {
    return 'shared';
  } else if (frag.type === WorkspaceFragmentType.SharedNode) {
    return 'shared-node';
  } else if (frag.type === WorkspaceFragmentType.SharedWeb) {
    return 'shared-web';
  } else if (frag.type === WorkspaceFragmentType.ApiLambda) {
    const alarm = frag.alarmEmail === undefined ? '' : `, errors alarm sent to ${frag.alarmEmail}`;
    return `${frag.apiName}: lambda API, subdomain: "${frag.subDomain}"${alarm}`;
  } else if (frag.type === WorkspaceFragmentType.NodeScript) {
    return `${frag.scriptName}: node script`;
  } else if (frag.type === WorkspaceFragmentType.StandaloneLambda) {
    const alarm = frag.alarmEmail === undefined ? '' : `, errors alarm sent to ${frag.alarmEmail}`;
    const plural = frag.cloudwatchTriggerMinutes === 1 ? '' : 's';
    const trigger =
      frag.cloudwatchTriggerMinutes === undefined
        ? ''
        : ` triggered every ${frag.cloudwatchTriggerMinutes} minute${plural}`;
    return `${frag.lambdaName}: standalone lambda${trigger}${alarm}`;
  } else if (frag.type === WorkspaceFragmentType.StaticWebsite) {
    return `${frag.websiteName}: static website, subdomain: "${frag.subDomain}"`;
  }
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  else if (frag.type === WorkspaceFragmentType.WebApp) {
    const alarm =
      frag.alarmEmail === undefined ? '' : `, backend errors alarm sent to ${frag.alarmEmail})`;
    const authentication = frag.authentication.enabled ? `, auth enabled` : '';
    return `${frag.appName}: webapp, subdomain: ${frag.subDomain}${authentication}${alarm}`;
  }
  neverHappens(frag);
}

initProject().catch(error);
