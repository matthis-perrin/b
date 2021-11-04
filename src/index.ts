import {eslintPackages} from './eslint';
import {prettierPackage} from './prettier';
import {tsconfigPackages} from './tsconfig';
import {webpackPackages} from './webpack';

(async () => {
  await Promise.all([eslintPackages(), prettierPackage(), tsconfigPackages(), webpackPackages()]);
})().catch(console.error);
