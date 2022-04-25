import {join, resolve} from 'path';

import {generateForType} from './generators';
import {ALL_RUNTIME_TYPES, RuntimeType} from '../models';

export async function tsconfigPackages(types: RuntimeType[]): Promise<void> {
  await Promise.all(
    ALL_RUNTIME_TYPES.filter(type => type !== RuntimeType.Lambda).map(type =>
      generateForType(join(resolve('.'), 'packages', `tsconfig-${type}`), type)
    )
  );
}
