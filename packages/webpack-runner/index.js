import { createRequire as __WEBPACK_EXTERNAL_createRequire } from "module";
/******/ var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:path");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("ansi-colors");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("webpack");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("webpack-dev-server");

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "registerExitCallback": () => (/* binding */ registerExitCallback)
/* harmony export */ });
/* harmony import */ var _src_global_error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);

let called = false;
const callbacks = [];
function runCallbacks() {
  if (called) {
    return;
  }
  called = true;
  for (const fn of callbacks) {
    Promise.resolve(fn()).catch(err => (0,_src_global_error__WEBPACK_IMPORTED_MODULE_0__.globalError)('Failure to run exit cleanup callback', err));
  }
}
process.on('beforeExit', () => runCallbacks());
process.on('exit', () => runCallbacks());
process.on('SIGTERM', () => runCallbacks());
process.on('SIGINT', () => runCallbacks());
process.on('uncaughtException', err => {
  (0,_src_global_error__WEBPACK_IMPORTED_MODULE_0__.globalError)('uncaughtException', err);
  runCallbacks();
});
function registerExitCallback(cb) {
  callbacks.push(cb);
}

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "globalError": () => (/* binding */ globalError)
/* harmony export */ });
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_0__);

function globalError(...val) {
  for (const data of val) {
    try {
      const str = typeof data === 'string' ? data : data instanceof Error ? data.stack ?? String(data) : JSON.stringify(data);
      console.error(str);
      (0,node_fs__WEBPACK_IMPORTED_MODULE_0__.appendFileSync)('error.log', str);
    } catch {
      console.error(String(val));
      (0,node_fs__WEBPACK_IMPORTED_MODULE_0__.appendFileSync)('error.log', String(val));
    }
  }
}

/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:fs");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "access": () => (/* binding */ access),
/* harmony export */   "cleanDir": () => (/* binding */ cleanDir),
/* harmony export */   "cp": () => (/* binding */ cp),
/* harmony export */   "exists": () => (/* binding */ exists),
/* harmony export */   "listFiles": () => (/* binding */ listFiles),
/* harmony export */   "maybeReadFile": () => (/* binding */ maybeReadFile),
/* harmony export */   "readFile": () => (/* binding */ readFile),
/* harmony export */   "readdir": () => (/* binding */ readdir),
/* harmony export */   "rmDir": () => (/* binding */ rmDir),
/* harmony export */   "setLogging": () => (/* binding */ setLogging),
/* harmony export */   "stat": () => (/* binding */ stat),
/* harmony export */   "writeJsFile": () => (/* binding */ writeJsFile),
/* harmony export */   "writeJsonFile": () => (/* binding */ writeJsonFile),
/* harmony export */   "writeRawFile": () => (/* binding */ writeRawFile),
/* harmony export */   "writeTsFile": () => (/* binding */ writeTsFile)
/* harmony export */ });
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_child_process__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prettier__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);
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
let logEnabled = true;
const setLogging = enabled => {
  logEnabled = enabled;
};
async function writeJsonFile(path, json) {
  await writeRawFile(path, `${JSON.stringify(json, undefined, 2)}\n`);
}
async function writePrettyFile(parser, path, code) {
  await writeRawFile(path, (0,prettier__WEBPACK_IMPORTED_MODULE_3__.format)(code, {
    parser,
    printWidth: 100,
    singleQuote: true,
    trailingComma: 'es5',
    bracketSpacing: false,
    arrowParens: 'avoid',
    endOfLine: 'auto'
  }));
}
async function writeJsFile(path, js) {
  return writePrettyFile('babel', path, js);
}
async function writeTsFile(path, ts) {
  return writePrettyFile('typescript', path, ts);
}
async function writeRawFile(path, content) {
  if (logEnabled) {
    console.log(`write ${path}`);
  }
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
  if (logEnabled) {
    console.log('clean', dirPath);
  }
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
async function listFiles(path) {
  const files = [];
  const ents = await readdir(path, {
    withFileTypes: true
  });
  const promises = [];
  for (const ent of ents) {
    const entPath = (0,node_path__WEBPACK_IMPORTED_MODULE_2__.join)(path, ent.name);
    if (ent.isDirectory()) {
      promises.push(listFiles(entPath).then(subFiles => {
        files.push(...subFiles);
      }));
    } else if (ent.isFile()) {
      files.push(entPath);
    }
  }
  await Promise.all(promises);
  return files;
}

/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:child_process");

/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("prettier");

/***/ }),
/* 11 */
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
let RuntimeType = /*#__PURE__*/function (RuntimeType) {
  RuntimeType["Web"] = "web";
  RuntimeType["Node"] = "node";
  RuntimeType["Lib"] = "lib";
  RuntimeType["Lambda"] = "lambda";
  RuntimeType["ReactNative"] = "react-native";
  RuntimeType["NodeLib"] = "node-lib";
  RuntimeType["NodeScript"] = "node-script";
  return RuntimeType;
}({});
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
    tsconfig: RuntimeType.Lib,
    webpack: RuntimeType.Lib
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
  },
  [RuntimeType.NodeScript]: {
    eslint: RuntimeType.Node,
    tsconfig: RuntimeType.Node,
    webpack: RuntimeType.NodeScript
  }
};

//
// Project type
//

let ProjectType = /*#__PURE__*/function (ProjectType) {
  ProjectType["Web"] = "web";
  ProjectType["LambdaFunction"] = "lambda_function";
  ProjectType["LambdaApi"] = "lambda_api";
  ProjectType["NodeLib"] = "node_lib";
  ProjectType["NodeScript"] = "node_script";
  ProjectType["Shared"] = "shared";
  return ProjectType;
}({});
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
  },
  [ProjectType.NodeScript]: {
    runtimeType: RuntimeType.NodeScript
  },
  [ProjectType.Shared]: {
    runtimeType: RuntimeType.Lib
  }
};

//
// Workspace Fragment type
//

let WorkspaceFragmentType = /*#__PURE__*/function (WorkspaceFragmentType) {
  WorkspaceFragmentType["StaticWebsite"] = "static-website";
  WorkspaceFragmentType["StandaloneLambda"] = "standalone-lambda";
  WorkspaceFragmentType["WebApp"] = "web-app";
  WorkspaceFragmentType["NodeLib"] = "node-lib";
  WorkspaceFragmentType["NodeScript"] = "node-script";
  WorkspaceFragmentType["Shared"] = "shared";
  return WorkspaceFragmentType;
}({});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function validateRegistry() {
  return true;
}

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateWorkspace": () => (/* binding */ generateWorkspace),
/* harmony export */   "getProjectsFromWorkspaceFragment": () => (/* binding */ getProjectsFromWorkspaceFragment)
/* harmony export */ });
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_child_process__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_fs_promises__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14);
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(node_url__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _src_fs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8);
/* harmony import */ var _src_models__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11);
/* harmony import */ var _src_project_generate_project__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(15);
/* harmony import */ var _src_project_gitignore__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(16);
/* harmony import */ var _src_project_package_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(17);
/* harmony import */ var _src_project_terraform_all__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(19);
/* harmony import */ var _src_project_vscode_workspace__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(25);
/* harmony import */ var _src_type_utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(24);












