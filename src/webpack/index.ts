import {join, resolve} from 'path';

import {generateForType} from './generators';
import {ALL_TYPES} from './models';

export async function webpackPackages(): Promise<void> {
  await Promise.all(
    ALL_TYPES.map(type => generateForType(join(resolve('.'), 'packages', `webpack-${type}`), type))
  );
}
