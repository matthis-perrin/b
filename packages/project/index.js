import { createRequire as __WEBPACK_EXTERNAL_createRequire } from "module";
/******/ var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:fs/promises");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:path");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("prompts");

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "access": () => (/* binding */ access),
/* harmony export */   "cleanDir": () => (/* binding */ cleanDir),
/* harmony export */   "cp": () => (/* binding */ cp),
/* harmony export */   "exists": () => (/* binding */ exists),
/* harmony export */   "maybeReadFile": () => (/* binding */ maybeReadFile),
/* harmony export */   "readFile": () => (/* binding */ readFile),
/* harmony export */   "readdir": () => (/* binding */ readdir),
/* harmony export */   "rmDir": () => (/* binding */ rmDir),
/* harmony export */   "stat": () => (/* binding */ stat),
/* harmony export */   "writeJsFile": () => (/* binding */ writeJsFile),
/* harmony export */   "writeJsonFile": () => (/* binding */ writeJsonFile),
/* harmony export */   "writeRawFile": () => (/* binding */ writeRawFile)
/* harmony export */ });
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_child_process__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prettier__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var prettier__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prettier__WEBPACK_IMPORTED_MODULE_3__);




const {
  access,
  readFile,
  readdir,
  stat
} = node_fs__WEBPACK_IMPORTED_MODULE_1__.promises;
const {
  writeFile,
  mkdir,
  rm
} = node_fs__WEBPACK_IMPORTED_MODULE_1__.promises;
async function writeJsonFile(path, json) {
  await writeRawFile(path, `${JSON.stringify(json, undefined, 2)}\n`);
}
async function writeJsFile(path, js) {
  await writeRawFile(path, `${(0,prettier__WEBPACK_IMPORTED_MODULE_3__.format)(js, {
    parser: 'babel',
    printWidth: 100,
    singleQuote: true,
    trailingComma: 'es5',
    bracketSpacing: false,
    arrowParens: 'avoid',
    endOfLine: 'auto'
  })}\n`);
}
async function writeRawFile(path, content) {
  console.log(`write ${path}`);
  await mkdir((0,node_path__WEBPACK_IMPORTED_MODULE_2__.dirname)(path), {
    recursive: true
  });
  await writeFile(path, content);
}
async function rmDir(dirPath) {
  await rm(dirPath, {
    recursive: true,
    force: true
  });
}
async function cleanDir(dirPath) {
  console.log('clean', dirPath);

  try {
    await rmDir(dirPath);
  } finally {
    await mkdir(dirPath, {
      recursive: true
    });
  }
}
async function cp(from, to) {
  return new Promise((resolve, reject) => {
    (0,node_child_process__WEBPACK_IMPORTED_MODULE_0__.exec)(`cp -R ${from} ${to}`, err => err ? reject(err) : resolve());
  });
}
async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}
async function maybeReadFile(path) {
  try {
    const fileContent = await readFile(path);
    return fileContent.toString();
  } catch {
    return undefined;
  }
}

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:child_process");

/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:fs");

/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("prettier");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PROJECT_TYPE_TO_METADATA": () => (/* binding */ PROJECT_TYPE_TO_METADATA),
/* harmony export */   "ProjectType": () => (/* binding */ ProjectType),
/* harmony export */   "RUNTIME_TYPE_TO_METADATA": () => (/* binding */ RUNTIME_TYPE_TO_METADATA),
/* harmony export */   "RuntimeType": () => (/* binding */ RuntimeType),
/* harmony export */   "WorkspaceFragmentType": () => (/* binding */ WorkspaceFragmentType)
/* harmony export */ });
//
// Runtime types
//
let RuntimeType; //
// Project type
//

(function (RuntimeType) {
  RuntimeType["Web"] = "web";
  RuntimeType["Node"] = "node";
  RuntimeType["Lib"] = "lib";
  RuntimeType["Lambda"] = "lambda";
  RuntimeType["ReactNative"] = "react-native";
  RuntimeType["NodeLib"] = "node-lib";
})(RuntimeType || (RuntimeType = {}));

let ProjectType;

(function (ProjectType) {
  ProjectType["Web"] = "web";
  ProjectType["LambdaFunction"] = "lambda_function";
  ProjectType["LambdaApi"] = "lambda_api";
  ProjectType["NodeLib"] = "node_lib";
})(ProjectType || (ProjectType = {}));

const PROJECT_TYPE_TO_METADATA = {
  [ProjectType.Web]: {
    runtimeType: RuntimeType.Web
  },
  [ProjectType.LambdaFunction]: {
    runtimeType: RuntimeType.Lambda
  },
  [ProjectType.LambdaApi]: {
    runtimeType: RuntimeType.Lambda
  },
  [ProjectType.NodeLib]: {
    runtimeType: RuntimeType.NodeLib
  }
};
const RUNTIME_TYPE_TO_METADATA = {
  [RuntimeType.Web]: {
    eslint: RuntimeType.Web,
    tsconfig: RuntimeType.Web,
    webpack: RuntimeType.Web
  },
  [RuntimeType.Node]: {
    eslint: RuntimeType.Node,
    tsconfig: RuntimeType.Node,
    webpack: RuntimeType.Node
  },
  [RuntimeType.Lib]: {
    eslint: RuntimeType.Lib,
    tsconfig: RuntimeType.Lib
  },
  [RuntimeType.Lambda]: {
    eslint: RuntimeType.Node,
    tsconfig: RuntimeType.Node,
    webpack: RuntimeType.Lambda
  },
  [RuntimeType.ReactNative]: {
    eslint: RuntimeType.ReactNative,
    tsconfig: RuntimeType.ReactNative
  },
  [RuntimeType.NodeLib]: {
    eslint: RuntimeType.Node,
    tsconfig: RuntimeType.Node,
    webpack: RuntimeType.NodeLib
  }
}; //
// Workspace Fragment type
//

