import {EslintMetadata} from '../models';

export const eslintReactHooks: EslintMetadata = {
  plugin: ['react-hooks'],
  dependencies: {
    'eslint-plugin-react-hooks': '4.4.x',
  },
  settings: {},
  allOff: {
    'react-hooks/exhaustive-deps': 'off',
    'react-hooks/rules-of-hooks': 'off',
  },
  onlyOn: {
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'warn',
  },
};
