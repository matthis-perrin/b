import {join, resolve} from 'path';

import {generateForType} from './generators';
import {ALL_TYPES} from '../models';

export async function eslintPackages(): Promise<void> {
  await Promise.all(
    ALL_TYPES.map(type =>
      generateForType(join(resolve('.'), 'packages', `eslint-config-${type}`), type)
    )
  );
}
