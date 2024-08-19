import {EslintMetadata} from '@src/eslint/models';

const importGroups = ['@shared/', '@shared-node/', '@shared-web/', '@src/'];

export const eslintSimpleImportSort: EslintMetadata = {
  plugin: {
    name: 'simple-import-sort',
    importName: 'simpleImportSort',
    module: 'eslint-plugin-simple-import-sort',
  },
  dependencies: {
    'eslint-plugin-simple-import-sort': '12.1.x',
  },
  settings: {},
  allOff: {
    'simple-import-sort/imports': 'off',
    'simple-import-sort/exports': 'off',
  },
  onlyOn: {
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          ['^\\u0000'], // Side effect imports.
          ['^node:'],
          [`^(?!${importGroups.join('|')})`],
          ...importGroups.map(imp => [`^${imp}`]),
        ],
      },
    ],
  },
};
