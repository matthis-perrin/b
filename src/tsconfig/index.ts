import {join, resolve} from 'path';

import {cleanDir} from '../fs';
import {generateForType} from './generators';
import {ALL_TYPES} from './models';

export async function tsconfigPackages(): Promise<void> {
  await Promise.all(
    ALL_TYPES.map(type => generateForType(join(resolve('.'), 'packages', `tsconfig-${type}`), type))
  );
}