let WorkspaceFragmentType;

(function (WorkspaceFragmentType) {
  WorkspaceFragmentType["StaticWebsite"] = "static-website";
  WorkspaceFragmentType["StandaloneLambda"] = "standalone-lambda";
  WorkspaceFragmentType["WebApp"] = "web-app";
  WorkspaceFragmentType["NodeLib"] = "node-lib";
})(WorkspaceFragmentType || (WorkspaceFragmentType = {}));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function validateRegistry() {
  return true;
}

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateWorkspace": () => (/* binding */ generateWorkspace),
/* harmony export */   "getProjectsFromWorkspaceFragment": () => (/* binding */ getProjectsFromWorkspaceFragment)
/* harmony export */ });
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_child_process__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _src_fs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _src_models__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var _src_project_deploy_script__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(10);
/* harmony import */ var _src_project_generate_project__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(12);
/* harmony import */ var _src_project_gitignore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(14);
/* harmony import */ var _src_project_package_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(15);
/* harmony import */ var _src_project_setup_script__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(17);
/* harmony import */ var _src_project_terraform_all__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(18);
/* harmony import */ var _src_project_vscode_workspace__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(25);
/* harmony import */ var _src_type_utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(11);












function getProjectsFromWorkspaceFragment(fragment) {
  if (fragment.type === _src_models__WEBPACK_IMPORTED_MODULE_3__.WorkspaceFragmentType.StaticWebsite) {
    return [{
      projectName: fragment.websiteName,
      type: _src_models__WEBPACK_IMPORTED_MODULE_3__.ProjectType.Web
    }];
  } else if (fragment.type === _src_models__WEBPACK_IMPORTED_MODULE_3__.WorkspaceFragmentType.StandaloneLambda) {
    return [{
      projectName: fragment.lambdaName,
      type: _src_models__WEBPACK_IMPORTED_MODULE_3__.ProjectType.LambdaApi
    }];
  } else if (fragment.type === _src_models__WEBPACK_IMPORTED_MODULE_3__.WorkspaceFragmentType.WebApp) {
    return [{
      projectName: fragment.websiteName,
      type: _src_models__WEBPACK_IMPORTED_MODULE_3__.ProjectType.Web
    }, {
      projectName: fragment.lambdaName,
      type: _src_models__WEBPACK_IMPORTED_MODULE_3__.ProjectType.LambdaApi
    }]; // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  } else if (fragment.type === _src_models__WEBPACK_IMPORTED_MODULE_3__.WorkspaceFragmentType.NodeLib) {
    return [{
      projectName: fragment.libName,
      type: _src_models__WEBPACK_IMPORTED_MODULE_3__.ProjectType.NodeLib
    }];
  }

  (0,_src_type_utils__WEBPACK_IMPORTED_MODULE_11__.neverHappens)(fragment, `Unknown ProjectType ${fragment.type}`);
}
async function generateWorkspace(dst, workspaceName, workspaceFragments, alreadyGenerated) {
  const projects = workspaceFragments.flatMap(getProjectsFromWorkspaceFragment);
  const projectNames = projects.map(p => p.projectName); // Create projects files from templates

  await Promise.all(projects.filter(p => !alreadyGenerated.includes(p.projectName)).map(async project => (0,_src_project_generate_project__WEBPACK_IMPORTED_MODULE_5__.generateProject)((0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(dst, project.projectName), project))); // package.json

  await (0,_src_fs__WEBPACK_IMPORTED_MODULE_2__.writeJsonFile)((0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(dst, 'package.json'), (0,_src_project_package_json__WEBPACK_IMPORTED_MODULE_7__.generateWorkspacePackageJson)(workspaceName, projects)); // .gitignore

  await (0,_src_fs__WEBPACK_IMPORTED_MODULE_2__.writeRawFile)((0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(dst, '.gitignore'), (0,_src_project_gitignore__WEBPACK_IMPORTED_MODULE_6__.generateGitIgnore)()); // app.code-workspace

  await (0,_src_fs__WEBPACK_IMPORTED_MODULE_2__.writeJsonFile)((0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(dst, 'app.code-workspace'), (0,_src_project_vscode_workspace__WEBPACK_IMPORTED_MODULE_10__.generateCodeWorkspace)(workspaceFragments)); // setup.js

  await (0,_src_fs__WEBPACK_IMPORTED_MODULE_2__.writeJsFile)((0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(dst, 'setup.js'), (0,_src_project_setup_script__WEBPACK_IMPORTED_MODULE_8__.generateSetupScript)(projectNames)); // deploy.js

  await (0,_src_fs__WEBPACK_IMPORTED_MODULE_2__.writeJsFile)((0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(dst, 'deploy.js'), (0,_src_project_deploy_script__WEBPACK_IMPORTED_MODULE_4__.generateDeployScript)(workspaceFragments)); // Terraform folder generation

  const terraformPath = (0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(dst, 'terraform');
  await Promise.all([(0,_src_fs__WEBPACK_IMPORTED_MODULE_2__.writeRawFile)((0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(terraformPath, 'base.tf'), (0,_src_project_terraform_all__WEBPACK_IMPORTED_MODULE_9__.generateCommonTerraform)(workspaceName, projects)), ...projects.filter(p => !alreadyGenerated.includes(p.projectName)).map(async p => {
    const content = (0,_src_project_terraform_all__WEBPACK_IMPORTED_MODULE_9__.generateWorkspaceProjectTerraform)(p);
    const name = `${p.projectName}_terraform`;
    await (0,_src_fs__WEBPACK_IMPORTED_MODULE_2__.writeRawFile)((0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(terraformPath, `${name}.tf`), content);
  })]); // Run setup.js

  console.log('Running post install script');
  const commands = [`cd ${dst}`, `node setup.js`];
  (0,node_child_process__WEBPACK_IMPORTED_MODULE_0__.execSync)(commands.join(' && '), {
    stdio: ['ignore', 'inherit', 'inherit']
  });
}

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateBuildNodeLibProjectFn": () => (/* binding */ generateBuildNodeLibProjectFn),
/* harmony export */   "generateBuildStandaloneLambdaProjectFn": () => (/* binding */ generateBuildStandaloneLambdaProjectFn),
/* harmony export */   "generateBuildStaticWebsiteProjectFn": () => (/* binding */ generateBuildStaticWebsiteProjectFn),
/* harmony export */   "generateBuildWebAppProjectFn": () => (/* binding */ generateBuildWebAppProjectFn),
/* harmony export */   "generateBuildWorkspaceFn": () => (/* binding */ generateBuildWorkspaceFn),
/* harmony export */   "generateDeployScript": () => (/* binding */ generateDeployScript)
/* harmony export */ });
/* harmony import */ var _src_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _src_project_generate_workspace__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _src_type_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);



function generateDeployScript(workspaceFragments) {
  const projects = workspaceFragments.flatMap(_src_project_generate_workspace__WEBPACK_IMPORTED_MODULE_1__.getProjectsFromWorkspaceFragment);
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

${projects.flatMap(p => [`    const ${p.projectName}Path = path.join(process.cwd(), '${p.projectName}');`, `    const ${p.projectName}Dist = path.join(${p.projectName}Path, 'dist');`]).join('\n')}

${generateBuildWorkspaceFn(workspaceFragments)}

async function run() {
  // Initialize if needed and get terraform outputs
  ensureDistFolders([
${projects.map(p => {
    const isLambda = _src_models__WEBPACK_IMPORTED_MODULE_0__.PROJECT_TYPE_TO_METADATA[p.type].runtimeType === _src_models__WEBPACK_IMPORTED_MODULE_0__.RuntimeType.Lambda;
    return `    {dist: ${p.projectName}Dist${isLambda ? ', isLambda: true' : ''}},`;
  }).join('\n')}
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
function generateBuildWorkspaceFn(fragments) {
  const buildFunctions = fragments.map(fragment => {
    const {
      type
    } = fragment;

    if (type === _src_models__WEBPACK_IMPORTED_MODULE_0__.WorkspaceFragmentType.WebApp) {
      return generateBuildWebAppProjectFn(fragment);
    } else if (type === _src_models__WEBPACK_IMPORTED_MODULE_0__.WorkspaceFragmentType.StaticWebsite) {
      return generateBuildStaticWebsiteProjectFn(fragment);
    } else if (type === _src_models__WEBPACK_IMPORTED_MODULE_0__.WorkspaceFragmentType.StandaloneLambda) {
      return generateBuildStandaloneLambdaProjectFn(fragment); // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    } else if (type === _src_models__WEBPACK_IMPORTED_MODULE_0__.WorkspaceFragmentType.NodeLib) {
      return generateBuildNodeLibProjectFn(fragment);
    }

    return (0,_src_type_utils__WEBPACK_IMPORTED_MODULE_2__.neverHappens)(type, `Unknown WorkspaceFragmentType "${type}"`);
  });
  return [...buildFunctions.map(fn => fn.sourceCode), `
async function buildWorkspace(outputs) {
  await Promise.all([${buildFunctions.map(fn => `${fn.name}(outputs)`).join(', ')}]);
}
  `.trim()].join('\n\n').trim();
}
function generateBuildWebAppProjectFn(fragment) {
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
    name: functionName
  };
}
function generateBuildStaticWebsiteProjectFn(fragment) {
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
    name: functionName
  };
}
function generateBuildStandaloneLambdaProjectFn(fragment) {
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
    name: functionName
  };
}
function generateBuildNodeLibProjectFn(fragment) {
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
    name: functionName
  };
}

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "neverHappens": () => (/* binding */ neverHappens)
/* harmony export */ });
function neverHappens(value, msg) {
  throw new Error(msg);
}

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateProject": () => (/* binding */ generateProject)
/* harmony export */ });
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_child_process__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_url__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _src_fs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var _src_models__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8);





const TEMPLATES_PATH = (0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)((0,node_url__WEBPACK_IMPORTED_MODULE_2__.fileURLToPath)("file:///Users/matthis/git/b/src/project/generate_project.ts"), '../../../templates');
async function generateProject(dst, project) {
  const {
    projectName,
    type
  } = project; // Copy template files

  await (0,_src_fs__WEBPACK_IMPORTED_MODULE_3__.cp)((0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(TEMPLATES_PATH, type), dst); // Post generation script for React Native project

  if (_src_models__WEBPACK_IMPORTED_MODULE_4__.PROJECT_TYPE_TO_METADATA[type].runtimeType === _src_models__WEBPACK_IMPORTED_MODULE_4__.RuntimeType.ReactNative) {
    console.log('Running post install script');
    const commands = [`pushd ${dst}`, `npx --yes react-native init ${projectName}`, `mv ${projectName}/ios .`, `mv ${projectName}/android .`, `rm -rf ${projectName}`, `popd`];
    (0,node_child_process__WEBPACK_IMPORTED_MODULE_0__.execSync)(commands.join(' && '));
  }
}

/***/ }),
/* 13 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:url");

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateGitIgnore": () => (/* binding */ generateGitIgnore)
/* harmony export */ });
function generateGitIgnore() {
  return `
.DS_Store
node_modules
build
dist
tmp
yarn-error.log
yarn.lock
terraform/.terraform
terraform/.terraform*
terraform/*.tfstate.backup
terraform/.aws-credentials
terraform/archives
    `.trim();
}

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateWorkspacePackageJson": () => (/* binding */ generateWorkspacePackageJson)
/* harmony export */ });
/* harmony import */ var _src_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _src_versions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16);



