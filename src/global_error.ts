import {appendFileSync} from 'node:fs';

import {error} from '@src/logger';

export function globalError(...val: unknown[]): void {
  for (const data of val) {
    try {
      const str =
        typeof data === 'string'
          ? data
          : data instanceof Error
            ? (data.stack ?? String(data))
            : JSON.stringify(data);
      error(str);
      appendFileSync('error.log', str);
    } catch {
      // Don't log anything that went wrong during logging to prevent infinite loops
    }
  }
}
