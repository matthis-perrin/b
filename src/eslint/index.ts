import {join, resolve} from 'path';

import {cleanDir} from '../fs';
import {generateForType} from './generators';
import {ALL_TYPES} from './models';

export async function eslintPackages(): Promise<void> {
  const packagesDir = join(resolve('.'), 'packages');
  await cleanDir(packagesDir, 'eslint-config-');
  await Promise.all(
    ALL_TYPES.map(type => generateForType(join(packagesDir, `eslint-config-${type}`), type))
  );
}