function uniq(runtimes) {
  return [...new Set(runtimes.filter(r => r !== undefined)).values()];
}

function projectMetadata(p) {
  return _src_models__WEBPACK_IMPORTED_MODULE_0__.RUNTIME_TYPE_TO_METADATA[_src_models__WEBPACK_IMPORTED_MODULE_0__.PROJECT_TYPE_TO_METADATA[p.type].runtimeType];
}

function generateWorkspacePackageJson(workspaceName, projects) {
  const eslintRuntimes = uniq(projects.map(p => projectMetadata(p).eslint));
  const tsconfigRuntimes = uniq(projects.map(p => projectMetadata(p).tsconfig));
  const webpackRuntimes = uniq(projects.map(p => projectMetadata(p).webpack));
  return {
    name: workspaceName,
    license: 'UNLICENSED',
    scripts: {
      setup: 'node ./setup.js',
      deploy: 'node ./deploy.js'
    },
    eslintConfig: {
      ignorePatterns: ['**/*.js']
    },
    devDependencies: Object.fromEntries([...eslintRuntimes.map(runtime => [`@matthis/eslint-config-${runtime}`, _src_versions__WEBPACK_IMPORTED_MODULE_1__.PACKAGE_VERSIONS.eslint]), ['@matthis/prettier-config', _src_versions__WEBPACK_IMPORTED_MODULE_1__.PACKAGE_VERSIONS.prettier], ...tsconfigRuntimes.map(runtime => [`@matthis/tsconfig-${runtime}`, _src_versions__WEBPACK_IMPORTED_MODULE_1__.PACKAGE_VERSIONS.tsconfig]), ...webpackRuntimes.map(runtime => [`@matthis/webpack-${runtime}`, _src_versions__WEBPACK_IMPORTED_MODULE_1__.PACKAGE_VERSIONS.webpack])].sort((d1, d2) => d1[0].localeCompare(d2[0])))
  };
}

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ESLINT_VERSION": () => (/* binding */ ESLINT_VERSION),
/* harmony export */   "LIB_VERSIONS": () => (/* binding */ LIB_VERSIONS),
/* harmony export */   "PACKAGE_VERSIONS": () => (/* binding */ PACKAGE_VERSIONS),
/* harmony export */   "PRETTIER_VERSION": () => (/* binding */ PRETTIER_VERSION),
/* harmony export */   "TYPESCRIPT_VERSION": () => (/* binding */ TYPESCRIPT_VERSION)
/* harmony export */ });
const PACKAGE_VERSIONS = {
  project: '1.2.8',
  eslint: '1.1.3',
  prettier: '1.1.1',
  tsconfig: '1.1.2',
  webpack: '1.1.9'
};
const ESLINT_VERSION = '8.23.x';
const PRETTIER_VERSION = '2.7.x';
const TYPESCRIPT_VERSION = '4.8.x';
/* eslint-disable @typescript-eslint/naming-convention */

