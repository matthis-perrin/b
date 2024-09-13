import {bgRed, bgYellow, cyan, gray, green, underline} from 'ansi-colors';

import {log} from '@src/logger';
import {ProjectName} from '@src/models';
import {WorkspaceProject} from '@src/project/generate_workspace';
import {formatError, formatFilePath, formatProject} from '@src/webpack-runner/error_formatter';
import {groupAndSortErrors, GroupedErrors} from '@src/webpack-runner/error_grouper';
import {ParsedError} from '@src/webpack-runner/error_parser';
import {IconServer} from '@src/webpack-runner/icon_server';
import {getLocalIp} from '@src/webpack-runner/ip';
import {ProjectStatus} from '@src/webpack-runner/runner';
import {table} from '@src/webpack-runner/text_table';

export function render(opts: {
  watch: boolean;
  statuses: Map<ProjectName, ProjectStatus>;
  iconServer: IconServer | undefined;
}): void {
  const {watch, statuses, iconServer} = opts;
  const errors = [...statuses.values()].flatMap(v => v.errors);
  const groupedErrors = groupAndSortErrors(errors);

  const summary = [...statuses.values()].map(status => {
    return renderProjectStatus(status.project, status.build, status.deploy, groupedErrors);
  });
  summary.unshift([
    underline(`Projects (${statuses.size})`),
    underline('Build'),
    underline('Deploy'),
    underline(''),
  ]);
  const report = renderErrors(groupedErrors);

  if (watch) {
    process.stdout.write('\u001B[2J\u001B[3J\u001B[H'); // clear terminal
  }
  log(table(summary));
  if (iconServer?.hasIcons) {
    log(`icons: http://${getLocalIp()}:${iconServer.port}`);
  }
  if (report.length > 0) {
    log(`\nBuild completed with ${renderErrorWarningCount(errors)}\n`);
    log(report);
  }
}

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

const timeSuffix = (val: {startTs?: number; endTs?: number}): string => {
  const {startTs, endTs} = val;
  if (startTs === undefined) {
    return '';
  }
  if (endTs === undefined) {
    return ` ${gray(`${Math.floor((Date.now() - startTs) / 1000).toLocaleString()}s`)}`;
  }
  return ` ${gray(`${Math.floor((endTs - startTs) / 1000).toLocaleString()}s`)}`;
};

export function renderProjectStatus(
  project: WorkspaceProject,
  build: ProjectStatus['build'],
  deploy: ProjectStatus['deploy'],
  errors: GroupedErrors
): string[] {
  // #1 Column (project name)
  const column1 = formatProject(project);

  // #2 Column (build status)
  let column2 = '';
  const projectErrors = errors.errorsByProjectByFile.get(project.projectName);
  if (build.status === 'pending') {
    column2 = '';
  } else if (build.status === 'in-progress') {
    column2 = gray('in progress');
  }
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  else if (build.status === 'done') {
    column2 =
      build.err !== undefined
        ? bgRed.whiteBright(build.err)
        : projectErrors
          ? renderErrorWarningCount([...projectErrors.values()].flat())
          : green('success');
  }
  column2 += timeSuffix(build);

  // #3 Column (deploy status)
  let column3 = '';
  if (deploy.status === 'pending') {
    column3 = '';
  } else if (deploy.status === 'in-progress') {
    column3 = gray('in progress');
  }
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  else if (deploy.status === 'done') {
    column3 = deploy.err !== undefined ? bgRed.whiteBright(deploy.err) : green('success');
  }
  column3 += timeSuffix(deploy);

  // #4 column (URL)
  const column4 = deploy.url ?? '';

  return [column1, column2, column3, column4];
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
