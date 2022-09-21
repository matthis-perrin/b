import {join} from 'path';

import {cleanDir, writeJsFile, writeJsonFile} from '../fs';
import {RuntimeType} from '../models';
import {ESLINT_VERSION, PACKAGE_VERSIONS} from '../versions';
import {PLUGINS_FOR_TYPE} from './plugins/index';

export async function generateForType(path: string, type: RuntimeType): Promise<void> {
  await cleanDir(path);
  await Promise.all([
    writeJsonFile(join(path, 'package.json'), generatePackageJson(type)),
    writeJsFile(
      join(path, 'index.js'),
      `module.exports = ${JSON.stringify(generateEslintConfig(type))}`
    ),
  ]);
}

function generateEslintConfig(type: RuntimeType): Record<string, unknown> {
  const plugins = PLUGINS_FOR_TYPE[type];
  const eslintConfig = {
    root: true,
    ignorePatterns: ['**/*.js'],
    env: {
      browser: type === RuntimeType.Web,
      node: type === RuntimeType.Node,
      es6: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: './tsconfig.json',
      sourceType: 'module',
    },
    settings: plugins.reduce((all, {settings}) => ({...all, ...settings}), {}),
    plugins: plugins.reduce<string[]>((all, {plugin}) => [...all, ...plugin], []),
    rules: plugins.reduce((all, {allOff, onlyOn}) => ({...all, ...allOff, ...onlyOn}), {}),
  };
  return eslintConfig;
}

function generatePackageJson(type: RuntimeType): Record<string, unknown> {
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
    name: `@matthis/eslint-config-${type}`,
    version: PACKAGE_VERSIONS.eslint,
    license: 'UNLICENSED',
    type: 'module',
    dependencies: sortedDependencies,
  };
}