const LIB_VERSIONS = {
  '@types/react': '17.0.x',
  '@types/react-dom': '17.0.x',
  react: '17.0.x',
  'react-dom': '17.0.x',
  '@types/react-native': '0.66.x',
  'react-native': '0.66.x',
  '@types/styled-components': '5.1.x',
  'styled-components': '5.1.x',
  'react-router': '5.2.x',
  'react-router-dom': '5.2.x'
};
/* eslint-enable @typescript-eslint/naming-convention */

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateSetupScript": () => (/* binding */ generateSetupScript)
/* harmony export */ });
function generateSetupScript(projects) {
  return `
const path = require('path');
const {execSync, exec} = require('child_process');

//

function detectYarn() {
  try {
    const yarnVersion = execSync('yarn -v', {stdio: ['ignore', 'pipe', 'ignore']}).toString();
    if (!yarnVersion.split('\\n')[0].match(/^\\d+.\\d+.\\d+$/)) {
      return \`Invalid yarn version "\${yarnVersion}"\`;
    }
  } catch (err) {
    return 'Yarn is not installed';
  }
}

function detectTerraform() {
  try {
    const terraformVersion = execSync('terraform -v', {
      stdio: ['ignore', 'pipe', 'ignore'],
    }).toString();
    if (!terraformVersion.split('\\n')[0].match(/^Terraform v\\d+.\\d+.\\d+$/)) {
      return \`Invalid terraform version "\${terraformVersion}"\`;
    }
  } catch (err) {
    return 'Terraform is not installed';
  }
}

function requirementDetection() {
  const errors = [detectYarn(), detectTerraform()].filter(err => typeof err === 'string');
  if (errors.length > 0) {
    console.error(errors.join('\\n'));
    return false;
  }
  return true;
}

//

async function installNodeModulesAtPath(path) {
  return new Promise((resolve, reject) => {
    exec(\`yarn install --non-interactive\`, {cwd: path}, (error, stdout, stderr) => {
      if (!error) {
        resolve();
      } else {
        console.error(\`Failure to run \\\`yarn install\\\` at "\${path}"\\n\${stderr}\`);
        reject();
      }
    });
  });
}

async function installNodeModules() {
  await Promise.all([
    installNodeModulesAtPath(process.cwd()),
    ${projects.map(p => `installNodeModulesAtPath(path.join(process.cwd(), '${p}')),`).join('\n')}
  ])
  }

async function run() {
  console.log('Checking requirements...');
  if (!requirementDetection()) {
    throw 'requirementDetection failure';
  }
  console.log('Installing node_modules...');
  await installNodeModules();
  console.log('Done');
}

run()
  .catch(err => {
    console.error(err);
    console.log('Fix the issue then run \`node setup.js\` manually');
  })
  .catch(() => process.exit(13));
  `.trim();
}

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateCommonTerraform": () => (/* binding */ generateCommonTerraform),
/* harmony export */   "generateLambdaApiTerraform": () => (/* binding */ generateLambdaApiTerraform),
/* harmony export */   "generateLambdaFunctionTerraform": () => (/* binding */ generateLambdaFunctionTerraform),
/* harmony export */   "generateNodeLibTerraform": () => (/* binding */ generateNodeLibTerraform),
/* harmony export */   "generateWebTerraform": () => (/* binding */ generateWebTerraform),
/* harmony export */   "generateWorkspaceProjectTerraform": () => (/* binding */ generateWorkspaceProjectTerraform)
/* harmony export */ });
/* harmony import */ var _src_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _src_project_terraform_api_gateway__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _src_project_terraform_cloudfront__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(20);
/* harmony import */ var _src_project_terraform_lambda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(21);
/* harmony import */ var _src_project_terraform_output__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(22);
/* harmony import */ var _src_project_terraform_provider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
/* harmony import */ var _src_project_terraform_s3__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(24);
/* harmony import */ var _src_type_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(11);








