import {
  PROJECT_TYPE_TO_METADATA,
  RuntimeType,
  WorkspaceFragment,
  WorkspaceFragmentRegistry,
  WorkspaceFragmentType,
} from '@src/models';
import {getProjectsFromWorkspaceFragment} from '@src/project/generate_workspace';
import {neverHappens} from '@src/type_utils';

export function generateDeployScript(workspaceFragments: WorkspaceFragment[]): string {
  const projects = workspaceFragments.flatMap(getProjectsFromWorkspaceFragment);
  return `
const path = require('path');
const child_process = require('child_process');
const fs = require('fs');

const terraformPath = path.join(process.cwd(), 'terraform');

function runCommand(opts) {
  const {command, cwd, env} = opts;
  console.log('-----------------------------------------');
  console.log(\`Running: \\\`\${command}\\\`\`);
  console.log('-----------------------------------------');
  child_process.execSync(command, {cwd, env, stdio: 'inherit'});
}

function ensureDistFolders(projects) {
  for (const {dist, isLambda} of projects) {
    try {
      fs.accessSync(dist);
    } catch {
      fs.mkdirSync(dist);
    }
    if (isLambda) {
      const files = fs.readdirSync(dist);
      if (files.length === 0) {
        fs.writeFileSync(
          path.join(dist, 'main.js'),
          \`exports.handler = async function() {return ''};\`
        );
      }
    }
  }
}

function checkTerraformCredentials() {
  const credentialsPath = path.join(terraformPath, '.aws-credentials');
  try {
    fs.accessSync(credentialsPath);
  } catch {
    throw new Error(\`Missing AWS credential files at "\${credentialsPath}"\\nTo use your current credentials with this project run:\\ncp ~/.aws/credentials \${credentialsPath}\`);
  }
}

function terraformOutputs() {
  return JSON.parse(child_process.execSync(\`terraform output -json\`, {cwd: terraformPath}).toString());
}

${projects
  .flatMap(p => [
    `    const ${p.projectName}Path = path.join(process.cwd(), '${p.projectName}');`,
    `    const ${p.projectName}Dist = path.join(${p.projectName}Path, 'dist');`,
  ])
  .join('\n')}

${generateBuildWorkspaceFn(workspaceFragments)}

async function run() {
  // Initialize if needed and get terraform outputs
  ensureDistFolders([
${projects
  .map(p => {
    const isLambda = PROJECT_TYPE_TO_METADATA[p.type].runtimeType === RuntimeType.Lambda;
    return `    {dist: ${p.projectName}Dist${isLambda ? ', isLambda: true' : ''}},`;
  })
  .join('\n')}
  ]);
  let outputs = terraformOutputs();
  if (Object.keys(outputs).length === 0) {
    checkTerraformCredentials();
    runCommand({command: \`terraform init\`, cwd: terraformPath});
    runCommand({command: \`terraform apply -auto-approve\`, cwd: terraformPath});
    outputs = terraformOutputs();
  }

  // Build the projects
  await buildWorkspace(outputs);

  // Terraform
  runCommand({command: \`terraform apply -auto-approve\`, cwd: terraformPath});
  console.log('Done');
}

run()
  .catch(err => console.error(err))
  .catch(() => process.exit(13));  
  `.trim();
}

export function generateBuildWorkspaceFn(fragments: WorkspaceFragment[]): string {
  const buildFunctions = fragments.map(fragment => {
    const {type} = fragment;
    if (type === WorkspaceFragmentType.WebApp) {
      return generateBuildWebAppProjectFn(fragment);
    } else if (type === WorkspaceFragmentType.StaticWebsite) {
      return generateBuildStaticWebsiteProjectFn(fragment);
    } else if (type === WorkspaceFragmentType.StandaloneLambda) {
      return generateBuildStandaloneLambdaProjectFn(fragment);
    } else if (type === WorkspaceFragmentType.NodeLib) {
      return generateBuildNodeLibProjectFn(fragment);
    } else if (type === WorkspaceFragmentType.NodeScript) {
      return generateBuildNodeScriptProjectFn(fragment);
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    } else if (type === WorkspaceFragmentType.Shared) {
      return generateBuildSharedProjectFn();
    }
    return neverHappens(type, `Unknown WorkspaceFragmentType "${type}"`);
  });

  return [
    ...buildFunctions.map(fn => fn.sourceCode),
    `
async function buildWorkspace(outputs) {
  await Promise.all([${buildFunctions.map(fn => `${fn.name}(outputs)`).join(', ')}]);
}
  `.trim(),
  ]
    .join('\n\n')
    .trim();
}

