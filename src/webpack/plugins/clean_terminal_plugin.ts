import {Compiler} from 'webpack';

import {WebpackPlugin} from '@src/webpack/models';

class CleanTerminalPlugin {
  private firstRun = true;

  public apply(compiler: Compiler): void {
    this.firstRun = true;
    compiler.hooks.afterCompile.tap('CleanTerminalPlugin', () => {
      if (this.firstRun) {
        this.firstRun = false;
        return;
      }
      process.stdout.write('\u001B[2J\u001B[3J\u001B[H');
    });
  }
}

export function cleanTerminalPlugin(): WebpackPlugin {
  return new CleanTerminalPlugin();
}
