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
/* harmony export */   maybeReadFileSync: () => (/* binding */ maybeReadFileSync),
/* harmony export */   prettierFormat: () => (/* binding */ prettierFormat),
/* harmony export */   prettyJs: () => (/* binding */ prettyJs),
/* harmony export */   prettyJson: () => (/* binding */ prettyJson),
/* harmony export */   prettyTs: () => (/* binding */ prettyTs),
/* harmony export */   readFile: () => (/* binding */ readFile),
/* harmony export */   readFileInternal: () => (/* binding */ readFileInternal),
/* harmony export */   readdir: () => (/* binding */ readdir),
/* harmony export */   rmDir: () => (/* binding */ rmDir),
/* harmony export */   stat: () => (/* binding */ stat),
/* harmony export */   writeJsFile: () => (/* binding */ writeJsFile),
/* harmony export */   writeJsonFile: () => (/* binding */ writeJsonFile),
/* harmony export */   writeRawFile: () => (/* binding */ writeRawFile),
/* harmony export */   writeRawFileIfNotExists: () => (/* binding */ writeRawFileIfNotExists),
/* harmony export */   writeTsFile: () => (/* binding */ writeTsFile)
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
  readFile: readFileInternal,
  readdir,
  stat
} = node_fs__WEBPACK_IMPORTED_MODULE_1__.promises;
const {
  writeFile,
  mkdir,
  rm
} = node_fs__WEBPACK_IMPORTED_MODULE_1__.promises;
async function readFile(path) {
  const buffer = await readFileInternal(path);
  return buffer.toString();
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
async function prettierFormat(str, parser) {
  return (0,prettier__WEBPACK_IMPORTED_MODULE_3__.format)(str, prettierConfig(parser));
}
async function writeRawFile(path, content) {
  await mkdir((0,node_path__WEBPACK_IMPORTED_MODULE_2__.dirname)(path), {
    recursive: true
  });
  await writeFile(path, content);
}
async function prettyJson(json, opts) {
  const {
    compact
  } = opts ?? {};
  return (0,prettier__WEBPACK_IMPORTED_MODULE_3__.format)(compact ? JSON.stringify(json) : JSON.stringify(json, undefined, 2), prettierConfig('json'));
}
async function writeJsonFile(path, json) {
  await writeRawFile(path, await prettyJson(json));
}
async function prettyJs(js) {
  return (0,prettier__WEBPACK_IMPORTED_MODULE_3__.format)(js, prettierConfig('babel'));
}
async function writeJsFile(path, js) {
  await writeRawFile(path, await prettyJs(js));
}
async function prettyTs(ts) {
  return (0,prettier__WEBPACK_IMPORTED_MODULE_3__.format)(ts, prettierConfig('typescript'));
}
async function writeTsFile(path, ts) {
  await writeRawFile(path, await prettyTs(ts));
}
async function writeRawFileIfNotExists(path, content) {
  if (await exists(path)) {
    return;
  }
  await writeRawFile(path, content);
}
async function rmDir(dirPath) {
  await rm(dirPath, {
    recursive: true,
    force: true
  });
}
async function cleanDir(dirPath) {
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
function maybeReadFileSync(path) {
  try {
    const fileContent = (0,node_fs__WEBPACK_IMPORTED_MODULE_1__.readFileSync)(path);
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
/* harmony export */   error: () => (/* binding */ error),
/* harmony export */   log: () => (/* binding */ log)
/* harmony export */ });
const {
  log,
  error
} = console;

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EslintType: () => (/* binding */ EslintType),
/* harmony export */   PROJECT_TYPE_TO_METADATA: () => (/* binding */ PROJECT_TYPE_TO_METADATA),
/* harmony export */   ProjectType: () => (/* binding */ ProjectType),
/* harmony export */   TsConfigType: () => (/* binding */ TsConfigType),
/* harmony export */   WebpackType: () => (/* binding */ WebpackType),
/* harmony export */   WorkspaceFragmentType: () => (/* binding */ WorkspaceFragmentType),
/* harmony export */   filterFragments: () => (/* binding */ filterFragments)
/* harmony export */ });
//
// Project type
//

let ProjectType = /*#__PURE__*/function (ProjectType) {
  ProjectType["Web"] = "web";
  ProjectType["LambdaFunction"] = "lambda_function";
  ProjectType["LambdaApi"] = "lambda_api";
  ProjectType["LambdaWebApi"] = "lambda_web_api";
  ProjectType["NodeScript"] = "node_script";
  ProjectType["Shared"] = "shared";
  ProjectType["SharedNode"] = "shared-node";
  ProjectType["SharedWeb"] = "shared-web";
  return ProjectType;
}({});
let EslintType = /*#__PURE__*/function (EslintType) {
  EslintType["Web"] = "web";
  EslintType["Node"] = "node";
  EslintType["Lib"] = "lib";
  return EslintType;
}({});
let TsConfigType = /*#__PURE__*/function (TsConfigType) {
  TsConfigType["Web"] = "web";
  TsConfigType["Node"] = "node";
  TsConfigType["Lib"] = "lib";
  return TsConfigType;
}({});
let WebpackType = /*#__PURE__*/function (WebpackType) {
  WebpackType["Web"] = "web";
  WebpackType["Lib"] = "lib";
  WebpackType["Lambda"] = "lambda";
  WebpackType["NodeScript"] = "node-script";
  return WebpackType;
}({});
const PROJECT_TYPE_TO_METADATA = {
  [ProjectType.Web]: {
    eslint: EslintType.Web,
    tsconfig: TsConfigType.Web,
    webpack: WebpackType.Web
  },
  [ProjectType.LambdaFunction]: {
    eslint: EslintType.Node,
    tsconfig: TsConfigType.Node,
    webpack: WebpackType.Lambda
  },
  [ProjectType.LambdaApi]: {
    eslint: EslintType.Node,
    tsconfig: TsConfigType.Node,
    webpack: WebpackType.Lambda
  },
  [ProjectType.LambdaWebApi]: {
    eslint: EslintType.Node,
    tsconfig: TsConfigType.Node,
    webpack: WebpackType.Lambda
  },
  [ProjectType.NodeScript]: {
    eslint: EslintType.Node,
    tsconfig: TsConfigType.Node,
    webpack: WebpackType.NodeScript
  },
  [ProjectType.Shared]: {
    eslint: EslintType.Lib,
    tsconfig: TsConfigType.Lib,
    webpack: WebpackType.Lib
  },
  [ProjectType.SharedNode]: {
    eslint: EslintType.Node,
    tsconfig: TsConfigType.Node,
    webpack: WebpackType.Lib
  },
  [ProjectType.SharedWeb]: {
    eslint: EslintType.Web,
    tsconfig: TsConfigType.Web,
    webpack: WebpackType.Lib
  }
};

//
// Workspace Fragment type
//

let WorkspaceFragmentType = /*#__PURE__*/function (WorkspaceFragmentType) {
  WorkspaceFragmentType["StaticWebsite"] = "static-website";
  WorkspaceFragmentType["StandaloneLambda"] = "standalone-lambda";
  WorkspaceFragmentType["ApiLambda"] = "api-lambda";
  WorkspaceFragmentType["WebApp"] = "web-app";
  WorkspaceFragmentType["NodeScript"] = "node-script";
  WorkspaceFragmentType["Shared"] = "shared";
  WorkspaceFragmentType["SharedNode"] = "shared-node";
  WorkspaceFragmentType["SharedWeb"] = "shared-web";
  return WorkspaceFragmentType;
}({});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function validateRegistry() {
  return true;
}
function filterFragments(frags, type) {
  return frags.filter(frag => frag.type === type);
}

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateWorkspace: () => (/* binding */ generateWorkspace),
/* harmony export */   getProjectsFromWorkspaceFragment: () => (/* binding */ getProjectsFromWorkspaceFragment),
/* harmony export */   writeWorkspaceFile: () => (/* binding */ writeWorkspaceFile)
/* harmony export */ });
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_child_process__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_url__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _src_fs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var _src_hash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(12);
/* harmony import */ var _src_logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8);
/* harmony import */ var _src_models__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9);
/* harmony import */ var _src_project_generate_project__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(14);
/* harmony import */ var _src_project_gitignore__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(18);
/* harmony import */ var _src_project_package_json__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(19);
/* harmony import */ var _src_project_terraform_all__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(21);
/* harmony import */ var _src_project_terraform_dynamo_user__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(27);
/* harmony import */ var _src_project_terraform_dynamo_user_session__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(28);
/* harmony import */ var _src_project_vscode_workspace__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(29);
/* harmony import */ var _src_string_utils__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(16);
/* harmony import */ var _src_type_utils__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(26);
/* harmony import */ var _src_versions__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(20);

















