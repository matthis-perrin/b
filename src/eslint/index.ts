import {join, resolve} from 'node:path';

import {generateForType} from '@src/eslint/generators';
import {RuntimeType} from '@src/models';

export async function eslintPackages(types: RuntimeType[]): Promise<void> {
  await Promise.all(
    types.map(async type =>
      generateForType(join(resolve('.'), 'packages', `eslint-config-${type}`), type)
    )
  );
}
