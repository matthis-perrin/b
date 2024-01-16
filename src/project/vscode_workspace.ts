import {join} from 'node:path';

import {maybeReadFile} from '@src/fs';
import {WorkspaceFragment} from '@src/models';
import {getProjectsFromWorkspaceFragment} from '@src/project/generate_workspace';

export function generateCodeWorkspace(
  workspaceName: string,
  workspaceFragments: WorkspaceFragment[]
): Record<string, unknown> {
  const projects = workspaceFragments.flatMap(f =>
    getProjectsFromWorkspaceFragment(f, workspaceFragments)
  );
  const projectNames = projects.map(p => p.projectName);
  return {
    projects: workspaceFragments,
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
      'eslint.options': {
        reportUnusedDisableDirectives: 'warn',
      },
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
    },
    extensions: {
      recommendations: [
        'dbaeumer.vscode-eslint',
        'esbenp.prettier-vscode',
        'VisualStudioExptTeam.vscodeintellicode',
        'styled-components.vscode-styled-components',
        'naumovs.color-highlight',
        'eamodio.gitlens',
      ],
    },
  };
}

export async function readWorkspaceFragments(
  workspacePath: string
): Promise<WorkspaceFragment[] | undefined> {
  const workspaceContent = await maybeReadFile(join(workspacePath, 'app.code-workspace'));
  const workspaceJson = workspaceContent === undefined ? {} : JSON.parse(workspaceContent);
  const workspaceProjects = Array.isArray(workspaceJson.projects)
    ? workspaceJson.projects
    : undefined;
  return workspaceProjects as WorkspaceFragment[] | undefined;
}
