import {exec, execSync} from 'child_process';
import {readdir, readFile} from 'fs/promises';
import {join} from 'path';

const root = process.cwd();
const packagesDir = join(root, 'packages');
const packageDirsEnt = await readdir(packagesDir, {withFileTypes: true});
const packageDirs = packageDirsEnt.filter(ent => ent.isDirectory()).map(ent => ent.name);

async function publish(p) {
  return new Promise((resolve, reject) => {
    exec(`npm publish --access public`, {cwd: join(packagesDir, p)}, (error, stdout, stderr) => {
      const errors = stderr
        .trim()
        .split('\n')
        .filter(err => err.startsWith('npm ERR!'));
      if (!error) {
        if (errors.length > 0) {
          console.log(`stderr for ${p}`);
          console.log(errors.join('\n'));
        }
        resolve();
      } else {
        console.error(`Failure to publish ${p}`);
        reject(errors.join('\n'));
      }
    });
  });
}

async function version(p) {
  return new Promise((resolve, reject) => {
    exec(`npm search --json @matthis/${p}`, (error, stdout, stderr) => {
      if (!error) {
        resolve(JSON.parse(stdout)[0]);
      } else {
        reject(stderr);
      }
    });
  });
}

const unpublishedVersions = await Promise.all(
  packageDirs.map(async p => {
    const packageJson = JSON.parse(await readFile(join(packagesDir, p, 'package.json')));
    return [p, packageJson.version];
  })
);
const publishedVersions = new Map(
  await Promise.all(packageDirs.map(async p => [p, (await version(p)).version]))
);

const toPublish = unpublishedVersions.filter(
  ([p, version]) => publishedVersions.get(p) !== version
);
if (toPublish.length === 0) {
  console.log('Nothing to publish');
} else {
  console.log('Publishing:');
  console.log(
    toPublish
      .map(([p, v]) => `${p} ${publishedVersions.get(p) ?? 'unpublished'} => ${v}`)
      .join('\n')
  );
  await Promise.all(toPublish.map(async ([p]) => await publish(p)));
  console.log('Done');
}
