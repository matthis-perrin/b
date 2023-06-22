import {relative, sep} from 'node:path';

import {Issue} from 'fork-ts-checker-webpack-plugin/lib/issue';
import {WebpackError} from 'webpack';

import {EslintWebpackError} from '@src/webpack/plugins/eslint_plugin';

export type ErrorSeverity = 'warning' | 'error';
export type ErrorType = 'eslint' | 'tsc' | 'module-not-found';

export interface DetailedError {
  project: string;
  type: 'eslint' | 'tsc' | 'module-not-found';
  severity: ErrorSeverity;
  message: string;
  code: string;
  loc: {
    relativePath: string;
    absolutePath: string;
    start?: {
      line: number;
      column?: number;
    };
    end?: {
      line: number;
      column?: number;
    };
  };
}

export interface GlobalError {
  severity: ErrorSeverity;
  message: string;
}

export type ParsedError = DetailedError | GlobalError;

function parseFilePath(root: string, path: string): {project: string; relativePath: string} {
  const relativePath = relative(root, path);
  const project = relativePath.split(sep)[0] ?? '';
  return {project, relativePath};
}

export function parseError(
  err: WebpackError,
  opts: {root: string; severity: ErrorSeverity}
): ParsedError {
  const {root, severity} = opts;
  if (err.name === 'EslintWebpackError') {
    const eslintError = err as EslintWebpackError;
    const absolutePath = err.file;
    if (absolutePath === undefined) {
      return {severity, message: err.message};
    }
    const {relativePath, project} = parseFilePath(root, absolutePath);
    return {
      project,
      type: 'eslint',
      severity,
      message: err.message,
      code: eslintError.ruleId,
      loc: {
        relativePath,
        absolutePath,
        start: err.loc && 'start' in err.loc ? err.loc.start : undefined,
        end: err.loc && 'end' in err.loc ? err.loc.end : undefined,
      },
    };
  } else if ('issue' in err) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const issue = (err as any)['issue'] as Issue;
    const absolutePath = issue.file;
    if (absolutePath === undefined) {
      return {severity, message: err.message};
    }
    const {relativePath, project} = parseFilePath(root, absolutePath);
    return {
      project,
      type: 'tsc',
      severity,
      message: issue.message,
      code: issue.code,
      loc: {
        relativePath,
        absolutePath,
        ...issue.location,
      },
    };
  } else if (err.name === 'ModuleNotFoundError') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const msg = (err as any).error.message as string;
    const match = /(?<msg>Can't resolve '[^']+') in '(?<file>[^']+)'/u.exec(msg);

    if (!match) {
      return {severity, message: err.message};
    }
    const absolutePath = match[2];
    const message = match[1];
    if (absolutePath === undefined || message === undefined) {
      return {severity, message: err.message};
    }
    const {relativePath, project} = parseFilePath(root, absolutePath);
    return {
      project,
      type: 'tsc',
      severity,
      message,
      loc: {
        relativePath,
        absolutePath,
      },
    };
  }
  return {severity, message: err.message};
}
