import {execSync} from 'node:child_process';
import {join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';

import {listFiles, prettyJs, prettyJson, readFile, writeRawFile} from '@src/fs';
import {md5} from '@src/hash';
import {log} from '@src/logger';
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
import {
  FileHash,
  generateCodeWorkspace,
  Workspace,
  writeWorkspace,
} from '@src/project/vscode_workspace';
import {neverHappens, removeUndefined} from '@src/type_utils';
import {PACKAGE_VERSIONS} from '@src/versions';

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
  workspace: Workspace | undefined
): Promise<void> {
  const projects = workspaceFragments.flatMap(f =>
    getProjectsFromWorkspaceFragment(f, workspaceFragments)
  );

  // Create projects files from templates
  const projectFiles = await Promise.all(
    projects.map(async project => generateProject(dst, project, workspace))
  );

  // Generate workspace root files
  const SCRIPTS_PATH = join(fileURLToPath(import.meta.url), '../scripts');
  const writeFile = async (path: string, file: string): Promise<FileHash> =>
    writeWorkspaceFile(workspace, dst, path, file);
  const workspaceFiles = await Promise.all([
    // package.json
    writeFile(
      'package.json',
      await prettyJson(generateWorkspacePackageJson(workspaceName, projects))
    ),
    // app.code-workspace
    writeFile(
      'app.code-workspace',
      await prettyJson(generateCodeWorkspace(workspaceName, workspaceFragments))
    ),
    // .gitignore
    writeFile('.gitignore', generateGitIgnore()),
    // setup.js
    writeFile('setup.js', await prettyJs(await readFile(join(SCRIPTS_PATH, 'setup.js')))),
    // deploy.js
    writeFile('deploy.js', await prettyJs(await readFile(join(SCRIPTS_PATH, 'deploy.js')))),
    // build.js
    writeFile('build.js', await prettyJs(await readFile(join(SCRIPTS_PATH, 'build.js')))),
  ]);

  // Vscode folder
  const vscodePath = join(TEMPLATES_PATH, '.vscode');
  const vscodeFileList = await listFiles(vscodePath);
  const vscodeFiles = await Promise.all(
    vscodeFileList.map(async file => {
      const relativePath = relative(vscodePath, file);
      const dstPath = join('.vscode', relativePath);
      const content = await readFile(file);
      return writeFile(dstPath, content);
    })
  );

  // Terraform folder generation
  const terraformFiles = await Promise.all([
    writeFile(join('terraform', '.aws-credentials'), generateDummyTerraformCredentials()),
    writeFile(join('terraform', 'dynamo_table_dummy.tf'), generateDynamoTerraform()),
    writeFile(join('terraform', 'base.tf'), generateCommonTerraform(workspaceName, projects)),
    ...projects.map(async p => {
      const content = generateWorkspaceProjectTerraform(workspaceName, p);
      if (content === undefined) {
        return;
      }
      const name = `${p.projectName}_terraform`;
      return writeFile(join('terraform', `${name}.tf`), content);
    }),
  ]);

  await writeWorkspace(dst, {
    files: removeUndefined([
      ...projectFiles.flat(),
      ...workspaceFiles,
      ...terraformFiles,
      ...vscodeFiles,
    ]),
    fragments: workspaceFragments,
    version: PACKAGE_VERSIONS.project,
  });

  // Run setup.js
  log('Running post install script');
  const commands = [`cd ${dst}`, `node setup.js`, `git init`];
  execSync(commands.join(' && '), {stdio: ['ignore', 'inherit', 'inherit']});

  // Final instructions
  log(`Run the following to get started:`);
  log(`cd ${relative(process.cwd(), dst)}; code app.code-workspace; yarn watch`);
}

export async function writeWorkspaceFile(
  workspace: Workspace | undefined,
  root: string,
  path: string,
  file: string
): Promise<FileHash> {
  const newHash = md5(file);
  const oldHash = workspace?.files.find(f => f.path === path)?.hash;
  // Only write the file if it is different since last time we've generated the project.
  // Prevent needlessly overwriting changes made in the project in between.
  if (newHash !== oldHash) {
    await writeRawFile(join(root, path), file);
  }
  return {path, hash: newHash};
}