function generateCommonTerraform(workspaceName, projects) {
  return [(0,_src_project_terraform_provider__WEBPACK_IMPORTED_MODULE_5__.generateAwsProviderTerraform)(workspaceName), (0,_src_project_terraform_s3__WEBPACK_IMPORTED_MODULE_6__.generateS3BucketTerraform)(workspaceName, projects.filter(p => _src_models__WEBPACK_IMPORTED_MODULE_0__.PROJECT_TYPE_TO_METADATA[p.type].runtimeType === _src_models__WEBPACK_IMPORTED_MODULE_0__.RuntimeType.Web).map(p => p.projectName))].join('\n\n');
}
function generateWorkspaceProjectTerraform(project) {
  const {
    projectName,
    type
  } = project;

  if (type === _src_models__WEBPACK_IMPORTED_MODULE_0__.ProjectType.Web) {
    return generateWebTerraform(projectName);
  } else if (type === _src_models__WEBPACK_IMPORTED_MODULE_0__.ProjectType.LambdaFunction) {
    return generateLambdaFunctionTerraform(projectName);
  } else if (type === _src_models__WEBPACK_IMPORTED_MODULE_0__.ProjectType.LambdaApi) {
    return generateLambdaApiTerraform(projectName); // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  } else if (type === _src_models__WEBPACK_IMPORTED_MODULE_0__.ProjectType.NodeLib) {
    return generateNodeLibTerraform();
  }

  (0,_src_type_utils__WEBPACK_IMPORTED_MODULE_7__.neverHappens)(type, 'ProjectType');
}
function generateWebTerraform(projectName) {
  return [(0,_src_project_terraform_output__WEBPACK_IMPORTED_MODULE_4__.generateCloudfrontDomainNameOutputTerraform)(projectName), (0,_src_project_terraform_s3__WEBPACK_IMPORTED_MODULE_6__.generateWebFileUploadTerraform)(projectName), (0,_src_project_terraform_cloudfront__WEBPACK_IMPORTED_MODULE_2__.generateCloudfrontDistributionTerraform)(projectName)].join('\n\n');
}
function generateLambdaFunctionTerraform(projectName) {
  return [(0,_src_project_terraform_lambda__WEBPACK_IMPORTED_MODULE_3__.generateLambdaTerraform)(projectName), (0,_src_project_terraform_s3__WEBPACK_IMPORTED_MODULE_6__.generateLambdaFileUploadTerraform)(projectName)].join('\n\n');
}
function generateLambdaApiTerraform(projectName) {
  return [generateLambdaFunctionTerraform(projectName), (0,_src_project_terraform_output__WEBPACK_IMPORTED_MODULE_4__.generateLambdaApiOutputsTerraform)(projectName), (0,_src_project_terraform_api_gateway__WEBPACK_IMPORTED_MODULE_1__.generateApiGatewayTerraform)(projectName)].join('\n\n');
}
function generateNodeLibTerraform() {
  return '';
}

