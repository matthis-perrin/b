import {join} from 'node:path';

import {underline} from 'ansi-colors';
import {Configuration, Stats, webpack} from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import {globalError} from '@src/global_error';
import {ProjectName, WorkspaceFragment} from '@src/models';
import {getProjectsFromWorkspaceFragment, WorkspaceProject} from '@src/project/generate_workspace';
import {readProjectsFromWorkspace} from '@src/project/vscode_workspace';
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
import {generateEnvDefinitionFile} from '@src/webpack-runner/env_definition_file';
import {groupAndSortErrors} from '@src/webpack-runner/error_grouper';
import {ParsedError, parseError} from '@src/webpack-runner/error_parser';
import {registerExitCallback} from '@src/webpack-runner/exit_handler';
import {readLines} from '@src/webpack-runner/line_reader';
import {
  renderErrors,
  renderErrorWarningCount,
  renderProjectStatus,
} from '@src/webpack-runner/renderer';
import {table} from '@src/webpack-runner/text_table';

interface RunWebpacksOptions {
  root: string;
  workspaceFragments: WorkspaceFragment[];
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
  project: WorkspaceProject;
  firstRun: boolean;
  isRunning: boolean;
  errors: ParsedError[];
  compilationFailure?: string;
  lambdaServerEvents: LambdaServerEvents;
  webpackDevServerEvents: WebpackDevServerEvents;
}

const name = 'WebpackRunner';

export async function runWebpacks(opts: RunWebpacksOptions): Promise<void> {
  const {root, workspaceFragments, watch} = opts;
  const statuses = new Map<ProjectName, ProjectStatus>();
  const projects = workspaceFragments.flatMap(getProjectsFromWorkspaceFragment);

  const env = await generateEnvDefinitionFile();
  for (const [key, val] of Object.entries(env)) {
    // eslint-disable-next-line node/no-process-env
    process.env[`MATTHIS_${key}`] = val;
  }

  function handleStart(project: WorkspaceProject): void {
    const {projectName} = project;
    const current = statuses.get(projectName) ?? {
      project,
      firstRun: true,
      isRunning: true,
      errors: [],
      lambdaServerEvents: {},
      webpackDevServerEvents: {},
    };
    statuses.set(projectName, {...current, isRunning: true});
    onChange();
  }

  function handleResults(project: WorkspaceProject, stats: Stats): void {
    const {projectName} = project;
    const errors = [
      ...stats.compilation.errors.map(err => parseError(err, {root, severity: 'error'})),
      ...stats.compilation.warnings.map(warn => parseError(warn, {root, severity: 'warning'})),
    ];
    const lambdaServerEvents = statuses.get(projectName)?.lambdaServerEvents ?? {};
    const webpackDevServerEvents = statuses.get(projectName)?.webpackDevServerEvents ?? {};
    const compilationFailure = statuses.get(projectName)?.compilationFailure;
    statuses.set(projectName, {
      project,
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

    const summary = [...statuses.values()].map(status => {
      return renderProjectStatus(
        status.project,
        status.firstRun,
        status.isRunning,
        groupedErrors,
        status.compilationFailure,
        status.lambdaServerEvents,
        status.webpackDevServerEvents
      );
    });
    summary.unshift([
      underline(`Projects (${projects.length})`),
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
        if (noGlobalErrors) {
          resolve();
        } else {
          reject();
        }
      }
    }
  }

  const cleanupFunctions = await Promise.all(
    projects.map(async project => {
      const {projectName} = project;
      const projectPath = join(root, projectName);
      const intialStatus = {
        project,
        firstRun: true,
        isRunning: true,
        errors: [],
        lambdaServerEvents: {},
        webpackDevServerEvents: {},
      };
      statuses.set(projectName, intialStatus);
      // eslint-disable-next-line import/dynamic-import-chunkname, node/no-unsupported-features/es-syntax
      const config: Configuration = await import(
        /*webpackIgnore: true*/ join(projectPath, 'webpack.config.js')
      ).then(({getConfig}) => getConfig({context: projectPath, watch}));

      const reportCompilationFailure = (error: string): void => {
        updateStatus(curr => {
          curr.compilationFailure = error;
        });
      };

      const updateLambdaServerEvents = (fn: (curr: LambdaServerEvents) => void): void => {
        updateStatus(curr => fn(curr.lambdaServerEvents));
      };

      const updateWebpackDevServerEvents = (fn: (curr: WebpackDevServerEvents) => void): void => {
        updateStatus(curr => fn(curr.webpackDevServerEvents));
      };

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
            resolve();
          }
        }
        onChange();
      });
      compiler.hooks.beforeRun.tap(name, () => handleStart(project));
      compiler.hooks.watchRun.tap(name, () => handleStart(project));
      compiler.hooks.done.tap(name, stats => handleResults(project, stats));

      let devServer: WebpackDevServer | undefined;
      if (config.devServer) {
        devServer = new WebpackDevServer(config.devServer, compiler);
        await devServer.start();
      }
      return async (): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
          const closeCompiler = (): void => compiler.close(err => (err ? reject(err) : resolve()));
          if (devServer) {
            devServer.stop().then(closeCompiler).catch(reject);
          } else {
            closeCompiler();
          }
        });
      };
    })
  );

  let resolvePromise: () => void;
  let rejectPromise: (err?: unknown) => void;
  const globalPromise = new Promise<void>((resolve, reject) => {
    resolvePromise = resolve;
    rejectPromise = reject;
  });

  let cleanupCalled = false;
  const cleanup = async (): Promise<void> => {
    if (cleanupCalled) {
      return;
    }
    cleanupCalled = true;
    await Promise.all(cleanupFunctions);
  };

  const reject = (err?: unknown): void => {
    cleanup()
      .then(() => rejectPromise(err))
      .catch(cleanupErr => {
        globalError('webpack runner cleanup error', cleanupErr);
        rejectPromise(err);
      });
  };
  const resolve = (): void => {
    cleanup()
      .then(resolvePromise)
      .catch(cleanupErr => {
        globalError('webpack runner cleanup error', cleanupErr);
        resolvePromise();
      });
  };

  registerExitCallback(cleanup);
  return globalPromise;
}

export async function runAllWebpacks(
  options: Omit<RunWebpacksOptions, 'projectPaths'>
): Promise<void> {
  const {root, watch} = options;

  const workspaceFragments = await readProjectsFromWorkspace(root);
  if (!workspaceFragments) {
    throw new Error(`No workspace projects at path ${root}`);
  }
  await runWebpacks({
    root,
    workspaceFragments,
    watch,
  });
}
