import {Compiler} from 'webpack';

import {WebpackPlugin} from '@src/webpack/models';

export function cleanTerminalPlugin(): WebpackPlugin {
  let firstRun = true;
  return (compiler: Compiler): void => {
    compiler.hooks.afterCompile.tap('CleanTerminalPlugin', () => {
      if (firstRun) {
        firstRun = false;
        return;
      }
      process.stdout.write('\u001B[2J\u001B[3J\u001B[H');
    });
  };
}
