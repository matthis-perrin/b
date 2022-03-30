import {join, resolve} from 'path';

import {generateForType} from './generators';
import {ALL_TYPES, ProjectType} from '../models';

export async function webpackPackages(types: ProjectType[]): Promise<void> {
  await Promise.all(
    ALL_TYPES.filter(t => t === ProjectType.Node || t === ProjectType.Lambda || t === ProjectType.Web).map(type =>
      generateForType(join(resolve('.'), 'packages', `webpack-${type}`), type)
    )
  );
}
