import {eslintPackages} from './eslint';
import {prettierPackage} from './prettier';

(async () => {
  await Promise.all([eslintPackages(), prettierPackage()]);
})().catch(console.error);
