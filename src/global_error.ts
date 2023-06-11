import {appendFileSync} from 'node:fs';

export function globalError(...val: unknown[]): void {
  for (const data of val) {
    try {
      const str =
        typeof data === 'string'
          ? data
          : data instanceof Error
          ? data.stack ?? String(data)
          : JSON.stringify(data);
      console.error(str);
      appendFileSync('error.log', str);
    } catch {
      console.error(String(val));
      appendFileSync('error.log', String(val));
    }
  }
}