/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateApiGatewayTerraform": () => (/* binding */ generateApiGatewayTerraform)
/* harmony export */ });
function generateApiGatewayTerraform(projectName) {
  return `
resource "aws_api_gateway_rest_api" "${projectName}" {
  name        = "${projectName}-RestAPI"
  description = "Rest API for the \\"${projectName}\\" app"
}

resource "aws_api_gateway_resource" "${projectName}" {
  rest_api_id = aws_api_gateway_rest_api.${projectName}.id
  parent_id   = aws_api_gateway_rest_api.${projectName}.root_resource_id
  path_part   = "{proxy+}"
}
  
resource "aws_api_gateway_method" "${projectName}" {
  rest_api_id   = aws_api_gateway_rest_api.${projectName}.id
  resource_id   = aws_api_gateway_resource.${projectName}.id
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_method" "${projectName}_root" {
    rest_api_id   = aws_api_gateway_rest_api.${projectName}.id
    resource_id   = aws_api_gateway_rest_api.${projectName}.root_resource_id
    http_method   = "ANY"
    authorization = "NONE"
}

resource "aws_api_gateway_integration" "${projectName}" {
  rest_api_id = aws_api_gateway_rest_api.${projectName}.id
  resource_id = aws_api_gateway_method.${projectName}.resource_id
  http_method = aws_api_gateway_method.${projectName}.http_method
  
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.${projectName}.invoke_arn
}

resource "aws_api_gateway_integration" "${projectName}_root" {
  rest_api_id = aws_api_gateway_rest_api.${projectName}.id
  resource_id = aws_api_gateway_method.${projectName}_root.resource_id
  http_method = aws_api_gateway_method.${projectName}_root.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.${projectName}.invoke_arn
}

resource "aws_api_gateway_deployment" "${projectName}" {
  depends_on = [
    aws_api_gateway_integration.${projectName},
    aws_api_gateway_integration.${projectName}_root,
  ]
  rest_api_id = aws_api_gateway_rest_api.${projectName}.id
  stage_name  = "prod"

  triggers = {
    redeployment = sha1(jsonencode(aws_api_gateway_integration.${projectName}))
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_lambda_permission" "${projectName}" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.${projectName}.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "\${aws_api_gateway_rest_api.${projectName}.execution_arn}/*/*"
}      
`.trim();
}

/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateCloudfrontDistributionTerraform": () => (/* binding */ generateCloudfrontDistributionTerraform)
/* harmony export */ });
function generateCloudfrontDistributionTerraform(projectName) {
  const bucketName = projectName.toLowerCase().replace(/[^\d.a-z-]+/gu, '-');
  const originId = `${bucketName}-origin-id`;
  return `
resource "aws_cloudfront_distribution" "${projectName}" {
  origin {
    domain_name = aws_s3_bucket.code.bucket_regional_domain_name
    origin_id   = "${originId}"
    origin_path = "/${projectName}"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.${projectName}.cloudfront_access_identity_path
    }
  }
  
  enabled             = true
  wait_for_deployment = false
  is_ipv6_enabled     = true
  price_class         = "PriceClass_100"
  
  default_root_object   = "/index.html"
  custom_error_response {
    error_code         = 400
    response_code      = 200
    response_page_path = "/index.html"
  }
  custom_error_response {
    error_code         = 403
    response_code      = 200
    response_page_path = "/index.html"
  }
  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
  }

  default_cache_behavior {
    allowed_methods  = ["HEAD", "GET"]
    cached_methods   = ["HEAD", "GET"]
    compress         = true
    target_origin_id = "${originId}"
    viewer_protocol_policy = "redirect-to-https"
    
    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

resource "aws_cloudfront_origin_access_identity" "${projectName}" {}
  `.trim();
}

/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateLambdaTerraform": () => (/* binding */ generateLambdaTerraform)
/* harmony export */ });
function generateLambdaTerraform(projectName) {
  return `
# Define any extra role for the lambda here
data "aws_iam_policy_document" "lambda_${projectName}_extra_role" {
  statement {
    actions   = ["s3:ListAllMyBuckets"]
    resources = ["*"]
  }
}

resource "aws_lambda_function" "${projectName}" {
  function_name     = "${projectName}-API"
  s3_bucket         = aws_s3_bucket.code.id
  s3_key            = aws_s3_bucket_object.${projectName}_archive.id
  source_code_hash  = data.archive_file.${projectName}_archive.output_sha
  handler           = "main.handler"
  runtime           = "nodejs14.x"
  role              = aws_iam_role.lambda_${projectName}_exec.arn
}

resource "aws_iam_role" "lambda_${projectName}_exec" {
  name = "${projectName}-API-assume-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action    = "sts:AssumeRole"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
        Effect    = "Allow"
        Sid       = ""
      },
    ]
  })

  inline_policy {
    name = "${projectName}-API-cloudwatch-role"
    policy = jsonencode({
      Version = "2012-10-17"
      Statement = [
        {
          Action   = [
            "logs:CreateLogGroup",
            "logs:CreateLogStream",
            "logs:PutLogEvents"
          ]
          Effect   = "Allow"
          Resource = "arn:aws:logs:*:*:*"
        },
      ]
    })
  }
  
  inline_policy {
    name = "${projectName}-API-extra-role"
    policy = data.aws_iam_policy_document.lambda_${projectName}_extra_role.json
  }
}
`.trim();
}

/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateCloudfrontDomainNameOutputTerraform": () => (/* binding */ generateCloudfrontDomainNameOutputTerraform),
/* harmony export */   "generateLambdaApiOutputsTerraform": () => (/* binding */ generateLambdaApiOutputsTerraform)
/* harmony export */ });
function generateCloudfrontDomainNameOutputTerraform(projectName) {
  return `
output "${projectName}_cloudfront_domain_name" {
  value       = aws_cloudfront_distribution.${projectName}.domain_name
  description = "Domain (from cloudfront) where the \\"${projectName}\\" frontend is available."
}`.trim();
}
function generateLambdaApiOutputsTerraform(projectName) {
  return `
output "${projectName}_api_url" {
  value = aws_api_gateway_deployment.${projectName}.invoke_url
  description = "URL where the \\"${projectName}\\" lambda api can be called."
}`.trim();
}

