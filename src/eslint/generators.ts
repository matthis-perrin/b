import {join} from 'node:path';

import {PLUGINS_FOR_TYPE} from '@src/eslint/plugins/index';
import {cleanDir, writeJsFile, writeJsonFile} from '@src/fs';
import {EslintType} from '@src/models';
import {ESLINT_VERSION, PACKAGE_VERSIONS} from '@src/versions';

export async function generateForType(path: string, type: EslintType): Promise<void> {
  await cleanDir(path);
  await Promise.all([
    writeJsonFile(join(path, 'package.json'), generatePackageJson(type)),
    writeJsFile(
      join(path, 'index.js'),
      `module.exports = ${JSON.stringify(generateEslintConfig(type))}`
    ),
  ]);
}

function generateEslintConfig(type: EslintType): Record<string, unknown> {
  const plugins = PLUGINS_FOR_TYPE[type];
  const eslintConfig = {
    root: true,
    ignorePatterns: ['js', 'cjs', 'mjs'].map(ext => `**/*.${ext}`),
    env: {
      browser: type === EslintType.Web,
      node: type === EslintType.Node,
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
    overrides: [
      {
        files: ['**/*.test.ts', '**/*.test.tsx'],
        rules: {
          '@typescript-eslint/no-floating-promises': 'off',
          '@typescript-eslint/no-magic-numbers': 'off',
        },
      },
    ],
  };
  return eslintConfig;
}

function generatePackageJson(type: EslintType): Record<string, unknown> {
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
    dependencies: sortedDependencies,
  };
}
