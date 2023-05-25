import {readdir} from 'node:fs/promises';
import {join, relative} from 'node:path';

import {underline} from 'ansi-colors';
import {Configuration, Stats, webpack} from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import {exists} from '@src/fs';
import {neverHappens} from '@src/type_utils';
import {
  FullLambdaServerEvent,
  LambdaServerEvent,
  LambdaServerStartEvent,
} from '@src/webpack/plugins/lambda_server_plugin';
import {
  FullWebpackDevServerEvent,
  WebpackDevServerStartEvent,
} from '@src/webpack/plugins/webpack_dev_server';
import {groupAndSortErrors} from '@src/webpack-runner/error_grouper';
import {ParsedError, parseError} from '@src/webpack-runner/error_parser';
import {readLines} from '@src/webpack-runner/line_reader';
import {
  renderErrors,
  renderErrorWarningCount,
  renderProjectStatus,
} from '@src/webpack-runner/renderer';
import {table} from '@src/webpack-runner/text_table';

interface RunWebpacksOptions {
  root: string;
  projectPaths: string[];
  watch: boolean;
}

export interface LambdaServerEvents {
  startEvent?: LambdaServerStartEvent;
  lastEvent?: Exclude<LambdaServerEvent, LambdaServerStartEvent>;
}

export interface WebpackDevServerEvents {
  startEvent?: WebpackDevServerStartEvent;
  // lastEvent?: Exclude<WebpackDevServerEvent, WebpackDevServerStartEvent>;
}

interface ProjectStatus {
  firstRun: boolean;
  isRunning: boolean;
  errors: ParsedError[];
  compilationFailure?: string;
  lambdaServerEvents: LambdaServerEvents;
  webpackDevServerEvents: WebpackDevServerEvents;
}

const name = 'WebpackRunner';

