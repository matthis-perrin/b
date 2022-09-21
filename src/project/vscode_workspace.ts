import {getProjectsFromWorkspaceFragment} from './generate_workspace';

import {WorkspaceFragment} from '@src/models';

export function generateCodeWorkspace(
  workspaceFragments: WorkspaceFragment[]
): Record<string, unknown> {
  const projects = workspaceFragments.flatMap(getProjectsFromWorkspaceFragment);
  const projectNames = projects.map(p => p.projectName);
  return {
    projects: workspaceFragments,
    folders: [
      ...projectNames.map(p => ({path: p})),
      {path: 'terraform'},
      {path: '.', name: 'root'},
    ],
    settings: {
      /* eslint-disable @typescript-eslint/naming-convention */
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
        'source.fixAll': false,
        'source.fixAll.eslint': true,
      },
      'editor.defaultFormatter': 'esbenp.prettier-vscode',
      'emmet.showExpandedAbbreviation': 'never',
      /* eslint-enable @typescript-eslint/naming-convention, no-null/no-null */
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
