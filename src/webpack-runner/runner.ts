import {execSync} from 'node:child_process';
import {join} from 'node:path';

import {Configuration, Stats, webpack} from 'webpack';

import {registerExitCallback} from '@src/exit_handler';
import {globalError} from '@src/global_error';
import {error, log} from '@src/logger';
import {ProjectName, WorkspaceFragment} from '@src/models';
import {getProjectsFromWorkspaceFragment, WorkspaceProject} from '@src/project/generate_workspace';
import {readWorkspace} from '@src/project/vscode_workspace';
import {removeUndefined} from '@src/type_utils';
import {deployProject} from '@src/webpack-runner/deployment';
import {generateEnvFile} from '@src/webpack-runner/env_definition_file';
import {groupAndSortErrors} from '@src/webpack-runner/error_grouper';
import {ParsedError, parseError} from '@src/webpack-runner/error_parser';
import {IconServer, startIconServer} from '@src/webpack-runner/icon_server';
import {runnerLog} from '@src/webpack-runner/log';
import {render} from '@src/webpack-runner/renderer';
import {releaseLock, takelock} from '@src/webpack-runner/runner_lock';

interface RunWebpacksOptions {
  root: string;
  workspaceFragments: WorkspaceFragment[];
  watch: boolean;
}

interface Progress {
  status: 'pending' | 'in-progress' | 'done';
  buildId?: number;
  err?: string;
  url?: string;
  startTs?: number;
  endTs?: number;
}

export interface ProjectStatus {
  project: WorkspaceProject;
  build: Progress;
  deploy: Progress;
  errors: ParsedError[];
}

const name = 'WebpackRunner';

let globalRoot = '';
let stopIconServer: (() => void) | undefined;
function exit(): void {
  stopIconServer?.();
  releaseLock(globalRoot);
  process.stdin.setRawMode(false);
  log('See you soon!');
  // eslint-disable-next-line n/no-process-exit
  process.exit(0);
}

