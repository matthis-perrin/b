import {join} from 'node:path';

import {FSWatcher, watch} from 'chokidar';
import {ESLint, Linter} from 'eslint';
import {Compilation, Compiler, WebpackError} from 'webpack';

import {WebpackPlugin} from '@src/webpack/models';
import {stripAnsi} from '@src/webpack/plugins/formatter';
import {StandalonePlugin} from '@src/webpack/plugins/standalone_plugin';

interface QueuedFileState {
  status: 'queued';
}

interface InProgressFileState {
  status: 'in-progress';
  eslintRunId: number;
}

interface SuccessFileState {
  status: 'success';
  eslintRunId: number;
}

interface FailureFileState {
  status: 'failed';
  eslintRunId: number;
  messages: Linter.LintMessage[];
}

interface ErroredFileState {
  status: 'errored';
  eslintRunId: number;
  err: unknown;
}

type FileState =
  | QueuedFileState
  | InProgressFileState
  | SuccessFileState
  | FailureFileState
  | ErroredFileState;

class EslintWebpackError extends WebpackError {
  public override name = 'EslintWebpackError';
  public constructor(
    public readonly eslintRunId: number,
    message: string,
    filePath?: string,
    loc?: WebpackError['loc']
  ) {
    super(message);
    if (filePath !== undefined) {
      this.file = filePath;
    }
    if (loc) {
      this.loc = loc;
    }
  }
}

const RUN_ESLINT_INTERVAL = 500;

class EslintPlugin extends StandalonePlugin {
  protected name = 'EslintPlugin';
  private watcher: FSWatcher | undefined;
  private runEslintInterval: NodeJS.Timeout | undefined;
  private readonly fileStates = new Map<string, FileState>();
  private compilation: Compilation | undefined;
  private resolveAwaitIdlePromise: (() => void) | undefined;

  protected async setup(compiler: Compiler): Promise<void> {
    return new Promise<void>(resolve => {
      this.runEslintInterval = setInterval(() => this.runEslint(), RUN_ESLINT_INTERVAL);
      this.watcher = watch(['src/**/*.ts', 'src/**/*.tsx'].map(p => join(this.context, p)));
      this.watcher
        .on('add', path => {
          this.fileStates.set(path, {status: 'queued'});
        })
        .on('change', path => {
          this.fileStates.set(path, {status: 'queued'});
        })
        .on('unlink', path => {
          this.fileStates.delete(path);
        })
        .on('ready', () => {
          this.runEslint();
          resolve();
        });
      compiler.hooks.compilation.tap(this.name, comp => {
        this.compilation = comp;
        this.syncErrorsAndWarnings();
      });
      compiler.hooks.afterCompile.tapAsync(this.name, (compilation, cb) => {
        setTimeout(() => {
          this.awaitIdle().finally(cb);
        }, RUN_ESLINT_INTERVAL);
      });
    });
  }

  private runEslint(): void {
    const filesQueued = [...this.fileStates.entries()].filter(e => e[1].status === 'queued');
    if (filesQueued.length === 0) {
      return;
    }

    const eslintRunId = Math.random();
    for (const [filePath] of filesQueued) {
      this.fileStates.set(filePath, {status: 'in-progress', eslintRunId});
    }

    const handleError = (err: unknown): void => {
      for (const [filePath] of filesQueued) {
        const currentState = this.fileStates.get(filePath);
        if (
          !currentState ||
          currentState.status !== 'in-progress' ||
          currentState.eslintRunId !== eslintRunId
        ) {
          continue;
        }
        this.fileStates.set(filePath, {status: 'errored', eslintRunId, err});
      }
    };

    try {
      const tsConfigPath = join(this.context, 'tsconfig.json');
      const eslint = new ESLint({
        cwd: this.context,
        overrideConfig: {
          settings: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'import/resolver': {
              typescript: {
                project: tsConfigPath,
              },
            },
          },
          parserOptions: {
            project: tsConfigPath,
          },
        },
      });
      eslint
        .lintFiles(filesQueued.map(e => e[0]))
        .then(results => {
          for (const result of results) {
            const currentState = this.fileStates.get(result.filePath);
            if (
              !currentState ||
              currentState.status !== 'in-progress' ||
              currentState.eslintRunId !== eslintRunId
            ) {
              continue;
            }
            if (result.messages.length > 0) {
              this.fileStates.set(result.filePath, {
                status: 'failed',
                eslintRunId,
                messages: result.messages,
              });
            } else {
              this.fileStates.set(result.filePath, {status: 'success', eslintRunId});
            }
          }
        })
        .catch(handleError)
        .finally(() => {
          this.syncErrorsAndWarnings();
          this.checkIdle();
        });
    } catch (err: unknown) {
      handleError(err);
      this.syncErrorsAndWarnings();
      this.checkIdle();
    }
  }

  private syncErrorsAndWarnings(): void {
    if (!this.compilation) {
      return;
    }

    // Errors
    let eslintError: EslintWebpackError | undefined;
    for (const fileState of this.fileStates.values()) {
      if (fileState.status === 'errored') {
        eslintError = new EslintWebpackError(
          fileState.eslintRunId,
          `Failure to run ESLint:\n${
            fileState.err instanceof Error ? fileState.err.stack : String(fileState.err)
          }`
        );
      }
    }
    this.compilation.errors = [
      ...(this.compilation.errors as (EslintWebpackError | WebpackError)[]).filter(
        w => !('eslintRunId' in w)
      ),
      ...(eslintError ? [eslintError] : []),
    ];

    // Warnings
    this.compilation.warnings = [
      ...(this.compilation.warnings as (EslintWebpackError | WebpackError)[]).filter(
        w => !('eslintRunId' in w)
      ),
      ...[...this.fileStates.entries()]
        .sort((e1, e2) => e1[0].localeCompare(e2[0]))
        .flatMap(([filePath, fileState]) => {
          if (fileState.status !== 'failed') {
            return [];
          }
          return fileState.messages.map(
            msg =>
              new EslintWebpackError(fileState.eslintRunId, stripAnsi(msg.message), filePath, {
                start: {line: msg.line, column: msg.column},
                end:
                  msg.endLine === undefined
                    ? undefined
                    : {line: msg.endLine, column: msg.endColumn},
              })
          );
        }),
    ];
  }

  private checkIdle(): void {
    if (!this.resolveAwaitIdlePromise) {
      return;
    }
    for (const state of this.fileStates.values()) {
      if (state.status === 'queued' || state.status === 'in-progress') {
        return;
      }
    }
    this.resolveAwaitIdlePromise();
  }

  private async awaitIdle(): Promise<void> {
    return new Promise<void>(resolve => {
      this.resolveAwaitIdlePromise = resolve;
      this.checkIdle();
    });
  }

  protected async teardown(): Promise<void> {
    clearInterval(this.runEslintInterval);
    await this.watcher?.close();
  }
}

export function eslintPlugin(): WebpackPlugin {
  return new EslintPlugin();
}
