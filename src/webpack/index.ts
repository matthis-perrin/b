import {join, resolve} from 'node:path';

import {RuntimeType} from '@src/models';
import {generateForType} from '@src/webpack/generators';

export async function webpackPackages(types: RuntimeType[]): Promise<void> {
  await Promise.all(
    types.map(async type =>
      generateForType(join(resolve('.'), 'packages', `webpack-${type}`), type)
    )
  );
}
