#!/usr/bin/env node --experimental-modules --no-warnings
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
/* harmony export */   access: () => (/* binding */ access),
/* harmony export */   cleanDir: () => (/* binding */ cleanDir),
/* harmony export */   cp: () => (/* binding */ cp),
/* harmony export */   exists: () => (/* binding */ exists),
/* harmony export */   listFiles: () => (/* binding */ listFiles),
/* harmony export */   maybeReadFile: () => (/* binding */ maybeReadFile),
/* harmony export */   readFile: () => (/* binding */ readFile),
/* harmony export */   readdir: () => (/* binding */ readdir),
/* harmony export */   rmDir: () => (/* binding */ rmDir),
/* harmony export */   setLogging: () => (/* binding */ setLogging),
/* harmony export */   stat: () => (/* binding */ stat),
/* harmony export */   writeJsFile: () => (/* binding */ writeJsFile),
/* harmony export */   writeJsFileSync: () => (/* binding */ writeJsFileSync),
/* harmony export */   writeJsonFile: () => (/* binding */ writeJsonFile),
/* harmony export */   writeRawFile: () => (/* binding */ writeRawFile),
/* harmony export */   writeRawFileSync: () => (/* binding */ writeRawFileSync),
/* harmony export */   writeTsFile: () => (/* binding */ writeTsFile),
/* harmony export */   writeTsFileSync: () => (/* binding */ writeTsFileSync)
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
let logEnabled = true;
const setLogging = enabled => {
  logEnabled = enabled;
};
async function writeJsonFile(path, json) {
  await writeRawFile(path, `${JSON.stringify(json, undefined, 2)}\n`);
}
const prettierConfig = parser => ({
  parser,
  printWidth: 100,
  singleQuote: true,
  trailingComma: 'es5',
  bracketSpacing: false,
  arrowParens: 'avoid',
  endOfLine: 'auto'
});
async function writePrettyFile(parser, path, code) {
  await writeRawFile(path, (0,prettier__WEBPACK_IMPORTED_MODULE_3__.format)(code, prettierConfig(parser)));
}
function writePrettyFileSync(parser, path, code) {
  writeRawFileSync(path, (0,prettier__WEBPACK_IMPORTED_MODULE_3__.format)(code, prettierConfig(parser)));
}
async function writeJsFile(path, js) {
  return writePrettyFile('babel', path, js);
}
function writeJsFileSync(path, js) {
  return writePrettyFileSync('babel', path, js);
}
async function writeTsFile(path, ts) {
  return writePrettyFile('typescript', path, ts);
}
function writeTsFileSync(path, ts) {
  return writePrettyFileSync('typescript', path, ts);
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
function writeRawFileSync(path, content) {
  if (logEnabled) {
    console.log(`write ${path}`);
  }
  (0,node_fs__WEBPACK_IMPORTED_MODULE_1__.mkdirSync)((0,node_path__WEBPACK_IMPORTED_MODULE_2__.dirname)(path), {
    recursive: true
  });
  (0,node_fs__WEBPACK_IMPORTED_MODULE_1__.writeFileSync)(path, content);
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
/* harmony export */   PROJECT_TYPE_TO_METADATA: () => (/* binding */ PROJECT_TYPE_TO_METADATA),
/* harmony export */   ProjectType: () => (/* binding */ ProjectType),
/* harmony export */   RUNTIME_TYPE_TO_METADATA: () => (/* binding */ RUNTIME_TYPE_TO_METADATA),
/* harmony export */   RuntimeType: () => (/* binding */ RuntimeType),
/* harmony export */   WorkspaceFragmentType: () => (/* binding */ WorkspaceFragmentType)
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
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateWorkspace: () => (/* binding */ generateWorkspace),
/* harmony export */   getProjectsFromWorkspaceFragment: () => (/* binding */ getProjectsFromWorkspaceFragment)
/* harmony export */ });
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_child_process__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_fs_promises__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(node_url__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _src_fs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4);
/* harmony import */ var _src_models__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8);
/* harmony import */ var _src_project_generate_project__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(11);
/* harmony import */ var _src_project_gitignore__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(12);
/* harmony import */ var _src_project_package_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(13);
/* harmony import */ var _src_project_terraform_all__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(15);
/* harmony import */ var _src_project_vscode_workspace__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(21);
/* harmony import */ var _src_type_utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(20);












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
/* 10 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:url");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateProject: () => (/* binding */ generateProject)
/* harmony export */ });
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_child_process__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_fs_promises__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(node_url__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _src_fs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4);
/* harmony import */ var _src_models__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8);






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
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateGitIgnore: () => (/* binding */ generateGitIgnore)
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
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateWorkspacePackageJson: () => (/* binding */ generateWorkspacePackageJson)
/* harmony export */ });
/* harmony import */ var _src_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _src_versions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14);


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
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ESLINT_VERSION: () => (/* binding */ ESLINT_VERSION),
/* harmony export */   LIB_VERSIONS: () => (/* binding */ LIB_VERSIONS),
/* harmony export */   PACKAGE_VERSIONS: () => (/* binding */ PACKAGE_VERSIONS),
/* harmony export */   PRETTIER_VERSION: () => (/* binding */ PRETTIER_VERSION),
/* harmony export */   TYPESCRIPT_VERSION: () => (/* binding */ TYPESCRIPT_VERSION)
/* harmony export */ });
const PACKAGE_VERSIONS = {
  project: '1.4.15',
  eslint: '1.2.8',
  prettier: '1.2.0',
  tsconfig: '1.2.7',
  webpack: '1.3.5',
  runner: '1.2.2'
};
const ESLINT_VERSION = '8.43.x';
const PRETTIER_VERSION = '2.8.x';
const TYPESCRIPT_VERSION = '5.0.4';