const TEMPLATES_PATH = (0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)((0,node_url__WEBPACK_IMPORTED_MODULE_2__.fileURLToPath)(import.meta.url), '../templates');
function getProjectsFromWorkspaceFragment(fragment) {
  if (fragment.type === _src_models__WEBPACK_IMPORTED_MODULE_6__.WorkspaceFragmentType.StaticWebsite) {
    return [{
      projectName: fragment.websiteName,
      type: _src_models__WEBPACK_IMPORTED_MODULE_6__.ProjectType.Web,
      fromFragment: fragment,
      vars: {
        __PROJECT_NAME__: fragment.websiteName
      }
    }];
  } else if (fragment.type === _src_models__WEBPACK_IMPORTED_MODULE_6__.WorkspaceFragmentType.StandaloneLambda) {
    return [{
      projectName: fragment.lambdaName,
      type: _src_models__WEBPACK_IMPORTED_MODULE_6__.ProjectType.LambdaFunction,
      fromFragment: fragment,
      vars: {
        __PROJECT_NAME__: fragment.lambdaName,
        __PROJECT_NAME_UPPERCASE__: fragment.lambdaName.toUpperCase()
      }
    }];
  } else if (fragment.type === _src_models__WEBPACK_IMPORTED_MODULE_6__.WorkspaceFragmentType.ApiLambda) {
    return [{
      projectName: fragment.apiName,
      type: _src_models__WEBPACK_IMPORTED_MODULE_6__.ProjectType.LambdaApi,
      fromFragment: fragment,
      vars: {
        __PROJECT_NAME__: fragment.apiName,
        __PROJECT_NAME_UPPERCASE__: fragment.apiName.toUpperCase()
      }
    }];
  } else if (fragment.type === _src_models__WEBPACK_IMPORTED_MODULE_6__.WorkspaceFragmentType.WebApp) {
    const backendName = `${fragment.appName}_backend`;
    const frontendName = `${fragment.appName}_frontend`;
    const vars = {
      __APP_NAME__: fragment.appName,
      __APP_NAME_UPPERCASE__: fragment.appName.toUpperCase(),
      __APP_NAME_PASCALCASE__: (0,_src_string_utils__WEBPACK_IMPORTED_MODULE_14__.pascalCase)(fragment.appName)
    };
    return [{
      projectName: frontendName,
      type: _src_models__WEBPACK_IMPORTED_MODULE_6__.ProjectType.Web,
      fromFragment: fragment,
      vars
    }, {
      projectName: backendName,
      type: _src_models__WEBPACK_IMPORTED_MODULE_6__.ProjectType.LambdaWebApi,
      fromFragment: fragment,
      vars
    }];
  } else if (fragment.type === _src_models__WEBPACK_IMPORTED_MODULE_6__.WorkspaceFragmentType.NodeScript) {
    return [{
      projectName: fragment.scriptName,
      type: _src_models__WEBPACK_IMPORTED_MODULE_6__.ProjectType.NodeScript,
      fromFragment: fragment,
      vars: {
        __PROJECT_NAME__: fragment.scriptName
      }
    }];
  } else if (fragment.type === _src_models__WEBPACK_IMPORTED_MODULE_6__.WorkspaceFragmentType.SharedNode) {
    const projectName = 'shared-node';
    return [{
      projectName,
      type: _src_models__WEBPACK_IMPORTED_MODULE_6__.ProjectType.SharedNode,
      fromFragment: fragment,
      vars: {
        __PROJECT_NAME__: projectName
      }
    }];
  } else if (fragment.type === _src_models__WEBPACK_IMPORTED_MODULE_6__.WorkspaceFragmentType.SharedWeb) {
    const projectName = 'shared-web';
    return [{
      projectName,
      type: _src_models__WEBPACK_IMPORTED_MODULE_6__.ProjectType.SharedWeb,
      fromFragment: fragment,
      vars: {
        __PROJECT_NAME__: projectName
      }
    }];
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  } else if (fragment.type === _src_models__WEBPACK_IMPORTED_MODULE_6__.WorkspaceFragmentType.Shared) {
    const projectName = 'shared';
    return [{
      projectName,
      type: _src_models__WEBPACK_IMPORTED_MODULE_6__.ProjectType.Shared,
      fromFragment: fragment,
      vars: {
        __PROJECT_NAME__: projectName
      }
    }];
  }
  (0,_src_type_utils__WEBPACK_IMPORTED_MODULE_15__.neverHappens)(fragment, `Unknown ProjectType ${fragment.type}`);
}
async function generateWorkspace(dst, workspaceName, workspaceFragments, workspace) {
  const projects = workspaceFragments.flatMap(f => getProjectsFromWorkspaceFragment(f));

  // Create projects files from templates
  const projectFiles = await Promise.all(projects.map(async project => (0,_src_project_generate_project__WEBPACK_IMPORTED_MODULE_7__.generateProject)({
    dst,
    project,
    allFragments: workspaceFragments,
    workspace,
    workspaceName
  })));

  // Generate workspace root files
  const SCRIPTS_PATH = (0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)((0,node_url__WEBPACK_IMPORTED_MODULE_2__.fileURLToPath)(import.meta.url), '../scripts');
  const writeFile = async (path, file) => writeWorkspaceFile(workspace, dst, path, file);
  const workspaceFiles = await Promise.all([
  // package.json
  writeFile('package.json', await (0,_src_fs__WEBPACK_IMPORTED_MODULE_3__.prettyJson)((0,_src_project_package_json__WEBPACK_IMPORTED_MODULE_9__.generateWorkspacePackageJson)(workspaceName, projects))),
  // app.code-workspace
  writeFile('app.code-workspace', await (0,_src_fs__WEBPACK_IMPORTED_MODULE_3__.prettyJson)((0,_src_project_vscode_workspace__WEBPACK_IMPORTED_MODULE_13__.generateCodeWorkspace)(workspaceName, workspaceFragments))),
  // .gitignore
  writeFile('.gitignore', (0,_src_project_gitignore__WEBPACK_IMPORTED_MODULE_8__.generateGitIgnore)()),
  // setup.js
  writeFile('setup.js', await (0,_src_fs__WEBPACK_IMPORTED_MODULE_3__.prettyJs)(await (0,_src_fs__WEBPACK_IMPORTED_MODULE_3__.readFile)((0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(SCRIPTS_PATH, 'setup.js')))),
  // deploy.js
  writeFile('deploy.js', await (0,_src_fs__WEBPACK_IMPORTED_MODULE_3__.prettyJs)(await (0,_src_fs__WEBPACK_IMPORTED_MODULE_3__.readFile)((0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(SCRIPTS_PATH, 'deploy.js')).then(res => res.replaceAll('__WORKSPACE_NAME__', workspaceName)))),
  // build.js
  writeFile('build.js', await (0,_src_fs__WEBPACK_IMPORTED_MODULE_3__.prettyJs)(await (0,_src_fs__WEBPACK_IMPORTED_MODULE_3__.readFile)((0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(SCRIPTS_PATH, 'build.js'))))]);

  // Vscode folder
  const vscodePath = (0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(TEMPLATES_PATH, '.vscode');
  const vscodeFileList = await (0,_src_fs__WEBPACK_IMPORTED_MODULE_3__.listFiles)(vscodePath);
  const vscodeFiles = await Promise.all(vscodeFileList.map(async file => {
    const relativePath = (0,node_path__WEBPACK_IMPORTED_MODULE_1__.relative)(vscodePath, file);
    const dstPath = (0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)('.vscode', relativePath);
    const content = await (0,_src_fs__WEBPACK_IMPORTED_MODULE_3__.readFile)(file);
    return writeFile(dstPath, content);
  }));

  // Terraform folder generation
  const terraformFiles = await Promise.all([writeFile((0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)('terraform', '.aws-credentials'), (0,_src_project_terraform_all__WEBPACK_IMPORTED_MODULE_10__.generateDummyTerraformCredentials)()), ...workspaceFragments.filter(frag => frag.type === _src_models__WEBPACK_IMPORTED_MODULE_6__.WorkspaceFragmentType.WebApp).flatMap(frag => {
    return [writeFile((0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)('terraform', `dynamo_table_${(0,_src_string_utils__WEBPACK_IMPORTED_MODULE_14__.lowerCase)(frag.appName)}_user.tf`), addLineBreak((0,_src_project_terraform_dynamo_user__WEBPACK_IMPORTED_MODULE_11__.generateDynamoUserTerraform)(workspaceName, frag.appName))), writeFile((0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)('terraform', `dynamo_table_${(0,_src_string_utils__WEBPACK_IMPORTED_MODULE_14__.lowerCase)(frag.appName)}_user_session.tf`), addLineBreak((0,_src_project_terraform_dynamo_user_session__WEBPACK_IMPORTED_MODULE_12__.generateDynamoUserSessionTerraform)(workspaceName, frag.appName)))];
  }), writeFile((0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)('terraform', 'base.tf'), addLineBreak((0,_src_project_terraform_all__WEBPACK_IMPORTED_MODULE_10__.generateCommonTerraform)(workspaceName, projects))), ...projects.map(async p => {
    const content = (0,_src_project_terraform_all__WEBPACK_IMPORTED_MODULE_10__.generateWorkspaceProjectTerraform)(workspaceName, p);
    if (content === undefined) {
      return;
    }
    const name = `${p.projectName}_terraform`;
    return writeFile((0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)('terraform', `${name}.tf`), addLineBreak(content));
  })]);
  await (0,_src_project_vscode_workspace__WEBPACK_IMPORTED_MODULE_13__.writeWorkspace)(dst, {
    files: (0,_src_type_utils__WEBPACK_IMPORTED_MODULE_15__.removeUndefined)([...projectFiles.flat(), ...workspaceFiles, ...terraformFiles, ...vscodeFiles]),
    fragments: workspaceFragments,
    version: _src_versions__WEBPACK_IMPORTED_MODULE_16__.PACKAGE_VERSIONS.project
  });

  // Run setup.js
  (0,_src_logger__WEBPACK_IMPORTED_MODULE_5__.log)('Running post install script');
  const commands = [`cd ${dst}`, `node setup.js`, `git init`];
  (0,node_child_process__WEBPACK_IMPORTED_MODULE_0__.execSync)(commands.join(' && '), {
    stdio: ['ignore', 'inherit', 'inherit']
  });

  // Final instructions
  (0,_src_logger__WEBPACK_IMPORTED_MODULE_5__.log)(`Run the following to get started:`);
  (0,_src_logger__WEBPACK_IMPORTED_MODULE_5__.log)(`cd ${(0,node_path__WEBPACK_IMPORTED_MODULE_1__.relative)(process.cwd(), dst)}; code app.code-workspace; yarn watch`);
}
async function writeWorkspaceFile(workspace, root, path, file) {
  var _workspace$files$find;
  const newHash = (0,_src_hash__WEBPACK_IMPORTED_MODULE_4__.md5)(file);
  const oldHash = workspace === null || workspace === void 0 || (_workspace$files$find = workspace.files.find(f => f.path === path)) === null || _workspace$files$find === void 0 ? void 0 : _workspace$files$find.hash;
  // Only write the file if it is different since last time we've generated the project.
  // Prevent needlessly overwriting changes made in the project in between.
  if (newHash !== oldHash) {
    await (0,_src_fs__WEBPACK_IMPORTED_MODULE_3__.writeRawFile)((0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(root, path), file);
  }
  return {
    path,
    hash: newHash
  };
}
const addLineBreak = content => content.endsWith('\n') ? content : `${content}\n`;

/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:url");

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hashPassword: () => (/* binding */ hashPassword),
/* harmony export */   md5: () => (/* binding */ md5)
/* harmony export */ });
/* harmony import */ var node_crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var node_crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_crypto__WEBPACK_IMPORTED_MODULE_0__);

function md5(data) {
  const content = typeof data === 'string' ? data : data.toString();
  return (0,node_crypto__WEBPACK_IMPORTED_MODULE_0__.createHash)('md5').update(content).digest('hex');
}
function hashPassword(password, salt) {
  return (0,node_crypto__WEBPACK_IMPORTED_MODULE_0__.createHash)('sha256').update(`${password}${salt}`).digest('base64');
}

/***/ }),
/* 13 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:crypto");

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateProject: () => (/* binding */ generateProject)
/* harmony export */ });
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_url__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _src_fs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _src_models__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);
/* harmony import */ var _src_project_dynamic_template__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(15);
/* harmony import */ var _src_project_generate_workspace__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(10);
/* harmony import */ var _src_rand_safe__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(17);
/* harmony import */ var _src_string_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(16);








