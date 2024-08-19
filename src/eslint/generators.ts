import {join} from 'node:path';

import {PLUGINS_FOR_TYPE} from '@src/eslint/plugins/index';
import {cleanDir, writeJsFile, writeJsonFile} from '@src/fs';
import {EslintType} from '@src/models';
import {ESLINT_VERSION, PACKAGE_VERSIONS} from '@src/versions';

export async function generateForType(path: string, type: EslintType): Promise<void> {
  await cleanDir(path);
  await Promise.all([
    writeJsonFile(join(path, 'package.json'), generatePackageJson(type)),
    writeJsFile(join(path, 'index.js'), generateEslintConfigFile(type)),
  ]);
}

function generateEslintConfigFile(type: EslintType): string {
  const plugins = PLUGINS_FOR_TYPE[type];

  const imports = [
    'import {fixupPluginRules} from "@eslint/compat";',
    'import globals from "globals";',
    'import tsParser from "@typescript-eslint/parser";',
  ];
  const pluginsConfig: string[] = [];

  for (const plugin of plugins) {
    if (plugin.plugin) {
      const {name, importName, module, requireFixup} = plugin.plugin;
      imports.push(`import ${importName} from "${module}";`);
      // fixupPluginRules
      const fixupName = requireFixup ? `fixupPluginRules(${importName})` : importName;
      pluginsConfig.push(`"${name}": ${fixupName},`);
    }
  }
  const isBrowser = type === EslintType.Web;
  const isNode = type === EslintType.Node;

  return `
${imports.join('\n')}

export default [
  {ignores: ["**/*.js", "**/*.cjs", "**/*.mjs"]},
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      ${pluginsConfig.join('\n')}
    },
    languageOptions: {
      globals: {
        ...${isBrowser ? 'globals.browser' : 'Object.fromEntries(Object.entries(globals.browser).map(([key]) => [key, "off"]))'},
        ...${isNode ? 'globals.node' : 'Object.fromEntries(Object.entries(globals.node).map(([key]) => [key, "off"]))'},
      },
      parser: tsParser,
      sourceType: "module",
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    settings: ${JSON.stringify(plugins.reduce((all, {settings}) => ({...all, ...settings}), {}))},
    rules: ${JSON.stringify(plugins.reduce((all, {allOff, onlyOn}) => ({...all, ...allOff, ...onlyOn}), {}))},
  },
  {
    files: ['**/*.test.ts', '**/*.test.tsx'],
    rules: {
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-magic-numbers': 'off',
    },
  }
]`;
}

function generatePackageJson(type: EslintType): Record<string, unknown> {
  const eslintPlugins = PLUGINS_FOR_TYPE[type];
  const baseDependencies = {
    eslint: ESLINT_VERSION,
    '@eslint/compat': '1.1.x',
    globals: '15.9.x',
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
    type: 'module',
    main: 'index.js',
    license: 'UNLICENSED',
    dependencies: sortedDependencies,
  };
}