/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateAwsProviderTerraform": () => (/* binding */ generateAwsProviderTerraform)
/* harmony export */ });
function generateAwsProviderTerraform(workspaceName) {
  return `
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  region  = "eu-west-3"
  shared_credentials_file = "./.aws-credentials"
  default_tags {
    tags = {
      Project = "${workspaceName}"
    }
  }
}
`.trim();
}

/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateLambdaFileUploadTerraform": () => (/* binding */ generateLambdaFileUploadTerraform),
/* harmony export */   "generateS3BucketTerraform": () => (/* binding */ generateS3BucketTerraform),
/* harmony export */   "generateWebFileUploadTerraform": () => (/* binding */ generateWebFileUploadTerraform)
/* harmony export */ });
function generateS3BucketTerraform(workspaceName, webProjectNames) {
  const bucketName = workspaceName.toLowerCase().replace(/[^a-z0-9.-]+/gu, '-');
  return `
resource "aws_s3_bucket" "code" {
  bucket_prefix = "${bucketName}-"
}

resource "aws_s3_bucket_acl" "code_bucket_acl" {
  bucket = aws_s3_bucket.code.id
  acl    = "private"
}

data "aws_iam_policy_document" "cloudfront_access_to_code" {
  ${webProjectNames.map(p => `
  statement {
    actions   = ["s3:GetObject"]
    resources = [
      "\${aws_s3_bucket.code.arn}/${p}/*",
    ]
    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.${p}.iam_arn]
    }
  }
`.trim()).join('\n\n')}
}

resource "aws_s3_bucket_policy" "code" {
  bucket = aws_s3_bucket.code.id
  policy = data.aws_iam_policy_document.cloudfront_access_to_code.json
}

`.trim();
}
function generateWebFileUploadTerraform(projectName) {
  return `
module "${projectName}_template_files" {
  source = "hashicorp/dir/template"
  base_dir = "../${projectName}/dist"
}

resource "aws_s3_bucket_object" "${projectName}_files" {
  for_each     = module.${projectName}_template_files.files
  bucket       = aws_s3_bucket.code.id
  key          = "${projectName}/\${each.key}"
  content_type = each.value.content_type
  source       = each.value.source_path
  content      = each.value.content
  etag         = each.value.digests.md5
}
`.trim();
}
function generateLambdaFileUploadTerraform(projectName) {
  return `
data "archive_file" "${projectName}_archive" {
  type        = "zip"
  source_dir  = "../${projectName}/dist"
  output_path = "./archives/${projectName}.zip"
}

resource "aws_s3_bucket_object" "${projectName}_archive" {
  bucket       = aws_s3_bucket.code.id
  key          = "${projectName}/dist.zip"
  source       = data.archive_file.${projectName}_archive.output_path
  etag         = data.archive_file.${projectName}_archive.output_sha
}
`.trim();
}

/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateCodeWorkspace": () => (/* binding */ generateCodeWorkspace)
/* harmony export */ });
/* harmony import */ var _generate_workspace__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);

function generateCodeWorkspace(workspaceFragments) {
  const projects = workspaceFragments.flatMap(_generate_workspace__WEBPACK_IMPORTED_MODULE_0__.getProjectsFromWorkspaceFragment);
  const projectNames = projects.map(p => p.projectName);
  return {
    projects: workspaceFragments,
    folders: [...projectNames.map(p => ({
      path: p
    })), {
      path: 'terraform'
    }, {
      path: '.',
      name: 'root'
    }],
    settings: {
      /* eslint-disable @typescript-eslint/naming-convention */
      'files.exclude': Object.fromEntries([...projectNames.map(p => [p, true]), ['terraform', true]]),
      'editor.acceptSuggestionOnCommitCharacter': false,
      'editor.suggestSelection': 'first',
      'vsintellicode.modify.editor.suggestSelection': 'automaticallyOverrodeDefaultValue',
      'explorer.confirmDelete': false,
      'git.autofetch': true,
      'git.confirmSync': false,
      'typescript.preferences.importModuleSpecifier': 'non-relative',
      'eslint.lintTask.enable': true,
      'eslint.useESLintClass': true,
      'eslint.options': {
        reportUnusedDisableDirectives: 'warn'
      },
      'editor.formatOnSave': true,
      'editor.codeActionsOnSave': {
        'source.fixAll': false,
        'source.fixAll.eslint': true
      },
      'editor.defaultFormatter': 'esbenp.prettier-vscode',
      'emmet.showExpandedAbbreviation': 'never'
      /* eslint-enable @typescript-eslint/naming-convention, no-null/no-null */

    },
    extensions: {
      recommendations: ['dbaeumer.vscode-eslint', 'esbenp.prettier-vscode', 'VisualStudioExptTeam.vscodeintellicode', 'styled-components.vscode-styled-components', 'naumovs.color-highlight', 'eamodio.gitlens']
    }
  };
}

/***/ })
/******/ ]);
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/compat get default export */
/******/ (() => {
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		var getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fs_promises__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prompts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var prompts__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prompts__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _src_fs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var _src_models__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8);
/* harmony import */ var _src_project_generate_workspace__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9);
/* harmony import */ var _src_type_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(11);








async function cancel(workspacePath) {
  console.log('Cancelling...');

  if (workspacePath !== undefined) {
    await (0,_src_fs__WEBPACK_IMPORTED_MODULE_3__.rmDir)(workspacePath);
  } // eslint-disable-next-line node/no-process-exit


  process.exit(0);
}