const TEMPLATES_PATH = (0,node_path__WEBPACK_IMPORTED_MODULE_0__.join)((0,node_url__WEBPACK_IMPORTED_MODULE_1__.fileURLToPath)(import.meta.url), '../templates');
async function generateProject(opts) {
  const {
    dst,
    project,
    allFragments,
    workspace,
    workspaceName
  } = opts;
  const written = [];
  const writeFile = async (path, file) => (0,_src_project_generate_workspace__WEBPACK_IMPORTED_MODULE_5__.writeWorkspaceFile)(workspace, dst, path, file);
  const {
    projectName,
    type,
    vars
  } = project;
  const defaultVars = {
    __WORKSPACE_NAME__: workspaceName,
    __WORKSPACE_NAME_UPPERCASE__: (0,_src_string_utils__WEBPACK_IMPORTED_MODULE_7__.upperCase)(workspaceName),
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    __COOKIE_ENCRYPTION_KEY__: (0,_src_rand_safe__WEBPACK_IMPORTED_MODULE_6__.randomStringSafe)(32)
  };

  // Copy template files
  const templatePath = (0,node_path__WEBPACK_IMPORTED_MODULE_0__.join)(TEMPLATES_PATH, type);
  const files = await (0,_src_fs__WEBPACK_IMPORTED_MODULE_2__.listFiles)(templatePath);
  const filesToWrite = [...(await Promise.all(files.map(async file => {
    const relativePath = (0,node_path__WEBPACK_IMPORTED_MODULE_0__.relative)(templatePath, file);
    const dstPath = (0,node_path__WEBPACK_IMPORTED_MODULE_0__.join)(projectName, relativePath);
    let content = await (0,_src_fs__WEBPACK_IMPORTED_MODULE_2__.readFile)(file);
    if (file.endsWith('package.json')) {
      const packageJson = JSON.parse(await (0,_src_fs__WEBPACK_IMPORTED_MODULE_2__.readFile)(file));
      packageJson['name'] = projectName;
      content = JSON.stringify(packageJson, undefined, 2);
    }
    for (const [varName, varValue] of Object.entries({
      ...vars,
      ...defaultVars
    })) {
      content = content.replaceAll(varName, varValue);
    }
    return {
      path: dstPath,
      content
    };
  })))];
  if (type === _src_models__WEBPACK_IMPORTED_MODULE_3__.ProjectType.Shared) {
    filesToWrite.push(...(0,_src_project_dynamic_template__WEBPACK_IMPORTED_MODULE_4__.generateSharedFiles)({
      webApps: (0,_src_models__WEBPACK_IMPORTED_MODULE_3__.filterFragments)(allFragments, _src_models__WEBPACK_IMPORTED_MODULE_3__.WorkspaceFragmentType.WebApp),
      apiLambdas: (0,_src_models__WEBPACK_IMPORTED_MODULE_3__.filterFragments)(allFragments, _src_models__WEBPACK_IMPORTED_MODULE_3__.WorkspaceFragmentType.ApiLambda)
    }));
  }
  await Promise.all(filesToWrite.map(async ({
    path,
    content
  }) => {
    let formattedContent = content;
    if (path.endsWith('.ts') || path.endsWith('.tsx')) {
      formattedContent = await (0,_src_fs__WEBPACK_IMPORTED_MODULE_2__.prettierFormat)(formattedContent, 'typescript');
    }
    if (path.endsWith('.json')) {
      formattedContent = await (0,_src_fs__WEBPACK_IMPORTED_MODULE_2__.prettierFormat)(formattedContent, 'json');
    }
    written.push(await writeFile(path, formattedContent));
  }));
  return written;
}

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateSharedFiles: () => (/* binding */ generateSharedFiles)
/* harmony export */ });
/* harmony import */ var _src_string_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);

function generateSharedFiles(opts) {
  const {
    webApps,
    apiLambdas
  } = opts;
  return [{
    path: 'shared/src/api/api.ts',
    content: `
${webApps.map(webApp => `import {${webApp.appName.toUpperCase()}_API} from '@shared/api/${webApp.appName}_api';`).join('\n')}
  ${apiLambdas.map(apiLambda => `import {${apiLambda.apiName.toUpperCase()}} from '@shared/api/${apiLambda.apiName}';`).join('\n')}
import {AllApiSchema} from '@shared/api/core/api_schema';
import {ApiConfig, ApiName} from '@shared/api/core/api_types';
import {${[...webApps.map(webApp => `${webApp.appName.toUpperCase()}_BACKEND_URL`), ...apiLambdas.map(apiLambda => `${apiLambda.apiName.toUpperCase()}_URL`)].join(', ')}} from '@shared/env';

export const ALL = {
    ${[...webApps.map(webApp => `${webApp.appName}_backend: ${webApp.appName.toUpperCase()}_API,`), ...apiLambdas.map(apiLambda => `${apiLambda.apiName}: ${apiLambda.apiName.toUpperCase()},`)].join('\n')}
} satisfies AllApiSchema;

export const API_CONFIGS = {
    ${[...webApps.map(webApp => `${webApp.appName}_backend: {host: ${webApp.appName.toUpperCase()}_BACKEND_URL},`), ...apiLambdas.map(apiLambda => `${apiLambda.apiName}: {host: ${apiLambda.apiName.toUpperCase()}_URL},`)].join('\n')}
} satisfies Record<ApiName, ApiConfig>;
      `
  }, ...webApps.map(webApp => {
    const userType = `${(0,_src_string_utils__WEBPACK_IMPORTED_MODULE_0__.pascalCase)(webApp.appName)}User`;
    return {
      path: `shared/src/api/${webApp.appName}_api.ts`,
      content: `
import {Obj, SchemaToType, Str} from '@shared/api/core/api_schema';
import {${userType}Id} from '@shared/models';

const Frontend${userType}Schema = Obj({
    id: Str<${userType}Id>(),
});
export type Frontend${userType} = SchemaToType<typeof Frontend${userType}Schema>;

export const ${webApp.appName.toUpperCase()}_API = {
    '/login': {
        POST: {
            req: Obj({id: Str(), password: Str()}),
            res: Frontend${userType}Schema,
        },
    },
};
      `
    };
  }), ...apiLambdas.map(apiLambda => ({
    path: `shared/src/api/${apiLambda.apiName}.ts`,
    content: `
  import {Unknown} from '@shared/api/core/api_schema';
  
  export const ${apiLambda.apiName.toUpperCase()} = {
      '/test': {
          GET: {
              req: Unknown(),
              res: Unknown(),
          },
      },
  };
        `
  })), {
    path: 'shared/src/models.ts',
    content: `
import {Brand} from '@shared/lib/type_utils';

${webApps.map(webApp => {
      const userType = `${(0,_src_string_utils__WEBPACK_IMPORTED_MODULE_0__.pascalCase)(webApp.appName)}User`;
      return `
export type ${userType}Id = Brand<'${userType}Id', string>;

export interface ${userType}Item {
  id: ${userType}Id;
  hash: string;
  salt: string;
  sessionDuration: number; // in seconds
}
`.trim();
    }).join('\n\n')}
      `
  }];
}

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   capitalize: () => (/* binding */ capitalize),
/* harmony export */   lowerCase: () => (/* binding */ lowerCase),
/* harmony export */   pascalCase: () => (/* binding */ pascalCase),
/* harmony export */   uncapitalize: () => (/* binding */ uncapitalize),
/* harmony export */   upperCase: () => (/* binding */ upperCase)
/* harmony export */ });
function capitalize(value) {
  const [firstChar] = value;
  return firstChar === undefined ? '' : firstChar.toUpperCase() + value.slice(1);
}
function uncapitalize(value) {
  const [firstChar] = value;
  return firstChar === undefined ? '' : firstChar.toLowerCase() + value.slice(1);
}
function pascalCase(str) {
  return str.toLowerCase().split(/[^a-z]+/u).map(s => capitalize(s)).join('');
}
function upperCase(str) {
  return str.toUpperCase().split(/[^A-Z]+/u).join('_');
}
function lowerCase(str) {
  return str.toLowerCase().split(/[^a-z]+/u).join('_');
}

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateNonce: () => (/* binding */ generateNonce),
/* harmony export */   randomStringSafe: () => (/* binding */ randomStringSafe),
/* harmony export */   uidSafe: () => (/* binding */ uidSafe)
/* harmony export */ });
/* harmony import */ var node_crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var node_crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_crypto__WEBPACK_IMPORTED_MODULE_0__);

