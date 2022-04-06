const path = require('path');
const {exec, execSync} = require('child_process');
const {accessSync, mkdirSync, readdirSync, writeFileSync, readFileSync} = require('fs');

const backendPath = path.join(process.cwd(), 'backend');
const backendDist = path.join(backendPath, 'dist');
const frontendPath = path.join(process.cwd(), 'frontend');
const frontendDist = path.join(frontendPath, 'dist');
const terraformPath = path.join(process.cwd(), 'terraform');

function runCommand(opts) {
  const {command, cwd, env} = opts;
  console.log('-----------------------------------------');
  console.log(`Running: \`${command}\``);
  console.log('-----------------------------------------');
  execSync(command, {cwd, env, stdio: 'inherit'});
}

function ensureDistFolders() {
  for (const dist of [backendDist, frontendDist]) {
    try {
      accessSync(dist);
    } catch {
      mkdirSync(dist);
    }
  }
  const backendFiles = readdirSync(backendDist);
  if (backendFiles.length === 0) {
    writeFileSync(
      path.join(backendDist, 'main.js'),
      `exports.handler = async function() {return ''};`
    );
  }
}

function checkTerraformCredentials() {
  const credentialsPath = path.join(terraformPath, '.aws-credentials');
  try {
    accessSync(credentialsPath);
  } catch {
    throw new Error(`Missing AWS credential files at "${credentialsPath}"`);
  }
}

function terraformOutputs() {
  return JSON.parse(execSync(`terraform output -json`, {cwd: terraformPath}).toString());
}

async function run() {
  // Initialize if needed and get terraform outputs
  ensureDistFolders();
  let outputs = terraformOutputs();
  if (Object.keys(outputs).length === 0) {
    checkTerraformCredentials();
    runCommand({command: `terraform init`, cwd: terraformPath});
    runCommand({command: `terraform apply -auto-approve`, cwd: terraformPath});
    outputs = terraformOutputs();
  }

  // Build the frontend
  runCommand({
    command: `yarn build`,
    cwd: frontendPath,
    env: {...process.env, PUBLIC_PATH: `https://${outputs.cloudfront_domain_name.value}`},
  });
  const INDEX_HTML = readFileSync(path.join(frontendDist, 'index.html')).toString();

  // Build the backend
  runCommand({command: 'rm -rf dist', cwd: backendPath});
  runCommand({
    command: `yarn build`,
    cwd: backendPath,
    env: {...process.env, MATTHIS_INDEX_HTML: JSON.stringify(INDEX_HTML)},
  });
  runCommand({
    command: `yarn install --modules-folder dist/node_modules --production --no-bin-links`,
    cwd: backendPath,
  });

  // Terraform
  runCommand({command: `terraform apply -auto-approve`, cwd: terraformPath});
  console.log('Done');
}

run()
  .catch(err => console.error(err))
  .catch(() => process.exit(13));
