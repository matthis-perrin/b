import {EslintMetadata} from '../models';

export const eslintNoNull: EslintMetadata = {
  plugin: ['no-null'],
  dependencies: {
    'eslint-plugin-no-null': '1.0.x',
  },
  settings: {},
  allOff: {
    'no-null/no-null': 'off',
  },
  onlyOn: {
    'no-null/no-null': 'warn',
  },
};