const ALPHANUM = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function randomStringSafe(length, set) {
  let result = '';
  const characters = set ?? ALPHANUM;
  const bytes = (0,node_crypto__WEBPACK_IMPORTED_MODULE_0__.randomBytes)(length);
  for (const byte of bytes) {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    result += characters[Math.floor(byte / 255 * (characters.length - 1))];
  }
  return result;
}
const UID_LENGTH = 16;
function uidSafe(prefix) {
  const id = randomStringSafe(UID_LENGTH);
  return prefix === undefined ? id : `${prefix}${id}`;
}
const NONCE_BYTE_SIZE = 16;
function generateNonce() {
  return (0,node_crypto__WEBPACK_IMPORTED_MODULE_0__.randomBytes)(NONCE_BYTE_SIZE).toString('base64');
}

/***/ }),
/* 18 */
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
/shared/src/env.ts
    `.trim();
}

/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateWorkspacePackageJson: () => (/* binding */ generateWorkspacePackageJson)
/* harmony export */ });
/* harmony import */ var _src_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _src_versions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(20);


function uniq(val) {
  return [...new Set(val).values()];
}
function generateWorkspacePackageJson(workspaceName, projects) {
  const eslintRuntimes = uniq(projects.map(p => _src_models__WEBPACK_IMPORTED_MODULE_0__.PROJECT_TYPE_TO_METADATA[p.type].eslint));
  const tsconfigRuntimes = uniq(projects.map(p => _src_models__WEBPACK_IMPORTED_MODULE_0__.PROJECT_TYPE_TO_METADATA[p.type].tsconfig));
  const webpackRuntimes = uniq(projects.map(p => _src_models__WEBPACK_IMPORTED_MODULE_0__.PROJECT_TYPE_TO_METADATA[p.type].webpack));
  return {
    name: workspaceName,
    license: 'UNLICENSED',
    type: 'module',
    engines: {
      node: '>=20.10'
    },
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
/* 20 */
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
  project: '1.9.54',
  eslint: '1.5.6',
  prettier: '1.3.0',
  tsconfig: '1.6.1',
  webpack: '1.6.34',
  runner: '1.5.22',
  lambdaServerRuntime: '1.0.7'
};
const ESLINT_VERSION = '8.56.x';
const PRETTIER_VERSION = '3.1.x';
const TYPESCRIPT_VERSION = '5.3.x';
const LIB_VERSIONS = {
  '@types/react': '18.2.x',
  '@types/react-dom': '18.2.x',
  react: '18.2.x',
  'react-dom': '18.2.x',
  'styled-components': '6.1.x'
};

/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateCommonTerraform: () => (/* binding */ generateCommonTerraform),
/* harmony export */   generateDummyTerraformCredentials: () => (/* binding */ generateDummyTerraformCredentials),
/* harmony export */   generateWorkspaceProjectTerraform: () => (/* binding */ generateWorkspaceProjectTerraform)
/* harmony export */ });
/* harmony import */ var _src_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _src_project_terraform_frontend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(22);
/* harmony import */ var _src_project_terraform_lambda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(23);
/* harmony import */ var _src_project_terraform_provider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(24);
/* harmony import */ var _src_project_terraform_s3__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(25);
/* harmony import */ var _src_type_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(26);






function generateCommonTerraform(workspaceName, projects) {
  return [(0,_src_project_terraform_provider__WEBPACK_IMPORTED_MODULE_3__.generateAwsProviderTerraform)(workspaceName), (0,_src_project_terraform_s3__WEBPACK_IMPORTED_MODULE_4__.generateS3BucketTerraform)(workspaceName, projects.filter(p => p.type === _src_models__WEBPACK_IMPORTED_MODULE_0__.ProjectType.Web).map(p => p.projectName))].join('\n\n');
}
function generateWorkspaceProjectTerraform(workspaceName, project) {
  const {
    projectName,
    type,
    fromFragment
  } = project;
  const cloudwatchTriggerMinutes = 'cloudwatchTriggerMinutes' in fromFragment ? fromFragment.cloudwatchTriggerMinutes : undefined;
  const alarmEmail = 'alarmEmail' in fromFragment ? fromFragment.alarmEmail : undefined;
  const domainStr = 'domain' in fromFragment ? fromFragment.domain : undefined;
  const webAppName = 'appName' in fromFragment ? fromFragment.appName : undefined;
  let domain;
  if (domainStr !== undefined) {
    const [subDomain = '', ...rest] = domainStr.split('.');
    const rootDomain = rest.join('.');
    domain = {
      subDomain,
      rootDomain
    };
  }
  if (type === _src_models__WEBPACK_IMPORTED_MODULE_0__.ProjectType.Web) {
    return (0,_src_project_terraform_frontend__WEBPACK_IMPORTED_MODULE_1__.generateFrontendTerraform)(projectName);
  } else if (type === _src_models__WEBPACK_IMPORTED_MODULE_0__.ProjectType.LambdaFunction) {
    return (0,_src_project_terraform_lambda__WEBPACK_IMPORTED_MODULE_2__.generateLambdaTerraform)(workspaceName, projectName, {
      api: false,
      webAppName,
      alarmEmail,
      cloudwatchTriggerMinutes,
      domain
    });
  } else if (type === _src_models__WEBPACK_IMPORTED_MODULE_0__.ProjectType.LambdaApi) {
    return (0,_src_project_terraform_lambda__WEBPACK_IMPORTED_MODULE_2__.generateLambdaTerraform)(workspaceName, projectName, {
      api: true,
      webAppName,
      alarmEmail,
      cloudwatchTriggerMinutes,
      domain
    });
  } else if (type === _src_models__WEBPACK_IMPORTED_MODULE_0__.ProjectType.LambdaWebApi) {
    return (0,_src_project_terraform_lambda__WEBPACK_IMPORTED_MODULE_2__.generateLambdaTerraform)(workspaceName, projectName, {
      api: true,
      webAppName,
      alarmEmail,
      cloudwatchTriggerMinutes,
      domain
    });
  } else if (type === _src_models__WEBPACK_IMPORTED_MODULE_0__.ProjectType.NodeScript) {
    return undefined;
  } else if (type === _src_models__WEBPACK_IMPORTED_MODULE_0__.ProjectType.SharedNode) {
    return undefined;
  } else if (type === _src_models__WEBPACK_IMPORTED_MODULE_0__.ProjectType.SharedWeb) {
    return undefined;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  } else if (type === _src_models__WEBPACK_IMPORTED_MODULE_0__.ProjectType.Shared) {
    return undefined;
  }
  (0,_src_type_utils__WEBPACK_IMPORTED_MODULE_5__.neverHappens)(type, 'ProjectType');
}
function generateDummyTerraformCredentials() {
  return `
[default]
aws_access_key_id=
aws_secret_access_key=
`.trim();
}

/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateFrontendTerraform: () => (/* binding */ generateFrontendTerraform)
/* harmony export */ });
function generateFrontendTerraform(projectName) {
  const bucketName = projectName.toLowerCase().replace(/[^\d.a-z-]+/gu, '-');
  const originId = `${bucketName}-origin-id`;
  return `
output "${projectName}_cloudfront_domain_name" {
  value       = aws_cloudfront_distribution.${projectName}.domain_name
  description = "Domain (from cloudfront) where the \\"${projectName}\\" is available."
}

