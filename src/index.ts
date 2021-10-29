import {eslintPackages} from './eslint';
import {prettierPackage} from './prettier';
import {tsconfigPackages} from './tsconfig';

(async () => {
  await Promise.all([eslintPackages(), prettierPackage(), tsconfigPackages()]);
})().catch(console.error);
