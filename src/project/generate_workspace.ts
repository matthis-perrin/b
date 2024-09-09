import {execSync} from 'node:child_process';
import {join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';

import {splitLast} from '@src/array_utils';
import {listFiles, prettyJs, prettyJson, prettyJsonc, readFile, writeRawFile} from '@src/fs';
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
  AppDomain,
  generateCommonTerraform,
  generateWorkspaceProjectTerraform,
} from '@src/project/terraform/all';
import {generateDynamoUserTerraform} from '@src/project/terraform/dynamo_user';
import {generateDynamoUserSessionTerraform} from '@src/project/terraform/dynamo_user_session';
import {WorkspaceProjectTerraformFrontend} from '@src/project/terraform/frontend';
import {WorkspaceProjectTerraformLambda} from '@src/project/terraform/lambda';
import {
  FileHash,
  generateCodeWorkspace,
  Workspace,
  writeWorkspace,
} from '@src/project/vscode_workspace';
import {lowerCase, pascalCase} from '@src/string_utils';
import {neverHappens, removeUndefined} from '@src/type_utils';
import {PACKAGE_VERSIONS} from '@src/versions';

const TEMPLATES_PATH = join(fileURLToPath(import.meta.url), '../templates');

type Flag = Record<string, string>;
const booleanFlag = (bool: boolean): string => (bool ? 'true' : 'false');

export function hasApi(allFragments: WorkspaceFragment[]): boolean {
  return (
    allFragments.find(
      f => f.type === WorkspaceFragmentType.ApiLambda || f.type === WorkspaceFragmentType.WebApp
    ) !== undefined
  );
}

export type WorkspaceProjectTerraform =
  | WorkspaceProjectTerraformLambda
  | WorkspaceProjectTerraformFrontend
  | {type: 'no-terraform'};

export interface WorkspaceProject {
  projectName: ProjectName;
  type: ProjectType;
  fromFragment: WorkspaceFragment;
  vars: Record<string, string>;
  flags: (allFragments: WorkspaceFragment[]) => Flag;
  terraform: WorkspaceProjectTerraform;
}

function fragmentFlags(baseFlags: Flag): (allFragments: WorkspaceFragment[]) => Flag {
  return (allFragments: WorkspaceFragment[]): Flag => {
    const workspaceFlags: Flag = {
      HAS_API: booleanFlag(hasApi(allFragments)),
    };
    return {...workspaceFlags, ...baseFlags};
  };
}

// Parse a string into its domain/subdomain.
// We assume the root domain (the hosted zone registered in AWS)
// is the in form of <second-level-domain>.<first-level-domain> (eg: "matthis.link")
function parseDomain(domainStr?: string): AppDomain | undefined {
  if (domainStr === undefined) {
    return undefined;
  }
  const [subDomain = '', ...rest] = splitLast(domainStr, '.');
  const rootDomain = rest.join('.');
  return {subDomain, rootDomain};
}

