import {EslintMetadata} from '@src/eslint/models';

export const eslintComments: EslintMetadata = {
  plugin: {
    name: 'eslint-comments',
    importName: 'eslintComments',
    module: 'eslint-plugin-eslint-comments',
  },
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
