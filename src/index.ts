import {eslintPackages} from '@src/eslint/index';
import {RUNTIME_TYPE_TO_METADATA, RuntimeType} from '@src/models';
import {prettierPackage} from '@src/prettier/index';
import {projectPackage} from '@src/project/index';
import {generateTemplatesRootPackageJson, updateTemplatesLibVersions} from '@src/templates';
import {tsconfigPackages} from '@src/tsconfig/index';
import {webpackPackages} from '@src/webpack/index';

const eslintRuntimes = [
  ...new Set(Object.values(RUNTIME_TYPE_TO_METADATA).map(data => data.eslint)).values(),
];
const tsConfigRuntimes = [
  ...new Set(Object.values(RUNTIME_TYPE_TO_METADATA).map(data => data.tsconfig)).values(),
];
const webpackRuntimes = [
  ...new Set(
    Object.values(RUNTIME_TYPE_TO_METADATA)
      .map(data => data.webpack)
      .filter<RuntimeType>((d): d is RuntimeType => d !== undefined)
  ).values(),
];

(async () => {
  await Promise.all([
    generateTemplatesRootPackageJson(eslintRuntimes, tsConfigRuntimes, webpackRuntimes),
    updateTemplatesLibVersions(),
    projectPackage(),
    eslintPackages(eslintRuntimes),
    prettierPackage(),
    tsconfigPackages(tsConfigRuntimes),
    webpackPackages(webpackRuntimes),
  ]);
})().catch(console.error);
