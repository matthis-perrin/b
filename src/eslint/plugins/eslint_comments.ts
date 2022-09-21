import {EslintMetadata} from '../models';

/* eslint-disable @typescript-eslint/naming-convention */
export const eslintComments: EslintMetadata = {
  plugin: ['eslint-comments'],
  dependencies: {
    'eslint-plugin-eslint-comments': '3.2.x',
  },
  settings: {},
  allOff: {
    'eslint-comments/disable-enable-pair': 'off',
    'eslint-comments/no-aggregating-enable': 'off',
    'eslint-comments/no-duplicate-disable': 'off',
    'eslint-comments/no-restricted-disable': 'off',
    'eslint-comments/no-unlimited-disable': 'off',
    'eslint-comments/no-unused-disable': 'off',
    'eslint-comments/no-unused-enable': 'off',
    'eslint-comments/no-use': 'off',
    'eslint-comments/require-description': 'off',
  },
  onlyOn: {
    'eslint-comments/disable-enable-pair': 'warn',
    'eslint-comments/no-aggregating-enable': 'warn',
    'eslint-comments/no-duplicate-disable': 'warn',
    'eslint-comments/no-unlimited-disable': 'warn',
    'eslint-comments/no-unused-disable': 'warn',
    'eslint-comments/no-use': [
      'warn',
      {
        allow: [
          'eslint-disable',
          'eslint-disable-line',
          'eslint-disable-next-line',
          'eslint-enable',
        ],
      },
    ],
  },
};
/* eslint-enable @typescript-eslint/naming-convention, no-null/no-null */
