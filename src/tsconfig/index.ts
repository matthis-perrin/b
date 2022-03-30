import {join, resolve} from 'path';

import {generateForType} from './generators';
import {ALL_TYPES, ProjectType} from '../models';

export async function tsconfigPackages(types: ProjectType[]): Promise<void> {
  await Promise.all(
    ALL_TYPES.filter(type => type !== ProjectType.Lambda).map(type =>
      generateForType(join(resolve('.'), 'packages', `tsconfig-${type}`), type)
    )
  );
}
