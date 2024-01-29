import {spawn} from 'node:child_process';

import {registerExitCallback} from '@src/exit_handler';
import {log} from '@src/logger';

export function readLines(filePath: string, cb: (newLines: string[]) => void): () => void {
  const p = spawn('tail', ['-F', filePath], {stdio: 'pipe'});
  const cleanup = (): void => {
    if (!p.killed) {
      p.kill();
    }
  };
  registerExitCallback(cleanup);
  let data = '';
  p.stdout.on('data', chunk => {
    data += chunk;
    const lines = data.split('\n');
    // eslint-disable-next-line node/callback-return
    cb(lines.slice(0, -1));
    data = lines.at(-1) ?? '';
  });
  p.on('error', err => {
    log(err);
  });
  return cleanup;
}
