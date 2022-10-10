import {Compiler} from 'webpack';

export abstract class StandalonePlugin {
  protected abstract name: string;
  protected context: string = process.cwd();

  public apply(compiler: Compiler): void {
    this.context = compiler.context;
    compiler.hooks.beforeRun.tapPromise(this.name, async () => this.setup(compiler));
    compiler.hooks.shutdown.tapPromise(this.name, async () => this.exitHandlerAsync(compiler));

    process.on('beforeExit', () => this.exitHandler(compiler));
    process.on('exit', () => this.exitHandler(compiler));
    process.on('SIGTERM', () => this.exitHandler(compiler));
    process.on('SIGINT', () => this.exitHandler(compiler));
    process.on('uncaughtException', () => this.exitHandler(compiler));
  }

  protected abstract setup(compiler: Compiler): void | Promise<void>;
  protected abstract teardown(compiler: Compiler): void | Promise<void>;

  private hasExited = false;
  private exitHandler(compiler: Compiler): void {
    if (this.hasExited) {
      return;
    }
    this.hasExited = true;
    Promise.resolve(this.teardown(compiler))
      .catch(err => {
        console.error(`Error during teardown of plugin ${this.name}`);
        console.error(err);
      })
      // eslint-disable-next-line node/no-process-exit
      .finally(() => process.exit(0));
  }
  private async exitHandlerAsync(compiler: Compiler): Promise<void> {
    if (this.hasExited) {
      return;
    }
    this.hasExited = true;
    await this.teardown(compiler);
  }
}
