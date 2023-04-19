import {readdirSync, rmSync} from 'fs';
import {join} from 'path';

const DIRS_TO_CLEAN = ['node_modules', 'dist'];
const FILES_TO_CLEAN = ['yarn.lock'];

function cleanDir(path) {
  const ents = readdirSync(path, {withFileTypes: true});
  for (const ent of ents) {
    const p = join(path, ent.name);
    if (ent.isDirectory()) {
      if (DIRS_TO_CLEAN.includes(ent.name)) {
        rmSync(p, {recursive: true, force: true});
      } else {
        cleanDir(p);
      }
    } else {
      if (FILES_TO_CLEAN.includes(ent.name)) {
        rmSync(p);
      }
    }
  }
}

cleanDir('.');