resource "aws_cloudfront_origin_access_identity" "${projectName}" {}
  
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
  
  default_root_object = "/index.html"
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
    allowed_methods        = ["HEAD", "GET"]
    cached_methods         = ["HEAD", "GET"]
    compress               = true
    target_origin_id       = "${originId}"
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
  `.trim();
}

/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateLambdaTerraform: () => (/* binding */ generateLambdaTerraform)
/* harmony export */ });
/* harmony import */ var _src_string_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);

function generateLambdaTerraform(workspaceName, projectName, opts) {
  const {
    api,
    webAppName,
    alarmEmail,
    cloudwatchTriggerMinutes,
    domain
  } = opts;
  return `
# Define any extra role for the lambda here
data "aws_iam_policy_document" "${projectName}_extra_policy" {
  statement {
    actions = [
      "dynamodb:GetItem",
      "dynamodb:BatchGetItem",
      "dynamodb:Query",
      "dynamodb:Scan",
      "dynamodb:PutItem",
      "dynamodb:UpdateItem",
      "dynamodb:DeleteItem",
    ]
    resources = [${webAppName === undefined ? '' : `
      "\${aws_dynamodb_table.${(0,_src_string_utils__WEBPACK_IMPORTED_MODULE_0__.lowerCase)(webAppName)}_user_table.arn}",
      "\${aws_dynamodb_table.${(0,_src_string_utils__WEBPACK_IMPORTED_MODULE_0__.lowerCase)(webAppName)}_user_table.arn}/index/*",
      "\${aws_dynamodb_table.${(0,_src_string_utils__WEBPACK_IMPORTED_MODULE_0__.lowerCase)(webAppName)}_user_session_table.arn}",
      "\${aws_dynamodb_table.${(0,_src_string_utils__WEBPACK_IMPORTED_MODULE_0__.lowerCase)(webAppName)}_user_session_table.arn}/index/*",
    `}]
  }${webAppName !== undefined ? `

  statement {
    actions = [
      "s3:GetObject",
      "s3:GetObjectTagging"
    ]
    resources = [
      "\${aws_s3_bucket.code.arn}/*"
    ]
  }` : ''}
}

resource "aws_lambda_function" "${projectName}" {
  function_name = "${workspaceName}-${projectName}"
  s3_bucket     = aws_s3_object.${projectName}_archive.bucket
  s3_key        = aws_s3_object.${projectName}_archive.key
  handler       = "index.handler"
  runtime       = "nodejs20.x"
  role          = aws_iam_role.${projectName}_role.arn
  timeout       = 900 // 15 minutes
  memory_size   = 128 // Mo
  environment {
    variables = {${api ? `
      NODE_OPTIONS            = "--enable-source-maps"
      CLOUDFRONT_HEADER_NAME  = random_string.${projectName}_cloudfront_header_name.result
      CLOUDFRONT_HEADER_VALUE = random_string.${projectName}_cloudfront_header_value.result` : `
      NODE_OPTIONS = "--enable-source-maps"`}
    }
  }
}

output "${projectName}_function_name" {
  value       = aws_lambda_function.${projectName}.function_name
  description = "Function name of the \\"${workspaceName}-${projectName}\\" lambda"
}
${api ? `
# Lambda URL

resource "aws_lambda_function_url" "${projectName}" {
  function_name      = aws_lambda_function.${projectName}.function_name
  authorization_type = "NONE"
}

output "${projectName}_url" {
  value       = "${domain ? `https://${domain.subDomain}.${domain.rootDomain}/` : `https://\${aws_cloudfront_distribution.${projectName}.domain_name}/`}"
  description = "Cloudfront URL of \\"${projectName}\\""
}${domain !== undefined ? `

# Domain

data "aws_route53_zone" "${projectName}" {
  name = "${domain.rootDomain}"
}

resource "aws_route53_record" "${projectName}_a" {
  zone_id = data.aws_route53_zone.${projectName}.zone_id
  name    = "${domain.subDomain}.${domain.rootDomain}"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.${projectName}.domain_name
    zone_id                = aws_cloudfront_distribution.${projectName}.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "${projectName}_aaaa" {
  zone_id = data.aws_route53_zone.${projectName}.zone_id
  name    = "${domain.subDomain}.${domain.rootDomain}"
  type    = "AAAA"

  alias {
    name                   = aws_cloudfront_distribution.${projectName}.domain_name
    zone_id                = aws_cloudfront_distribution.${projectName}.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_acm_certificate" "${projectName}" {
  domain_name               = "*.${domain.subDomain}.${domain.rootDomain}"
  subject_alternative_names = ["${domain.subDomain}.${domain.rootDomain}"]
  validation_method         = "DNS"
  provider                  = aws.us-east-1
}

resource "aws_route53_record" "${projectName}_certificate_validation" {
  for_each = {
    for dvo in aws_acm_certificate.${projectName}.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }
  provider        = aws.us-east-1
  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = data.aws_route53_zone.${projectName}.zone_id
}

resource "aws_acm_certificate_validation" "${projectName}" {
  provider                = aws.us-east-1
  certificate_arn         = aws_acm_certificate.${projectName}.arn
  validation_record_fqdns = [for record in aws_route53_record.${projectName}_certificate_validation : record.fqdn]
}` : ''}

# Cloudfront Distribution

resource "random_string" "${projectName}_cloudfront_header_name" {
  length  = 16
  upper   = false
  numeric = false
  special = false
}

resource "random_string" "${projectName}_cloudfront_header_value" {
  length  = 32
  special = false
}

resource "aws_cloudfront_distribution" "${projectName}" {
  origin {
    # Remove "https://" prefix and "/" suffix
    domain_name = replace(replace(aws_lambda_function_url.${projectName}.function_url, "https://", ""), "/", "")
    origin_id   = aws_lambda_function.${projectName}.function_name

    custom_origin_config {
      https_port             = 443
      http_port              = 80
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }

    custom_header {
      name  = random_string.${projectName}_cloudfront_header_name.result
      value = random_string.${projectName}_cloudfront_header_value.result
    }
  }

  enabled             = true
  wait_for_deployment = false
  is_ipv6_enabled     = true
  price_class         = "PriceClass_100"${domain ? `
  aliases             = ["${domain.subDomain}.${domain.rootDomain}"]` : ''}

  default_cache_behavior {
    allowed_methods        = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods         = ["HEAD", "GET"]
    compress               = true
    target_origin_id       = aws_lambda_function.${projectName}.function_name
    viewer_protocol_policy = "redirect-to-https"
    # Managed-CachingDisabled
    cache_policy_id = "4135ea2d-6df8-44a3-9df3-4b5a84be39ad"
    # Managed-AllViewerExceptHostHeader
    origin_request_policy_id = "b689b0a8-53d0-40ab-baf2-68738e2966ac"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {${domain ? `
    acm_certificate_arn      = aws_acm_certificate.${projectName}.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"` : `
    cloudfront_default_certificate = true`}
  }
}` : ''}
${cloudwatchTriggerMinutes !== undefined ? `# Cloudwatch trigger

resource "aws_lambda_permission" "cloudwatch_invoke_${projectName}" {
  statement_id  = "AllowExecutionFromCloudWatch"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.${projectName}.arn
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.${projectName}_trigger_rate.arn
}

resource "aws_cloudwatch_event_rule" "${projectName}_trigger_rate" {
  name_prefix         = "${projectName}.rate-${cloudwatchTriggerMinutes}-minutes."
  schedule_expression = "rate(${cloudwatchTriggerMinutes} minute${cloudwatchTriggerMinutes > 1 ? 's' : ''})"
}

resource "aws_cloudwatch_event_target" "${projectName}_trigger_target" {
  rule = aws_cloudwatch_event_rule.${projectName}_trigger_rate.name
  arn  = aws_lambda_function.${projectName}.arn
}
` : ''}
# IAM role

resource "aws_iam_role" "${projectName}_role" {
  name = "${workspaceName}-${projectName}-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Principal = {
          Service = "lambda.amazonaws.com"
          AWS     = data.aws_iam_roles.administrator_roles.arns
        }
        Effect = "Allow"
      },
    ]
  })
  
  inline_policy {
    name   = "${workspaceName}-${projectName}-extra-policy"
    policy = data.aws_iam_policy_document.${projectName}_extra_policy.json
  }
}

output "${projectName}_role_arn" {
  value = aws_iam_role.${projectName}_role.arn
}

# Cloudwatch logging

resource "aws_cloudwatch_log_group" "${projectName}" {
  name = "/aws/lambda/${workspaceName}-${projectName}"
}

resource "aws_iam_policy" "${projectName}_cloudwatch" {
  name = "${workspaceName}-${projectName}-cloudwatch-policy"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "logs:CreateLogStream",
          "logs:PutLogEvents",
        ]
        Effect = "Allow"
        Resource = [
          "\${aws_cloudwatch_log_group.${projectName}.arn}",
          "\${aws_cloudwatch_log_group.${projectName}.arn}:*",
        ]
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "${projectName}_cloudwatch" {
  role       = aws_iam_role.${projectName}_role.name
  policy_arn = aws_iam_policy.${projectName}_cloudwatch.arn
}
${alarmEmail !== undefined ? `
# Cloudwatch error monitoring

resource "aws_cloudwatch_log_metric_filter" "${projectName}_log_errors" {
  name           = "${workspaceName}-${projectName}-log-error-metric-filter"
  pattern        = "[ts, id, level = \\"ERROR\\", msg]"
  log_group_name = aws_cloudwatch_log_group.${projectName}.name

  metric_transformation {
    name          = "${workspaceName}-${projectName}-errors"
    namespace     = "${workspaceName}"
    value         = "1"
    default_value = "0"
    unit          = "Count"
  }
}

resource "aws_cloudwatch_metric_alarm" "${projectName}_log_errors" {
  alarm_name          = "${workspaceName}-${projectName}-log-error-metric-alarm"
  metric_name         = aws_cloudwatch_log_metric_filter.${projectName}_log_errors.metric_transformation[0].name
  namespace           = aws_cloudwatch_log_metric_filter.${projectName}_log_errors.metric_transformation[0].namespace
  evaluation_periods  = 1
  period              = 3600
  statistic           = "Sum"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  threshold           = 1
  actions_enabled     = true
  alarm_actions       = [aws_sns_topic.${projectName}_log_errors.arn]
  ok_actions          = [aws_sns_topic.${projectName}_log_errors.arn]
  treat_missing_data  = "notBreaching"
}

resource "aws_sns_topic" "${projectName}_log_errors" {
  name = "${workspaceName}-${projectName}-log-error-sns-topic"
}

resource "aws_sns_topic_subscription" "${projectName}_log_errors" {
  endpoint  = "${alarmEmail}"
  protocol  = "email"
  topic_arn = aws_sns_topic.${projectName}_log_errors.arn
}
` : ''}
# Dummy source code useful only during the initial setup
resource "aws_s3_object" "${projectName}_archive" {
  bucket         = aws_s3_bucket.code.id
  key            = "${projectName}/dist.zip"
  content_base64 = "UEsDBBQACAAIAGaKwlYAAAAAAAAAADYAAAAIACAAaW5kZXguanNVVA0AB3AIemRyCHpkcAh6ZHV4CwABBPUBAAAEFAAAAEutKMgvKinWy0jMS8lJLVKwVUgsrsxLVkgrzUsuyczPU9DQVKjmUlAoSi0pLcpTUFe35qq15gIAUEsHCP0ak1o4AAAANgAAAFBLAQIUAxQACAAIAGaKwlb9GpNaOAAAADYAAAAIACAAAAAAAAAAAACkgQAAAABpbmRleC5qc1VUDQAHcAh6ZHIIemRwCHpkdXgLAAEE9QEAAAQUAAAAUEsFBgAAAAABAAEAVgAAAI4AAAAAAA=="
}

`.trim();
}

