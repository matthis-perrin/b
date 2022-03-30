import {join, resolve} from 'path';

import {generateForType} from './generators';
import {ALL_TYPES, ProjectType} from '../models';

export async function eslintPackages(types: ProjectType[]): Promise<void> {
  await Promise.all(
    types.map(type =>
      generateForType(join(resolve('.'), 'packages', `eslint-config-${type}`), type)
    )
  );
}
