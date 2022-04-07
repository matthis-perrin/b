const path = require('path');
const {execSync} = require('child_process');
const {accessSync, mkdirSync} = require('fs');

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
  try {
    accessSync(frontendDist);
  } catch {
    mkdirSync(frontendDist);
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

async function run() {
  // Initialize if needed
  checkTerraformCredentials();
  ensureDistFolders();

  // Build the frontend
  runCommand({command: `yarn build`, cwd: frontendPath});

  // Terraform
  runCommand({command: `terraform init`, cwd: terraformPath});
  runCommand({command: `terraform apply -auto-approve`, cwd: terraformPath});
  console.log('Done');
}

run()
  .catch(err => console.error(err))
  .catch(() => process.exit(13));
