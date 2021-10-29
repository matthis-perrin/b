import {join, resolve} from 'path';
import {PACKAGE_VERSIONS, PRETTIER_VERSION} from '../constants';

import {cleanDir, writeJsFile, writeJsonFile} from '../fs';

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
  };
}

function generatePackageJson(): Record<string, unknown> {
  return {
    name: `prettier-config`,
    version: PACKAGE_VERSIONS.prettier,
    license: 'UNLICENSED',
    dependencies: {
      prettier: PRETTIER_VERSION,
    },
  };
}
