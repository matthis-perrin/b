import {execSync} from 'node:child_process';
import {rmSync} from 'node:fs';
import {join} from 'node:path';

import {underline} from 'ansi-colors';
import {Configuration, Stats, webpack} from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import {registerExitCallback} from '@src/exit_handler';
import {exists, writeRawFile} from '@src/fs';
import {globalError} from '@src/global_error';
import {error, log} from '@src/logger';
import {ProjectName, ProjectType, WorkspaceFragment} from '@src/models';
import {getProjectsFromWorkspaceFragment, WorkspaceProject} from '@src/project/generate_workspace';
import {readWorkspace} from '@src/project/vscode_workspace';
import {neverHappens, removeUndefined} from '@src/type_utils';
import {
  FullLambdaServerEvent,
  LambdaServerEvent,
  LambdaServerStartEvent,
} from '@src/webpack/plugins/lambda_server_plugin';
import {
  FullWebpackDevServerEvent,
  WebpackDevServerStartEvent,
} from '@src/webpack/plugins/webpack_dev_server';
import {getEnv, getPort} from '@src/webpack/utils';
import {generateEnvFile} from '@src/webpack-runner/env_definition_file';
import {groupAndSortErrors} from '@src/webpack-runner/error_grouper';
import {ParsedError, parseError} from '@src/webpack-runner/error_parser';
import {getLocalIp} from '@src/webpack-runner/ip';
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

let globalRoot = '';
function exit(): void {
  rmSync(join(globalRoot, '.build.lock'), {force: true});
  process.stdin.setRawMode(false);
  log('See you soon!');
  // eslint-disable-next-line node/no-process-exit
  process.exit(0);
}

