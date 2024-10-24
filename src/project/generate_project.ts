import {join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';

import {listFiles, prettierFormat, readFile} from '@src/fs';
import {ProjectType, WorkspaceFragment} from '@src/models';
import {generateSharedFiles} from '@src/project/dynamic_template';
import {WorkspaceProject, writeWorkspaceFile} from '@src/project/generate_workspace';
import {FileHash, Workspace, WorkspaceOptions} from '@src/project/vscode_workspace';
import {randomStringSafe} from '@src/rand_safe';
import {upperCase} from '@src/string_utils';

const TEMPLATES_PATH = join(fileURLToPath(import.meta.url), '../templates');

export async function generateProject(opts: {
  dst: string;
  project: WorkspaceProject;
  fragments: WorkspaceFragment[];
  options: WorkspaceOptions;
  previousWorkspace: Workspace | undefined;
}): Promise<FileHash[]> {
  const {dst, project, fragments, options, previousWorkspace} = opts;
  const workspaceName = options.workspaceName;

  const written: FileHash[] = [];
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
    filesToWrite.push(...generateSharedFiles(fragments));
  }

  await Promise.all(
    filesToWrite.map(async ({path, content}) => {
      let formattedContent = content;

      // Handle @matthis/skip-file directives
      const skipFileMatches = content.matchAll(
        /\/\/ @matthis\/skip-file:(?<flagName>[^:]+)(?<negate>:not)?:(?<flagValue>[^\s]*)/gu
      );
      for (const skipFileMatch of skipFileMatches) {
        const {flagName, negate, flagValue} = skipFileMatch.groups ?? {};
        if (flagMatch({flagName, negate, flagValue}, project, fragments)) {
          return;
        }
      }
      // Remove the lines that contain the @matthis/skip-file directives
      formattedContent = formattedContent.replaceAll(
        / *\/\/ @matthis\/skip-file:[^:]+(?::not)?:[^\n]*\n/gu,
        ''
      );

      // Handle @matthis/start and @matthis/end directives
      const fileLines: string[] = [];
      const depth: ('include' | 'exclude')[] = ['include'];
      for (const line of formattedContent.split('\n')) {
        // Look for @matthis/end
        if (line.includes('@matthis/end')) {
          depth.pop();
          continue;
        }

        // Look for @matthis/start
        const matchStart =
          /.*\/\/ @matthis\/start:(?<flagName>[^:]+)(?<negate>:not)?:(?<flagValue>[^\s]*).*/u.exec(
            line
          );
        if (matchStart) {
          const {flagName, negate, flagValue} = matchStart.groups ?? {};
          depth.push(
            flagMatch({flagName, negate, flagValue}, project, fragments) ? 'include' : 'exclude'
          );
          continue;
        }

        if (depth.at(-1) === 'include') {
          fileLines.push(line);
        }
      }
      formattedContent = fileLines.join('\n');

      if (path.endsWith('.ts') || path.endsWith('.tsx')) {
        formattedContent = await prettierFormat(formattedContent, 'typescript');
      }
      if (path.endsWith('.json')) {
        formattedContent = await prettierFormat(formattedContent, 'json');
      }
      written.push(await writeWorkspaceFile(previousWorkspace, dst, path, formattedContent));
    })
  );

  return written;
}

function flagMatch(
  flag: {flagName?: string; negate?: string; flagValue?: string},
  project: WorkspaceProject,
  allFragments: WorkspaceFragment[]
): boolean {
  const {flagName, negate, flagValue} = flag;
  if (flagName === undefined || flagValue === undefined) {
    return false;
  }
  const projectFlagValue = project.flags(allFragments)[flagName];
  const projectFlagMatchValue = projectFlagValue === flagValue;
  return negate !== undefined ? !projectFlagMatchValue : projectFlagMatchValue;
}
