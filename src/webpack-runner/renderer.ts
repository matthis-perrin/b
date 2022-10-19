import {bgRed, bgYellow, gray, green} from 'ansi-colors';

import {formatError, formatFilePath, formatProject} from '@src/webpack-runner/error_formatter';
import {GroupedErrors} from '@src/webpack-runner/error_grouper';

export function renderErrors(errors: GroupedErrors): string {
  const {errorsByProjectByFile, globalErrors} = errors;
  const blocks: string[] = [];

  for (const globalError of globalErrors) {
    blocks.push(formatError(globalError));
  }

  for (const [project, projectErrors] of errorsByProjectByFile.entries()) {
    blocks.push(formatProject(project));
    for (const [file, errors] of projectErrors.entries()) {
      blocks.push([formatFilePath(file), ...errors.map(err => formatError(err))].join('\n'));
    }
  }

  return blocks.join('\n\n');
}

export function renderProjectStatus(
  name: string,
  firstRun: boolean,
  isRunning: boolean,
  errors: GroupedErrors
): string {
  const out = [formatProject(name)];

  const projectErrors = errors.errorsByProjectByFile.get(name);
  if (projectErrors) {
    const all = [...projectErrors.values()];
    const errorCount = all.flatMap(errors => errors.filter(err => err.severity === 'error')).length;
    const warnCount = all.flatMap(warns => warns.filter(err => err.severity === 'warning')).length;

    if (errorCount > 0) {
      const plural = errorCount > 1 ? 's' : '';
      out.push(bgRed.whiteBright(` ${errorCount} error${plural} `));
    }
    if (warnCount > 0) {
      const plural = warnCount > 1 ? 's' : '';
      out.push(bgYellow.whiteBright(` ${warnCount} warning${plural} `));
    }
  } else if (!firstRun) {
    out.push(green('success'));
  }

  if (isRunning) {
    out.push(gray(' in progress'));
  }

  return out.join(' ');
}
