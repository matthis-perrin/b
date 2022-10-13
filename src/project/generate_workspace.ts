import {execSync} from 'node:child_process';
import {join} from 'node:path';

import {writeJsFile, writeJsonFile, writeRawFile} from '@src/fs';
import {
  ProjectName,
  ProjectType,
  WorkspaceFragment,
  WorkspaceFragmentType,
  WorkspaceName,
} from '@src/models';
import {generateBuildScript} from '@src/project/build_script';
import {generateDeployScript} from '@src/project/deploy_script';
import {generateProject} from '@src/project/generate_project';
import {generateGitIgnore} from '@src/project/gitignore';
import {generateWorkspacePackageJson} from '@src/project/package_json';
import {generateSetupScript} from '@src/project/setup_script';
import {
  generateCommonTerraform,
  generateWorkspaceProjectTerraform,
} from '@src/project/terraform/all';
import {generateCodeWorkspace} from '@src/project/vscode_workspace';
import {neverHappens} from '@src/type_utils';

export interface WorkspaceProject {
  projectName: ProjectName;
  type: ProjectType;
}

export function getProjectsFromWorkspaceFragment(fragment: WorkspaceFragment): WorkspaceProject[] {
  if (fragment.type === WorkspaceFragmentType.StaticWebsite) {
    return [
      {
        projectName: fragment.websiteName,
        type: ProjectType.Web,
      },
    ];
  } else if (fragment.type === WorkspaceFragmentType.StandaloneLambda) {
    return [
      {
        projectName: fragment.lambdaName,
        type: ProjectType.LambdaApi,
      },
    ];
  } else if (fragment.type === WorkspaceFragmentType.WebApp) {
    return [
      {
        projectName: fragment.websiteName,
        type: ProjectType.Web,
      },
      {
        projectName: fragment.lambdaName,
        type: ProjectType.LambdaApi,
      },
    ];
  } else if (fragment.type === WorkspaceFragmentType.NodeLib) {
    return [
      {
        projectName: fragment.libName,
        type: ProjectType.NodeLib,
      },
    ];
  } else if (fragment.type === WorkspaceFragmentType.NodeScript) {
    return [
      {
        projectName: fragment.scriptName,
        type: ProjectType.NodeScript,
      },
    ];
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  } else if (fragment.type === WorkspaceFragmentType.Shared) {
    return [
      {
        projectName: 'shared' as ProjectName,
        type: ProjectType.Shared,
      },
    ];
  }
  neverHappens(fragment, `Unknown ProjectType ${(fragment as WorkspaceFragment).type}`);
}

export async function generateWorkspace(
  dst: string,
  workspaceName: WorkspaceName,
  workspaceFragments: WorkspaceFragment[],
  alreadyGenerated: ProjectName[]
): Promise<void> {
  const projects = workspaceFragments.flatMap(getProjectsFromWorkspaceFragment);
  const projectNames = projects.map(p => p.projectName);

  // Create projects files from templates
  await Promise.all(
    projects
      .filter(p => !alreadyGenerated.includes(p.projectName))
      .map(async project => generateProject(join(dst, project.projectName), project))
  );

  // Generate workspace root files
  await Promise.all([
    // package.json
    await writeJsonFile(
      join(dst, 'package.json'),
      generateWorkspacePackageJson(workspaceName, projects)
    ),
    // .gitignore
    await writeRawFile(join(dst, '.gitignore'), generateGitIgnore()),
    // app.code-workspace
    await writeJsonFile(join(dst, 'app.code-workspace'), generateCodeWorkspace(workspaceFragments)),
    // setup.js
    await writeJsFile(join(dst, 'setup.js'), generateSetupScript(projectNames)),
    // deploy.js
    await writeJsFile(join(dst, 'deploy.js'), generateDeployScript(workspaceFragments)),
    // build.js
    await writeJsFile(join(dst, 'build.mjs'), generateBuildScript(workspaceFragments)),
  ]);

  // Terraform folder generation
  const terraformPath = join(dst, 'terraform');
  await Promise.all([
    writeRawFile(join(terraformPath, 'base.tf'), generateCommonTerraform(workspaceName, projects)),
    ...projects
      .filter(p => !alreadyGenerated.includes(p.projectName))
      .map(async p => {
        const content = generateWorkspaceProjectTerraform(p);
        if (content === undefined) {
          return;
        }
        const name = `${p.projectName}_terraform`;
        await writeRawFile(join(terraformPath, `${name}.tf`), content);
      }),
  ]);

  // Run setup.js
  console.log('Running post install script');
  const commands = [`cd ${dst}`, `node setup.js`];
  execSync(commands.join(' && '), {stdio: ['ignore', 'inherit', 'inherit']});
}
