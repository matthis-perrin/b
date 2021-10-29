import {EslintMetadata} from '../models';

export const eslintSimpleImportSort: EslintMetadata = {
  plugin: ['simple-import-sort'],
  dependencies: {
    'eslint-plugin-simple-import-sort': '7.0.x',
  },
  settings: {},
  allOff: {
    'simple-import-sort/imports': 'off',
    'simple-import-sort/exports': 'off',
  },
  onlyOn: {
    'simple-import-sort/imports': ['warn'],
  },
};
