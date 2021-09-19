import {join, resolve} from 'path';

import {cleanDir} from './fs';
import {generateForType} from './generators';
import {ALL_TYPES} from './models';

(async () => {
  const packagesDir = join(resolve('.'), 'packages');
  await cleanDir(packagesDir);
  await Promise.all(
    ALL_TYPES.map(type => generateForType(join(packagesDir, `eslint-config-matthis-${type}`), type))
  );
})().catch(console.error);
