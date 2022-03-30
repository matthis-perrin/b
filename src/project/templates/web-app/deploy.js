const path = require('path');
const {exec, execSync} = require('child_process');

const backendPath = path.join(process.cwd(), 'backend');
const frontendPath = path.join(process.cwd(), 'frontend');
const terraformPath = path.join(process.cwd(), 'terraform');

async function buildAtPath(path) {
  return new Promise((resolve, reject) => {
    exec(`yarn build`, {cwd: path}, (error, stdout, stderr) => {
      if (!error) {
        resolve();
      } else {
        console.error(`Failure to run \`yarn build\` at "${path}"`);
        reject();
      }
    });
  });
}

async function buildProjects() {
  await Promise.all([buildAtPath(backendPath), buildAtPath(frontendPath)]);
}

function terraform() {
  execSync(`terraform init`, {cwd: terraformPath});
  execSync(`terraform apply -auto-approve`, {cwd: terraformPath});
  return JSON.parse(execSync(`terraform output -json`, {cwd: terraformPath}).toString());
}

async function run() {
  console.log('Building projects...');
  await buildProjects();
  console.log('Refreshing infrastructure...');
  const terraformOutputs = terraform();
  console.log(
    Object.fromEntries(Object.entries(terraformOutputs).map(([key, value]) => [key, value.value]))
  );
  console.log('Done');
}

run()
  .catch(err => console.error(err))
  .catch(() => process.exit(13));
