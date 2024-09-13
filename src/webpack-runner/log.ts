import {appendFileSync, rmSync} from 'node:fs';

let startTs: number | undefined;

const logFilePath = 'matthis.txt';

export function runnerLog(msg: string): void {
  if (startTs === undefined) {
    startTs = Date.now();
    rmSync(logFilePath, {force: true});
  }
  appendFileSync('matthis.txt', `${msg} (${(Date.now() - startTs).toLocaleString()}ms)\n`);
}
