import {join, resolve} from 'node:path';

import {WebpackType} from '@src/models';
import {generateForType} from '@src/webpack/generators';

export async function webpackPackages(types: WebpackType[]): Promise<void> {
  await Promise.all(
    types.map(
      async type => await generateForType(join(resolve('.'), 'packages', `webpack-${type}`), type)
    )
  );
}
