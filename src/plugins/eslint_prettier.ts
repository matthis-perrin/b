import {EslintMetadata} from '../models';

export const eslintPrettier: EslintMetadata = {
  plugin: ['prettier'],
  dependencies: {
    'eslint-plugin-prettier': '3.4.x',
  },
  settings: {},
  allOff: {
    'prettier/prettier': 'off',
  },
  onlyOn: {
    'prettier/prettier': 'warn',
  },
};