/* eslint-disable @typescript-eslint/naming-convention */
const LIB_VERSIONS = {
  '@types/react': '18.2.x',
  '@types/react-dom': '18.2.x',
  react: '18.2.x',
  'react-dom': '18.2.x',
  '@types/react-native': '0.66.x',
  'react-native': '0.66.x',
  'styled-components': '6.0.x',
  'react-router': '6.4.x',
  'react-router-dom': '6.4.x'
};
/* eslint-enable @typescript-eslint/naming-convention */

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateCommonTerraform: () => (/* binding */ generateCommonTerraform),
/* harmony export */   generateWorkspaceProjectTerraform: () => (/* binding */ generateWorkspaceProjectTerraform)
/* harmony export */ });
/* harmony import */ var _src_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _src_project_terraform_cloudfront__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16);
/* harmony import */ var _src_project_terraform_lambda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(17);
/* harmony import */ var _src_project_terraform_provider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(18);
/* harmony import */ var _src_project_terraform_s3__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(19);
/* harmony import */ var _src_type_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(20);






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
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateCloudfrontDistributionTerraform: () => (/* binding */ generateCloudfrontDistributionTerraform)
/* harmony export */ });
function generateCloudfrontDistributionTerraform(workspaceName, projectName) {
  const bucketName = projectName.toLowerCase().replace(/[^\d.a-z-]+/gu, '-');
  const originId = `${bucketName}-origin-id`;
  return `
output "${projectName}_cloudfront_domain_name" {
  value       = aws_cloudfront_distribution.${projectName}.domain_name
  description = "Domain (from cloudfront) where the \\"${workspaceName}-${projectName}\\" frontend is available."
}
  
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
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateLambdaTerraform: () => (/* binding */ generateLambdaTerraform)
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
  runtime           = "nodejs18.x"
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
    name = "${workspaceName}-${projectName}-s3-code-bucket"
    policy = jsonencode({
      Version = "2012-10-17"
      Statement = [
        {
          Action   = [
            "s3:GetObject",
            "s3:GetObjectTagging"
          ]
          Effect   = "Allow"
          Resource = [
            "\${aws_s3_bucket.code.arn}/*",
          ]
        }
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
/* 18 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateAwsProviderTerraform: () => (/* binding */ generateAwsProviderTerraform)
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
/* 19 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateS3BucketTerraform: () => (/* binding */ generateS3BucketTerraform)
/* harmony export */ });
function generateS3BucketTerraform(workspaceName, webProjectNames) {
  const bucketName = workspaceName.toLowerCase().replace(/[^a-z0-9.-]+/gu, '-');
  const CODE_BUCKET = `
resource "aws_s3_bucket" "code" {
  bucket_prefix = "${bucketName}-code-"
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
/* 20 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   neverHappens: () => (/* binding */ neverHappens),
/* harmony export */   removeUndefined: () => (/* binding */ removeUndefined)
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
/* 21 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateCodeWorkspace: () => (/* binding */ generateCodeWorkspace),
/* harmony export */   readProjectsFromWorkspace: () => (/* binding */ readProjectsFromWorkspace)
/* harmony export */ });
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _src_project_generate_workspace__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);



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
/* harmony import */ var _src_project_vscode_workspace__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(21);
/* harmony import */ var _src_type_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(20);








