import {join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';

import {listFiles, prettierFormat, prettyJson, readFile} from '@src/fs';
import {WorkspaceProject, writeWorkspaceFile} from '@src/project/generate_workspace';
import {FileHash, Workspace} from '@src/project/vscode_workspace';

const TEMPLATES_PATH = join(fileURLToPath(import.meta.url), '../templates');

export async function generateProject(
  dst: string,
  project: WorkspaceProject,
  workspace: Workspace | undefined
): Promise<FileHash[]> {
  const written: FileHash[] = [];
  const writeFile = async (path: string, file: string): Promise<FileHash> =>
    writeWorkspaceFile(workspace, dst, path, file);
  const {projectName, type, vars} = project;

  // Copy template files
  const templatePath = join(TEMPLATES_PATH, type);
  const files = await listFiles(templatePath);
  await Promise.all(
    files.map(async file => {
      const relativePath = relative(templatePath, file);
      const dstPath = join(projectName, relativePath);
      const content = await readFile(file);
      let newContent = content;
      for (const [varName, varValue] of Object.entries(vars)) {
        newContent = newContent.replaceAll(varName, varValue);
      }
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        newContent = await prettierFormat(newContent, 'typescript');
      }
      if (file.endsWith('.json')) {
        if (file.endsWith('package.json')) {
          const packageJson = JSON.parse(await readFile(file));
          packageJson['name'] = projectName;
          newContent = await prettyJson(packageJson);
        } else {
          newContent = await prettierFormat(newContent, 'json');
        }
      }
      written.push(await writeFile(dstPath, newContent));
    })
  );

  return written;
}
