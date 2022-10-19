import {cyan, gray, red, underline, yellow} from 'ansi-colors';

import {ErrorSeverity, ErrorType, ParsedError} from '@src/webpack-runner/error_parser';

export function formatProject(project: string): string {
  return cyan(project);
}

export function formatFilePath(filePath: string): string {
  return underline(filePath);
}

function formatMessage(msg: string, severity: ErrorSeverity): string {
  return severity === 'warning' ? yellow(msg) : red(msg);
}

const padLeft = (value: string, size: number): string =>
  value.length >= size ? value : padLeft(` ${value}`, size);
const padRight = (value: string, size: number): string =>
  value.length >= size ? value : padRight(`${value} `, size);

function formatLocation(loc?: {line: number; column?: number}): string {
  const {line, column} = loc ?? {};
  const padValue = 3;
  const lineStr = String(line ?? '');
  const columnStr = String(column ?? '');
  if (lineStr.length === 0 && columnStr.length === 0) {
    return padLeft('', 2 * padValue + 1);
  }
  return gray(`${padLeft(lineStr, padValue)}:${padRight(columnStr, padValue)}`);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function formatLabel(code: string, type: ErrorType): string {
  return gray(code);
}

export function formatError(err: ParsedError): string {
  if ('type' in err) {
    return `${formatLocation(err.loc.start)} ${formatMessage(
      err.message,
      err.severity
    )} ${formatLabel(err.code, err.type)}`;
  }
  return `[${err.severity}] ${err.message}`;
}