function getProjectsFromWorkspaceFragment(fragment) {
  if (fragment.type === _src_models__WEBPACK_IMPORTED_MODULE_5__.WorkspaceFragmentType.StaticWebsite) {
    return [{
      projectName: fragment.websiteName,
      type: _src_models__WEBPACK_IMPORTED_MODULE_5__.ProjectType.Web
    }];
  } else if (fragment.type === _src_models__WEBPACK_IMPORTED_MODULE_5__.WorkspaceFragmentType.StandaloneLambda) {
    return [{
      projectName: fragment.lambdaName,
      type: _src_models__WEBPACK_IMPORTED_MODULE_5__.ProjectType.LambdaFunction
    }];
  } else if (fragment.type === _src_models__WEBPACK_IMPORTED_MODULE_5__.WorkspaceFragmentType.WebApp) {
    return [{
      projectName: fragment.websiteName,
      type: _src_models__WEBPACK_IMPORTED_MODULE_5__.ProjectType.Web
    }, {
      projectName: fragment.lambdaName,
      type: _src_models__WEBPACK_IMPORTED_MODULE_5__.ProjectType.LambdaApi
    }];
  } else if (fragment.type === _src_models__WEBPACK_IMPORTED_MODULE_5__.WorkspaceFragmentType.NodeLib) {
    return [{
      projectName: fragment.libName,
      type: _src_models__WEBPACK_IMPORTED_MODULE_5__.ProjectType.NodeLib
    }];
  } else if (fragment.type === _src_models__WEBPACK_IMPORTED_MODULE_5__.WorkspaceFragmentType.NodeScript) {
    return [{
      projectName: fragment.scriptName,
      type: _src_models__WEBPACK_IMPORTED_MODULE_5__.ProjectType.NodeScript
    }];
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  } else if (fragment.type === _src_models__WEBPACK_IMPORTED_MODULE_5__.WorkspaceFragmentType.Shared) {
    return [{
      projectName: 'shared',
      type: _src_models__WEBPACK_IMPORTED_MODULE_5__.ProjectType.Shared
    }];
  }
  (0,_src_type_utils__WEBPACK_IMPORTED_MODULE_11__.neverHappens)(fragment, `Unknown ProjectType ${fragment.type}`);
}
async function generateWorkspace(dst, workspaceName, workspaceFragments, alreadyGenerated) {
  const projects = workspaceFragments.flatMap(getProjectsFromWorkspaceFragment);

  // Create projects files from templates
  await Promise.all(projects.filter(p => !alreadyGenerated.includes(p.projectName)).map(async project => (0,_src_project_generate_project__WEBPACK_IMPORTED_MODULE_6__.generateProject)((0,node_path__WEBPACK_IMPORTED_MODULE_2__.join)(dst, project.projectName), project)));

  // Generate workspace root files
  const SCRIPTS_PATH = (0,node_path__WEBPACK_IMPORTED_MODULE_2__.join)((0,node_url__WEBPACK_IMPORTED_MODULE_3__.fileURLToPath)(import.meta.url), '../scripts');
  await Promise.all([
  // package.json
  await (0,_src_fs__WEBPACK_IMPORTED_MODULE_4__.writeJsonFile)((0,node_path__WEBPACK_IMPORTED_MODULE_2__.join)(dst, 'package.json'), (0,_src_project_package_json__WEBPACK_IMPORTED_MODULE_8__.generateWorkspacePackageJson)(workspaceName, projects)),
  // .gitignore
  await (0,_src_fs__WEBPACK_IMPORTED_MODULE_4__.writeRawFile)((0,node_path__WEBPACK_IMPORTED_MODULE_2__.join)(dst, '.gitignore'), (0,_src_project_gitignore__WEBPACK_IMPORTED_MODULE_7__.generateGitIgnore)()),
  // app.code-workspace
  await (0,_src_fs__WEBPACK_IMPORTED_MODULE_4__.writeJsonFile)((0,node_path__WEBPACK_IMPORTED_MODULE_2__.join)(dst, 'app.code-workspace'), (0,_src_project_vscode_workspace__WEBPACK_IMPORTED_MODULE_10__.generateCodeWorkspace)(workspaceFragments)),
  // setup.js
  await (0,node_fs_promises__WEBPACK_IMPORTED_MODULE_1__.cp)((0,node_path__WEBPACK_IMPORTED_MODULE_2__.join)(SCRIPTS_PATH, 'setup.js'), (0,node_path__WEBPACK_IMPORTED_MODULE_2__.join)(dst, 'setup.js')),
  // deploy.js
  await (0,node_fs_promises__WEBPACK_IMPORTED_MODULE_1__.cp)((0,node_path__WEBPACK_IMPORTED_MODULE_2__.join)(SCRIPTS_PATH, 'deploy.js'), (0,node_path__WEBPACK_IMPORTED_MODULE_2__.join)(dst, 'deploy.js')),
  // build.js
  await (0,node_fs_promises__WEBPACK_IMPORTED_MODULE_1__.cp)((0,node_path__WEBPACK_IMPORTED_MODULE_2__.join)(SCRIPTS_PATH, 'build.js'), (0,node_path__WEBPACK_IMPORTED_MODULE_2__.join)(dst, 'build.js'))]);

  // Terraform folder generation
  const terraformPath = (0,node_path__WEBPACK_IMPORTED_MODULE_2__.join)(dst, 'terraform');
  await Promise.all([(0,_src_fs__WEBPACK_IMPORTED_MODULE_4__.writeRawFile)((0,node_path__WEBPACK_IMPORTED_MODULE_2__.join)(terraformPath, 'base.tf'), (0,_src_project_terraform_all__WEBPACK_IMPORTED_MODULE_9__.generateCommonTerraform)(workspaceName, projects)), ...projects.map(async p => {
    const content = (0,_src_project_terraform_all__WEBPACK_IMPORTED_MODULE_9__.generateWorkspaceProjectTerraform)(workspaceName, p);
    if (content === undefined) {
      return;
    }
    const name = `${p.projectName}_terraform`;
    await (0,_src_fs__WEBPACK_IMPORTED_MODULE_4__.writeRawFile)((0,node_path__WEBPACK_IMPORTED_MODULE_2__.join)(terraformPath, `${name}.tf`), content);
  })]);

  // Run setup.js
  console.log('Running post install script');
  const commands = [`cd ${dst}`, `node setup.js`, `git init`];
  (0,node_child_process__WEBPACK_IMPORTED_MODULE_0__.execSync)(commands.join(' && '), {
    stdio: ['ignore', 'inherit', 'inherit']
  });
}

/***/ }),
/* 13 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:fs/promises");

/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:url");

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateProject": () => (/* binding */ generateProject)
/* harmony export */ });
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_child_process__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_fs_promises__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14);
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(node_url__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _src_fs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8);
/* harmony import */ var _src_models__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11);