/***/ }),
/* 24 */
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
  region                   = "eu-west-3"
  shared_credentials_files = ["./.aws-credentials"]
  default_tags {
    tags = {
      Project = "${workspaceName}"
    }
  }
}

provider "aws" {
  alias                    = "us-east-1"
  region                   = "us-east-1"
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

data "aws_caller_identity" "current" {}
output "account_id" {
  value = data.aws_caller_identity.current.account_id
}

data "aws_iam_roles" "administrator_roles" {
  name_regex = "AdministratorAccess"
}
`.trim();
}

/***/ }),
/* 25 */
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
data "aws_iam_policy_document" "cloudfront_access_to_code_policy" {
  ${webProjectNames.map(p => `
  statement {
    actions = ["s3:GetObject"]
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

resource "aws_s3_bucket_policy" "cloudfront_access_to_code" {
  bucket = aws_s3_bucket.code.id
  policy = data.aws_iam_policy_document.cloudfront_access_to_code_policy.json
}
`.trim();
  const out = [CODE_BUCKET];
  if (webProjectNames.length > 0) {
    out.push(CLOUDFRONT_ACCESS);
  }
  return out.join('\n\n');
}

/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addPrefix: () => (/* binding */ addPrefix),
/* harmony export */   asArray: () => (/* binding */ asArray),
/* harmony export */   asArrayOrThrow: () => (/* binding */ asArrayOrThrow),
/* harmony export */   asBoolean: () => (/* binding */ asBoolean),
/* harmony export */   asBooleanOrThrow: () => (/* binding */ asBooleanOrThrow),
/* harmony export */   asConstantOrThrow: () => (/* binding */ asConstantOrThrow),
/* harmony export */   asDate: () => (/* binding */ asDate),
/* harmony export */   asDateOrThrow: () => (/* binding */ asDateOrThrow),
/* harmony export */   asError: () => (/* binding */ asError),
/* harmony export */   asJson: () => (/* binding */ asJson),
/* harmony export */   asJsonOrThrow: () => (/* binding */ asJsonOrThrow),
/* harmony export */   asJsonString: () => (/* binding */ asJsonString),
/* harmony export */   asJsonStringOrThrow: () => (/* binding */ asJsonStringOrThrow),
/* harmony export */   asMap: () => (/* binding */ asMap),
/* harmony export */   asMapArray: () => (/* binding */ asMapArray),
/* harmony export */   asMapArrayOrThrow: () => (/* binding */ asMapArrayOrThrow),
/* harmony export */   asMapOrThrow: () => (/* binding */ asMapOrThrow),
/* harmony export */   asNumber: () => (/* binding */ asNumber),
/* harmony export */   asNumberOrThrow: () => (/* binding */ asNumberOrThrow),
/* harmony export */   asString: () => (/* binding */ asString),
/* harmony export */   asStringArray: () => (/* binding */ asStringArray),
/* harmony export */   asStringArrayOrThrow: () => (/* binding */ asStringArrayOrThrow),
/* harmony export */   asStringEnum: () => (/* binding */ asStringEnum),
/* harmony export */   asStringEnumOrThrow: () => (/* binding */ asStringEnumOrThrow),
/* harmony export */   asStringOrThrow: () => (/* binding */ asStringOrThrow),
/* harmony export */   errorAndStackAsString: () => (/* binding */ errorAndStackAsString),
/* harmony export */   errorAsString: () => (/* binding */ errorAsString),
/* harmony export */   isNonEmptyArray: () => (/* binding */ isNonEmptyArray),
/* harmony export */   isNull: () => (/* binding */ isNull),
/* harmony export */   isNumber: () => (/* binding */ isNumber),
/* harmony export */   isString: () => (/* binding */ isString),
/* harmony export */   iterNumberEnum: () => (/* binding */ iterNumberEnum),
/* harmony export */   iterStringEnum: () => (/* binding */ iterStringEnum),
/* harmony export */   neverHappens: () => (/* binding */ neverHappens),
/* harmony export */   nonEmptyArray: () => (/* binding */ nonEmptyArray),
/* harmony export */   parseJson: () => (/* binding */ parseJson),
/* harmony export */   removeUndefined: () => (/* binding */ removeUndefined),
/* harmony export */   removeUndefinedOrNullProps: () => (/* binding */ removeUndefinedOrNullProps)
/* harmony export */ });
function notUndefined(val) {
  return val !== undefined;
}
function isString(val) {
  return typeof val === 'string';
}
function isNumber(val) {
  return typeof val === 'number';
}
function iterNumberEnum(e) {
  return Object.values(e).filter(isNumber);
}
function iterStringEnum(e) {
  return Object.values(e).filter(isString);
}
function removeUndefined(arr) {
  return arr.filter(notUndefined);
}
function removeUndefinedOrNullProps(obj) {
  return Object.fromEntries(Object.entries(obj).filter(e => e[1] !== undefined && e[1] !== null));
}
function neverHappens(value, errorMessage) {
  throw new Error(errorMessage);
}
function asMap(value, defaultValue) {
  return typeof value === 'object' && value !== null ? value : defaultValue;
}
function asMapOrThrow(value) {
  const valueAsMap = asMap(value);
  if (valueAsMap === undefined) {
    throw new Error(`Invalid value: \`${value}\` is not a map`);
  }
  return valueAsMap;
}
function asJson(value, defaultValue) {
  try {
    const json = JSON.parse(value);
    const res = asMap(json);
    return res ?? defaultValue;
  } catch {
    return defaultValue;
  }
}
function asJsonOrThrow(value) {
  const valueAsJson = asJson(value);
  if (valueAsJson === undefined) {
    throw new Error(`Invalid value: \`${value}\` is not a valid JSON string of a map`);
  }
  return valueAsJson;
}
function asJsonString(value, defaultValue) {
  const str = asString(value);
  return str === undefined ? defaultValue : defaultValue === undefined ? asJson(str) : asJson(str, defaultValue);
}
function asJsonStringOrThrow(value) {
  return asJsonOrThrow(asStringOrThrow(value));
}
function asString(value, defaultValue) {
  return typeof value === 'string' ? value : defaultValue;
}
function asStringOrThrow(value) {
  const valueAsString = asString(value);
  if (valueAsString === undefined) {
    throw new Error(`Invalid value: \`${value}\` is not a string`);
  }
  return valueAsString;
}
function asStringEnum(value, enu, defaultValue) {
  return typeof value === 'string' && Object.values(enu).includes(value) ? value : defaultValue;
}
function asStringEnumOrThrow(value, enu) {
  const valueAsString = asStringEnum(value, enu);
  if (valueAsString === undefined) {
    throw new Error(`Invalid value: \`${value}\` is not a string or not one of ${JSON.stringify(Object.values(enu))}`);
  }
  return valueAsString;
}
function asArray(value, defaultValue) {
  return Array.isArray(value) ? value : defaultValue;
}
function asArrayOrThrow(value) {
  if (!Array.isArray(value)) {
    throw new Error(`Invalid value: \`${value}\` is not an array`);
  }
  return value;
}
function asStringArray(value, defaultValue) {
  const arr = asArray(value);
  if (arr === undefined) {
    return defaultValue;
  }
  return removeUndefined(arr.map(s => asString(s)));
}
function asStringArrayOrThrow(value) {
  const arr = asArrayOrThrow(value);
  return arr.map(s => asStringOrThrow(s));
}
function asMapArray(value, defaultValue) {
  const arr = asArray(value);
  if (arr === undefined) {
    return defaultValue;
  }
  return removeUndefined(arr.map(s => asMap(s)));
}
function asMapArrayOrThrow(value) {
  const arr = asArrayOrThrow(value);
  return arr.map(s => asMapOrThrow(s));
}
function asNumber(value, defaultValue) {
  if (typeof value === 'number') {
    return !isNaN(value) ? value : defaultValue;
  }
  if (typeof value === 'string') {
    try {
      const parsedValue = parseFloat(value);
      return !isNaN(parsedValue) ? parsedValue : defaultValue;
    } catch {
      return defaultValue;
    }
  }
  return defaultValue;
}
function asNumberOrThrow(value) {
  const valueAsNumber = asNumber(value);
  if (valueAsNumber === undefined) {
    throw new Error(`Invalid value: \`${value}\` is not a number`);
  }
  return valueAsNumber;
}
function asBoolean(value, defaultValue) {
  if (typeof value === 'boolean') {
    return value;
  }
  if (typeof value === 'number') {
    return !isNaN(value) ? value !== 0 : false;
  }
  if (typeof value === 'string') {
    if (value === '0' || value === 'false') {
      return false;
    } else if (value === '1' || value === 'true') {
      return true;
    }
    return defaultValue;
  }
  return defaultValue;
}
function asBooleanOrThrow(value) {
  const valueAsBoolean = asBoolean(value);
  if (valueAsBoolean === undefined) {
    throw new Error(`Invalid value: \`${value}\` is not a boolean`);
  }
  return valueAsBoolean;
}
const TIMESTAMP_REGEX = /^[0-9]{1,15}$/u;
function asDate(value, defaultValue) {
  const date = value instanceof Date ? value : new Date(typeof value === 'string' && TIMESTAMP_REGEX.test(value) ? parseFloat(value) : String(value));
  return isNaN(date.getTime()) ? defaultValue : date;
}
function asDateOrThrow(value) {
  const valueAsDate = asDate(value);
  if (valueAsDate === undefined) {
    throw new Error(`Invalid value: \`${value}\` cannot be parsed as a Date`);
  }
  return valueAsDate;
}

