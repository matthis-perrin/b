import {eslintComments} from './eslint_comments';
import {eslintCore} from './eslint_core';
import {eslintImport} from './eslint_import';
import {eslintNoNull} from './eslint_no_null';
import {eslintNode} from './eslint_node';
import {eslintPrettier} from './eslint_prettier';
import {eslintReact} from './eslint_react';
import {eslintReactHooks} from './eslint_react_hooks';
import {eslintSimpleImportSort} from './eslint_simple_import_sort';
import {eslintTypescript} from './eslint_typescript';
import {eslintUnicorn} from './eslint_unicorn';
import {EslintMetadata} from '../models';
import {ProjectType} from '../../models';

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

export const PLUGINS_FOR_TYPE: Record<ProjectType, EslintMetadata[]> = {
  [ProjectType.Web]: [...BASE_PLUGINS, eslintReact, eslintReactHooks],
  [ProjectType.Node]: [...BASE_PLUGINS, eslintNode],
  [ProjectType.Lib]: [...BASE_PLUGINS],
};