export async function runWebpacks(opts: RunWebpacksOptions): Promise<void> {
  const {root, projectPaths, watch} = opts;
  const statuses = new Map<string, ProjectStatus>();

  function handleStart(project: string): void {
    const current = statuses.get(project) ?? {
      firstRun: true,
      isRunning: true,
      errors: [],
      lambdaServerEvents: {},
      webpackDevServerEvents: {},
    };
    statuses.set(project, {...current, isRunning: true});
    onChange();
  }

  function handleResults(project: string, stats: Stats): void {
    const errors = [
      ...stats.compilation.errors.map(err => parseError(err, {root, severity: 'error'})),
      ...stats.compilation.warnings.map(warn => parseError(warn, {root, severity: 'warning'})),
    ];
    const lambdaServerEvents = statuses.get(project)?.lambdaServerEvents ?? {};
    const webpackDevServerEvents = statuses.get(project)?.webpackDevServerEvents ?? {};
    const compilationFailure = statuses.get(project)?.compilationFailure;
    statuses.set(project, {
      firstRun: false,
      isRunning: false,
      errors,
      compilationFailure,
      lambdaServerEvents,
      webpackDevServerEvents,
    });
    onChange();
  }

  function redraw(): void {
    const errors = [...statuses.values()].flatMap(v => v.errors);
    const groupedErrors = groupAndSortErrors(errors);

    const summary = [...statuses.entries()].map(([projectPath, status]) =>
      renderProjectStatus(
        projectPath,
        status.firstRun,
        status.isRunning,
        groupedErrors,
        status.compilationFailure,
        status.lambdaServerEvents,
        status.webpackDevServerEvents
      )
    );
    summary.unshift([
      underline(`Projects (${projectPaths.length})`),
      underline('Status'),
      underline('Run'),
    ]);
    const report = renderErrors(groupedErrors);

    if (watch) {
      process.stdout.write('\u001B[2J\u001B[3J\u001B[H'); // clear terminal
    }
    console.log(table(summary));
    if (report.length > 0) {
      console.log(`\nBuild completed with ${renderErrorWarningCount(errors)}\n`);
      console.log(report);
    }
  }

  function onChange(): void {
    if (watch) {
      redraw();
    } else {
      const allDone = [...statuses.values()].every(status => !status.isRunning);
      if (allDone) {
        const errors = [...statuses.values()].flatMap(v => v.errors);
        const {globalErrors} = groupAndSortErrors(errors);

        const noGlobalErrors =
          globalErrors.length === 0 &&
          [...statuses.values()].every(status => status.compilationFailure === undefined);
        redraw();
        // eslint-disable-next-line node/no-process-exit
        process.exit(noGlobalErrors ? 0 : 1);
      }
    }
  }

  for (const projectPath of projectPaths.sort((p1, p2) => p1.localeCompare(p2))) {
    const projectName = relative(root, projectPath);
    const intialStatus = {
      firstRun: true,
      isRunning: true,
      errors: [],
      lambdaServerEvents: {},
      webpackDevServerEvents: {},
    };
    statuses.set(projectName, intialStatus);
    // eslint-disable-next-line import/dynamic-import-chunkname, node/no-unsupported-features/es-syntax, no-await-in-loop
    const config: Configuration = await import(
      /*webpackIgnore: true*/ join(projectPath, 'webpack.config.js')
    ).then(({getConfig}) => getConfig({context: projectPath, watch}));

    // eslint-disable-next-line unicorn/consistent-function-scoping
    const reportCompilationFailure = (error: string): void => {
      updateStatus(curr => {
        curr.compilationFailure = error;
      });
    };
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const updateLambdaServerEvents = (fn: (curr: LambdaServerEvents) => void): void => {
      updateStatus(curr => fn(curr.lambdaServerEvents));
    };
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const updateWebpackDevServerEvents = (fn: (curr: WebpackDevServerEvents) => void): void => {
      updateStatus(curr => fn(curr.webpackDevServerEvents));
    };
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const updateStatus = (fn: (curr: ProjectStatus) => void): void => {
      let current = statuses.get(projectName);
      if (!current) {
        current = intialStatus;
        statuses.set(projectName, current);
      }
      fn(current);
    };

    // Read events in the lambda server logs to update the globalInfo
    let lastProcessedLambdaLog = Date.now();
    readLines(join(projectPath, 'log', 'lambda_server_runtime.txt'), lines => {
      const logs = lines
        .map(l => l.trim())
        .filter(l => l.length > 0)
        .map(l => JSON.parse(l) as FullLambdaServerEvent);
      let shouldRedraw = false;
      for (const log of logs) {
        const date = new Date(log.t).getTime();
        if (date < lastProcessedLambdaLog) {
          continue;
        }
        lastProcessedLambdaLog = date;
        shouldRedraw = true;
        if (log.event === 'start') {
          updateLambdaServerEvents(curr => {
            curr.startEvent = log;
          });
        } else {
          updateLambdaServerEvents(curr => {
            curr.lastEvent = log;
          });
        }
      }
      if (shouldRedraw) {
        redraw();
      }
    });

    // Read events in the webpack dev server logs to update the globalInfo
    let lastProcessedDevServerLog = Date.now();
    readLines(join(projectPath, 'log', 'webpack_dev_server.txt'), lines => {
      const logs = lines
        .map(l => l.trim())
        .filter(l => l.length > 0)
        .map(l => JSON.parse(l) as FullWebpackDevServerEvent);
      let shouldRedraw = false;
      for (const log of logs) {
        const date = new Date(log.t).getTime();
        if (date < lastProcessedDevServerLog) {
          continue;
        }
        lastProcessedDevServerLog = date;
        shouldRedraw = true;
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (log.event === 'start') {
          updateWebpackDevServerEvents(curr => {
            curr.startEvent = log;
          });
        } else {
          neverHappens(log.event);
          //   updateWebpackDevServerEvents(curr => {
          //     curr.lastEvent = log;
          //   });
        }
      }
      if (shouldRedraw) {
        redraw();
      }
    });

    const compiler = webpack({...config, watch}, (err?: Error, res?: Stats) => {
      if (err || !res) {
        reportCompilationFailure(err ? String(err) : 'No result after compilation');
        if (!watch) {
          onChange();
          // eslint-disable-next-line node/no-process-exit
          process.exit(1);
        }
      }
      onChange();
    });
    compiler.hooks.beforeRun.tap(name, () => handleStart(projectName));
    compiler.hooks.watchRun.tap(name, () => handleStart(projectName));
    compiler.hooks.done.tap(name, stats => handleResults(projectName, stats));

    if (config.devServer) {
      new WebpackDevServer(config.devServer, compiler).start();
    }
  }
}

export async function runAllWebpacks(
  options: Omit<RunWebpacksOptions, 'projectPaths'>
): Promise<void> {
  const {root, watch} = options;
  const rootFiles = await readdir(root, {withFileTypes: true});
  const dirs = rootFiles.filter(ent => ent.isDirectory()).map(dir => join(root, dir.name));
  const packages = await Promise.all(
    dirs.map(async dir => ((await exists(join(dir, 'package.json'))) ? dir : undefined))
  );
  await runWebpacks({
    root,
    projectPaths: packages.filter((p): p is string => p !== undefined),
    watch,
  });
}