async function initProject() {
  let workspaceName;
  let workspacePath = process.cwd();
  const frags = [];
  const takenNames = ['terraform'];
  const alreadyGenerated = []; // Check if we are already in a workspace

  const workspaceContent = await (0,_src_fs__WEBPACK_IMPORTED_MODULE_3__.maybeReadFile)((0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(workspacePath, 'app.code-workspace'));
  const workspaceJson = workspaceContent === undefined ? {} : JSON.parse(workspaceContent);
  const workspaceProjects = Array.isArray(workspaceJson.projects) ? workspaceJson.projects : undefined;

  if (workspaceProjects !== undefined) {
    workspaceName = (0,node_path__WEBPACK_IMPORTED_MODULE_1__.basename)(workspacePath);

    for (const project of workspaceProjects) {
      frags.push(project);
      const projectNames = (0,_src_project_generate_workspace__WEBPACK_IMPORTED_MODULE_5__.getProjectsFromWorkspaceFragment)(project).map(p => p.projectName);
      takenNames.push(...projectNames);
      alreadyGenerated.push(...projectNames);
    }
  } else {
    // Ask for workspace name
    const promptResponse = await (0,prompts__WEBPACK_IMPORTED_MODULE_2__.prompt)({
      type: 'text',
      name: 'workspaceName',
      message: 'Workspace name',
      validate: v => v.length > 0
    });
    workspaceName = promptResponse.workspaceName;

    if (typeof workspaceName !== 'string') {
      return cancel();
    }

    workspacePath = (0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(workspacePath, workspaceName);
    await (0,node_fs_promises__WEBPACK_IMPORTED_MODULE_0__.mkdir)(workspacePath);
  }

  try {
    while (true) {
      let frag;

      try {
        // eslint-disable-next-line no-await-in-loop
        frag = await askForWorkspaceFragment(takenNames);
      } catch (err) {
        console.error(String(err));
        continue;
      }

      if (frag) {
        frags.push(frag);
        takenNames.push(...(0,_src_project_generate_workspace__WEBPACK_IMPORTED_MODULE_5__.getProjectsFromWorkspaceFragment)(frag).map(p => p.projectName));
      } else {
        break;
      }
    }

    const name = workspaceName;
    await (0,_src_project_generate_workspace__WEBPACK_IMPORTED_MODULE_5__.generateWorkspace)(workspacePath, name, frags, alreadyGenerated);
  } catch (err) {
    console.error(String(err));
    await cancel(workspaceName);
  }
}

async function askForWorkspaceFragment(takenNames) {
  const DONE_GENERATING = 'done_generating';
  const {
    workspaceFragmentType
  } = await (0,prompts__WEBPACK_IMPORTED_MODULE_2__.prompt)({
    type: 'select',
    name: 'workspaceFragmentType',
    message: 'Choose a type of project to add to the workspace',
    choices: [{
      title: 'Web App',
      value: _src_models__WEBPACK_IMPORTED_MODULE_4__.WorkspaceFragmentType.WebApp
    }, {
      title: 'Static Website',
      value: _src_models__WEBPACK_IMPORTED_MODULE_4__.WorkspaceFragmentType.StaticWebsite
    }, {
      title: 'Standalone Lambda',
      value: _src_models__WEBPACK_IMPORTED_MODULE_4__.WorkspaceFragmentType.StandaloneLambda
    }, {
      title: 'Node lib',
      value: _src_models__WEBPACK_IMPORTED_MODULE_4__.WorkspaceFragmentType.NodeLib
    }, {
      title: `I'm done`,
      value: DONE_GENERATING
    }]
  });

  if (workspaceFragmentType === undefined || workspaceFragmentType === DONE_GENERATING) {
    return undefined;
  }

  const type = workspaceFragmentType;

  if (type === _src_models__WEBPACK_IMPORTED_MODULE_4__.WorkspaceFragmentType.StaticWebsite) {
    const websiteName = await askForProjectName('Website project name', 'website', takenNames);
    return {
      type,
      websiteName
    };
  } else if (type === _src_models__WEBPACK_IMPORTED_MODULE_4__.WorkspaceFragmentType.StandaloneLambda) {
    const lambdaName = await askForProjectName('Lambda project name', 'lambda', takenNames);
    return {
      type,
      lambdaName
    };
  } else if (type === _src_models__WEBPACK_IMPORTED_MODULE_4__.WorkspaceFragmentType.WebApp) {
    const websiteName = await askForProjectName('Frontend project name', 'frontend', takenNames);
    const lambdaName = await askForProjectName('Backend project name', 'backend', takenNames);
    return {
      type,
      websiteName,
      lambdaName
    }; // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  } else if (type === _src_models__WEBPACK_IMPORTED_MODULE_4__.WorkspaceFragmentType.NodeLib) {
    const libName = await askForProjectName('Lib project name', 'lib', takenNames);
    return {
      type,
      libName
    };
  }

  (0,_src_type_utils__WEBPACK_IMPORTED_MODULE_6__.neverHappens)(type, `Unknown WorkspaceFragmentType "${type}"`);
}

async function askForProjectName(question, defaultValue, takenNames) {
  const prompts = __webpack_require__(3);

  let initial = defaultValue;

  if (takenNames.includes(initial)) {
    let index = 2;

    while (takenNames.includes(initial)) {
      initial = `${defaultValue}_${index}`;
      index++;
    }
  }

  const {
    value
  } = await prompts({
    type: 'text',
    name: 'value',
    message: question,
    initial,
    validate: v => v.length > 0
  });

  if (typeof value !== 'string') {
    throw new Error(`${question} is required`);
  }

  if (takenNames.includes(value)) {
    throw new Error(`${value} is taken`);
  }

  return value;
}

initProject().catch(console.error);
})();

