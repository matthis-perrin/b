import {appendFileSync, rmSync} from 'node:fs';

const ENABLED = true as boolean;
let startTs: number | undefined;
const logFilePath = '.build.log';

export function runnerLog(msg: string): void {
  if (!ENABLED) {
    return;
  }
  if (startTs === undefined) {
    startTs = Date.now();
    rmSync(logFilePath, {force: true});
  }
  appendFileSync(logFilePath, `${msg} (${(Date.now() - startTs).toLocaleString()}ms)\n`);
}
