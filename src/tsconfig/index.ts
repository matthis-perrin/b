import {join, resolve} from 'node:path';

import {TsConfigType} from '@src/models';
import {generateForType} from '@src/tsconfig/generators';

export async function tsconfigPackages(types: TsConfigType[]): Promise<void> {
  await Promise.all(
    types.map(
      async type => await generateForType(join(resolve('.'), 'packages', `tsconfig-${type}`), type)
    )
  );
}
