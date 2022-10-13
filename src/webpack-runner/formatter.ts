import {Issue} from 'fork-ts-checker-webpack-plugin/lib/issue';
import {WebpackError} from 'webpack';

export function formatError(err: WebpackError, type: 'warning' | 'error'): void {
  if (err.name === 'EslintWebpackError') {
    console.log(`[eslint-${type}] (${err.file}) ${err.message}`);
  } else if ('issue' in err) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const issue = (err as any)['issue'] as Issue;
    console.log(`[tsc-${type}] (${issue.file}) ${issue.message} [${issue.code}]`);
  } else if (err.name === 'ModuleNotFoundError') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const msg = (err as any).error.message as string;
    const match = /(?<msg>Can't resolve '[^']+') in '(?<file>[^']+)'/u.exec(msg);
    if (match) {
      console.log(`[module-not-found] (${match[2]}) ${match[1]}`);
    } else {
      console.log(`[module-not-found] ${msg}`);
    }
  } else {
    console.log('-----');
    console.log(type);
    console.log(err.stack);
    console.log(err);
    console.log(Object.keys(err));
    console.log('-----');
  }
}
