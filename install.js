import {exec} from 'child_process';
import {readdir} from 'fs/promises';
import {join} from 'path';

async function execAsync(cmd, options) {
  const cwd = options.cwd ?? process.cwd();
  console.log(`Running \`${cmd}\` in ${cwd}`);
  return new Promise((resolve, reject) => {
    exec(cmd, {cwd}, (error, stdout, stderr) => {
      if (!error) {
        resolve();
      } else {
        console.error(`Failure to run \`${cmd}\` in ${cwd}`);
        reject(stderr);
      }
    });
  });
}

const root = process.cwd();
await execAsync('yarn build', {cwd: root});
await execAsync('yarn start', {cwd: root});

const templatesDir = join(root, 'templates');
const templateDirsEnt = await readdir(templatesDir, {withFileTypes: true});
const templateDirs = templateDirsEnt
  .filter(ent => ent.isDirectory() && ent.name !== 'node_modules')
  .map(ent => join(templatesDir, ent.name));
await Promise.all([
  execAsync('yarn install', {cwd: templatesDir}),
  ...templateDirs.map(dir => execAsync('yarn install', {cwd: dir})),
]);
