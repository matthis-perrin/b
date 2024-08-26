import {join, resolve} from 'node:path';

import {generateForType} from '@src/eslint/generators';
import {EslintType} from '@src/models';

export async function eslintPackages(types: EslintType[]): Promise<void> {
  await Promise.all(
    types.map(
      async type =>
        await generateForType(join(resolve('.'), 'packages', `eslint-config-${type}`), type)
    )
  );
}
