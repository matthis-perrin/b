// Handle the locking logic.
// We write a file /.build.lock with the current process and timestamp.
// We continuously update the lock timestamp throughout runtime.
// Before exiting we delete the lock file.
// If at any point the lock file contains another pid, we know another process
// is running the build and we exit. Except when the timestamp is older than
// `MIN_LOCK_AGE_MS`, in this case it means another build process was running
// and got killed without getting a chance to delete the lock file.
import {rmSync} from 'node:fs';
import {writeFile} from 'node:fs/promises';
import {join} from 'node:path';

import {maybeReadFile} from '@src/fs';
import {asNumber} from '@src/type_utils';

const MIN_LOCK_AGE_MS = 10000; // 10 seconds
const LOCK_UPDATE_PERIOD_MS = 1000; // 1 second

interface Lock {
  pid: number;
  ts: number;
}

function lockFilePath(root: string): string {
  return join(root, '.build.lock');
}

async function readLock(root: string): Promise<Lock | undefined> {
  // Read the lock file
  const lockFileContent = await maybeReadFile(lockFilePath(root));
  if (lockFileContent === undefined) {
    return undefined;
  }

  // Parse the content
  const [pidTs, tsStr] = lockFileContent.split('-');
  const pid = asNumber(pidTs);
  const ts = asNumber(tsStr);
  if (pid === undefined || ts === undefined) {
    return undefined;
  }

  return {pid, ts};
}

async function writeLock(root: string): Promise<void> {
  await writeFile(lockFilePath(root), `${process.pid}-${Date.now()}`);
}

async function checkLock(root: string): Promise<void> {
  const lock = await readLock(root);
  if (lock && lock.pid !== process.pid && Date.now() - lock.ts < MIN_LOCK_AGE_MS) {
    console.error(`Lock ${lockFilePath(root)} is taken by the process ${lock.pid}`);
    // eslint-disable-next-line n/no-process-exit
    process.exit(1);
  }
}

let lockInterval: NodeJS.Timeout | undefined;
export function releaseLock(root: string): void {
  if (lockInterval) {
    clearInterval(lockInterval);
  }
  rmSync(lockFilePath(root), {force: true});
}

export async function takelock(root: string): Promise<void> {
  // Ensure the lock is available
  await checkLock(root);
  // Check and update the lock periodically
  lockInterval = setInterval(() => {
    checkLock(root)
      .then(() => {
        writeLock(root).catch(() => {});
      })
      .catch(() => {});
  }, LOCK_UPDATE_PERIOD_MS);
}