const TEMPLATES_PATH = (0,node_path__WEBPACK_IMPORTED_MODULE_2__.join)((0,node_url__WEBPACK_IMPORTED_MODULE_3__.fileURLToPath)(import.meta.url), '../templates');
async function generateProject(dst, project) {
  const {
    projectName,
    type
  } = project;
  // Copy template files
  await (0,_src_fs__WEBPACK_IMPORTED_MODULE_4__.cp)((0,node_path__WEBPACK_IMPORTED_MODULE_2__.join)(TEMPLATES_PATH, type), dst);

  // Replace name in package.json
  const packageJsonPath = (0,node_path__WEBPACK_IMPORTED_MODULE_2__.join)(dst, 'package.json');
  const packageJsonbuffer = await (0,_src_fs__WEBPACK_IMPORTED_MODULE_4__.readFile)(packageJsonPath);
  const packageJson = JSON.parse(packageJsonbuffer.toString());
  packageJson['name'] = projectName;
  await (0,_src_fs__WEBPACK_IMPORTED_MODULE_4__.writeJsonFile)(packageJsonPath, packageJson);

  // Replace variables
  const files = await (0,_src_fs__WEBPACK_IMPORTED_MODULE_4__.listFiles)(dst);
  await Promise.all(files.map(async file => {
    const buffer = await (0,_src_fs__WEBPACK_IMPORTED_MODULE_4__.readFile)(file);
    const content = buffer.toString();
    const newContent = content.replaceAll('{{PROJECT_NAME}}', projectName);
    if (newContent !== content) {
      await (0,node_fs_promises__WEBPACK_IMPORTED_MODULE_1__.writeFile)(file, newContent);
    }
  }));

  // Post generation script for React Native project
  if (_src_models__WEBPACK_IMPORTED_MODULE_5__.PROJECT_TYPE_TO_METADATA[type].runtimeType === _src_models__WEBPACK_IMPORTED_MODULE_5__.RuntimeType.ReactNative) {
    console.log('Running post install script');
    const commands = [`pushd ${dst}`, `npx --yes react-native init ${projectName}`, `mv ${projectName}/ios .`, `mv ${projectName}/android .`, `rm -rf ${projectName}`, `popd`];
    (0,node_child_process__WEBPACK_IMPORTED_MODULE_0__.execSync)(commands.join(' && '));
  }
}

/***/ }),
/* 16 */
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
.yarn-warnings.log
yarn.lock
terraform/.terraform
terraform/.terraform*
terraform/*.tfstate.backup
terraform/.aws-credentials
terraform/archives
*/log
    `.trim();
}

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateWorkspacePackageJson": () => (/* binding */ generateWorkspacePackageJson)
/* harmony export */ });
/* harmony import */ var _src_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _src_versions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18);


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
    type: 'module',
    scripts: {
      setup: 'node ./setup.js',
      deploy: 'node ./deploy.js',
      build: 'NODE_ENV=production node ./build.js',
      watch: 'NODE_ENV=development node ./build.js --watch'
    },
    eslintConfig: {
      ignorePatterns: ['**/*.js']
    },
    prettier: '@matthis/prettier-config',
    devDependencies: Object.fromEntries([...eslintRuntimes.map(runtime => [`@matthis/eslint-config-${runtime}`, _src_versions__WEBPACK_IMPORTED_MODULE_1__.PACKAGE_VERSIONS.eslint]), ['@matthis/prettier-config', _src_versions__WEBPACK_IMPORTED_MODULE_1__.PACKAGE_VERSIONS.prettier], ...tsconfigRuntimes.map(runtime => [`@matthis/tsconfig-${runtime}`, _src_versions__WEBPACK_IMPORTED_MODULE_1__.PACKAGE_VERSIONS.tsconfig]), ...webpackRuntimes.map(runtime => [`@matthis/webpack-${runtime}`, _src_versions__WEBPACK_IMPORTED_MODULE_1__.PACKAGE_VERSIONS.webpack]), ['@matthis/webpack-runner', _src_versions__WEBPACK_IMPORTED_MODULE_1__.PACKAGE_VERSIONS.runner], ['typescript', _src_versions__WEBPACK_IMPORTED_MODULE_1__.TYPESCRIPT_VERSION]].sort((d1, d2) => d1[0].localeCompare(d2[0])))
  };
}

/***/ }),
/* 18 */
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
  project: '1.3.32',
  eslint: '1.1.4',
  prettier: '1.1.1',
  tsconfig: '1.1.7',
  webpack: '1.2.18',
  runner: '1.1.18'
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
/* 19 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateCommonTerraform": () => (/* binding */ generateCommonTerraform),
/* harmony export */   "generateWorkspaceProjectTerraform": () => (/* binding */ generateWorkspaceProjectTerraform)
/* harmony export */ });
/* harmony import */ var _src_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _src_project_terraform_cloudfront__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(20);
/* harmony import */ var _src_project_terraform_lambda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(21);
/* harmony import */ var _src_project_terraform_provider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(22);
/* harmony import */ var _src_project_terraform_s3__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(23);
/* harmony import */ var _src_type_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(24);






function generateCommonTerraform(workspaceName, projects) {
  return [(0,_src_project_terraform_provider__WEBPACK_IMPORTED_MODULE_3__.generateAwsProviderTerraform)(workspaceName), (0,_src_project_terraform_s3__WEBPACK_IMPORTED_MODULE_4__.generateS3BucketTerraform)(workspaceName, projects.filter(p => _src_models__WEBPACK_IMPORTED_MODULE_0__.PROJECT_TYPE_TO_METADATA[p.type].runtimeType === _src_models__WEBPACK_IMPORTED_MODULE_0__.RuntimeType.Web).map(p => p.projectName))].join('\n\n');
}
function generateWorkspaceProjectTerraform(workspaceName, project) {
  const {
    projectName,
    type
  } = project;
  if (type === _src_models__WEBPACK_IMPORTED_MODULE_0__.ProjectType.Web) {
    return (0,_src_project_terraform_cloudfront__WEBPACK_IMPORTED_MODULE_1__.generateCloudfrontDistributionTerraform)(workspaceName, projectName);
  } else if (type === _src_models__WEBPACK_IMPORTED_MODULE_0__.ProjectType.LambdaFunction) {
    return (0,_src_project_terraform_lambda__WEBPACK_IMPORTED_MODULE_2__.generateLambdaTerraform)(workspaceName, projectName, {
      api: false
    });
  } else if (type === _src_models__WEBPACK_IMPORTED_MODULE_0__.ProjectType.LambdaApi) {
    return (0,_src_project_terraform_lambda__WEBPACK_IMPORTED_MODULE_2__.generateLambdaTerraform)(workspaceName, projectName, {
      api: true
    });
  } else if (type === _src_models__WEBPACK_IMPORTED_MODULE_0__.ProjectType.NodeLib) {
    return undefined;
  } else if (type === _src_models__WEBPACK_IMPORTED_MODULE_0__.ProjectType.NodeScript) {
    return undefined;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  } else if (type === _src_models__WEBPACK_IMPORTED_MODULE_0__.ProjectType.Shared) {
    return undefined;
  }
  (0,_src_type_utils__WEBPACK_IMPORTED_MODULE_5__.neverHappens)(type, 'ProjectType');
}

/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateCloudfrontDistributionTerraform": () => (/* binding */ generateCloudfrontDistributionTerraform)
/* harmony export */ });
function generateCloudfrontDistributionTerraform(workspaceName, projectName) {
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
function generateLambdaTerraform(workspaceName, projectName, opts) {
  const {
    api
  } = opts;
  return `
# Define any extra role for the lambda here
data "aws_iam_policy_document" "${projectName}_lambda_extra_role" {
  statement {
    actions   = ["s3:ListAllMyBuckets"]
    resources = ["*"]
  }
}