// export function asDate(value: unknown): Date | undefined;
// export function asDate(value: unknown, defaultValue: Date): Date;
// export function asDate(value: unknown, defaultValue?: Date): Date | undefined {
//   if (typeof value === 'number') {
//     return new Date(value);
//   }
//   return value instanceof Date ? value : defaultValue;
// }

function isNull(val) {
  return val === null;
}
function asError(err) {
  return err instanceof Error ? err : new Error(typeof err === 'string' ? err : String(err));
}
function errorAsString(err) {
  const errorMap = asMap(err);
  if (errorMap === undefined) {
    return asString(err) ?? String(err);
  }
  const errorMessage = asString(errorMap['message']);
  if (errorMessage === undefined) {
    return String(err);
  }
  return errorMessage;
}
function errorAndStackAsString(err) {
  const errorMap = asMap(err);
  if (errorMap === undefined) {
    return asString(err) ?? String(err);
  }
  const stack = asString(errorMap['stack']);
  if (stack === undefined) {
    return String(err);
  }
  return stack;
}
function asConstantOrThrow(value, expected) {
  if (value !== expected) {
    throw new Error(`Invalid value: \`${value}\`, expected \`${expected}\``);
  }
  return value;
}

// export function asParsedJson<T>(json: string): T {
//   try {
//     return JSON.parse(json) as T;
//   } catch {
//     const defaultValue = {};
//     return defaultValue as T;
//   }
// }
function parseJson(json) {
  try {
    return {
      res: JSON.parse(json),
      err: undefined
    };
  } catch (err) {
    return {
      err,
      res: undefined
    };
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any

// Get all the keys of a type including the optional attributes

// Type for an empty object (ie: {})

function isNonEmptyArray(val) {
  return val.length > 0;
}
function nonEmptyArray(val) {
  return val.length === 0 ? undefined : val;
}
function addPrefix(attr, prefix) {
  return Object.fromEntries(Object.entries(attr).map(([key, value]) => [`${prefix}${key}`, value]));
}

/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateDynamoUserTerraform: () => (/* binding */ generateDynamoUserTerraform)
/* harmony export */ });
/* harmony import */ var _src_string_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);

function generateDynamoUserTerraform(workspaceName, appName) {
  const prefixLower = (0,_src_string_utils__WEBPACK_IMPORTED_MODULE_0__.lowerCase)(appName);
  const prefixPascal = `${(0,_src_string_utils__WEBPACK_IMPORTED_MODULE_0__.pascalCase)(workspaceName)}${(0,_src_string_utils__WEBPACK_IMPORTED_MODULE_0__.pascalCase)(appName)}`;
  return `
output "${prefixLower}_user_table_name" {
  value = aws_dynamodb_table.${prefixLower}_user_table.name
}

output "${prefixLower}_user_index_name" {
  value = {
    for obj in aws_dynamodb_table.${prefixLower}_user_table.global_secondary_index : "${prefixLower}_user_by_\${obj.hash_key}\${length(obj.range_key) > 0 ? "_sorted_by_\${obj.range_key}" : ""}" => obj.name
  }
}

resource "aws_dynamodb_table" "${prefixLower}_user_table" {
  name         = "${prefixPascal}User"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"

  attribute {
    name = "id"
    type = "S"
  }
}`.trim();
}

/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateDynamoUserSessionTerraform: () => (/* binding */ generateDynamoUserSessionTerraform)
/* harmony export */ });
/* harmony import */ var _src_string_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);

function generateDynamoUserSessionTerraform(workspaceName, appName) {
  const prefixLower = (0,_src_string_utils__WEBPACK_IMPORTED_MODULE_0__.lowerCase)(appName);
  const prefixPascal = `${(0,_src_string_utils__WEBPACK_IMPORTED_MODULE_0__.pascalCase)(workspaceName)}${(0,_src_string_utils__WEBPACK_IMPORTED_MODULE_0__.pascalCase)(appName)}`;
  return `output "${prefixLower}_user_session_table_name" {
  value = aws_dynamodb_table.${prefixLower}_user_session_table.name
}

output "${prefixLower}_user_session_index_name" {
  value = {
    for obj in aws_dynamodb_table.${prefixLower}_user_session_table.global_secondary_index : "${prefixLower}_user_session_by_\${obj.hash_key}\${ length(obj.range_key) > 0 ? "_sorted_by_\${obj.range_key}" : "" }" => obj.name
  }
}

resource "aws_dynamodb_table" "${prefixLower}_user_session_table" {
  name         = "${prefixPascal}UserSession"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "token"

  attribute {
    name = "token"
    type = "S"
  }

  ttl {
    attribute_name = "expiresAt"
    enabled        = true
  }
}`.trim();
}

/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateCodeWorkspace: () => (/* binding */ generateCodeWorkspace),
/* harmony export */   readWorkspace: () => (/* binding */ readWorkspace),
/* harmony export */   writeWorkspace: () => (/* binding */ writeWorkspace)
/* harmony export */ });
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _src_project_generate_workspace__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/* harmony import */ var _src_type_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(26);




function generateCodeWorkspace(workspaceName, workspaceFragments) {
  const projects = workspaceFragments.flatMap(f => (0,_src_project_generate_workspace__WEBPACK_IMPORTED_MODULE_2__.getProjectsFromWorkspaceFragment)(f));
  const projectNames = projects.map(p => p.projectName);
  return {
    folders: [...projectNames.map(p => ({
      path: p
    })), {
      path: 'terraform'
    }, {
      path: '.',
      name: 'root'
    }],
    settings: {
      'window.title': `${workspaceName}\${separator}\${activeEditorShort}`,
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
        'source.fixAll': 'never',
        'source.fixAll.eslint': 'explicit'
      },
      'editor.defaultFormatter': 'esbenp.prettier-vscode',
      'editor.linkedEditing': true,
      'emmet.showExpandedAbbreviation': 'never',
      'files.associations': {
        '*.tf': 'terraform'
      },
      '[typescript]': {
        'editor.defaultFormatter': 'esbenp.prettier-vscode'
      },
      '[typescriptreact]': {
        'editor.defaultFormatter': 'esbenp.prettier-vscode'
      },
      '[terraform]': {
        'editor.defaultFormatter': 'hashicorp.terraform'
      }
    },
    extensions: {
      recommendations: ['dbaeumer.vscode-eslint', 'esbenp.prettier-vscode', 'VisualStudioExptTeam.vscodeintellicode', 'styled-components.vscode-styled-components', 'naumovs.color-highlight', 'eamodio.gitlens', 'hashicorp.terraform']
    }
  };
}
async function readWorkspace(workspacePath) {
  const workspaceContent = await (0,_src_fs__WEBPACK_IMPORTED_MODULE_1__.maybeReadFile)((0,node_path__WEBPACK_IMPORTED_MODULE_0__.join)(workspacePath, '.workspace'));
  if (workspaceContent === undefined) {
    return undefined;
  }
  const workspaceData = (0,_src_type_utils__WEBPACK_IMPORTED_MODULE_3__.asMap)(JSON.parse(workspaceContent), {});
  const {
    fragments = [],
    version = '',
    files = []
  } = workspaceData;
  return {
    fragments,
    version,
    files
  };
}
async function writeWorkspace(workspacePath, workspace) {
  workspace.files.sort((f1, f2) => f1.path.localeCompare(f2.path));
  await (0,_src_fs__WEBPACK_IMPORTED_MODULE_1__.writeRawFile)((0,node_path__WEBPACK_IMPORTED_MODULE_0__.join)(workspacePath, '.workspace'), await (0,_src_fs__WEBPACK_IMPORTED_MODULE_1__.prettyJson)(workspace));
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
/* harmony import */ var _src_logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8);
/* harmony import */ var _src_models__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9);
/* harmony import */ var _src_project_generate_workspace__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(10);
/* harmony import */ var _src_project_vscode_workspace__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(29);
/* harmony import */ var _src_type_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(26);









