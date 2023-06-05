import {bgRed, bgYellow, cyan, gray, green, red} from 'ansi-colors';

import {WorkspaceProject} from '@src/project/generate_workspace';
import {neverHappens} from '@src/type_utils';
import {LambdaServerEvent} from '@src/webpack/plugins/lambda_server_plugin';
import {WebpackDevServerEvent} from '@src/webpack/plugins/webpack_dev_server';
import {formatError, formatFilePath, formatProject} from '@src/webpack-runner/error_formatter';
import {GroupedErrors} from '@src/webpack-runner/error_grouper';
import {ParsedError} from '@src/webpack-runner/error_parser';
import {LambdaServerEvents, WebpackDevServerEvents} from '@src/webpack-runner/runner';

export function renderErrors(errors: GroupedErrors): string {
  const {errorsByProjectByFile, globalErrors} = errors;
  const blocks: string[] = [];

  for (const globalError of globalErrors) {
    blocks.push(formatError(globalError));
  }

  for (const [projectName, projectErrors] of errorsByProjectByFile.entries()) {
    blocks.push(cyan(projectName));
    for (const [file, errors] of projectErrors.entries()) {
      blocks.push([formatFilePath(file), ...errors.map(err => formatError(err))].join('\n'));
    }
  }

  return blocks.join('\n\n');
}

export function renderProjectStatus(
  project: WorkspaceProject,
  firstRun: boolean,
  isRunning: boolean,
  errors: GroupedErrors,
  compilationFailure: string | undefined,
  lambdaServerEvents: LambdaServerEvents,
  webpackDevServerEvents: WebpackDevServerEvents
): string[] {
  // First column
  const column1 = formatProject(project);

  // Second column
  let column2 = '';
  const projectErrors = errors.errorsByProjectByFile.get(project.projectName);
  if (projectErrors) {
    column2 = renderErrorWarningCount([...projectErrors.values()].flat());
  } else if (!firstRun) {
    column2 = green('success');
  } else if (isRunning) {
    column2 = gray('in progress');
  }

  // Third column
  const column3: string[] = [];
  if (lambdaServerEvents.startEvent) {
    column3.push(renderLambdaServerEvent(lambdaServerEvents.startEvent));
  }
  if (webpackDevServerEvents.startEvent) {
    column3.push(renderWebpackDevServerEvent(webpackDevServerEvents.startEvent));
  }
  if (compilationFailure !== undefined) {
    column3.push(red(compilationFailure));
  }
  if (lambdaServerEvents.lastEvent) {
    column3.push(renderLambdaServerEvent(lambdaServerEvents.lastEvent));
  }

  return [column1, column2, column3.join(' ')];
}

export function renderErrorWarningCount(errors: ParsedError[]): string {
  const errorCount = errors.filter(err => err.severity === 'error').length;
  const warnCount = errors.filter(err => err.severity === 'warning').length;
  const diag: string[] = [];

  if (errorCount > 0) {
    const plural = errorCount > 1 ? 's' : '';
    diag.push(bgRed.whiteBright(` ${errorCount} error${plural} `));
  }
  if (warnCount > 0) {
    const plural = warnCount > 1 ? 's' : '';
    diag.push(bgYellow.whiteBright(` ${warnCount} warning${plural} `));
  }
  return diag.join(' ');
}

export function renderLambdaServerEvent(event: LambdaServerEvent): string {
  const type = event.event;
  if (type === 'start') {
    return `http://localhost:${event.port}`;
  }
  const req = gray(`${event.method} ${event.path}`);
  if (type === 'error') {
    return `${req} ${red(event.err)}`;
  } else if (type === 'request') {
    return `${req} ${gray('running lambda...')}`;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  } else if (type === 'response') {
    const httpCode = `[HTTP ${event.statusCode}]`;
    const size = `[${event.byteLength.toLocaleString()}b]`;
    const duration = `[${event.duration.toLocaleString()}ms]`;
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const color = event.statusCode >= 400 ? red : green;
    return `${req} ${color(`${httpCode} ${size} ${duration}`)}`;
  }
  neverHappens(type);
}

export function renderWebpackDevServerEvent(event: WebpackDevServerEvent): string {
  const type = event.event;
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (type === 'start') {
    return `http://localhost:${event.port}`;
  }
  // const req = gray(`${event.method} ${event.path}`);
  // if (type === 'error') {
  //   return `${req} ${red(event.err)}`;
  // } else if (type === 'request') {
  //   return `${req} ${gray('running lambda...')}`;
  //   // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  // } else if (type === 'response') {
  //   const httpCode = `[HTTP ${event.statusCode}]`;
  //   const size = `[${event.byteLength.toLocaleString()}b]`;
  //   const duration = `[${event.duration.toLocaleString()}ms]`;
  //   // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  //   const color = event.statusCode >= 400 ? red : green;
  //   return `${req} ${color(`${httpCode} ${size} ${duration}`)}`;
  // }
  neverHappens(type);
}
