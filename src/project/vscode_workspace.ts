export function generateCodeWorkspace(projects: string[]): Record<string, unknown> {
  return {
    folders: [...projects.map(p => ({path: p})), {path: 'terraform'}, {path: '.', name: 'root'}],
    settings: {
      'files.exclude': Object.fromEntries([...projects.map(p => [p, true]), ['terraform', true]]),
      'editor.acceptSuggestionOnCommitCharacter': false,
      'editor.suggestSelection': 'first',
      'vsintellicode.modify.editor.suggestSelection': 'automaticallyOverrodeDefaultValue',
      'explorer.confirmDelete': false,
      'git.autofetch': true,
      'git.confirmSync': false,
      'typescript.preferences.importModuleSpecifier': 'non-relative',
      'eslint.lintTask.enable': true,
      'editor.formatOnSave': true,
      'editor.codeActionsOnSave': {
        'source.fixAll': false,
        'source.fixAll.eslint': true,
      },
      'editor.defaultFormatter': 'esbenp.prettier-vscode',
      'emmet.showExpandedAbbreviation': 'never',
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