resource "aws_s3_object" "${projectName}_archive" {
  bucket       = aws_s3_bucket.code.id
  key          = "${projectName}/dist.zip"
  content_base64 = "UEsDBBQACAAIAGaKwlYAAAAAAAAAADYAAAAIACAAaW5kZXguanNVVA0AB3AIemRyCHpkcAh6ZHV4CwABBPUBAAAEFAAAAEutKMgvKinWy0jMS8lJLVKwVUgsrsxLVkgrzUsuyczPU9DQVKjmUlAoSi0pLcpTUFe35qq15gIAUEsHCP0ak1o4AAAANgAAAFBLAQIUAxQACAAIAGaKwlb9GpNaOAAAADYAAAAIACAAAAAAAAAAAACkgQAAAABpbmRleC5qc1VUDQAHcAh6ZHIIemRwCHpkdXgLAAEE9QEAAAQUAAAAUEsFBgAAAAABAAEAVgAAAI4AAAAAAA=="
}

resource "aws_lambda_function" "${projectName}" {
  function_name     = "${workspaceName}-${projectName}"
  s3_bucket         = aws_s3_object.${projectName}_archive.bucket
  s3_key            = aws_s3_object.${projectName}_archive.key
  handler           = "index.handler"
  runtime           = "nodejs14.x"
  role              = aws_iam_role.${projectName}_lambda_exec.arn
}

output "${projectName}_function_name" {
  value       = aws_lambda_function.${projectName}.function_name
  description = "Function name of the \\"${workspaceName}-${projectName}\\" lambda"
}

${api ? `
resource "aws_lambda_function_url" "${projectName}" {
  function_name      = aws_lambda_function.${projectName}.function_name
  authorization_type = "NONE"
}

output "${projectName}_function_url" {
  value       = aws_lambda_function_url.${projectName}.function_url
  description = "Function url of the \\"${workspaceName}-${projectName}\\" lambda"
}
`.trim() : ''}

resource "aws_iam_role" "${projectName}_lambda_exec" {
  name = "${workspaceName}-${projectName}-assume-role"
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
    name = "${workspaceName}-${projectName}-cloudwatch-role"
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
    name = "${workspaceName}-${projectName}-extra-role"
    policy = data.aws_iam_policy_document.${projectName}_lambda_extra_role.json
  }
}
`.trim();
}

/***/ }),
/* 22 */
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
      version = "~> 5.1"
    }
  }
}

provider "aws" {
  region  = "eu-west-3"
  shared_credentials_files = ["./.aws-credentials"]
  default_tags {
    tags = {
      Project = "${workspaceName}"
    }
  }
}

data "aws_region" "current" {}
output "region" {
  value = data.aws_region.current.id
}
`.trim();
}

