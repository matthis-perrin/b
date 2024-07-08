import {globalError} from '@src/global_error';

let called = false;
const callbacks: (() => void | Promise<void>)[] = [];

function runCallbacks(): void {
  if (called) {
    return;
  }
  called = true;
  for (const fn of callbacks) {
    Promise.resolve(fn()).catch((err: unknown) =>
      globalError('Failure to run exit cleanup callback', err)
    );
  }
}

process.on('beforeExit', () => runCallbacks());
process.on('exit', () => runCallbacks());
process.on('SIGTERM', () => runCallbacks());
process.on('SIGINT', () => runCallbacks());
process.on('uncaughtException', err => {
  globalError('uncaughtException', err);
  runCallbacks();
});

export function registerExitCallback(cb: () => void | Promise<void>): void {
  callbacks.push(cb);
}
