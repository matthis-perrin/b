import {Compiler} from 'webpack';

export abstract class StandalonePlugin {
  protected abstract name: string;

  public apply(compiler: Compiler): void {
    compiler.hooks.initialize.tap(this.name, () => {
      this.setup(compiler);
    });
    compiler.hooks.shutdown.tapPromise(this.name, async () => this.exitHandlerAsync(compiler));

    process.on('beforeExit', () => this.exitHandler(compiler));
    process.on('exit', () => this.exitHandler(compiler));
    process.on('SIGTERM', () => this.exitHandler(compiler));
    process.on('SIGINT', () => this.exitHandler(compiler));
    process.on('uncaughtException', () => this.exitHandler(compiler));
  }

  protected abstract setup(compiler: Compiler): void;
  protected abstract teardown(compiler: Compiler): Promise<void>;

  private hasExited = false;
  private exitHandler(compiler: Compiler): void {
    if (this.hasExited) {
      return;
    }
    this.hasExited = true;
    this.teardown(compiler)
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