/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateS3BucketTerraform": () => (/* binding */ generateS3BucketTerraform)
/* harmony export */ });
function generateS3BucketTerraform(workspaceName, webProjectNames) {
  const bucketName = workspaceName.toLowerCase().replace(/[^a-z0-9.-]+/gu, '-');
  const CODE_BUCKET = `
resource "aws_s3_bucket" "code" {
  bucket_prefix = "${bucketName}-"
}

output "code_bucket" {
  value = aws_s3_bucket.code.id
}
`.trim();
  const CLOUDFRONT_ACCESS = `
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
  const out = [CODE_BUCKET];
  if (webProjectNames.length > 0) {
    out.push(CLOUDFRONT_ACCESS);
  }
  return out.join('\n\n');
}

/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "neverHappens": () => (/* binding */ neverHappens),
/* harmony export */   "removeUndefined": () => (/* binding */ removeUndefined)
/* harmony export */ });
function neverHappens(value, msg) {
  throw new Error(msg ?? `Unexpected value ${value}`);
}
function notUndefined(val) {
  return val !== undefined;
}
function removeUndefined(arr) {
  return arr.filter(notUndefined);
}

/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateCodeWorkspace": () => (/* binding */ generateCodeWorkspace),
/* harmony export */   "readProjectsFromWorkspace": () => (/* binding */ readProjectsFromWorkspace)
/* harmony export */ });
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _src_project_generate_workspace__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12);



function generateCodeWorkspace(workspaceFragments) {
  const projects = workspaceFragments.flatMap(_src_project_generate_workspace__WEBPACK_IMPORTED_MODULE_2__.getProjectsFromWorkspaceFragment);
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
async function readProjectsFromWorkspace(workspacePath) {
  const workspaceContent = await (0,_src_fs__WEBPACK_IMPORTED_MODULE_1__.maybeReadFile)((0,node_path__WEBPACK_IMPORTED_MODULE_0__.join)(workspacePath, 'app.code-workspace'));
  const workspaceJson = workspaceContent === undefined ? {} : JSON.parse(workspaceContent);
  const workspaceProjects = Array.isArray(workspaceJson.projects) ? workspaceJson.projects : undefined;
  return workspaceProjects;
}

/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateEnvFile": () => (/* binding */ generateEnvFile)
/* harmony export */ });
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_child_process__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _src_fs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var _src_type_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(24);
/* harmony import */ var _src_webpack_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(27);





async function generateEnvFile(overrides) {
  const terraformPath = (0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(process.cwd(), 'terraform');
  const res = JSON.parse((0,node_child_process__WEBPACK_IMPORTED_MODULE_0__.execSync)(`terraform output -json`, {
    cwd: terraformPath
  }).toString());
  const outputsEntries = (0,_src_type_utils__WEBPACK_IMPORTED_MODULE_3__.removeUndefined)(Object.entries(res).map(([key, value]) => {
    if (value.sensitive || value.type !== 'string' || typeof value.value !== 'string') {
      return undefined;
    }
    return [key.toUpperCase(), value.value];
  }));
  const envConstants = {
    ...Object.fromEntries(outputsEntries),
    ...overrides,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    NODE_ENV: (0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_4__.getEnv)()
  };
  await (0,_src_fs__WEBPACK_IMPORTED_MODULE_2__.writeTsFile)((0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(process.cwd(), 'shared', 'src', 'env.ts'), Object.entries(envConstants).map(([key, value]) => `export const ${key} = ${JSON.stringify(value)};`).join('\n'));
}

/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "findPackageJson": () => (/* binding */ findPackageJson),
/* harmony export */   "getEnv": () => (/* binding */ getEnv),
/* harmony export */   "getPort": () => (/* binding */ getPort),
/* harmony export */   "initLogFile": () => (/* binding */ initLogFile),
/* harmony export */   "isProd": () => (/* binding */ isProd),
/* harmony export */   "isSelenium": () => (/* binding */ isSelenium)
/* harmony export */ });
/* harmony import */ var node_crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(28);
/* harmony import */ var node_crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_crypto__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_fs_promises__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _src_fs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);




function isProd() {
  return process.env['NODE_ENV'] === 'production'; // eslint-disable-line node/no-process-env
}

function isSelenium() {
  return process.env['IS_SELENIUM'] === '1'; // eslint-disable-line node/no-process-env
}

function getEnv() {
  return isProd() ? 'production' : 'development';
}
const packageJsonCache = new Map();
async function findPackageJson(p) {
  if (packageJsonCache.has(p)) {
    return packageJsonCache.get(p);
  }
  try {
    const pStat = await (0,node_fs_promises__WEBPACK_IMPORTED_MODULE_1__.stat)(p);
    if (pStat.isDirectory()) {
      const dir = await (0,node_fs_promises__WEBPACK_IMPORTED_MODULE_1__.readdir)(p);
      if (dir.includes('package.json')) {
        const fileContent = await (0,node_fs_promises__WEBPACK_IMPORTED_MODULE_1__.readFile)((0,node_path__WEBPACK_IMPORTED_MODULE_2__.join)(p, 'package.json'));
        const json = JSON.parse(fileContent.toString());
        packageJsonCache.set(p, json);
        return json;
      }
      if (p === '/') {
        return undefined;
      }
    }
    const res = await findPackageJson((0,node_path__WEBPACK_IMPORTED_MODULE_2__.resolve)(`${p}/..`));
    packageJsonCache.set(p, res);
    return res;
  } catch (err) {
    console.log('findPackageJson');
    console.log(err);
    packageJsonCache.set(p, undefined);
    return undefined;
  }
}
function getPort(context) {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const hexHash = (0,node_crypto__WEBPACK_IMPORTED_MODULE_0__.createHash)('md5').update(context).digest('hex').slice(0, 4);
  const port = 1024 + Math.floor(parseInt(hexHash, 16) / 2);
  return port;
}
async function initLogFile(context, logFileName) {
  // Find the root of the project and create the log dir there
  try {
    const root = await lookupRoot(context);
    const logDir = (0,node_path__WEBPACK_IMPORTED_MODULE_2__.join)(root, 'log');
    await (0,_src_fs__WEBPACK_IMPORTED_MODULE_3__.rmDir)(logDir);
    await (0,node_fs_promises__WEBPACK_IMPORTED_MODULE_1__.mkdir)(logDir, {
      recursive: true
    });
    const logFile = (0,node_path__WEBPACK_IMPORTED_MODULE_2__.join)(logDir, logFileName);
    if (await (0,_src_fs__WEBPACK_IMPORTED_MODULE_3__.exists)(logFile)) {
      await (0,node_fs_promises__WEBPACK_IMPORTED_MODULE_1__.rm)(logFile);
    }
    return logFile;
  } catch {
    throw new Error(`Failure to identify project root from ${context}`);
  }
}
async function lookupRoot(fromPath) {
  if (await (0,_src_fs__WEBPACK_IMPORTED_MODULE_3__.exists)((0,node_path__WEBPACK_IMPORTED_MODULE_2__.join)(fromPath, 'package.json'))) {
    return fromPath;
  }
  const parent = (0,node_path__WEBPACK_IMPORTED_MODULE_2__.join)(fromPath, '..');
  if (parent === fromPath) {
    throw new Error('Failure to lookup root');
  }
  return lookupRoot(parent);
}

/***/ }),
/* 28 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:crypto");

/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "groupAndSortErrors": () => (/* binding */ groupAndSortErrors)
/* harmony export */ });
function groupAndSortErrors(errors) {
  const errorsByProjectByFile = new Map();
  const globalErrors = [];
  for (const err of errors) {
    if (!('type' in err)) {
      globalErrors.push(err);
    } else {
      let projectErrors = errorsByProjectByFile.get(err.project);
      if (!projectErrors) {
        projectErrors = new Map();
        errorsByProjectByFile.set(err.project, projectErrors);
      }
      let fileErrors = projectErrors.get(err.loc.absolutePath);
      if (!fileErrors) {
        fileErrors = [];
        projectErrors.set(err.loc.absolutePath, fileErrors);
      }
      fileErrors.push(err);
    }
  }
  for (const byFile of errorsByProjectByFile.values()) {
    for (const errors of byFile.values()) {
      errors.sort((err1, err2) => {
        if (!err1.loc.start) {
          return -1;
        } else if (!err2.loc.start) {
          return 1;
        }
        return err1.loc.start.line - err2.loc.start.line;
      });
    }
  }
  return {
    errorsByProjectByFile,
    globalErrors
  };
}

/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parseError": () => (/* binding */ parseError)
/* harmony export */ });
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_0__);

function parseFilePath(root, path) {
  const relativePath = (0,node_path__WEBPACK_IMPORTED_MODULE_0__.relative)(root, path);
  const project = relativePath.split(node_path__WEBPACK_IMPORTED_MODULE_0__.sep)[0] ?? '';
  return {
    project,
    relativePath
  };
}
function parseError(err, opts) {
  const {
    root,
    severity
  } = opts;
  if (err.name === 'EslintWebpackError') {
    const eslintError = err;
    const absolutePath = err.file;
    const {
      relativePath,
      project
    } = parseFilePath(root, absolutePath);
    return {
      project,
      type: 'eslint',
      severity,
      message: err.message,
      code: eslintError.ruleId,
      loc: {
        relativePath,
        absolutePath,
        start: 'start' in err.loc ? err.loc.start : undefined,
        end: 'end' in err.loc ? err.loc.end : undefined
      }
    };
  } else if ('issue' in err) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const issue = err['issue'];
    const absolutePath = issue.file;
    if (absolutePath === undefined) {
      return {
        severity,
        message: err.message
      };
    }
    const {
      relativePath,
      project
    } = parseFilePath(root, absolutePath);
    return {
      project,
      type: 'tsc',
      severity,
      message: issue.message,
      code: issue.code,
      loc: {
        relativePath,
        absolutePath,
        ...issue.location
      }
    };
  } else if (err.name === 'ModuleNotFoundError') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const msg = err.error.message;
    const match = /(?<msg>Can't resolve '[^']+') in '(?<file>[^']+)'/u.exec(msg);
    if (!match) {
      return {
        severity,
        message: err.message
      };
    }
    const absolutePath = match[2];
    const message = match[1];
    if (absolutePath === undefined || message === undefined) {
      return {
        severity,
        message: err.message
      };
    }
    const {
      relativePath,
      project
    } = parseFilePath(root, absolutePath);
    return {
      project,
      type: 'tsc',
      severity,
      message,
      loc: {
        relativePath,
        absolutePath
      }
    };
  }
  return {
    severity,
    message: err.message
  };
}

/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "readLines": () => (/* binding */ readLines)
/* harmony export */ });
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_child_process__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_exit_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);


function readLines(filePath, cb) {
  const p = (0,node_child_process__WEBPACK_IMPORTED_MODULE_0__.spawn)('tail', ['-F', filePath], {
    stdio: 'pipe'
  });
  const cleanup = () => {
    if (!p.killed) {
      p.kill();
    }
  };
  (0,_src_exit_handler__WEBPACK_IMPORTED_MODULE_1__.registerExitCallback)(cleanup);
  let data = '';
  p.stdout.on('data', chunk => {
    data += chunk;
    const lines = data.split('\n');
    // eslint-disable-next-line node/callback-return
    cb(lines.slice(0, -1));
    data = lines.at(-1) ?? '';
  });
  p.on('error', err => {
    console.log(err);
  });
  return cleanup;
}

/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderErrorWarningCount": () => (/* binding */ renderErrorWarningCount),
/* harmony export */   "renderErrors": () => (/* binding */ renderErrors),
/* harmony export */   "renderLambdaServerEvent": () => (/* binding */ renderLambdaServerEvent),
/* harmony export */   "renderProjectStatus": () => (/* binding */ renderProjectStatus),
/* harmony export */   "renderWebpackDevServerEvent": () => (/* binding */ renderWebpackDevServerEvent)
/* harmony export */ });
/* harmony import */ var ansi_colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var ansi_colors__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ansi_colors__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_type_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24);
/* harmony import */ var _src_webpack_runner_error_formatter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(33);



function renderErrors(errors) {
  const {
    errorsByProjectByFile,
    globalErrors
  } = errors;
  const blocks = [];
  for (const globalError of globalErrors) {
    blocks.push((0,_src_webpack_runner_error_formatter__WEBPACK_IMPORTED_MODULE_2__.formatError)(globalError));
  }
  for (const [projectName, projectErrors] of errorsByProjectByFile.entries()) {
    blocks.push((0,ansi_colors__WEBPACK_IMPORTED_MODULE_0__.cyan)(projectName));
    for (const [file, errors] of projectErrors.entries()) {
      blocks.push([(0,_src_webpack_runner_error_formatter__WEBPACK_IMPORTED_MODULE_2__.formatFilePath)(file), ...errors.map(err => (0,_src_webpack_runner_error_formatter__WEBPACK_IMPORTED_MODULE_2__.formatError)(err))].join('\n'));
    }
  }
  return blocks.join('\n\n');
}
function renderProjectStatus(project, firstRun, isRunning, errors, compilationFailure, lambdaServerEvents, webpackDevServerEvents) {
  // First column
  const column1 = (0,_src_webpack_runner_error_formatter__WEBPACK_IMPORTED_MODULE_2__.formatProject)(project);

  // Second column
  let column2 = '';
  const projectErrors = errors.errorsByProjectByFile.get(project.projectName);
  if (projectErrors) {
    column2 = renderErrorWarningCount([...projectErrors.values()].flat());
  } else if (!firstRun) {
    column2 = (0,ansi_colors__WEBPACK_IMPORTED_MODULE_0__.green)('success');
  } else if (isRunning) {
    column2 = (0,ansi_colors__WEBPACK_IMPORTED_MODULE_0__.gray)('in progress');
  }

  // Third column
  const column3 = [];
  if (lambdaServerEvents.startEvent) {
    column3.push(renderLambdaServerEvent(lambdaServerEvents.startEvent));
  }
  if (webpackDevServerEvents.startEvent) {
    column3.push(renderWebpackDevServerEvent(webpackDevServerEvents.startEvent));
  }
  if (compilationFailure !== undefined) {
    column3.push((0,ansi_colors__WEBPACK_IMPORTED_MODULE_0__.red)(compilationFailure));
  }
  if (lambdaServerEvents.lastEvent) {
    column3.push(renderLambdaServerEvent(lambdaServerEvents.lastEvent));
  }
  return [column1, column2, column3.join(' ')];
}
function renderErrorWarningCount(errors) {
  const errorCount = errors.filter(err => err.severity === 'error').length;
  const warnCount = errors.filter(err => err.severity === 'warning').length;
  const diag = [];
  if (errorCount > 0) {
    const plural = errorCount > 1 ? 's' : '';
    diag.push(ansi_colors__WEBPACK_IMPORTED_MODULE_0__.bgRed.whiteBright(` ${errorCount} error${plural} `));
  }
  if (warnCount > 0) {
    const plural = warnCount > 1 ? 's' : '';
    diag.push(ansi_colors__WEBPACK_IMPORTED_MODULE_0__.bgYellow.whiteBright(` ${warnCount} warning${plural} `));
  }
  return diag.join(' ');
}
function renderLambdaServerEvent(event) {
  const type = event.event;
  if (type === 'start') {
    return `http://localhost:${event.port}`;
  }
  const req = (0,ansi_colors__WEBPACK_IMPORTED_MODULE_0__.gray)(`${event.method} ${event.path}`);
  if (type === 'error') {
    return `${req} ${(0,ansi_colors__WEBPACK_IMPORTED_MODULE_0__.red)(event.err)}`;
  } else if (type === 'request') {
    return `${req} ${(0,ansi_colors__WEBPACK_IMPORTED_MODULE_0__.gray)('running lambda...')}`;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  } else if (type === 'response') {
    const httpCode = `[HTTP ${event.statusCode}]`;
    const size = `[${event.byteLength.toLocaleString()}b]`;
    const duration = `[${event.duration.toLocaleString()}ms]`;
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const color = event.statusCode >= 400 ? ansi_colors__WEBPACK_IMPORTED_MODULE_0__.red : ansi_colors__WEBPACK_IMPORTED_MODULE_0__.green;
    return `${req} ${color(`${httpCode} ${size} ${duration}`)}`;
  }
  (0,_src_type_utils__WEBPACK_IMPORTED_MODULE_1__.neverHappens)(type);
}
function renderWebpackDevServerEvent(event) {
  const type = event.event;
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (type === 'start') {
    return `http://localhost:${event.port}`;
  }
  // const req = gray(`${event.method} ${event.path}`);
  // if (type === 'error') {
  //   return `${req} ${red(event.err)}`;
  // } else if (type === 'request') {
  //   return `${req} ${gray('running lambda...')}`;
  //   // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  // } else if (type === 'response') {
  //   const httpCode = `[HTTP ${event.statusCode}]`;
  //   const size = `[${event.byteLength.toLocaleString()}b]`;
  //   const duration = `[${event.duration.toLocaleString()}ms]`;
  //   // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  //   const color = event.statusCode >= 400 ? red : green;
  //   return `${req} ${color(`${httpCode} ${size} ${duration}`)}`;
  // }
  (0,_src_type_utils__WEBPACK_IMPORTED_MODULE_1__.neverHappens)(type);
}

