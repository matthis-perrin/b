import {EslintMetadata} from '@src/eslint/models';
import {eslintComments} from '@src/eslint/plugins/eslint_comments';
import {eslintCore} from '@src/eslint/plugins/eslint_core';
import {eslintImport} from '@src/eslint/plugins/eslint_import';
import {eslintNoNull} from '@src/eslint/plugins/eslint_no_null';
import {eslintNode} from '@src/eslint/plugins/eslint_node';
import {eslintPrettier} from '@src/eslint/plugins/eslint_prettier';
import {eslintReact} from '@src/eslint/plugins/eslint_react';
import {eslintReactHooks} from '@src/eslint/plugins/eslint_react_hooks';
import {eslintSimpleImportSort} from '@src/eslint/plugins/eslint_simple_import_sort';
import {eslintTypescript} from '@src/eslint/plugins/eslint_typescript';
import {eslintUnicorn} from '@src/eslint/plugins/eslint_unicorn';
import {RuntimeType} from '@src/models';

const BASE_PLUGINS = [
  eslintComments,
  eslintCore,
  eslintImport,
  eslintNoNull,
  eslintPrettier,
  eslintSimpleImportSort,
  eslintTypescript,
  eslintUnicorn,
];

export const PLUGINS_FOR_TYPE: Record<RuntimeType, EslintMetadata[]> = {
  [RuntimeType.Web]: [...BASE_PLUGINS, eslintReact, eslintReactHooks],
  [RuntimeType.Node]: [...BASE_PLUGINS, eslintNode],
  [RuntimeType.Lambda]: [...BASE_PLUGINS, eslintNode],
  [RuntimeType.Lib]: [...BASE_PLUGINS],
  [RuntimeType.ReactNative]: [...BASE_PLUGINS, eslintReact, eslintReactHooks],
  [RuntimeType.NodeLib]: [...BASE_PLUGINS, eslintNode],
  [RuntimeType.NodeScript]: [...BASE_PLUGINS, eslintNode],
};
