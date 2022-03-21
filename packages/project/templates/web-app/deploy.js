const path = require('path');
const {exec} = require('child_process');

async function buildAtPath(path) {
  return new Promise((resolve, reject) => {
    exec(`yarn build`, {cwd: path}, (error, stdout, stderr) => {
      if (!error) {
        resolve();
      } else {
        console.error(`Failure to run ``yarn build`` at "${path}"`);
        reject();
      }
    });
  });
}

async function buildProjects() {
  await Promise.all([
    buildAtPath(path.join(process.cwd(), 'backend')),
    buildAtPath(path.join(process.cwd(), 'frontend')),
  ]);
}

async function run() {
  console.log('Building projects...');
  await buildProjects();
  console.log('Done');
}

run()
  .catch(err => console.error(err))
  .catch(() => process.exit(13));