/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "formatError": () => (/* binding */ formatError),
/* harmony export */   "formatFilePath": () => (/* binding */ formatFilePath),
/* harmony export */   "formatProject": () => (/* binding */ formatProject)
/* harmony export */ });
/* harmony import */ var ansi_colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var ansi_colors__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ansi_colors__WEBPACK_IMPORTED_MODULE_0__);

function formatProject(project) {
  return `${(0,ansi_colors__WEBPACK_IMPORTED_MODULE_0__.cyan)(project.projectName)} ${(0,ansi_colors__WEBPACK_IMPORTED_MODULE_0__.gray)(project.type)}`;
}
function formatFilePath(filePath) {
  return (0,ansi_colors__WEBPACK_IMPORTED_MODULE_0__.underline)(filePath);
}
function formatMessage(msg, severity) {
  return severity === 'warning' ? (0,ansi_colors__WEBPACK_IMPORTED_MODULE_0__.yellow)(msg) : (0,ansi_colors__WEBPACK_IMPORTED_MODULE_0__.red)(msg);
}
const padLeft = (value, size) => value.length >= size ? value : padLeft(` ${value}`, size);
const padRight = (value, size) => value.length >= size ? value : padRight(`${value} `, size);
function formatLocation(loc) {
  const {
    line,
    column
  } = loc ?? {};
  const padValue = 3;
  const lineStr = String(line ?? '');
  const columnStr = String(column ?? '');
  if (lineStr.length === 0 && columnStr.length === 0) {
    return padLeft('', 2 * padValue + 1);
  }
  return (0,ansi_colors__WEBPACK_IMPORTED_MODULE_0__.gray)(`${padLeft(lineStr, padValue)}:${padRight(columnStr, padValue)}`);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function formatLabel(code, type) {
  return (0,ansi_colors__WEBPACK_IMPORTED_MODULE_0__.gray)(code);
}
function formatError(err) {
  if ('type' in err) {
    return `${formatLocation(err.loc.start)} ${formatMessage(err.message, err.severity)} ${formatLabel(err.code, err.type)}`;
  }
  return formatMessage(`[${err.severity}] ${err.message}`, err.severity);
}

/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "table": () => (/* binding */ table)
/* harmony export */ });
const ansiRegex = new RegExp(['[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)', '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))'].join('|'), 'gu');
const stripAnsi = s => s.replace(ansiRegex, '');
function formatCell(cell) {
  return typeof cell === 'string' ? cell : cell.toLocaleString();
}
function padString(value, indent, right) {
  let valueStr = value;
  for (let i = 0; i < indent; i++) {
    valueStr = right ? `${valueStr} ` : ` ${valueStr}`;
  }
  return valueStr;
}
function table(data, options) {
  if (data.length === 0) {
    return '';
  }
  const {
    align = []
  } = options ?? {};
  const maxWidths = [];
  for (const line of data) {
    for (const [columnIndex, cell] of line.entries()) {
      maxWidths[columnIndex] = Math.max(maxWidths[columnIndex] ?? 0, stripAnsi(formatCell(cell)).length);
    }
  }
  return data.map(line => line.map((cell, colIndex) => {
    const content = formatCell(cell);
    return padString(content, (maxWidths[colIndex] ?? 0) - stripAnsi(content).length, align[colIndex] !== 'l');
  }).join(' ')).join('\n');
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
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "runAllWebpacks": () => (/* binding */ runAllWebpacks),
/* harmony export */   "runWebpacks": () => (/* binding */ runWebpacks)
/* harmony export */ });
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ansi_colors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var ansi_colors__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ansi_colors__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(webpack__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var webpack_dev_server__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var webpack_dev_server__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(webpack_dev_server__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _src_exit_handler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);
/* harmony import */ var _src_fs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8);
/* harmony import */ var _src_global_error__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6);
/* harmony import */ var _src_models__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(11);
/* harmony import */ var _src_project_generate_workspace__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(12);
/* harmony import */ var _src_project_vscode_workspace__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(25);
/* harmony import */ var _src_type_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(24);
/* harmony import */ var _src_webpack_runner_env_definition_file__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(26);
/* harmony import */ var _src_webpack_runner_error_grouper__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(29);
/* harmony import */ var _src_webpack_runner_error_parser__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(30);
/* harmony import */ var _src_webpack_runner_line_reader__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(31);
/* harmony import */ var _src_webpack_runner_renderer__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(32);
/* harmony import */ var _src_webpack_runner_text_table__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(34);

















