import {PRETTIER_VERSION} from '../../versions';
import {EslintMetadata} from '../models';

export const eslintPrettier: EslintMetadata = {
  plugin: ['prettier'],
  dependencies: {
    'eslint-plugin-prettier': '4.0.x',
    prettier: PRETTIER_VERSION,
  },
  settings: {},
  allOff: {
    'prettier/prettier': 'off',
  },
  onlyOn: {
    'prettier/prettier': 'warn',
  },
};
