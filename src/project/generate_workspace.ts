import {execSync} from 'node:child_process';
import {cp} from 'node:fs/promises';
import {join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';

import {writeJsonFile, writeRawFile, writeRawFileIfNotExists} from '@src/fs';
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
  generateDummyTerraformCredentials,
  generateWorkspaceProjectTerraform,
} from '@src/project/terraform/all';
import {generateDynamoTerraform} from '@src/project/terraform/dynamo';
import {generateCodeWorkspace} from '@src/project/vscode_workspace';
import {neverHappens, removeUndefined} from '@src/type_utils';

const TEMPLATES_PATH = join(fileURLToPath(import.meta.url), '../templates');

export interface WorkspaceProject {
  projectName: ProjectName;
  type: ProjectType;
  vars: Record<string, string>;
}

export function getProjectsFromWorkspaceFragment(
  fragment: WorkspaceFragment,
  allFragments: WorkspaceFragment[]
): WorkspaceProject[] {
  if (fragment.type === WorkspaceFragmentType.StaticWebsite) {
    return [
      {
        projectName: fragment.websiteName,
        type: ProjectType.Web,
        vars: {
          __PROJECT_NAME__: fragment.websiteName,
        },
      },
    ];
  } else if (fragment.type === WorkspaceFragmentType.StandaloneLambda) {
    return [
      {
        projectName: fragment.lambdaName,
        type: ProjectType.LambdaFunction,
        vars: {
          __PROJECT_NAME__: fragment.lambdaName,
        },
      },
    ];
  } else if (fragment.type === WorkspaceFragmentType.ApiLambda) {
    return [
      {
        projectName: fragment.lambdaName,
        type: ProjectType.LambdaApi,
        vars: {
          __PROJECT_NAME__: fragment.lambdaName,
          __BACKEND_NAME__: fragment.lambdaName,
          __BACKEND_NAME_UPPERCASE__: fragment.lambdaName.toUpperCase(),
        },
      },
    ];
  } else if (fragment.type === WorkspaceFragmentType.WebApp) {
    return [
      {
        projectName: fragment.websiteName,
        type: ProjectType.Web,
        vars: {
          __PROJECT_NAME__: fragment.websiteName,
          __BACKEND_NAME__: fragment.lambdaName,
          __BACKEND_NAME_UPPERCASE__: fragment.lambdaName.toUpperCase(),
        },
      },
      {
        projectName: fragment.lambdaName,
        type: ProjectType.LambdaWebApi,
        vars: {
          __PROJECT_NAME__: fragment.lambdaName,
          __FRONTEND_NAME__: fragment.websiteName,
          __FRONTEND_NAME_UPPERCASE__: fragment.websiteName.toUpperCase(),
        },
      },
    ];
  } else if (fragment.type === WorkspaceFragmentType.NodeScript) {
    return [
      {
        projectName: fragment.scriptName,
        type: ProjectType.NodeScript,
        vars: {
          __PROJECT_NAME__: fragment.scriptName,
        },
      },
    ];
  } else if (fragment.type === WorkspaceFragmentType.SharedNode) {
    const projectName = 'shared-node' as ProjectName;
    return [
      {
        projectName,
        type: ProjectType.SharedNode,
        vars: {
          __PROJECT_NAME__: projectName,
        },
      },
    ];
  } else if (fragment.type === WorkspaceFragmentType.SharedWeb) {
    const projectName = 'shared-web' as ProjectName;
    return [
      {
        projectName,
        type: ProjectType.SharedWeb,
        vars: {
          __PROJECT_NAME__: projectName,
        },
      },
    ];
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  } else if (fragment.type === WorkspaceFragmentType.Shared) {
    const projectName = 'shared' as ProjectName;
    const otherVars: Record<string, string> = {};
    const [bestBackend] = removeUndefined(
      allFragments.map(frag => {
        if (frag.type === WorkspaceFragmentType.WebApp) {
          return {name: frag.lambdaName, prio: 1};
        } else if (frag.type === WorkspaceFragmentType.ApiLambda) {
          return {name: frag.lambdaName, prio: 2};
        }
        return undefined;
      })
    ).sort((a, b) => a.prio - b.prio);
    if (bestBackend) {
      otherVars['__BACKEND_NAME__'] = bestBackend.name;
      otherVars['__BACKEND_NAME_UPPERCASE__'] = bestBackend.name.toUpperCase();
    }
    return [
      {
        projectName,
        type: ProjectType.Shared,
        vars: {
          __PROJECT_NAME__: projectName,
          ...otherVars,
        },
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
  const projects = workspaceFragments.flatMap(f =>
    getProjectsFromWorkspaceFragment(f, workspaceFragments)
  );

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
    await writeJsonFile(
      join(dst, 'app.code-workspace'),
      generateCodeWorkspace(workspaceName, workspaceFragments)
    ),
    // vscode folder
    await cp(join(TEMPLATES_PATH, '.vscode'), join(dst, '.vscode'), {recursive: true, force: true}),
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
    writeRawFileIfNotExists(
      join(terraformPath, '.aws-credentials'),
      generateDummyTerraformCredentials()
    ),
    writeRawFileIfNotExists(
      join(terraformPath, 'dynamo_table_dummy.tf'),
      generateDynamoTerraform()
    ),
    writeRawFileIfNotExists(
      join(terraformPath, 'base.tf'),
      generateCommonTerraform(workspaceName, projects)
    ),
    ...projects.map(async p => {
      const content = generateWorkspaceProjectTerraform(workspaceName, p);
      if (content === undefined) {
        return;
      }
      const name = `${p.projectName}_terraform`;
      await writeRawFileIfNotExists(join(terraformPath, `${name}.tf`), content);
    }),
  ]);

  // Run setup.js
  console.log('Running post install script');
  const commands = [`cd ${dst}`, `node setup.js`, `git init`];
  execSync(commands.join(' && '), {stdio: ['ignore', 'inherit', 'inherit']});

  // Final instructions
  console.log(`Run the following to get started:`);
  console.log(`cd ${relative(process.cwd(), dst)}; code app.code-workspace; yarn watch`);
}
