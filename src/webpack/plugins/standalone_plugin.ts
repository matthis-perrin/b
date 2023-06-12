import {Compiler} from 'webpack';

import {registerExitCallback} from '@src/exit_handler';
import {globalError} from '@src/global_error';

export abstract class StandalonePlugin {
  protected abstract name: string;
  protected context: string = process.cwd();

  // INITIALIZE

  public apply(compiler: Compiler): void {
    this.context = compiler.context;
    compiler.hooks.beforeRun.tapPromise(this.name, async () => this.setupHandler(compiler));
    compiler.hooks.watchRun.tapPromise(this.name, async () => this.setupHandler(compiler));
    compiler.hooks.shutdown.tapPromise(this.name, async () => this.exitHandlerAsync(compiler));
    registerExitCallback(() => this.exitHandler(compiler));
  }

  protected abstract setup(compiler: Compiler): void | Promise<void>;
  protected abstract teardown(compiler: Compiler): void | Promise<void>;

  // SETUP

  private hasStarted = false;
  private async setupHandler(compiler: Compiler): Promise<void> {
    if (this.hasStarted) {
      return;
    }
    this.hasStarted = true;
    await this.setup(compiler);
  }

  // EXIT

  private hasExited = false;
  private exitHandler(compiler: Compiler): void {
    if (this.hasExited) {
      return;
    }
    this.hasExited = true;
    Promise.resolve(this.teardown(compiler)).catch(err => {
      globalError(`Error during teardown of plugin ${this.name}`, err);
    });
  }
  private async exitHandlerAsync(compiler: Compiler): Promise<void> {
    if (this.hasExited) {
      return;
    }
    this.hasExited = true;
    await this.teardown(compiler);
  }
}
