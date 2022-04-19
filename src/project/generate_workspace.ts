import {execSync} from 'child_process';
import {join, dirname} from 'path';
import {mkdir, writeFile, writeJsFile, writeJsonFile} from '../fs';
import {WorkspaceType, ProjectType} from '../models';
import {generateCodeWorkspace} from './vscode_workspace';
import {generateWebAppDeployScript} from './deploy_script';
import {generateProject} from './generate_project';
import {generateGitIgnore} from './gitignore';
import {generateWorkspacePackageJson} from './package_json';
import {generateSetupScript} from './setup_script';
import {generateTerraformForWorkspace} from './terraform/all';

interface WorkspaceProject {
  type: ProjectType;
  name: string;
}

export async function generateWorkspace(
  dst: string,
  workspaceName: string,
  type: WorkspaceType,
  projects: WorkspaceProject[]
): Promise<void> {
  const projectNames = projects.map(p => p.name);

  // Create projects files from templates
  await Promise.all(
    projects.map(project =>
      generateProject(join(dst, project.name), `${workspaceName}-${project.name}`, project.type)
    )
  );

  // package.json
  await writeJsonFile(join(dst, 'package.json'), generateWorkspacePackageJson(workspaceName));

  // .gitignore
  await writeFile(join(dst, '.gitignore'), generateGitIgnore());

  // app.code-workspace
  await writeJsonFile(join(dst, 'app.code-workspace'), generateCodeWorkspace(projectNames));

  // setup.js
  await writeJsFile(join(dst, 'setup.js'), generateSetupScript(projectNames));

  // deploy.js
  if (type === WorkspaceType.WebApp) {
    await writeJsFile(join(dst, 'deploy.js'), generateWebAppDeployScript());
  }

  // Terraform folder generation
  const terraformPath = join(dst, 'terraform');
  await mkdir(terraformPath, {recursive: true});
  const terraformFiles = generateTerraformForWorkspace(workspaceName, type);
  await Promise.all(terraformFiles.map(f => writeFile(join(terraformPath, f.fileName), f.content)));

  // Run setup.js
  console.log('Running post install script');
  const commands = [`cd ${dst}`, `node setup.js`];
  execSync(commands.join(' && '), {stdio: ['ignore', 'inherit', 'inherit']});
}