async function cancel(workspacePath) {
  console.log('Cancelling...');
  if (workspacePath !== undefined) {
    await (0,_src_fs__WEBPACK_IMPORTED_MODULE_3__.rmDir)(workspacePath);
  }
  // eslint-disable-next-line node/no-process-exit
  process.exit(0);
}
async function initProject() {
  let workspaceName;
  let workspacePath = process.cwd();
  const frags = [];
  const takenNames = ['terraform'];
  const alreadyGenerated = [];

  // Check if we are already in a workspace
  const workspaceProjects = await (0,_src_project_vscode_workspace__WEBPACK_IMPORTED_MODULE_6__.readProjectsFromWorkspace)(workspacePath);
  if (workspaceProjects !== undefined) {
    workspaceName = (0,node_path__WEBPACK_IMPORTED_MODULE_1__.basename)(workspacePath);
    for (const project of workspaceProjects) {
      frags.push(project);
      const projectNames = (0,_src_project_generate_workspace__WEBPACK_IMPORTED_MODULE_5__.getProjectsFromWorkspaceFragment)(project).map(p => p.projectName);
      takenNames.push(...projectNames);
      alreadyGenerated.push(...projectNames);
    }
  } else {
    frags.push({
      type: _src_models__WEBPACK_IMPORTED_MODULE_4__.WorkspaceFragmentType.Shared
    });
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
const WorkspaceFragmentTypeToString = {
  [_src_models__WEBPACK_IMPORTED_MODULE_4__.WorkspaceFragmentType.WebApp]: 'Web App',
  [_src_models__WEBPACK_IMPORTED_MODULE_4__.WorkspaceFragmentType.StaticWebsite]: 'Static Website',
  [_src_models__WEBPACK_IMPORTED_MODULE_4__.WorkspaceFragmentType.StandaloneLambda]: 'Standalone Lambda',
  [_src_models__WEBPACK_IMPORTED_MODULE_4__.WorkspaceFragmentType.NodeLib]: 'Node Lib',
  [_src_models__WEBPACK_IMPORTED_MODULE_4__.WorkspaceFragmentType.NodeScript]: 'Node Script'
};
async function askForWorkspaceFragment(takenNames) {
  const DONE_GENERATING = 'done_generating';
  const {
    workspaceFragmentType
  } = await (0,prompts__WEBPACK_IMPORTED_MODULE_2__.prompt)({
    type: 'select',
    name: 'workspaceFragmentType',
    message: 'Choose a type of project to add to the workspace',
    choices: [...Object.entries(WorkspaceFragmentTypeToString).map(([value, title]) => ({
      value,
      title
    })), {
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
    };
  } else if (type === _src_models__WEBPACK_IMPORTED_MODULE_4__.WorkspaceFragmentType.NodeLib) {
    const libName = await askForProjectName('Lib project name', 'lib', takenNames);
    return {
      type,
      libName
    };
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  } else if (type === _src_models__WEBPACK_IMPORTED_MODULE_4__.WorkspaceFragmentType.NodeScript) {
    const scriptName = await askForProjectName('Script project name', 'script', takenNames);
    return {
      type,
      scriptName
    };
  }
  (0,_src_type_utils__WEBPACK_IMPORTED_MODULE_7__.neverHappens)(type, `Unknown WorkspaceFragmentType "${type}"`);
}
const VALID_PROJECT_NAME = /^[a-zA-Z0-9_]+$/u;
async function askForProjectName(question, defaultValue, takenNames) {
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
  } = await (0,prompts__WEBPACK_IMPORTED_MODULE_2__.prompt)({
    type: 'text',
    name: 'value',
    message: question,
    initial,
    validate: v => v.length > 0
  });
  if (typeof value !== 'string') {
    throw new Error(`${question} is required`);
  }
  if (!VALID_PROJECT_NAME.test(value)) {
    throw new Error(`Invalid project name "${value}". Allowed characters are a-z, A-Z, 0-9 and _`);
  }
  if (takenNames.includes(value)) {
    throw new Error(`${value} is taken`);
  }
  return value;
}
initProject().catch(console.error);
})();


//# sourceMappingURL=index.js.map