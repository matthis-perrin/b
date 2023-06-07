import {execSync} from 'node:child_process';
import {cp} from 'node:fs/promises';
import {join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

import {writeJsonFile, writeRawFile} from '@src/fs';
import {
  ProjectName,
  ProjectType,
  WorkspaceFragment,
  WorkspaceFragmentType,
  WorkspaceName,
} from '@src/models';
import {generateProject} from '@src/project/generate_project';
import {generateGitIgnore} from '@src/project/gitignore';
import {generateWorkspacePackageJson} from '@src/project/package_json';
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
        type: ProjectType.LambdaFunction,
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

  // Create projects files from templates
  await Promise.all(
    projects
      .filter(p => !alreadyGenerated.includes(p.projectName))
      .map(async project => generateProject(join(dst, project.projectName), project))
  );

  // Generate workspace root files
  const SCRIPTS_PATH = join(fileURLToPath(import.meta.url), '../scripts');
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
    await cp(join(SCRIPTS_PATH, 'setup.js'), join(dst, 'setup.js')),
    // deploy.js
    await cp(join(SCRIPTS_PATH, 'deploy.js'), join(dst, 'deploy.js')),
    // build.js
    await cp(join(SCRIPTS_PATH, 'build.js'), join(dst, 'build.js')),
  ]);

  // Terraform folder generation
  const terraformPath = join(dst, 'terraform');
  await Promise.all([
    writeRawFile(join(terraformPath, 'base.tf'), generateCommonTerraform(workspaceName, projects)),
    ...projects.map(async p => {
      const content = generateWorkspaceProjectTerraform(workspaceName, p);
      if (content === undefined) {
        return;
      }
      const name = `${p.projectName}_terraform`;
      await writeRawFile(join(terraformPath, `${name}.tf`), content);
    }),
  ]);

  // Run setup.js
  console.log('Running post install script');
  const commands = [`cd ${dst}`, `node setup.js`, `git init`];
  execSync(commands.join(' && '), {stdio: ['ignore', 'inherit', 'inherit']});
}