export async function runWebpacks(opts: RunWebpacksOptions): Promise<void> {
  const {root, workspaceFragments, watch} = opts;
  const statuses = new Map<ProjectName, ProjectStatus>();
  const projects = workspaceFragments.flatMap(f => getProjectsFromWorkspaceFragment(f));

  async function regenerateEnvFile(): Promise<void> {
    const overrides: Record<string, string> = {};
    if (getEnv() === 'development') {
      for (const {projectName, type} of projects) {
        if (type === ProjectType.LambdaApi || type === ProjectType.LambdaWebApi) {
          const status = statuses.get(projectName);
          const port =
            status?.lambdaServerEvents.startEvent?.port ?? getPort(join(root, projectName));
          overrides[`${projectName.toUpperCase()}_URL`] = `http://${getLocalIp()}:${port}/`;
        }
        if (type === ProjectType.Web) {
          const status = statuses.get(projectName);
          const port =
            status?.webpackDevServerEvents.startEvent?.port ?? getPort(join(root, projectName));
          overrides[`${projectName.toUpperCase()}_CLOUDFRONT_DOMAIN_NAME`] =
            `${getLocalIp()}:${port}`;
        }
      }
    }
    await generateEnvFile(root, overrides);
  }
  await regenerateEnvFile();

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
    onChange({isCompleted: false, projectName});
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
    onChange({isCompleted: false, projectName});
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
    log(table(summary));
    if (report.length > 0) {
      log(`\nBuild completed with ${renderErrorWarningCount(errors)}\n`);
      log(report);
    }
  }

  const completed = new Set<ProjectName>();
  function onChange(opts: {projectName: ProjectName; isCompleted: boolean}): void {
    if (watch) {
      redraw();
      return;
    }

    const {projectName, isCompleted} = opts;
    if (isCompleted) {
      completed.add(projectName);
    }
    const allDone = [...statuses.keys()].every(projectName => completed.has(projectName));
    if (!allDone) {
      return;
    }

    const errors = [...statuses.values()].flatMap(v => v.errors);
    const {globalErrors} = groupAndSortErrors(errors);
    const noGlobalErrors =
      globalErrors.length === 0 &&
      [...statuses.values()].every(status => status.compilationFailure === undefined);
    if (noGlobalErrors) {
      resolve();
    } else {
      reject();
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

      function updateStatus(fn: (curr: ProjectStatus) => void): void {
        let current = statuses.get(projectName);
        if (!current) {
          current = intialStatus;
          statuses.set(projectName, current);
        }
        fn(current);
      }

      function reportCompilationFailure(error: string): void {
        updateStatus(curr => {
          curr.compilationFailure = error;
        });
      }

      statuses.set(projectName, intialStatus);
      // eslint-disable-next-line import/dynamic-import-chunkname, node/no-unsupported-features/es-syntax
      const config = await import(/*webpackIgnore: true*/ join(projectPath, 'webpack.config.js'))
        .then(({getConfig}) => getConfig({context: projectPath, watch}) as Configuration)
        .catch((err: unknown) => {
          reportCompilationFailure(String(err));
          return undefined;
        });

      const updateLambdaServerEvents = (fn: (curr: LambdaServerEvents) => void): void => {
        updateStatus(curr => fn(curr.lambdaServerEvents));
      };

      const updateWebpackDevServerEvents = (fn: (curr: WebpackDevServerEvents) => void): void => {
        updateStatus(curr => fn(curr.webpackDevServerEvents));
      };

      // Read events in the lambda server logs to update the globalInfo
      let lastProcessedLambdaLog = Date.now();
      const tailLambdaServerCleanup = watch
        ? readLines(join(projectPath, 'log', 'lambda_server_runtime.txt'), lines => {
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
                // Send and forget
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                regenerateEnvFile();
              } else {
                updateLambdaServerEvents(curr => {
                  curr.lastEvent = log;
                });
              }
            }
            if (shouldRedraw) {
              redraw();
            }
          })
        : undefined;

      // Read events in the webpack dev server logs to update the globalInfo
      let lastProcessedDevServerLog = Date.now();
      const tailWebpackServerCleanup = watch
        ? readLines(join(projectPath, 'log', 'webpack_dev_server.txt'), lines => {
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
          })
        : undefined;

      if (!config) {
        return;
      }

      const compiler = webpack({...config, watch}, (err: Error | null, res?: Stats) => {
        if (err || !res) {
          reportCompilationFailure(err ? String(err) : 'No result after compilation');
          if (!watch) {
            onChange({isCompleted: true, projectName});
            resolve();
            return;
          }
        }
        onChange({isCompleted: true, projectName});
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
          const closeCompiler = (): void => {
            tailLambdaServerCleanup?.();
            tailWebpackServerCleanup?.();
            compiler.close(err => (err ? reject(err) : resolve()));
          };
          if (devServer) {
            devServer
              .stop()
              .then(closeCompiler)
              .catch((err: unknown) => {
                reject(err instanceof Error ? err : new Error(String(err)));
              });
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
    await Promise.all(cleanupFunctions.map(async fn => fn?.()));
    redraw();
    rmSync(join(globalRoot, '.build.lock'));
    process.stdin.setRawMode(false);
  };

  const reject = (err?: unknown): void => {
    cleanup()
      .then(() => rejectPromise(err))
      .catch((cleanupErr: unknown) => {
        globalError('webpack runner cleanup error', cleanupErr);
        rejectPromise(err);
      });
  };
  const resolve = (): void => {
    cleanup()
      .then(resolvePromise)
      .catch((cleanupErr: unknown) => {
        globalError('webpack runner cleanup error', cleanupErr);
        resolvePromise();
      });
  };

  if (watch) {
    process.stdin.setRawMode(true);
    process.stdin.on('data', data => {
      const str = data.toString();
      // Handle ctrl+c
      if (str === '\u0003') {
        console.log('ctrl-c received, cleaning up...');
        cleanup()
          .then(() => {
            process.emit('SIGINT', 'SIGINT');
          })
          .catch(() => {
            process.emit('SIGINT', 'SIGINT');
          });
      } else if (str === 'o') {
        const errorPaths = removeUndefined(
          [...statuses.values()]
            .flatMap(status => status.errors)
            .map(err => ('loc' in err ? err.loc.absolutePath : undefined))
        );
        const files = [...new Set([...errorPaths]).values()];
        const openCommand = `code ${files.join(' ')}`;
        execSync(openCommand);
      }
    });

    process.on('SIGINT', () => {
      exit();
    });
    process.on('beforeExit', () => {
      exit();
    });

    // Handle uncaught error and exceptions
    process.on('uncaughtException', err => {
      error('Uncaught Exception');
      error(err);
      exit();
    });

    // Handle unhandled failing promises
    process.on('unhandledRejection', err => {
      error('Unhandled Rejection');
      error(err);
      exit();
    });
  }

  registerExitCallback(cleanup);
  return globalPromise;
}

export async function runAllWebpacks(
  options: Omit<RunWebpacksOptions, 'projectPaths'>
): Promise<void> {
  const {root, watch} = options;
  globalRoot = root;

  // Take a lock to ensure nothing else is running
  const lockFilePath = join(root, '.build.lock');
  const isLocked = await exists(lockFilePath);
  if (isLocked) {
    throw new Error(`File ${lockFilePath} already exists. Is another build running?`);
  } else {
    await writeRawFile(lockFilePath, '');
  }

  const {fragments} = (await readWorkspace(root)) ?? {};
  if (!fragments) {
    throw new Error(`No workspace projects at path ${root}`);
  }
  await runWebpacks({
    root,
    workspaceFragments: fragments,
    watch,
  });
}