interface FunctionSourceCode {
  name: string;
  sourceCode: string;
}

export function generateBuildWebAppProjectFn(
  fragment: WorkspaceFragmentRegistry[WorkspaceFragmentType.WebApp]
): FunctionSourceCode {
  const functionName = `buildWebApp_${fragment.websiteName}`;
  return {
    sourceCode: `
async function ${functionName}(outputs) {
  // Build the "${fragment.websiteName}" frontend
  runCommand({
    command: \`yarn build\`,
    cwd: ${fragment.websiteName}Path,
    env: {...process.env, PUBLIC_PATH: \`https://\${outputs.${fragment.websiteName}_cloudfront_domain_name.value}\`},
  });
  const INDEX_HTML = fs.readFileSync(path.join(${fragment.websiteName}Dist, 'index.html')).toString();

  // Build the "${fragment.lambdaName}" backend
  runCommand({command: 'rm -rf dist', cwd: ${fragment.lambdaName}Path});
  runCommand({
    command: \`yarn build\`,
    cwd: ${fragment.lambdaName}Path,
    env: {...process.env, MATTHIS_INDEX_HTML: JSON.stringify(INDEX_HTML)},
  });
  runCommand({
    command: \`yarn install --modules-folder dist/node_modules --production --no-bin-links\`,
    cwd: ${fragment.lambdaName}Path,
  });
}
`,
    name: functionName,
  };
}

export function generateBuildStaticWebsiteProjectFn(
  fragment: WorkspaceFragmentRegistry[WorkspaceFragmentType.StaticWebsite]
): FunctionSourceCode {
  const functionName = `buildStaticWebsite_${fragment.websiteName}`;
  return {
    sourceCode: `
async function ${functionName}(outputs) {
  runCommand({
    command: \`yarn build\`,
    cwd: ${fragment.websiteName}Path,
    env: {...process.env, PUBLIC_PATH: \`https://\${outputs.${fragment.websiteName}_cloudfront_domain_name.value}\`},
  });
}
`,
    name: functionName,
  };
}

export function generateBuildStandaloneLambdaProjectFn(
  fragment: WorkspaceFragmentRegistry[WorkspaceFragmentType.StandaloneLambda]
): FunctionSourceCode {
  const functionName = `buildStandaloneLambda_${fragment.lambdaName}`;
  return {
    sourceCode: `
async function ${functionName}(outputs) {
  runCommand({command: 'rm -rf dist', cwd: ${fragment.lambdaName}Path});
  runCommand({
    command: \`yarn build\`,
    cwd: ${fragment.lambdaName}Path,
  });
  runCommand({
    command: \`yarn install --modules-folder dist/node_modules --production --no-bin-links\`,
    cwd: ${fragment.lambdaName}Path,
  });
}
`,
    name: functionName,
  };
}

export function generateBuildNodeLibProjectFn(
  fragment: WorkspaceFragmentRegistry[WorkspaceFragmentType.NodeLib]
): FunctionSourceCode {
  const functionName = `buildNodeLib_${fragment.libName}`;
  return {
    sourceCode: `
async function ${functionName}(outputs) {
  runCommand({
    command: \`yarn build\`,
    cwd: ${fragment.libName}Path,
  });
}
`,
    name: functionName,
  };
}

export function generateBuildNodeScriptProjectFn(
  fragment: WorkspaceFragmentRegistry[WorkspaceFragmentType.NodeScript]
): FunctionSourceCode {
  const functionName = `buildNodeScript_${fragment.scriptName}`;
  return {
    sourceCode: `
async function ${functionName}(outputs) {
  runCommand({
    command: \`yarn build\`,
    cwd: ${fragment.scriptName}Path,
  });
}
`,
    name: functionName,
  };
}

export function generateBuildSharedProjectFn(): FunctionSourceCode {
  const functionName = `buildShared`;
  return {
    sourceCode: `
async function ${functionName}(outputs) {
  runCommand({
    command: \`yarn build\`,
    cwd: sharedPath,
  });
}
`,
    name: functionName,
  };
}
