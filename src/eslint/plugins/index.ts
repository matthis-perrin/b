import {EslintMetadata} from '@src/eslint/models';
import {eslintComments} from '@src/eslint/plugins/eslint_comments';
import {eslintCore} from '@src/eslint/plugins/eslint_core';
import {eslintImport} from '@src/eslint/plugins/eslint_import';
import {eslintNode} from '@src/eslint/plugins/eslint_node';
import {eslintPrettier} from '@src/eslint/plugins/eslint_prettier';
import {eslintReact} from '@src/eslint/plugins/eslint_react';
import {eslintReactHooks} from '@src/eslint/plugins/eslint_react_hooks';
import {eslintSimpleImportSort} from '@src/eslint/plugins/eslint_simple_import_sort';
import {eslintTypescript} from '@src/eslint/plugins/eslint_typescript';
import {eslintUnicorn} from '@src/eslint/plugins/eslint_unicorn';
import {EslintType} from '@src/models';

const BASE_PLUGINS = [
  eslintComments,
  eslintCore,
  eslintImport,
  eslintPrettier,
  eslintSimpleImportSort,
  eslintTypescript,
  eslintUnicorn,
];

export const PLUGINS_FOR_TYPE: Record<EslintType, EslintMetadata[]> = {
  [EslintType.Web]: [...BASE_PLUGINS, eslintReact, eslintReactHooks],
  [EslintType.Node]: [...BASE_PLUGINS, eslintNode],
  [EslintType.Lib]: [...BASE_PLUGINS],
};
