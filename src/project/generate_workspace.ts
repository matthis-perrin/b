import {execSync} from 'child_process';
import {join} from 'path';
import {writeJsFile, writeJsonFile, writeRawFile} from '../fs';
import {
  WorkspaceName,
  WorkspaceFragment,
  ProjectName,
  WorkspaceFragmentType,
  ProjectType,
} from '../models';
import {generateCodeWorkspace} from './vscode_workspace';
import {generateProject} from './generate_project';
import {generateGitIgnore} from './gitignore';
import {generateWorkspacePackageJson} from './package_json';
import {generateSetupScript} from './setup_script';
import {generateDeployScript} from './deploy_script';
import {generateCommonTerraform, generateWorkspaceProjectTerraform} from './terraform/all';
import {neverHappens} from '../type_utils';

export interface WorkspaceProject {
  projectName: ProjectName;
  type: ProjectType;
}

export function getProjectsFromWorkspaceFragment(fragment: WorkspaceFragment): WorkspaceProject[] {
  const {type} = fragment;
  if (type === WorkspaceFragmentType.StaticWebsite) {
    return [
      {
        projectName: fragment.websiteName,
        type: ProjectType.Web,
      },
    ];
  } else if (type === WorkspaceFragmentType.StandaloneLambda) {
    return [
      {
        projectName: fragment.lambdaName,
        type: ProjectType.LambdaApi,
      },
    ];
  } else if (type === WorkspaceFragmentType.WebApp) {
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
  } else {
    neverHappens(type, 'ProjectType');
  }
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
      .map(project => generateProject(join(dst, project.projectName), project))
  );

  // package.json
  await writeJsonFile(join(dst, 'package.json'), generateWorkspacePackageJson(workspaceName));

  // .gitignore
  await writeRawFile(join(dst, '.gitignore'), generateGitIgnore());

  // app.code-workspace
  await writeJsonFile(join(dst, 'app.code-workspace'), generateCodeWorkspace(workspaceFragments));

  // setup.js
  await writeJsFile(join(dst, 'setup.js'), generateSetupScript(projectNames));

  // deploy.js
  await writeJsFile(join(dst, 'deploy.js'), generateDeployScript(workspaceFragments));

  // Terraform folder generation
  const terraformPath = join(dst, 'terraform');
  writeRawFile(join(terraformPath, 'base.tf'), generateCommonTerraform(workspaceName, projects));
  await Promise.all(
    projects
      .filter(p => !alreadyGenerated.includes(p.projectName))
      .map(async p => {
        const content = generateWorkspaceProjectTerraform(p);
        const name = `${p.projectName}_terraform`;
        await writeRawFile(join(terraformPath, `${name}.tf`), content);
      })
  );

  // Run setup.js
  console.log('Running post install script');
  const commands = [`cd ${dst}`, `node setup.js`];
  execSync(commands.join(' && '), {stdio: ['ignore', 'inherit', 'inherit']});
}
