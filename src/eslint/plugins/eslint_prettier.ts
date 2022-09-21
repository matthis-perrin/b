import {EslintMetadata} from '@src/eslint/models';
import {PRETTIER_VERSION} from '@src/versions';

/* eslint-disable @typescript-eslint/naming-convention */
export const eslintPrettier: EslintMetadata = {
  plugin: ['prettier'],
  dependencies: {
    'eslint-plugin-prettier': '4.2.x',
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
/* eslint-enable @typescript-eslint/naming-convention, no-null/no-null */
