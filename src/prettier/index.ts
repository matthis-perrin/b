import {join, resolve} from 'node:path';

import {cleanDir, writeJsFile, writeJsonFile} from '@src/fs';
import {PACKAGE_VERSIONS, PRETTIER_VERSION} from '@src/versions';

export async function prettierPackage(): Promise<void> {
  const packageDir = join(resolve('.'), 'packages', 'prettier-config');
  await cleanDir(packageDir);
  await Promise.all([
    writeJsonFile(join(packageDir, 'package.json'), generatePackageJson()),
    writeJsFile(
      join(packageDir, 'index.js'),
      `module.exports = ${JSON.stringify(generatePrettierConfig())}`
    ),
  ]);
}

function generatePrettierConfig(): Record<string, unknown> {
  return {
    printWidth: 100,
    singleQuote: true,
    trailingComma: 'es5',
    bracketSpacing: false,
    arrowParens: 'avoid',
    endOfLine: 'auto',
    overrides: [{files: '*.json', options: {parser: 'json'}}],
  };
}

function generatePackageJson(): Record<string, unknown> {
  return {
    name: `@matthis/prettier-config`,
    version: PACKAGE_VERSIONS.prettier,
    license: 'UNLICENSED',
    main: 'index.js',
    dependencies: {
      prettier: PRETTIER_VERSION,
    },
  };
}
