import {eslintPackages} from '@src/eslint/index';
import {error} from '@src/logger';
import {EslintType, TsConfigType, WebpackType} from '@src/models';
import {prettierPackage} from '@src/prettier/index';
import {projectPackage} from '@src/project/index';
import {generateTemplatesRootPackageJson, updateTemplatesLibVersions} from '@src/templates';
import {tsconfigPackages} from '@src/tsconfig/index';
import {webpackPackages} from '@src/webpack/index';
import {webpackRunnerPackage} from '@src/webpack-runner/index';

const eslintRuntimes = Object.values(EslintType);
const tsConfigRuntimes = Object.values(TsConfigType);
const webpackRuntimes = Object.values(WebpackType);

(async () => {
  await Promise.all([
    generateTemplatesRootPackageJson(eslintRuntimes, tsConfigRuntimes, webpackRuntimes),
    updateTemplatesLibVersions(),
    projectPackage(),
    eslintPackages(eslintRuntimes),
    prettierPackage(),
    tsconfigPackages(tsConfigRuntimes),
    webpackPackages(webpackRuntimes),
    webpackRunnerPackage(),
  ]);
})().catch(error);
