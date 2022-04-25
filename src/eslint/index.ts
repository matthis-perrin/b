import {join, resolve} from 'path';

import {generateForType} from './generators';
import {ALL_RUNTIME_TYPES, RuntimeType} from '../models';

export async function eslintPackages(types: RuntimeType[]): Promise<void> {
  await Promise.all(
    types.map(type =>
      generateForType(join(resolve('.'), 'packages', `eslint-config-${type}`), type)
    )
  );
}