(0,_src_fs__WEBPACK_IMPORTED_MODULE_5__.setLogging)(false);
const name = 'WebpackRunner';
async function runWebpacks(opts) {
  const {
    root,
    workspaceFragments,
    watch
  } = opts;
  const statuses = new Map();
  const projects = workspaceFragments.flatMap(_src_project_generate_workspace__WEBPACK_IMPORTED_MODULE_8__.getProjectsFromWorkspaceFragment);
  async function regenerateEnvFile() {
    const overrides = Object.fromEntries((0,_src_type_utils__WEBPACK_IMPORTED_MODULE_10__.removeUndefined)([...statuses.values()].map(({
      project,
      lambdaServerEvents
    }) => {
      if (project.type !== _src_models__WEBPACK_IMPORTED_MODULE_7__.ProjectType.LambdaApi || !lambdaServerEvents.startEvent) {
        return undefined;
      }
      return [`${project.projectName.toUpperCase()}_FUNCTION_URL`, `http://localhost:${lambdaServerEvents.startEvent.port}/`];
    })));
    await (0,_src_webpack_runner_env_definition_file__WEBPACK_IMPORTED_MODULE_11__.generateEnvFile)(overrides);
  }
  await regenerateEnvFile();
  function handleStart(project) {
    const {
      projectName
    } = project;
    const current = statuses.get(projectName) ?? {
      project,
      firstRun: true,
      isRunning: true,
      errors: [],
      lambdaServerEvents: {},
      webpackDevServerEvents: {}
    };
    statuses.set(projectName, {
      ...current,
      isRunning: true
    });
    onChange();
  }
  function handleResults(project, stats) {
    var _statuses$get, _statuses$get2, _statuses$get3;
    const {
      projectName
    } = project;
    const errors = [...stats.compilation.errors.map(err => (0,_src_webpack_runner_error_parser__WEBPACK_IMPORTED_MODULE_13__.parseError)(err, {
      root,
      severity: 'error'
    })), ...stats.compilation.warnings.map(warn => (0,_src_webpack_runner_error_parser__WEBPACK_IMPORTED_MODULE_13__.parseError)(warn, {
      root,
      severity: 'warning'
    }))];
    const lambdaServerEvents = ((_statuses$get = statuses.get(projectName)) === null || _statuses$get === void 0 ? void 0 : _statuses$get.lambdaServerEvents) ?? {};
    const webpackDevServerEvents = ((_statuses$get2 = statuses.get(projectName)) === null || _statuses$get2 === void 0 ? void 0 : _statuses$get2.webpackDevServerEvents) ?? {};
    const compilationFailure = (_statuses$get3 = statuses.get(projectName)) === null || _statuses$get3 === void 0 ? void 0 : _statuses$get3.compilationFailure;
    statuses.set(projectName, {
      project,
      firstRun: false,
      isRunning: false,
      errors,
      compilationFailure,
      lambdaServerEvents,
      webpackDevServerEvents
    });
    onChange();
  }
  function redraw() {
    const errors = [...statuses.values()].flatMap(v => v.errors);
    const groupedErrors = (0,_src_webpack_runner_error_grouper__WEBPACK_IMPORTED_MODULE_12__.groupAndSortErrors)(errors);
    const summary = [...statuses.values()].map(status => {
      return (0,_src_webpack_runner_renderer__WEBPACK_IMPORTED_MODULE_15__.renderProjectStatus)(status.project, status.firstRun, status.isRunning, groupedErrors, status.compilationFailure, status.lambdaServerEvents, status.webpackDevServerEvents);
    });
    summary.unshift([(0,ansi_colors__WEBPACK_IMPORTED_MODULE_1__.underline)(`Projects (${projects.length})`), (0,ansi_colors__WEBPACK_IMPORTED_MODULE_1__.underline)('Status'), (0,ansi_colors__WEBPACK_IMPORTED_MODULE_1__.underline)('Run')]);
    const report = (0,_src_webpack_runner_renderer__WEBPACK_IMPORTED_MODULE_15__.renderErrors)(groupedErrors);
    if (watch) {
      process.stdout.write('\u001B[2J\u001B[3J\u001B[H'); // clear terminal
    }

    console.log((0,_src_webpack_runner_text_table__WEBPACK_IMPORTED_MODULE_16__.table)(summary));
    if (report.length > 0) {
      console.log(`\nBuild completed with ${(0,_src_webpack_runner_renderer__WEBPACK_IMPORTED_MODULE_15__.renderErrorWarningCount)(errors)}\n`);
      console.log(report);
    }
  }
  function onChange() {
    if (watch) {
      redraw();
      return;
    }
    const allDone = [...statuses.values()].every(status => !status.isRunning);
    if (!allDone) {
      return;
    }
    const errors = [...statuses.values()].flatMap(v => v.errors);
    const {
      globalErrors
    } = (0,_src_webpack_runner_error_grouper__WEBPACK_IMPORTED_MODULE_12__.groupAndSortErrors)(errors);
    const noGlobalErrors = globalErrors.length === 0 && [...statuses.values()].every(status => status.compilationFailure === undefined);
    if (noGlobalErrors) {
      resolve();
    } else {
      reject();
    }
  }
  const cleanupFunctions = await Promise.all(projects.map(async project => {
    const {
      projectName
    } = project;
    const projectPath = (0,node_path__WEBPACK_IMPORTED_MODULE_0__.join)(root, projectName);
    const intialStatus = {
      project,
      firstRun: true,
      isRunning: true,
      errors: [],
      lambdaServerEvents: {},
      webpackDevServerEvents: {}
    };
    statuses.set(projectName, intialStatus);
    // eslint-disable-next-line import/dynamic-import-chunkname, node/no-unsupported-features/es-syntax
    const config = await import( /*webpackIgnore: true*/(0,node_path__WEBPACK_IMPORTED_MODULE_0__.join)(projectPath, 'webpack.config.js')).then(({
      getConfig
    }) => getConfig({
      context: projectPath,
      watch
    }));
    const reportCompilationFailure = error => {
      updateStatus(curr => {
        curr.compilationFailure = error;
      });
    };
    const updateLambdaServerEvents = fn => {
      updateStatus(curr => fn(curr.lambdaServerEvents));
    };
    const updateWebpackDevServerEvents = fn => {
      updateStatus(curr => fn(curr.webpackDevServerEvents));
    };
    const updateStatus = fn => {
      let current = statuses.get(projectName);
      if (!current) {
        current = intialStatus;
        statuses.set(projectName, current);
      }
      fn(current);
    };

    // Read events in the lambda server logs to update the globalInfo
    let lastProcessedLambdaLog = Date.now();
    const tailLambdaServerCleanup = watch ? (0,_src_webpack_runner_line_reader__WEBPACK_IMPORTED_MODULE_14__.readLines)((0,node_path__WEBPACK_IMPORTED_MODULE_0__.join)(projectPath, 'log', 'lambda_server_runtime.txt'), lines => {
      const logs = lines.map(l => l.trim()).filter(l => l.length > 0).map(l => JSON.parse(l));
      let shouldRedraw = false;
      for (const log of logs) {
        const date = new Date(log.t).getTime();
        if (date < lastProcessedLambdaLog) {
          continue;
        }
        lastProcessedLambdaLog = date;
        shouldRedraw = true;
        if (log.event === 'start') {
          updateLambdaServerEvents(curr => {
            curr.startEvent = log;
          });
          regenerateEnvFile().catch(err => (0,_src_global_error__WEBPACK_IMPORTED_MODULE_6__.globalError)('Failure to update env', err));
        } else {
          updateLambdaServerEvents(curr => {
            curr.lastEvent = log;
          });
        }
      }
      if (shouldRedraw) {
        redraw();
      }
    }) : undefined;

    // Read events in the webpack dev server logs to update the globalInfo
    let lastProcessedDevServerLog = Date.now();
    const tailWebpackServerCleanup = watch ? (0,_src_webpack_runner_line_reader__WEBPACK_IMPORTED_MODULE_14__.readLines)((0,node_path__WEBPACK_IMPORTED_MODULE_0__.join)(projectPath, 'log', 'webpack_dev_server.txt'), lines => {
      const logs = lines.map(l => l.trim()).filter(l => l.length > 0).map(l => JSON.parse(l));
      let shouldRedraw = false;
      for (const log of logs) {
        const date = new Date(log.t).getTime();
        if (date < lastProcessedDevServerLog) {
          continue;
        }
        lastProcessedDevServerLog = date;
        shouldRedraw = true;
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (log.event === 'start') {
          updateWebpackDevServerEvents(curr => {
            curr.startEvent = log;
          });
        } else {
          (0,_src_type_utils__WEBPACK_IMPORTED_MODULE_10__.neverHappens)(log.event);
          //   updateWebpackDevServerEvents(curr => {
          //     curr.lastEvent = log;
          //   });
        }
      }

      if (shouldRedraw) {
        redraw();
      }
    }) : undefined;
    const compiler = (0,webpack__WEBPACK_IMPORTED_MODULE_2__.webpack)({
      ...config,
      watch
    }, (err, res) => {
      if (err || !res) {
        reportCompilationFailure(err ? String(err) : 'No result after compilation');
        if (!watch) {
          onChange();
          resolve();
          return;
        }
      }
      onChange();
    });
    compiler.hooks.beforeRun.tap(name, () => handleStart(project));
    compiler.hooks.watchRun.tap(name, () => handleStart(project));
    compiler.hooks.done.tap(name, stats => handleResults(project, stats));
    let devServer;
    if (config.devServer) {
      devServer = new (webpack_dev_server__WEBPACK_IMPORTED_MODULE_3___default())(config.devServer, compiler);
      await devServer.start();
    }
    return async () => {
      return new Promise((resolve, reject) => {
        const closeCompiler = () => {
          tailLambdaServerCleanup === null || tailLambdaServerCleanup === void 0 ? void 0 : tailLambdaServerCleanup();
          tailWebpackServerCleanup === null || tailWebpackServerCleanup === void 0 ? void 0 : tailWebpackServerCleanup();
          compiler.close(err => err ? reject(err) : resolve());
        };
        if (devServer) {
          devServer.stop().then(closeCompiler).catch(reject);
        } else {
          closeCompiler();
        }
      });
    };
  }));
  let resolvePromise;
  let rejectPromise;
  const globalPromise = new Promise((resolve, reject) => {
    resolvePromise = resolve;
    rejectPromise = reject;
  });
  let cleanupCalled = false;
  const cleanup = async () => {
    if (cleanupCalled) {
      return;
    }
    cleanupCalled = true;
    await Promise.all(cleanupFunctions.map(async fn => fn()));
    redraw();
  };
  const reject = err => {
    cleanup().then(() => rejectPromise(err)).catch(cleanupErr => {
      (0,_src_global_error__WEBPACK_IMPORTED_MODULE_6__.globalError)('webpack runner cleanup error', cleanupErr);
      rejectPromise(err);
    });
  };
  const resolve = () => {
    cleanup().then(resolvePromise).catch(cleanupErr => {
      (0,_src_global_error__WEBPACK_IMPORTED_MODULE_6__.globalError)('webpack runner cleanup error', cleanupErr);
      resolvePromise();
    });
  };
  (0,_src_exit_handler__WEBPACK_IMPORTED_MODULE_4__.registerExitCallback)(cleanup);
  return globalPromise;
}
async function runAllWebpacks(options) {
  const {
    root,
    watch
  } = options;
  const workspaceFragments = await (0,_src_project_vscode_workspace__WEBPACK_IMPORTED_MODULE_9__.readProjectsFromWorkspace)(root);
  if (!workspaceFragments) {
    throw new Error(`No workspace projects at path ${root}`);
  }
  await runWebpacks({
    root,
    workspaceFragments,
    watch
  });
}
})();

var __webpack_exports__runAllWebpacks = __webpack_exports__.runAllWebpacks;
var __webpack_exports__runWebpacks = __webpack_exports__.runWebpacks;
export { __webpack_exports__runAllWebpacks as runAllWebpacks, __webpack_exports__runWebpacks as runWebpacks };

//# sourceMappingURL=index.js.map