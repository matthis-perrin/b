import {exec} from 'node:child_process';
import {appendFileSync} from 'node:fs';
import {join} from 'node:path';

import {Compiler} from 'webpack';

import {error} from '@src/logger';

export class YarnPlugin {
  public apply(compiler: Compiler): void {
    compiler.hooks.beforeRun.tapAsync('YarnPlugin', (compiler, cb) => {
      const command = [
        'yarn',
        'install',
        '--audit',
        '--check-files',
        '--non-interactive',
        '--production=false',
      ].join(' ');
      exec(command, {cwd: compiler.context}, (err, stdout, stderr) => {
        if (err) {
          error(`Yarn failed in ${compiler.context}`);
          cb(err);
          return;
        }
        const warnings = stderr.split('\n').filter(l => l.trim().length > 0);
        if (warnings.length > 0) {
          appendFileSync(join(compiler.context, `.yarn-warnings.log`), stderr);
        }
        cb();
      });
    });
  }
}
