import {join} from 'node:path';

import {maybeReadFile, prettyJson, writeRawFile} from '@src/fs';
import {WorkspaceFragment} from '@src/models';
import {getProjectsFromWorkspaceFragment} from '@src/project/generate_workspace';
import {asMap} from '@src/type_utils';

export function generateCodeWorkspace(
  workspaceName: string,
  workspaceFragments: WorkspaceFragment[]
): Record<string, unknown> {
  const projects = workspaceFragments.flatMap(f => getProjectsFromWorkspaceFragment(f));
  const projectNames = projects.map(p => p.projectName);
  return {
    folders: [
      ...projectNames.map(p => ({path: p})),
      {path: 'terraform'},
      {path: '.', name: 'root'},
    ],
    settings: {
      'window.title': `${workspaceName}\${separator}\${activeEditorShort}`,
      'files.exclude': Object.fromEntries([
        ...projectNames.map(p => [p, true]),
        ['terraform', true],
      ]),
      'editor.acceptSuggestionOnCommitCharacter': false,
      'editor.suggestSelection': 'first',
      'vsintellicode.modify.editor.suggestSelection': 'automaticallyOverrodeDefaultValue',
      'explorer.confirmDelete': false,
      'git.autofetch': true,
      'git.confirmSync': false,
      'typescript.preferences.importModuleSpecifier': 'non-relative',
      'eslint.lintTask.enable': true,
      'eslint.useESLintClass': true,
      'editor.formatOnSave': true,
      'editor.codeActionsOnSave': {
        'source.fixAll': 'never',
        'source.fixAll.eslint': 'explicit',
      },
      'editor.defaultFormatter': 'esbenp.prettier-vscode',
      'editor.linkedEditing': true,
      'emmet.showExpandedAbbreviation': 'never',
      'files.associations': {
        '*.tf': 'terraform',
      },
      '[typescript]': {
        'editor.defaultFormatter': 'esbenp.prettier-vscode',
      },
      '[typescriptreact]': {
        'editor.defaultFormatter': 'esbenp.prettier-vscode',
      },
      '[terraform]': {
        'editor.defaultFormatter': 'hashicorp.terraform',
      },
    },
    extensions: {
      recommendations: [
        'dbaeumer.vscode-eslint',
        'esbenp.prettier-vscode',
        'VisualStudioExptTeam.vscodeintellicode',
        'styled-components.vscode-styled-components',
        'naumovs.color-highlight',
        'eamodio.gitlens',
        'hashicorp.terraform',
      ],
    },
  };
}

export interface FileHash {
  path: string;
  hash: string;
}
export interface Workspace {
  fragments: WorkspaceFragment[];
  version: string;
  files: FileHash[];
}

export async function readWorkspace(workspacePath: string): Promise<Workspace | undefined> {
  const workspaceContent = await maybeReadFile(join(workspacePath, '.workspace'));
  if (workspaceContent === undefined) {
    return undefined;
  }
  const workspaceData = asMap(JSON.parse(workspaceContent), {});
  const {fragments = [], version = '', files = []} = workspaceData;
  return {fragments, version, files} as Workspace;
}

export async function writeWorkspace(workspacePath: string, workspace: Workspace): Promise<void> {
  workspace.files.sort((f1, f2) => f1.path.localeCompare(f2.path));
  await writeRawFile(join(workspacePath, '.workspace'), await prettyJson(workspace));
}
