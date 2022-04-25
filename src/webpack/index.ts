import {join, resolve} from 'path';

import {generateForType} from './generators';
import {ALL_RUNTIME_TYPES, RuntimeType} from '../models';

export async function webpackPackages(types: RuntimeType[]): Promise<void> {
  await Promise.all(
    ALL_RUNTIME_TYPES.filter(
      t => t === RuntimeType.Node || t === RuntimeType.Lambda || t === RuntimeType.Web
    ).map(type => generateForType(join(resolve('.'), 'packages', `webpack-${type}`), type))
  );
}
