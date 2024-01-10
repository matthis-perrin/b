import {EslintMetadata} from '@src/eslint/models';

const importGroups = ['@shared/', '@shared-node/', '@shared-web/', '@src/'];

export const eslintSimpleImportSort: EslintMetadata = {
  plugin: ['simple-import-sort'],
  dependencies: {
    'eslint-plugin-simple-import-sort': '10.0.x',
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