export function getProjectsFromWorkspaceFragment(fragment: WorkspaceFragment): WorkspaceProject[] {
  if (fragment.type === WorkspaceFragmentType.StaticWebsite) {
    return [
      {
        projectName: fragment.websiteName,
        type: ProjectType.Web,
        fromFragment: fragment,
        vars: {
          __PROJECT_NAME__: fragment.websiteName,
          __APP_NAME__: fragment.websiteName,
        },
        flags: fragmentFlags({}),
        terraform: {
          type: 'frontend',
          domain: parseDomain(fragment.domain),
        },
      },
    ];
  } else if (fragment.type === WorkspaceFragmentType.StandaloneLambda) {
    return [
      {
        projectName: fragment.lambdaName,
        type: ProjectType.LambdaFunction,
        fromFragment: fragment,
        vars: {
          __PROJECT_NAME__: fragment.lambdaName,
          __PROJECT_NAME_UPPERCASE__: fragment.lambdaName.toUpperCase(),
        },
        flags: fragmentFlags({}),
        terraform: {
          type: 'lambda',
          api: false,
          webAppName: undefined,
          alarmEmail: fragment.alarmEmail,
          cloudwatchTriggerMinutes: fragment.cloudwatchTriggerMinutes,
          domain: undefined,
          authentication: undefined,
        },
      },
    ];
  } else if (fragment.type === WorkspaceFragmentType.ApiLambda) {
    return [
      {
        projectName: fragment.apiName,
        type: ProjectType.LambdaApi,
        fromFragment: fragment,
        vars: {
          __PROJECT_NAME__: fragment.apiName,
          __PROJECT_NAME_UPPERCASE__: fragment.apiName.toUpperCase(),
        },
        flags: fragmentFlags({}),
        terraform: {
          type: 'lambda',
          api: true,
          webAppName: undefined,
          alarmEmail: fragment.alarmEmail,
          cloudwatchTriggerMinutes: undefined,
          domain: parseDomain(fragment.domain),
          authentication: undefined,
        },
      },
    ];
  } else if (fragment.type === WorkspaceFragmentType.WebApp) {
    const backendName = `${fragment.appName}_backend` as ProjectName;
    const frontendName = `${fragment.appName}_frontend` as ProjectName;
    const vars = {
      __APP_NAME__: fragment.appName,
      __APP_NAME_UPPERCASE__: fragment.appName.toUpperCase(),
      __APP_NAME_PASCALCASE__: pascalCase(fragment.appName),
    };
    const flags = fragmentFlags({
      AUTHENTICATION: booleanFlag(fragment.authentication.enabled),
    });
    return [
      {
        projectName: frontendName,
        type: ProjectType.Web,
        fromFragment: fragment,
        vars,
        flags,
        terraform: {
          type: 'frontend',
          domain: parseDomain(`static.${fragment.domain}`),
        },
      },
      {
        projectName: backendName,
        type: ProjectType.LambdaWebApi,
        fromFragment: fragment,
        vars,
        flags,
        terraform: {
          type: 'lambda',
          api: true,
          webAppName: fragment.appName,
          alarmEmail: fragment.alarmEmail,
          cloudwatchTriggerMinutes: undefined,
          domain: parseDomain(fragment.domain),
          authentication: fragment.authentication,
        },
      },
    ];
  } else if (fragment.type === WorkspaceFragmentType.NodeScript) {
    return [
      {
        projectName: fragment.scriptName,
        type: ProjectType.NodeScript,
        fromFragment: fragment,
        vars: {
          __PROJECT_NAME__: fragment.scriptName,
        },
        flags: fragmentFlags({}),
        terraform: {
          type: 'no-terraform',
        },
      },
    ];
  } else if (fragment.type === WorkspaceFragmentType.SharedNode) {
    const projectName = 'shared-node' as ProjectName;
    return [
      {
        projectName,
        type: ProjectType.SharedNode,
        fromFragment: fragment,
        vars: {
          __PROJECT_NAME__: projectName,
        },
        flags: fragmentFlags({}),
        terraform: {
          type: 'no-terraform',
        },
      },
    ];
  } else if (fragment.type === WorkspaceFragmentType.SharedWeb) {
    const projectName = 'shared-web' as ProjectName;
    return [
      {
        projectName,
        type: ProjectType.SharedWeb,
        fromFragment: fragment,
        vars: {
          __PROJECT_NAME__: projectName,
        },
        flags: fragmentFlags({}),
        terraform: {
          type: 'no-terraform',
        },
      },
    ];
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  } else if (fragment.type === WorkspaceFragmentType.Shared) {
    const projectName = 'shared' as ProjectName;
    return [
      {
        projectName,
        type: ProjectType.Shared,
        fromFragment: fragment,
        vars: {
          __PROJECT_NAME__: projectName,
        },
        flags: fragmentFlags({}),
        terraform: {
          type: 'no-terraform',
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
  const projects = workspaceFragments.flatMap(f => getProjectsFromWorkspaceFragment(f));

  // Create projects files from templates
  const projectFiles = await Promise.all(
    projects.map(
      async project =>
        await generateProject({
          dst,
          project,
          allFragments: workspaceFragments,
          workspace,
          workspaceName,
        })
    )
  );

  // Generate workspace root files
  const SCRIPTS_PATH = join(fileURLToPath(import.meta.url), '../scripts');
  const writeFile = async (path: string, file: string): Promise<FileHash> =>
    await writeWorkspaceFile(workspace, dst, path, file);
  const workspaceFiles = await Promise.all([
    // package.json
    writeFile(
      'package.json',
      await prettyJson(generateWorkspacePackageJson(workspaceName, projects))
    ),
    // app.code-workspace
    writeFile(
      'app.code-workspace',
      await prettyJsonc(generateCodeWorkspace(workspaceName, workspaceFragments))
    ),
    // .gitignore
    writeFile('.gitignore', generateGitIgnore()),
    // setup.js
    writeFile('setup.js', await prettyJs(await readFile(join(SCRIPTS_PATH, 'setup.js')))),
    // deploy.js
    writeFile(
      'deploy.js',
      await prettyJs(
        await readFile(join(SCRIPTS_PATH, 'deploy.js')).then(res =>
          res.replaceAll('__WORKSPACE_NAME__', workspaceName)
        )
      )
    ),
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
      return await writeFile(dstPath, content);
    })
  );

  // Terraform folder generation
  const terraformFiles = await Promise.all([
    ...workspaceFragments
      .filter(frag => frag.type === WorkspaceFragmentType.WebApp)
      .filter(frag => frag.authentication.enabled)
      .flatMap(frag => {
        return [
          writeFile(
            join('terraform', `dynamo_table_${lowerCase(frag.appName)}_user.tf`),
            addLineBreak(generateDynamoUserTerraform(workspaceName, frag.appName))
          ),
          writeFile(
            join('terraform', `dynamo_table_${lowerCase(frag.appName)}_user_session.tf`),
            addLineBreak(generateDynamoUserSessionTerraform(workspaceName, frag.appName))
          ),
        ];
      }),
    writeFile(
      join('terraform', 'base.tf'),
      addLineBreak(generateCommonTerraform(workspaceName, projects))
    ),
    ...projects.map(async p => {
      const content = generateWorkspaceProjectTerraform(workspaceName, p);
      if (content === undefined) {
        return;
      }
      const name = `${p.projectName}_terraform`;
      return await writeFile(join('terraform', `${name}.tf`), addLineBreak(content));
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
  const fileLines = file.split('\n');
  const fileToHash = fileLines.filter(line => !line.endsWith(' // @matthis/ignore')).join('\n');
  const newHash = md5(fileToHash);
  const oldHash = workspace?.files.find(f => f.path === path)?.hash;
  // Only write the file if it is different since last time we've generated the project.
  // Prevent needlessly overwriting changes made in the project in between.
  if (newHash !== oldHash) {
    const fileToWrite = fileLines.map(l => l.replaceAll(' // @matthis/ignore', '')).join('\n');
    await writeRawFile(join(root, path), fileToWrite);
  }
  return {path, hash: newHash};
}

const addLineBreak = (content: string): string =>
  content.endsWith('\n') ? content : `${content}\n`;
