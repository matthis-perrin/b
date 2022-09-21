import {eslintPackages} from './eslint/index';
import {RUNTIME_TYPE_TO_METADATA, RuntimeType} from './models';
import {prettierPackage} from './prettier/index';
import {projectPackage} from './project/index';
import {generateTemplatesRootPackageJson, updateTemplatesLibVersions} from './templates';
import {tsconfigPackages} from './tsconfig/index';
import {webpackPackages} from './webpack/index';

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
