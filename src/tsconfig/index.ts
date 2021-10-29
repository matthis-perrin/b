import {join, resolve} from 'path';

import {cleanDir} from '../fs';
import {generateForType} from './generators';
import {ALL_TYPES} from './models';

export async function tsconfigPackages(): Promise<void> {
  const packagesDir = join(resolve('.'), 'packages');
  await cleanDir(packagesDir, 'tsconfig-');
  await Promise.all(
    ALL_TYPES.map(type => generateForType(join(packagesDir, `tsconfig-${type}`), type))
  );
}
