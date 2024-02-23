import {join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';

import {listFiles, prettierFormat, readFile} from '@src/fs';
import {filterFragments, ProjectType, WorkspaceFragment, WorkspaceFragmentType} from '@src/models';
import {generateSharedFiles} from '@src/project/dynamic_template';
import {WorkspaceProject, writeWorkspaceFile} from '@src/project/generate_workspace';
import {FileHash, Workspace} from '@src/project/vscode_workspace';
import {randomStringSafe} from '@src/rand_safe';
import {upperCase} from '@src/string_utils';

const TEMPLATES_PATH = join(fileURLToPath(import.meta.url), '../templates');

export async function generateProject(opts: {
  dst: string;
  project: WorkspaceProject;
  allFragments: WorkspaceFragment[];
  workspace: Workspace | undefined;
  workspaceName: string;
}): Promise<FileHash[]> {
  const {dst, project, allFragments, workspace, workspaceName} = opts;

  const written: FileHash[] = [];
  const writeFile = async (path: string, file: string): Promise<FileHash> =>
    writeWorkspaceFile(workspace, dst, path, file);
  const {projectName, type, vars} = project;
  const defaultVars = {
    __WORKSPACE_NAME__: workspaceName,
    __WORKSPACE_NAME_UPPERCASE__: upperCase(workspaceName),
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    __COOKIE_ENCRYPTION_KEY__: randomStringSafe(32),
  };

  // Copy template files
  const templatePath = join(TEMPLATES_PATH, type);
  const files = await listFiles(templatePath);
  const filesToWrite = [
    ...(await Promise.all(
      files.map(async file => {
        const relativePath = relative(templatePath, file);
        const dstPath = join(projectName, relativePath);

        let content = await readFile(file);
        if (file.endsWith('package.json')) {
          const packageJson = JSON.parse(await readFile(file));
          packageJson['name'] = projectName;
          content = JSON.stringify(packageJson, undefined, 2);
        }
        for (const [varName, varValue] of Object.entries({...vars, ...defaultVars})) {
          content = content.replaceAll(varName, varValue);
        }

        return {path: dstPath, content};
      })
    )),
  ];
  if (type === ProjectType.Shared) {
    filesToWrite.push(
      ...generateSharedFiles({
        webApps: filterFragments(allFragments, WorkspaceFragmentType.WebApp),
        apiLambdas: filterFragments(allFragments, WorkspaceFragmentType.ApiLambda),
      })
    );
  }

  await Promise.all(
    filesToWrite.map(async ({path, content}) => {
      let formattedContent = content;
      if (path.endsWith('.ts') || path.endsWith('.tsx')) {
        formattedContent = await prettierFormat(formattedContent, 'typescript');
      }
      if (path.endsWith('.json')) {
        formattedContent = await prettierFormat(formattedContent, 'json');
      }
      written.push(await writeFile(path, formattedContent));
    })
  );

  return written;
}
