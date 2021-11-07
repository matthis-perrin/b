import {eslintPackages} from './eslint';
import {prettierPackage} from './prettier';
import {projectPackage} from './project';
import {tsconfigPackages} from './tsconfig';
import {webpackPackages} from './webpack';

(async () => {
  await Promise.all([
    projectPackage(),
    eslintPackages(),
    prettierPackage(),
    tsconfigPackages(),
    webpackPackages(),
  ]);
})().catch(console.error);