export async function runWebpacks(opts: RunWebpacksOptions): Promise<void> {
  const {root, workspaceFragments, watch} = opts;
  const projects = workspaceFragments.flatMap(f => getProjectsFromWorkspaceFragment(f));
  const statuses = new Map<ProjectName, ProjectStatus>(
    projects.map(p => {
      return [
        p.projectName,
        {
          project: p,
          build: {status: 'pending'},
          deploy: {status: 'pending'},
          errors: [],
          compilationFailure: undefined,
        },
      ] as const;
    })
  );

  await generateEnvFile(root);
  runnerLog(`generateEnvFile done`);

  let iconServer: IconServer | undefined;
  if (watch) {
    try {
      iconServer = await startIconServer(root);
      stopIconServer = iconServer.stopServer;
    } catch {
      // Failure to start the icon server is not a big deal
    }
  }
  runnerLog(`startIconServer done`);

  function redraw(): void {
    render({watch, statuses, iconServer});
  }

  //
  // Called any time something changes
  //
  let lastRefresh = 0;
  let shouldRefresh = false;
  function autoRefresh(): void {
    if (!shouldRefresh) {
      runnerLog('stop refresh');
      return;
    }
    const now = Date.now();
    if (now - lastRefresh >= 100) {
      redraw();
      lastRefresh = now;
    }
    setTimeout(autoRefresh, 100);
  }
  function onChange(): void {
    const isDone = [...statuses.values()].every(
      s => s.build.status === 'done' && s.deploy.status === 'done'
    );

    if (watch) {
      redraw();
      if (!isDone && !shouldRefresh) {
        shouldRefresh = true;
        autoRefresh();
      } else if (isDone && shouldRefresh) {
        shouldRefresh = false;
      }
      return;
    }

    if (!isDone) {
      return;
    }

    const errors = [...statuses.values()].flatMap(v => v.errors);
    const {globalErrors} = groupAndSortErrors(errors);
    const noGlobalErrors =
      globalErrors.length === 0 &&
      [...statuses.values()].every(
        status => status.build.err === undefined && status.deploy.err === undefined
      );
    if (noGlobalErrors) {
      resolve();
    } else {
      reject();
    }
  }

  const compilers = await Promise.all(
    projects.map(async project => {
      //
      // Fetch the webpack config
      //
      const {projectName} = project;
      const projectPath = join(root, projectName);
      runnerLog(`loadConfig ${projectName} start`);
      // eslint-disable-next-line import/dynamic-import-chunkname
      const config = await import(/*webpackIgnore: true*/ join(projectPath, 'webpack.config.js'))
        .then(({getConfig}) => getConfig({context: projectPath, watch}) as Configuration)
        .catch((err: unknown) => {
          const current = statuses.get(projectName);
          if (current) {
            current.build.err = String(err);
          }
          onChange();
        });
      runnerLog(`loadConfig ${projectName} done`);
      if (!config) {
        return;
      }

      //
      // BUILD START callback
      //
      function buildStart(): void {
        const current = statuses.get(projectName);
        if (!current) {
          return;
        }
        runnerLog(`Build start ${projectName}`);
        current.build = {
          startTs: Date.now(),
          buildId: Math.random(),
          status: 'in-progress',
          err: undefined,
        };
        current.errors = [];
        onChange();
      }

      //
      // BUILD END callback
      //
      function buildEnd(err: Error | null, stats?: Stats): void {
        const buildId = Math.random();
        const current = statuses.get(projectName);
        if (!current) {
          return;
        }
        runnerLog(`Build end ${projectName} ${buildId}`);
        current.build = {
          status: 'done',
          buildId,
          err: undefined,
          startTs: current.build.startTs,
          endTs: Date.now(),
        };
        if (err || !stats) {
          current.build.err = err ? String(err) : 'No result after compilation';
          current.errors = [];
        } else {
          const errors = [
            ...stats.compilation.errors.map(err => parseError(err, {root, severity: 'error'})),
            ...stats.compilation.warnings.map(warn =>
              parseError(warn, {root, severity: 'warning'})
            ),
          ];
          current.errors = errors;
          deployStart();
        }
        onChange();
      }

      //
      // DEPLOY START callback
      //
      function deployStart(): void {
        const current = statuses.get(projectName);
        if (
          !current ||
          current.build.status !== 'done' ||
          current.build.buildId === undefined ||
          current.deploy.status === 'in-progress'
        ) {
          return;
        }
        const buildId = current.build.buildId;
        const startTs = Date.now();
        current.deploy = {status: 'in-progress', buildId, startTs};
        onChange();
        runnerLog(`Deploy START ${projectName} ${buildId}`);

        deployProject(project, {root})
          .then(({url}) => deployEnd({buildId, status: 'done', url, startTs}))
          .catch((err: unknown) => deployEnd({buildId, status: 'done', err: String(err), startTs}));
      }

      //
      // DEPLOY START callback
      //
      function deployEnd(status: Progress): void {
        const current = statuses.get(projectName);
        if (!current) {
          return;
        }
        current.deploy = status;
        current.deploy.endTs = Date.now();
        onChange();
        runnerLog(
          `Deploy END ${projectName} ${status.buildId} ${status.url ?? ''} ${status.err ?? ''}`
        );
        if (current.build.status === 'done' && current.build.buildId !== status.buildId) {
          deployStart();
        }
      }

      //
      // START
      //
      const compiler = webpack({...config, watch}, buildEnd);
      // compiler.hooks.run.tap(name, buildStart);
      compiler.hooks.watchRun.tap(name, buildStart);
      compiler.hooks.beforeRun.tap(name, buildStart);
      return compiler;
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
    await Promise.all(
      compilers.map(
        async compiler =>
          await new Promise<void>((resolve, reject) => {
            if (compiler) {
              compiler.close(err => (err ? reject(err) : resolve()));
            } else {
              resolve();
            }
          })
      )
    );
    releaseLock(globalRoot);
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
  return await globalPromise;
}

export async function runAllWebpacks(
  options: Omit<RunWebpacksOptions, 'projectPaths'>
): Promise<void> {
  const {root, watch} = options;
  runnerLog(`Build runner START ${root}`);
  globalRoot = root;
  await takelock(root);
  runnerLog(`Lock taken`);

  const {fragments} = (await readWorkspace(root)) ?? {};
  runnerLog(`Workspace read`);
  if (!fragments) {
    throw new Error(`No workspace projects at path ${root}`);
  }
  await runWebpacks({
    root,
    workspaceFragments: fragments,
    watch,
  });
}