async function cancel(workspacePath) {
  (0,_src_logger__WEBPACK_IMPORTED_MODULE_4__.log)('Cancelling...');
  if (workspacePath !== undefined) {
    await (0,_src_fs__WEBPACK_IMPORTED_MODULE_3__.rmDir)(workspacePath);
  }
  // eslint-disable-next-line node/no-process-exit
  process.exit(0);
}
const BASE_FRAGMENTS = [{
  type: _src_models__WEBPACK_IMPORTED_MODULE_5__.WorkspaceFragmentType.Shared
}, {
  type: _src_models__WEBPACK_IMPORTED_MODULE_5__.WorkspaceFragmentType.SharedNode
}, {
  type: _src_models__WEBPACK_IMPORTED_MODULE_5__.WorkspaceFragmentType.SharedWeb
}];
async function initProject() {
  let workspaceName;
  let workspacePath = process.cwd();
  const frags = [];
  const takenNames = ['terraform'];

  // Check if we are already in a workspace
  const workspace = await (0,_src_project_vscode_workspace__WEBPACK_IMPORTED_MODULE_7__.readWorkspace)(workspacePath);
  if (workspace !== undefined) {
    for (const baseFrag of BASE_FRAGMENTS) {
      if (!workspace.fragments.find(f => f.type === baseFrag.type)) {
        frags.push(baseFrag);
      }
    }
    workspaceName = (0,node_path__WEBPACK_IMPORTED_MODULE_1__.basename)(workspacePath);
    for (const fragment of workspace.fragments) {
      frags.push(fragment);
      const projectNames = (0,_src_project_generate_workspace__WEBPACK_IMPORTED_MODULE_6__.getProjectsFromWorkspaceFragment)(fragment).map(p => p.projectName);
      takenNames.push(...projectNames);
    }
  } else {
    frags.push(...BASE_FRAGMENTS);
    // Ask for workspace name
    const {
      workspaceName: newWorkspaceName
    } = await (0,prompts__WEBPACK_IMPORTED_MODULE_2__.prompt)({
      type: 'text',
      name: 'workspaceName',
      message: 'Workspace name',
      validate: v => v.length > 0
    });
    workspaceName = newWorkspaceName;
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
        frag = await askForWorkspaceFragment(takenNames);
      } catch (err) {
        (0,_src_logger__WEBPACK_IMPORTED_MODULE_4__.error)(String(err));
        continue;
      }
      if (frag) {
        frags.push(frag);
        takenNames.push(...(0,_src_project_generate_workspace__WEBPACK_IMPORTED_MODULE_6__.getProjectsFromWorkspaceFragment)(frag).map(p => p.projectName));
      } else {
        break;
      }
    }
    const name = workspaceName;
    await (0,_src_project_generate_workspace__WEBPACK_IMPORTED_MODULE_6__.generateWorkspace)(workspacePath, name, frags, workspace);
  } catch (err) {
    (0,_src_logger__WEBPACK_IMPORTED_MODULE_4__.error)(String(err));
    await cancel(workspaceName);
  }
}
const WorkspaceFragmentTypeToString = {
  [_src_models__WEBPACK_IMPORTED_MODULE_5__.WorkspaceFragmentType.WebApp]: 'Web App',
  [_src_models__WEBPACK_IMPORTED_MODULE_5__.WorkspaceFragmentType.StaticWebsite]: 'Static Website',
  [_src_models__WEBPACK_IMPORTED_MODULE_5__.WorkspaceFragmentType.StandaloneLambda]: 'Standalone Lambda',
  [_src_models__WEBPACK_IMPORTED_MODULE_5__.WorkspaceFragmentType.ApiLambda]: 'API Lambda',
  [_src_models__WEBPACK_IMPORTED_MODULE_5__.WorkspaceFragmentType.NodeScript]: 'Node Script'
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
  if (type === _src_models__WEBPACK_IMPORTED_MODULE_5__.WorkspaceFragmentType.StaticWebsite) {
    const websiteName = await askForProjectName('Website project name', 'website', takenNames);
    return {
      type,
      websiteName
    };
  } else if (type === _src_models__WEBPACK_IMPORTED_MODULE_5__.WorkspaceFragmentType.StandaloneLambda) {
    const lambdaName = await askForProjectName('Lambda project name', 'lambda', takenNames);
    const alarmEmail = await askForAlarmEmail(true);
    const cloudwatchTriggerMinutes = await askForCloudwatchTrigger();
    return {
      type,
      lambdaName,
      alarmEmail,
      cloudwatchTriggerMinutes
    };
  } else if (type === _src_models__WEBPACK_IMPORTED_MODULE_5__.WorkspaceFragmentType.ApiLambda) {
    const apiName = await askForProjectName('API name', 'api', takenNames);
    const alarmEmail = await askForAlarmEmail(false);
    const domain = await askForDomainName();
    return {
      type,
      apiName,
      alarmEmail,
      domain
    };
  } else if (type === _src_models__WEBPACK_IMPORTED_MODULE_5__.WorkspaceFragmentType.WebApp) {
    const appName = await askForProjectName('App name', 'app', takenNames);
    const alarmEmail = await askForAlarmEmail(false);
    const domain = await askForDomainName();
    return {
      type,
      appName,
      alarmEmail,
      domain
    };
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  } else if (type === _src_models__WEBPACK_IMPORTED_MODULE_5__.WorkspaceFragmentType.NodeScript) {
    const scriptName = await askForProjectName('Script project name', 'script', takenNames);
    return {
      type,
      scriptName
    };
  }
  (0,_src_type_utils__WEBPACK_IMPORTED_MODULE_8__.neverHappens)(type, `Unknown WorkspaceFragmentType "${type}"`);
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
let alarmEmailDefault;
async function askForAlarmEmail(defaultVal) {
  const alarm = await (0,prompts__WEBPACK_IMPORTED_MODULE_2__.prompt)({
    type: 'confirm',
    name: 'value',
    message: 'Add an alarm when an error is logged?',
    initial: defaultVal
  });
  if (alarm.value !== true) {
    return undefined;
  }
  const email = await (0,prompts__WEBPACK_IMPORTED_MODULE_2__.prompt)({
    type: 'text',
    name: 'value',
    message: 'Which email to send the alarm to?',
    initial: alarmEmailDefault,
    validate: v => v.length > 0
  });
  if (typeof email.value !== 'string') {
    return undefined;
  }
  return email.value;
}
async function askForDomainName() {
  const useDomain = await (0,prompts__WEBPACK_IMPORTED_MODULE_2__.prompt)({
    type: 'confirm',
    name: 'value',
    message: 'Use a custom domain?'
  });
  if (useDomain.value !== true) {
    return undefined;
  }
  const domain = await (0,prompts__WEBPACK_IMPORTED_MODULE_2__.prompt)({
    type: 'text',
    name: 'value',
    message: 'Enter the domain name.',
    validate: v => v.length > 0
  });
  if (typeof domain.value !== 'string') {
    return undefined;
  }
  return domain.value;
}
async function askForCloudwatchTrigger() {
  const trigger = await (0,prompts__WEBPACK_IMPORTED_MODULE_2__.prompt)({
    type: 'confirm',
    name: 'value',
    message: 'Add a Cloudwatch trigger?',
    initial: true
  });
  if (trigger.value !== true) {
    return undefined;
  }
  const minutes = await (0,prompts__WEBPACK_IMPORTED_MODULE_2__.prompt)({
    type: 'text',
    name: 'value',
    message: 'Trigger period (in minutes)?',
    initial: 1,
    validate: v => v >= 1 && Math.round(v) === v
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const minutesValue = parseFloat(minutes.value);
  if (Number.isNaN(minutesValue)) {
    return undefined;
  }
  return minutesValue;
}
initProject().catch(_src_logger__WEBPACK_IMPORTED_MODULE_4__.error);
})();


//# sourceMappingURL=index.js.map