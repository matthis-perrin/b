import baseConfig from '@matthis/eslint-config-node';

export default [
  ...baseConfig,
  {
    files: ['*.ts'],
    rules: {
      'no-console': 'off',
      'no-object-constructor': 'off',
    },
  },
  {
    files: ['src/webpack/*.ts'],
    rules: {
      'unicorn/filename-case': 'off',
    },
  },
];
