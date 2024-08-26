import baseConfig from '@matthis/eslint-config-node';

export default [
  ...baseConfig,
  {
    files: ['**/*.ts'],
    rules: {
      'no-object-constructor': 'off',
      'n/no-sync': 'off',
    },
  },
  {
    files: ['src/webpack/*.ts'],
    rules: {
      'unicorn/filename-case': 'off',
    },
  },
];
