export function generateDeployScript(): string {
  return `
import {execSync} from 'child_process';
import {randomUUID} from 'crypto';
import {accessSync, readFileSync} from 'fs';
import {tmpdir} from 'os';
import {join} from 'path';

const terraformPath = join(process.cwd(), 'terraform');

function runCommand(opts) {
  const {command, cwd, env} = opts;
  console.log('-----------------------------------------');
  console.log(\`Running: \\\`\${command}\\\`\`);
  console.log('-----------------------------------------');
  execSync(command, {cwd, env, stdio: 'inherit'});
}

function checkTerraformCredentials() {
  const credentialsPath = join(terraformPath, '.aws-credentials');
  try {
    accessSync(credentialsPath);
  } catch {
    throw new Error(
      \`Missing AWS credential files at "\${credentialsPath}"\nTo use your current credentials with this project run:\ncp ~/.aws/credentials \${credentialsPath}\`
    );
  }
}

function terraformOutputs() {
  const res = JSON.parse(execSync(\`terraform output -json\`, {cwd: terraformPath}).toString());
  return Object.fromEntries(Object.entries(res).map(([key, obj]) => [key, obj.value]));
}

function getProjects() {
  const projects = JSON.parse(readFileSync('app.code-workspace').toString()).projects;
  if (!Array.isArray(projects)) {
    throw new Error('No projects in the workspace');
  }
  return projects;
}

async function run() {
  // Build
  runCommand({command: \`yarn build\`});

  // Get terraform outputs
  let outputs = terraformOutputs();
  if (Object.keys(outputs).length === 0) {
    checkTerraformCredentials();
    outputs = terraformOutputs();
  }
  const {region, code_bucket} = outputs;
  console.log(outputs);

  // Deploy each projects
  const projects = getProjects();
  const lambdaProjects = projects.map(p => p.lambdaName).filter(Boolean);
  for (const lambdaName of lambdaProjects) {
    const tmp = tmpdir();
    const zipPath = join(tmp, randomUUID()) + '.zip';
    runCommand({command: \`zip -j -r \${zipPath} \${lambdaName}/dist/*\`});
    runCommand({
      command: \`AWS_CONFIG_FILE=terraform/.aws-credentials aws s3 cp \${zipPath} s3://\${code_bucket}/\${lambdaName}/dist.zip\`,
    });
    runCommand({
      command: \`AWS_CONFIG_FILE=terraform/.aws-credentials aws lambda update-function-code --function-name \${
        outputs[\`\${lambdaName}_function_name\`]
      } --s3-bucket \${code_bucket} --s3-key \${lambdaName}/dist.zip --region \${region} --publish --no-cli-pager\`,
    });
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
  
`.trim();
}
