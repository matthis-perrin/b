import {join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';

import {listFiles, prettierFormat, readFile, writeJsonFile, writeRawFile} from '@src/fs';
import {WorkspaceProject} from '@src/project/generate_workspace';

const TEMPLATES_PATH = join(fileURLToPath(import.meta.url), '../templates');

export async function generateProject(dst: string, project: WorkspaceProject): Promise<void> {
  const {projectName, type, vars} = project;
  // Copy template files
  const templatePath = join(TEMPLATES_PATH, type);
  const files = await listFiles(templatePath);
  await Promise.all(
    files.map(async file => {
      const buffer = await readFile(file);
      const content = buffer.toString();
      let newContent = content;
      for (const [varName, varValue] of Object.entries(vars)) {
        newContent = newContent.replaceAll(varName, varValue);
      }
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        newContent = await prettierFormat(newContent, 'typescript');
      }
      if (file.endsWith('.json')) {
        newContent = await prettierFormat(newContent, 'json');
      }
      const relativePath = relative(templatePath, file);
      await writeRawFile(join(dst, relativePath), newContent);
    })
  );

  // Replace name in package.json
  const packageJsonPath = join(dst, 'package.json');
  const packageJsonbuffer = await readFile(packageJsonPath);
  const packageJson = JSON.parse(packageJsonbuffer.toString());
  packageJson['name'] = projectName;
  await writeJsonFile(packageJsonPath, packageJson);
}
