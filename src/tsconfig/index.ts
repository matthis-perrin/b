import {join, resolve} from 'node:path';

import {RuntimeType} from '@src/models';
import {generateForType} from '@src/tsconfig/generators';

export async function tsconfigPackages(types: RuntimeType[]): Promise<void> {
  await Promise.all(
    types.map(async type =>
      generateForType(join(resolve('.'), 'packages', `tsconfig-${type}`), type)
    )
  );
}
