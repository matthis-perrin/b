import {join} from 'path';
import {ESLINT_VERSION, PACKAGE_VERSIONS} from '../constants';

import {cleanDir, writeJsonFile, writeJsFile} from '../fs';
import {ProjectType} from './models';
import {PLUGINS_FOR_TYPE} from './plugins';

export async function generateForType(path: string, type: ProjectType): Promise<void> {
  await cleanDir(path);
  await Promise.all([
    writeJsonFile(join(path, 'package.json'), generatePackageJson(type)),
    writeJsFile(
      join(path, 'index.js'),
      `module.exports = ${JSON.stringify(generateEslintConfig(type))}`
    ),
  ]);
}

function generateEslintConfig(type: ProjectType): Record<string, unknown> {
  const plugins = PLUGINS_FOR_TYPE[type];
  const eslintConfig = {
    root: true,
    env: {
      browser: type === ProjectType.Web,
      node: type === ProjectType.Node,
      es6: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: './tsconfig.json',
    },
    settings: plugins.reduce((all, {settings}) => ({...all, ...settings}), {}),
    plugins: plugins.reduce<string[]>((all, {plugin}) => [...all, ...plugin], []),
    rules: plugins.reduce((all, {allOff, onlyOn}) => ({...all, ...allOff, ...onlyOn}), {}),
  };
  return eslintConfig;
}

function generatePackageJson(type: ProjectType): Record<string, unknown> {
  const eslintPlugins = PLUGINS_FOR_TYPE[type];
  const baseDependencies = {
    eslint: ESLINT_VERSION,
  };
  const dependencies = eslintPlugins.reduce(
    (prev, curr) => ({...prev, ...curr.dependencies}),
    baseDependencies
  );
  const sortedDependencies = Object.fromEntries(
    Object.entries(dependencies).sort(([name1], [name2]) => name1.localeCompare(name2))
  );

  return {
    name: `eslint-config-matthis-${type}`,
    version: PACKAGE_VERSIONS.eslint,
    license: 'UNLICENSED',
    dependencies: sortedDependencies,
  };
}
