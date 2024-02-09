import { createRequire as __WEBPACK_EXTERNAL_createRequire } from "module";
/******/ var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:child_process");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:path");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("ansi-colors");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("webpack");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("webpack-dev-server");

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   registerExitCallback: () => (/* binding */ registerExitCallback)
/* harmony export */ });
/* harmony import */ var _src_global_error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);

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
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   globalError: () => (/* binding */ globalError)
/* harmony export */ });
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);


function globalError(...val) {
  for (const data of val) {
    try {
      const str = typeof data === 'string' ? data : data instanceof Error ? data.stack ?? String(data) : JSON.stringify(data);
      (0,_src_logger__WEBPACK_IMPORTED_MODULE_1__.error)(str);
      (0,node_fs__WEBPACK_IMPORTED_MODULE_0__.appendFileSync)('error.log', str);
    } catch {
      (0,_src_logger__WEBPACK_IMPORTED_MODULE_1__.error)(String(val));
      (0,node_fs__WEBPACK_IMPORTED_MODULE_0__.appendFileSync)('error.log', String(val));
    }
  }
}

/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:fs");

/***/ }),
/* 9 */
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
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EslintType: () => (/* binding */ EslintType),
/* harmony export */   PROJECT_TYPE_TO_METADATA: () => (/* binding */ PROJECT_TYPE_TO_METADATA),
/* harmony export */   ProjectType: () => (/* binding */ ProjectType),
/* harmony export */   TsConfigType: () => (/* binding */ TsConfigType),
/* harmony export */   WebpackType: () => (/* binding */ WebpackType),
/* harmony export */   WorkspaceFragmentType: () => (/* binding */ WorkspaceFragmentType)
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

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateWorkspace: () => (/* binding */ generateWorkspace),
/* harmony export */   getProjectsFromWorkspaceFragment: () => (/* binding */ getProjectsFromWorkspaceFragment),
/* harmony export */   writeWorkspaceFile: () => (/* binding */ writeWorkspaceFile)
/* harmony export */ });
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_child_process__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12);
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_url__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _src_fs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(13);
/* harmony import */ var _src_hash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(15);
/* harmony import */ var _src_logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9);
/* harmony import */ var _src_models__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(10);
/* harmony import */ var _src_project_generate_project__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(17);
/* harmony import */ var _src_project_gitignore__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(20);
/* harmony import */ var _src_project_package_json__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(21);
/* harmony import */ var _src_project_terraform_all__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(23);
/* harmony import */ var _src_project_terraform_dynamo_user__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(29);
/* harmony import */ var _src_project_terraform_dynamo_user_session__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(30);
/* harmony import */ var _src_project_vscode_workspace__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(31);
/* harmony import */ var _src_string_utils__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(19);
/* harmony import */ var _src_type_utils__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(28);
/* harmony import */ var _src_versions__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(22);

















const TEMPLATES_PATH = (0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)((0,node_url__WEBPACK_IMPORTED_MODULE_2__.fileURLToPath)(import.meta.url), '../templates');
function getProjectsFromWorkspaceFragment(fragment, allFragments) {
  if (fragment.type === _src_models__WEBPACK_IMPORTED_MODULE_6__.WorkspaceFragmentType.StaticWebsite) {
    return [{
      projectName: fragment.websiteName,
      type: _src_models__WEBPACK_IMPORTED_MODULE_6__.ProjectType.Web,
      vars: {
        __PROJECT_NAME__: fragment.websiteName
      }
    }];
  } else if (fragment.type === _src_models__WEBPACK_IMPORTED_MODULE_6__.WorkspaceFragmentType.StandaloneLambda) {
    return [{
      projectName: fragment.lambdaName,
      type: _src_models__WEBPACK_IMPORTED_MODULE_6__.ProjectType.LambdaFunction,
      vars: {
        __PROJECT_NAME__: fragment.lambdaName
      }
    }];
  } else if (fragment.type === _src_models__WEBPACK_IMPORTED_MODULE_6__.WorkspaceFragmentType.ApiLambda) {
    return [{
      projectName: fragment.lambdaName,
      type: _src_models__WEBPACK_IMPORTED_MODULE_6__.ProjectType.LambdaApi,
      vars: {
        __PROJECT_NAME__: fragment.lambdaName,
        __BACKEND_NAME__: fragment.lambdaName,
        __BACKEND_NAME_UPPERCASE__: fragment.lambdaName.toUpperCase()
      }
    }];
  } else if (fragment.type === _src_models__WEBPACK_IMPORTED_MODULE_6__.WorkspaceFragmentType.WebApp) {
    const vars = {
      __PROJECT_NAME__: fragment.lambdaName,
      __BACKEND_NAME__: fragment.lambdaName,
      __BACKEND_NAME_UPPERCASE__: fragment.lambdaName.toUpperCase(),
      __FRONTEND_NAME__: fragment.websiteName,
      __FRONTEND_NAME_UPPERCASE__: fragment.websiteName.toUpperCase()
    };
    return [{
      projectName: fragment.websiteName,
      type: _src_models__WEBPACK_IMPORTED_MODULE_6__.ProjectType.Web,
      vars
    }, {
      projectName: fragment.lambdaName,
      type: _src_models__WEBPACK_IMPORTED_MODULE_6__.ProjectType.LambdaWebApi,
      vars
    }];
  } else if (fragment.type === _src_models__WEBPACK_IMPORTED_MODULE_6__.WorkspaceFragmentType.NodeScript) {
    return [{
      projectName: fragment.scriptName,
      type: _src_models__WEBPACK_IMPORTED_MODULE_6__.ProjectType.NodeScript,
      vars: {
        __PROJECT_NAME__: fragment.scriptName
      }
    }];
  } else if (fragment.type === _src_models__WEBPACK_IMPORTED_MODULE_6__.WorkspaceFragmentType.SharedNode) {
    const projectName = 'shared-node';
    return [{
      projectName,
      type: _src_models__WEBPACK_IMPORTED_MODULE_6__.ProjectType.SharedNode,
      vars: {
        __PROJECT_NAME__: projectName
      }
    }];
  } else if (fragment.type === _src_models__WEBPACK_IMPORTED_MODULE_6__.WorkspaceFragmentType.SharedWeb) {
    const projectName = 'shared-web';
    return [{
      projectName,
      type: _src_models__WEBPACK_IMPORTED_MODULE_6__.ProjectType.SharedWeb,
      vars: {
        __PROJECT_NAME__: projectName
      }
    }];
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  } else if (fragment.type === _src_models__WEBPACK_IMPORTED_MODULE_6__.WorkspaceFragmentType.Shared) {
    const projectName = 'shared';
    const otherVars = {};
    const [bestBackend] = (0,_src_type_utils__WEBPACK_IMPORTED_MODULE_15__.removeUndefined)(allFragments.map(frag => {
      if (frag.type === _src_models__WEBPACK_IMPORTED_MODULE_6__.WorkspaceFragmentType.WebApp) {
        return {
          name: frag.lambdaName,
          prio: 1
        };
      } else if (frag.type === _src_models__WEBPACK_IMPORTED_MODULE_6__.WorkspaceFragmentType.ApiLambda) {
        return {
          name: frag.lambdaName,
          prio: 2
        };
      }
      return undefined;
    })).sort((a, b) => a.prio - b.prio);
    if (bestBackend) {
      otherVars['__BACKEND_NAME__'] = bestBackend.name;
      otherVars['__BACKEND_NAME_UPPERCASE__'] = bestBackend.name.toUpperCase();
    }
    return [{
      projectName,
      type: _src_models__WEBPACK_IMPORTED_MODULE_6__.ProjectType.Shared,
      vars: {
        __PROJECT_NAME__: projectName,
        ...otherVars
      }
    }];
  }
  (0,_src_type_utils__WEBPACK_IMPORTED_MODULE_15__.neverHappens)(fragment, `Unknown ProjectType ${fragment.type}`);
}
async function generateWorkspace(dst, workspaceName, workspaceFragments, workspace) {
  const projects = workspaceFragments.flatMap(f => getProjectsFromWorkspaceFragment(f, workspaceFragments));

  // Create projects files from templates
  const projectFiles = await Promise.all(projects.map(async project => (0,_src_project_generate_project__WEBPACK_IMPORTED_MODULE_7__.generateProject)(dst, project, workspace, workspaceName)));

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
  writeFile('deploy.js', await (0,_src_fs__WEBPACK_IMPORTED_MODULE_3__.prettyJs)(await (0,_src_fs__WEBPACK_IMPORTED_MODULE_3__.readFile)((0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(SCRIPTS_PATH, 'deploy.js')))),
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
  const tablePrefix = (0,_src_string_utils__WEBPACK_IMPORTED_MODULE_14__.lowerCase)(workspaceName);
  const terraformFiles = await Promise.all([writeFile((0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)('terraform', '.aws-credentials'), (0,_src_project_terraform_all__WEBPACK_IMPORTED_MODULE_10__.generateDummyTerraformCredentials)()), writeFile((0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)('terraform', `dynamo_table_${tablePrefix}_user.tf`), (0,_src_project_terraform_dynamo_user__WEBPACK_IMPORTED_MODULE_11__.generateDynamoUserTerraform)(workspaceName)), writeFile((0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)('terraform', `dynamo_table_${tablePrefix}_user_session.tf`), (0,_src_project_terraform_dynamo_user_session__WEBPACK_IMPORTED_MODULE_12__.generateDynamoUserSessionTerraform)(workspaceName)), writeFile((0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)('terraform', 'base.tf'), (0,_src_project_terraform_all__WEBPACK_IMPORTED_MODULE_10__.generateCommonTerraform)(workspaceName, projects)), ...projects.map(async p => {
    const content = (0,_src_project_terraform_all__WEBPACK_IMPORTED_MODULE_10__.generateWorkspaceProjectTerraform)(workspaceName, p);
    if (content === undefined) {
      return;
    }
    const name = `${p.projectName}_terraform`;
    return writeFile((0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)('terraform', `${name}.tf`), content);
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

/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:url");

/***/ }),
/* 13 */
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
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_child_process__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prettier__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14);
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
/* 14 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("prettier");

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hashPassword: () => (/* binding */ hashPassword),
/* harmony export */   md5: () => (/* binding */ md5)
/* harmony export */ });
/* harmony import */ var node_crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);
/* harmony import */ var node_crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_crypto__WEBPACK_IMPORTED_MODULE_0__);

function md5(data) {
  const content = typeof data === 'string' ? data : data.toString();
  return (0,node_crypto__WEBPACK_IMPORTED_MODULE_0__.createHash)('md5').update(content).digest('hex');
}
function hashPassword(password, salt) {
  return (0,node_crypto__WEBPACK_IMPORTED_MODULE_0__.createHash)('sha256').update(`${password}${salt}`).digest('base64');
}

/***/ }),
/* 16 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:crypto");

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateProject: () => (/* binding */ generateProject)
/* harmony export */ });
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_url__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _src_fs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);
/* harmony import */ var _src_project_generate_workspace__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11);
/* harmony import */ var _src_rand_safe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(18);
/* harmony import */ var _src_string_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(19);






const TEMPLATES_PATH = (0,node_path__WEBPACK_IMPORTED_MODULE_0__.join)((0,node_url__WEBPACK_IMPORTED_MODULE_1__.fileURLToPath)(import.meta.url), '../templates');
async function generateProject(dst, project, workspace, workspaceName) {
  const written = [];
  const writeFile = async (path, file) => (0,_src_project_generate_workspace__WEBPACK_IMPORTED_MODULE_3__.writeWorkspaceFile)(workspace, dst, path, file);
  const {
    projectName,
    type,
    vars
  } = project;
  const defaultVars = {
    __WORKSPACE_NAME__: workspaceName,
    __WORKSPACE_NAME_UPPERCASE__: (0,_src_string_utils__WEBPACK_IMPORTED_MODULE_5__.upperCase)(workspaceName),
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    __COOKIE_ENCRYPTION_KEY__: (0,_src_rand_safe__WEBPACK_IMPORTED_MODULE_4__.randomStringSafe)(32)
  };

  // Copy template files
  const templatePath = (0,node_path__WEBPACK_IMPORTED_MODULE_0__.join)(TEMPLATES_PATH, type);
  const files = await (0,_src_fs__WEBPACK_IMPORTED_MODULE_2__.listFiles)(templatePath);
  await Promise.all(files.map(async file => {
    const relativePath = (0,node_path__WEBPACK_IMPORTED_MODULE_0__.relative)(templatePath, file);
    const dstPath = (0,node_path__WEBPACK_IMPORTED_MODULE_0__.join)(projectName, relativePath);
    const content = await (0,_src_fs__WEBPACK_IMPORTED_MODULE_2__.readFile)(file);
    let newContent = content;
    for (const [varName, varValue] of Object.entries({
      ...vars,
      ...defaultVars
    })) {
      newContent = newContent.replaceAll(varName, varValue);
    }
    if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      newContent = await (0,_src_fs__WEBPACK_IMPORTED_MODULE_2__.prettierFormat)(newContent, 'typescript');
    }
    if (file.endsWith('.json')) {
      if (file.endsWith('package.json')) {
        const packageJson = JSON.parse(await (0,_src_fs__WEBPACK_IMPORTED_MODULE_2__.readFile)(file));
        packageJson['name'] = projectName;
        newContent = await (0,_src_fs__WEBPACK_IMPORTED_MODULE_2__.prettyJson)(packageJson);
      } else {
        newContent = await (0,_src_fs__WEBPACK_IMPORTED_MODULE_2__.prettierFormat)(newContent, 'json');
      }
    }
    written.push(await writeFile(dstPath, newContent));
  }));
  return written;
}

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateNonce: () => (/* binding */ generateNonce),
/* harmony export */   randomStringSafe: () => (/* binding */ randomStringSafe),
/* harmony export */   uidSafe: () => (/* binding */ uidSafe)
/* harmony export */ });
/* harmony import */ var node_crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);
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
/* 19 */
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
/* 20 */
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
/* 21 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateWorkspacePackageJson: () => (/* binding */ generateWorkspacePackageJson)
/* harmony export */ });
/* harmony import */ var _src_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _src_versions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(22);


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
/* 22 */
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
  project: '1.9.2',
  eslint: '1.5.3',
  prettier: '1.3.0',
  tsconfig: '1.6.1',
  webpack: '1.6.29',
  runner: '1.5.17',
  lambdaServerRuntime: '1.0.5'
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
/* 23 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateCommonTerraform: () => (/* binding */ generateCommonTerraform),
/* harmony export */   generateDummyTerraformCredentials: () => (/* binding */ generateDummyTerraformCredentials),
/* harmony export */   generateWorkspaceProjectTerraform: () => (/* binding */ generateWorkspaceProjectTerraform)
/* harmony export */ });
/* harmony import */ var _src_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _src_project_terraform_cloudfront__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24);
/* harmony import */ var _src_project_terraform_lambda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(25);
/* harmony import */ var _src_project_terraform_provider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(26);
/* harmony import */ var _src_project_terraform_s3__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(27);
/* harmony import */ var _src_type_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(28);






function generateCommonTerraform(workspaceName, projects) {
  return [(0,_src_project_terraform_provider__WEBPACK_IMPORTED_MODULE_3__.generateAwsProviderTerraform)(workspaceName), (0,_src_project_terraform_s3__WEBPACK_IMPORTED_MODULE_4__.generateS3BucketTerraform)(workspaceName, projects.filter(p => p.type === _src_models__WEBPACK_IMPORTED_MODULE_0__.ProjectType.Web).map(p => p.projectName))].join('\n\n');
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
  } else if (type === _src_models__WEBPACK_IMPORTED_MODULE_0__.ProjectType.LambdaWebApi) {
    return (0,_src_project_terraform_lambda__WEBPACK_IMPORTED_MODULE_2__.generateLambdaTerraform)(workspaceName, projectName, {
      api: true
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
/* 24 */
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
/* 25 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateLambdaTerraform: () => (/* binding */ generateLambdaTerraform)
/* harmony export */ });
/* harmony import */ var _src_string_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);

function generateLambdaTerraform(workspaceName, projectName, opts) {
  const {
    api
  } = opts;
  const workspaceNamePascalCase = (0,_src_string_utils__WEBPACK_IMPORTED_MODULE_0__.pascalCase)(workspaceName);
  return `
# Define any extra role for the lambda here
data "aws_iam_policy_document" "${projectName}_lambda_extra_role" {
  statement {
    actions   = [
      "dynamodb:GetItem",
      "dynamodb:BatchGetItem",
      "dynamodb:Query",
      "dynamodb:Scan",
      "dynamodb:PutItem",
      "dynamodb:UpdateItem",
      "dynamodb:DeleteItem",
    ]
    resources = [
      "arn:aws:dynamodb:\${data.aws_region.current.id}:\${data.aws_caller_identity.current.account_id}:table/${workspaceNamePascalCase}User",
      "arn:aws:dynamodb:\${data.aws_region.current.id}:\${data.aws_caller_identity.current.account_id}:table/${workspaceNamePascalCase}User/index/*",
      "arn:aws:dynamodb:\${data.aws_region.current.id}:\${data.aws_caller_identity.current.account_id}:table/${workspaceNamePascalCase}UserSession",
      "arn:aws:dynamodb:\${data.aws_region.current.id}:\${data.aws_caller_identity.current.account_id}:table/${workspaceNamePascalCase}UserSession/index/*",
    ]
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
  runtime           = "nodejs20.x"
  role              = aws_iam_role.${projectName}_lambda_exec.arn
  timeout           = 900 // 15 minutes
  memory_size       = 128 // Mo
  environment {
    variables = {
      NODE_OPTIONS = "--enable-source-maps"
    }
  }
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
/* 26 */
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

data "aws_caller_identity" "current" {}
`.trim();
}

/***/ }),
/* 27 */
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
/* 28 */
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
/* harmony export */   asStringOrThrow: () => (/* binding */ asStringOrThrow),
/* harmony export */   errorAndStackAsString: () => (/* binding */ errorAndStackAsString),
/* harmony export */   errorAsString: () => (/* binding */ errorAsString),
/* harmony export */   isNull: () => (/* binding */ isNull),
/* harmony export */   isNumber: () => (/* binding */ isNumber),
/* harmony export */   isString: () => (/* binding */ isString),
/* harmony export */   iterNumberEnum: () => (/* binding */ iterNumberEnum),
/* harmony export */   iterStringEnum: () => (/* binding */ iterStringEnum),
/* harmony export */   neverHappens: () => (/* binding */ neverHappens),
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
  return Object.fromEntries(
  // eslint-disable-next-line no-null/no-null
  Object.entries(obj).filter(e => e[1] !== undefined && e[1] !== null));
}
function neverHappens(value, errorMessage) {
  throw new Error(errorMessage);
}
function asMap(value, defaultValue) {
  // eslint-disable-next-line no-null/no-null
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
  // eslint-disable-next-line no-null/no-null
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

function addPrefix(attr, prefix) {
  return Object.fromEntries(Object.entries(attr).map(([key, value]) => [`${prefix}${key}`, value]));
}

/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateDynamoUserTerraform: () => (/* binding */ generateDynamoUserTerraform)
/* harmony export */ });
/* harmony import */ var _src_string_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);

function generateDynamoUserTerraform(workspaceName) {
  const prefixLower = (0,_src_string_utils__WEBPACK_IMPORTED_MODULE_0__.lowerCase)(workspaceName);
  const prefixPascal = (0,_src_string_utils__WEBPACK_IMPORTED_MODULE_0__.pascalCase)(workspaceName);
  return `output "${prefixLower}_user_table_name" {
    value       = aws_dynamodb_table.${prefixLower}_user_table.name
  }
  
  output "${prefixLower}_user_index_name" {
    value = {
      for obj in aws_dynamodb_table.${prefixLower}_user_table.global_secondary_index : "\${aws_dynamodb_table.${prefixLower}_user_table.name }_By_\${obj.hash_key}\${ length(obj.range_key) > 0 ? "_Sorted_By_\${obj.range_key}" : "" }" => obj.name
    }
  }
  
  resource "aws_dynamodb_table" "${prefixLower}_user_table" {
    name           = "${prefixPascal}User"
    billing_mode   = "PAY_PER_REQUEST"
    hash_key       = "id"
  
    attribute {
      name = "id"
      type = "S"
    }
  }`.trim();
}

/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateDynamoUserSessionTerraform: () => (/* binding */ generateDynamoUserSessionTerraform)
/* harmony export */ });
/* harmony import */ var _src_string_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);

function generateDynamoUserSessionTerraform(workspaceName) {
  const prefixLower = (0,_src_string_utils__WEBPACK_IMPORTED_MODULE_0__.lowerCase)(workspaceName);
  const prefixPascal = (0,_src_string_utils__WEBPACK_IMPORTED_MODULE_0__.pascalCase)(workspaceName);
  return `output "${prefixLower}_user_session_table_name" {
  value       = aws_dynamodb_table.${prefixLower}_user_session_table.name
}

output "${prefixLower}_user_session_index_name" {
  value = {
    for obj in aws_dynamodb_table.${prefixLower}_user_session_table.global_secondary_index : "\${aws_dynamodb_table.${prefixLower}_user_session_table.name }_By_\${obj.hash_key}\${ length(obj.range_key) > 0 ? "_Sorted_By_\${obj.range_key}" : "" }" => obj.name
  }
}

resource "aws_dynamodb_table" "${prefixLower}_user_session_table" {
  name           = "${prefixPascal}UserSession"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "token"

  attribute {
    name = "token"
    type = "S"
  }

  ttl {
    attribute_name = "expiresAt"
    enabled = true
  }

}`.trim();
}

/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateCodeWorkspace: () => (/* binding */ generateCodeWorkspace),
/* harmony export */   readWorkspace: () => (/* binding */ readWorkspace),
/* harmony export */   writeWorkspace: () => (/* binding */ writeWorkspace)
/* harmony export */ });
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var _src_project_generate_workspace__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);
/* harmony import */ var _src_type_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(28);




function generateCodeWorkspace(workspaceName, workspaceFragments) {
  const projects = workspaceFragments.flatMap(f => (0,_src_project_generate_workspace__WEBPACK_IMPORTED_MODULE_2__.getProjectsFromWorkspaceFragment)(f, workspaceFragments));
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
      }
    },
    extensions: {
      recommendations: ['dbaeumer.vscode-eslint', 'esbenp.prettier-vscode', 'VisualStudioExptTeam.vscodeintellicode', 'styled-components.vscode-styled-components', 'naumovs.color-highlight', 'eamodio.gitlens']
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

/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   findPackageJson: () => (/* binding */ findPackageJson),
/* harmony export */   getEnv: () => (/* binding */ getEnv),
/* harmony export */   getPort: () => (/* binding */ getPort),
/* harmony export */   initLogFile: () => (/* binding */ initLogFile),
/* harmony export */   isProd: () => (/* binding */ isProd),
/* harmony export */   isSelenium: () => (/* binding */ isSelenium)
/* harmony export */ });
/* harmony import */ var node_crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);
/* harmony import */ var node_crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_crypto__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(33);
/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_fs_promises__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _src_fs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(13);
/* harmony import */ var _src_logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);





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
    (0,_src_logger__WEBPACK_IMPORTED_MODULE_4__.log)('findPackageJson');
    (0,_src_logger__WEBPACK_IMPORTED_MODULE_4__.log)(err);
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
/* 33 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:fs/promises");

/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateEnvFile: () => (/* binding */ generateEnvFile)
/* harmony export */ });
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_child_process__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _src_fs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);
/* harmony import */ var _src_type_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(28);
/* harmony import */ var _src_webpack_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(32);





async function generateEnvFile(overrides) {
  const terraformPath = (0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(process.cwd(), 'terraform');
  const res = JSON.parse((0,node_child_process__WEBPACK_IMPORTED_MODULE_0__.execSync)(`terraform output -json`, {
    cwd: terraformPath
  }).toString());
  const outputsEntries = (0,_src_type_utils__WEBPACK_IMPORTED_MODULE_3__.removeUndefined)(Object.entries(res).map(([key, value]) => {
    if (value.sensitive) {
      return undefined;
    }
    if (Array.isArray(value.type) && value.type[0] === 'object' && typeof value.value === 'object' && value.value !== null // eslint-disable-line no-null/no-null
    ) {
      return [key.toUpperCase(), Object.fromEntries(Object.entries(value.value).map(([k, v]) => [k.toUpperCase(), v]))];
    }
    if (value.type === 'string' && typeof value.value === 'string') {
      return [key.toUpperCase(), value.value];
    }
    return undefined;
  }));
  const envConstants = {
    REGION: 'RUN_TERRAFORM_APPLY',
    CODE_BUCKET: 'RUN_TERRAFORM_APPLY',
    ...Object.fromEntries(outputsEntries),
    ...overrides,
    NODE_ENV: (0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_4__.getEnv)()
  };
  await (0,_src_fs__WEBPACK_IMPORTED_MODULE_2__.writeTsFile)((0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(process.cwd(), 'shared', 'src', 'env.ts'), Object.entries(envConstants).map(([key, value]) => `export const ${key} = ${JSON.stringify(value)}${typeof value === 'string' ? ' as string' : ''};`).join('\n'));
}

/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   groupAndSortErrors: () => (/* binding */ groupAndSortErrors)
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
        const diffLine = err1.loc.start.line - err2.loc.start.line;
        if (diffLine !== 0) {
          return diffLine;
        }
        if (err1.loc.start.column === undefined) {
          return -1;
        } else if (err2.loc.start.column === undefined) {
          return 1;
        }
        const diffColumn = err1.loc.start.column - err2.loc.start.column;
        if (diffColumn !== 0) {
          return diffColumn;
        }
        return err1.message.localeCompare(err2.message);
      });
    }
  }
  return {
    errorsByProjectByFile,
    globalErrors
  };
}

/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseError: () => (/* binding */ parseError)
/* harmony export */ });
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
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
      type: 'eslint',
      severity,
      message: err.message,
      code: eslintError.ruleId,
      loc: {
        relativePath,
        absolutePath,
        start: err.loc && 'start' in err.loc ? err.loc.start : undefined,
        end: err.loc && 'end' in err.loc ? err.loc.end : undefined
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
    const [_, message, absolutePath] = match;
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
/* 37 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getLocalIp: () => (/* binding */ getLocalIp)
/* harmony export */ });
/* harmony import */ var node_os__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(38);
/* harmony import */ var node_os__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_os__WEBPACK_IMPORTED_MODULE_0__);

function getLocalIp() {
  var _Object$values$flat$f;
  return ((_Object$values$flat$f = Object.values((0,node_os__WEBPACK_IMPORTED_MODULE_0__.networkInterfaces)()).flat().find(net => net !== undefined && net.family === 'IPv4' && net.address.startsWith('192.168.'))) === null || _Object$values$flat$f === void 0 ? void 0 : _Object$values$flat$f.address) ?? '127.0.0.1';
}

/***/ }),
/* 38 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:os");

/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   readLines: () => (/* binding */ readLines)
/* harmony export */ });
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_child_process__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_exit_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _src_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);



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
    (0,_src_logger__WEBPACK_IMPORTED_MODULE_2__.log)(err);
  });
  return cleanup;
}

/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderErrorWarningCount: () => (/* binding */ renderErrorWarningCount),
/* harmony export */   renderErrors: () => (/* binding */ renderErrors),
/* harmony export */   renderLambdaServerEvent: () => (/* binding */ renderLambdaServerEvent),
/* harmony export */   renderProjectStatus: () => (/* binding */ renderProjectStatus),
/* harmony export */   renderWebpackDevServerEvent: () => (/* binding */ renderWebpackDevServerEvent)
/* harmony export */ });
/* harmony import */ var ansi_colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var ansi_colors__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ansi_colors__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_type_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(28);
/* harmony import */ var _src_webpack_runner_error_formatter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(41);
/* harmony import */ var _src_webpack_runner_ip__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(37);




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
    return `http://${(0,_src_webpack_runner_ip__WEBPACK_IMPORTED_MODULE_3__.getLocalIp)()}:${event.port}`;
  }
  const req = (0,ansi_colors__WEBPACK_IMPORTED_MODULE_0__.gray)(`${event.method} ${event.path}`);
  if (type === 'error') {
    return `${req} ${(0,ansi_colors__WEBPACK_IMPORTED_MODULE_0__.red)(event.err)}`;
  } else if (type === 'request') {
    return `${req} ${(0,ansi_colors__WEBPACK_IMPORTED_MODULE_0__.gray)('running lambda...')}`;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  } else if (type === 'response') {
    const httpCode = `[HTTP ${event.statusCode}]`;
    const size = `[${event.bodyLength.toLocaleString()}b]`;
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
    return `http://${(0,_src_webpack_runner_ip__WEBPACK_IMPORTED_MODULE_3__.getLocalIp)()}:${event.port}`;
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
/* 41 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatError: () => (/* binding */ formatError),
/* harmony export */   formatFilePath: () => (/* binding */ formatFilePath),
/* harmony export */   formatProject: () => (/* binding */ formatProject)
/* harmony export */ });
/* harmony import */ var ansi_colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
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
/* 42 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   table: () => (/* binding */ table)
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
  return data.map(line => line.map((cell, colIndex, arr) => {
    const content = formatCell(cell);
    return colIndex === arr.length - 1 && align[colIndex] !== 'r' ? content : padString(content, (maxWidths[colIndex] ?? 0) - stripAnsi(content).length, align[colIndex] !== 'r');
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
/* harmony export */   runAllWebpacks: () => (/* binding */ runAllWebpacks),
/* harmony export */   runWebpacks: () => (/* binding */ runWebpacks)
/* harmony export */ });
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_child_process__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ansi_colors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var ansi_colors__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ansi_colors__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(webpack__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var webpack_dev_server__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);
/* harmony import */ var webpack_dev_server__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(webpack_dev_server__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _src_exit_handler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6);
/* harmony import */ var _src_global_error__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7);
/* harmony import */ var _src_logger__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9);
/* harmony import */ var _src_models__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(10);
/* harmony import */ var _src_project_generate_workspace__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(11);
/* harmony import */ var _src_project_vscode_workspace__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(31);
/* harmony import */ var _src_type_utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(28);
/* harmony import */ var _src_webpack_utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(32);
/* harmony import */ var _src_webpack_runner_env_definition_file__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(34);
/* harmony import */ var _src_webpack_runner_error_grouper__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(35);
/* harmony import */ var _src_webpack_runner_error_parser__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(36);
/* harmony import */ var _src_webpack_runner_ip__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(37);
/* harmony import */ var _src_webpack_runner_line_reader__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(39);
/* harmony import */ var _src_webpack_runner_renderer__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(40);
/* harmony import */ var _src_webpack_runner_text_table__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(42);




















const name = 'WebpackRunner';
function exit() {
  process.stdin.setRawMode(false);
  (0,_src_logger__WEBPACK_IMPORTED_MODULE_7__.log)('See you soon!');
  // eslint-disable-next-line node/no-process-exit
  process.exit(0);
}
async function runWebpacks(opts) {
  const {
    root,
    workspaceFragments,
    watch
  } = opts;
  const statuses = new Map();
  const projects = workspaceFragments.flatMap(f => (0,_src_project_generate_workspace__WEBPACK_IMPORTED_MODULE_9__.getProjectsFromWorkspaceFragment)(f, workspaceFragments));
  async function regenerateEnvFile() {
    const overrides = {};
    if ((0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_12__.getEnv)() === 'development') {
      for (const {
        projectName,
        type
      } of projects) {
        if (type === _src_models__WEBPACK_IMPORTED_MODULE_8__.ProjectType.LambdaApi || type === _src_models__WEBPACK_IMPORTED_MODULE_8__.ProjectType.LambdaWebApi) {
          var _status$lambdaServerE;
          const status = statuses.get(projectName);
          const port = (status === null || status === void 0 || (_status$lambdaServerE = status.lambdaServerEvents.startEvent) === null || _status$lambdaServerE === void 0 ? void 0 : _status$lambdaServerE.port) ?? (0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_12__.getPort)((0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(root, projectName));
          overrides[`${projectName.toUpperCase()}_FUNCTION_URL`] = `http://${(0,_src_webpack_runner_ip__WEBPACK_IMPORTED_MODULE_16__.getLocalIp)()}:${port}/`;
        }
        if (type === _src_models__WEBPACK_IMPORTED_MODULE_8__.ProjectType.Web) {
          var _status$webpackDevSer;
          const status = statuses.get(projectName);
          const port = (status === null || status === void 0 || (_status$webpackDevSer = status.webpackDevServerEvents.startEvent) === null || _status$webpackDevSer === void 0 ? void 0 : _status$webpackDevSer.port) ?? (0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_12__.getPort)((0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(root, projectName));
          overrides[`${projectName.toUpperCase()}_CLOUDFRONT_DOMAIN_NAME`] = `${(0,_src_webpack_runner_ip__WEBPACK_IMPORTED_MODULE_16__.getLocalIp)()}:${port}`;
        }
      }
    }
    await (0,_src_webpack_runner_env_definition_file__WEBPACK_IMPORTED_MODULE_13__.generateEnvFile)(overrides);
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
    onChange({
      isCompleted: false,
      projectName
    });
  }
  function handleResults(project, stats) {
    var _statuses$get, _statuses$get2, _statuses$get3;
    const {
      projectName
    } = project;
    const errors = [...stats.compilation.errors.map(err => (0,_src_webpack_runner_error_parser__WEBPACK_IMPORTED_MODULE_15__.parseError)(err, {
      root,
      severity: 'error'
    })), ...stats.compilation.warnings.map(warn => (0,_src_webpack_runner_error_parser__WEBPACK_IMPORTED_MODULE_15__.parseError)(warn, {
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
    onChange({
      isCompleted: false,
      projectName
    });
  }
  function redraw() {
    const errors = [...statuses.values()].flatMap(v => v.errors);
    const groupedErrors = (0,_src_webpack_runner_error_grouper__WEBPACK_IMPORTED_MODULE_14__.groupAndSortErrors)(errors);
    const summary = [...statuses.values()].map(status => {
      return (0,_src_webpack_runner_renderer__WEBPACK_IMPORTED_MODULE_18__.renderProjectStatus)(status.project, status.firstRun, status.isRunning, groupedErrors, status.compilationFailure, status.lambdaServerEvents, status.webpackDevServerEvents);
    });
    summary.unshift([(0,ansi_colors__WEBPACK_IMPORTED_MODULE_2__.underline)(`Projects (${projects.length})`), (0,ansi_colors__WEBPACK_IMPORTED_MODULE_2__.underline)('Status'), (0,ansi_colors__WEBPACK_IMPORTED_MODULE_2__.underline)('Run')]);
    const report = (0,_src_webpack_runner_renderer__WEBPACK_IMPORTED_MODULE_18__.renderErrors)(groupedErrors);
    if (watch) {
      process.stdout.write('\u001B[2J\u001B[3J\u001B[H'); // clear terminal
    }
    (0,_src_logger__WEBPACK_IMPORTED_MODULE_7__.log)((0,_src_webpack_runner_text_table__WEBPACK_IMPORTED_MODULE_19__.table)(summary));
    if (report.length > 0) {
      (0,_src_logger__WEBPACK_IMPORTED_MODULE_7__.log)(`\nBuild completed with ${(0,_src_webpack_runner_renderer__WEBPACK_IMPORTED_MODULE_18__.renderErrorWarningCount)(errors)}\n`);
      (0,_src_logger__WEBPACK_IMPORTED_MODULE_7__.log)(report);
    }
  }
  const completed = new Set();
  function onChange(opts) {
    if (watch) {
      redraw();
      return;
    }
    const {
      projectName,
      isCompleted
    } = opts;
    if (isCompleted) {
      completed.add(projectName);
    }
    const allDone = [...statuses.keys()].every(projectName => completed.has(projectName));
    if (!allDone) {
      return;
    }
    const errors = [...statuses.values()].flatMap(v => v.errors);
    const {
      globalErrors
    } = (0,_src_webpack_runner_error_grouper__WEBPACK_IMPORTED_MODULE_14__.groupAndSortErrors)(errors);
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
    const projectPath = (0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(root, projectName);
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
    const config = await import( /*webpackIgnore: true*/(0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(projectPath, 'webpack.config.js')).then(({
      getConfig
    }) => getConfig({
      context: projectPath,
      watch
    })).catch(err => {
      reportCompilationFailure(String(err));
    });
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
    const tailLambdaServerCleanup = watch ? (0,_src_webpack_runner_line_reader__WEBPACK_IMPORTED_MODULE_17__.readLines)((0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(projectPath, 'log', 'lambda_server_runtime.txt'), lines => {
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
          // Send and forget
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          regenerateEnvFile();
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
    const tailWebpackServerCleanup = watch ? (0,_src_webpack_runner_line_reader__WEBPACK_IMPORTED_MODULE_17__.readLines)((0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(projectPath, 'log', 'webpack_dev_server.txt'), lines => {
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
          (0,_src_type_utils__WEBPACK_IMPORTED_MODULE_11__.neverHappens)(log.event);
          //   updateWebpackDevServerEvents(curr => {
          //     curr.lastEvent = log;
          //   });
        }
      }
      if (shouldRedraw) {
        redraw();
      }
    }) : undefined;
    const compiler = (0,webpack__WEBPACK_IMPORTED_MODULE_3__.webpack)({
      ...config,
      watch
    }, (err, res) => {
      if (err || !res) {
        reportCompilationFailure(err ? String(err) : 'No result after compilation');
        if (!watch) {
          onChange({
            isCompleted: true,
            projectName
          });
          resolve();
          return;
        }
      }
      onChange({
        isCompleted: true,
        projectName
      });
    });
    compiler.hooks.beforeRun.tap(name, () => handleStart(project));
    compiler.hooks.watchRun.tap(name, () => handleStart(project));
    compiler.hooks.done.tap(name, stats => handleResults(project, stats));
    let devServer;
    if (config.devServer) {
      devServer = new (webpack_dev_server__WEBPACK_IMPORTED_MODULE_4___default())(config.devServer, compiler);
      await devServer.start();
    }
    return async () => {
      return new Promise((resolve, reject) => {
        const closeCompiler = () => {
          tailLambdaServerCleanup === null || tailLambdaServerCleanup === void 0 || tailLambdaServerCleanup();
          tailWebpackServerCleanup === null || tailWebpackServerCleanup === void 0 || tailWebpackServerCleanup();
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
  if (watch) {
    process.stdin.setRawMode(true);
    process.stdin.on('data', data => {
      const str = data.toString();
      // Handle ctrl+c
      if (str === '\u0003') {
        process.emit('SIGINT', 'SIGINT');
      } else if (str === 'o') {
        const errorPaths = (0,_src_type_utils__WEBPACK_IMPORTED_MODULE_11__.removeUndefined)([...statuses.values()].flatMap(status => status.errors).map(err => 'loc' in err ? err.loc.absolutePath : undefined));
        const files = [...new Set([...errorPaths]).values()];
        const openCommand = `code ${files.join(' ')}`;
        (0,node_child_process__WEBPACK_IMPORTED_MODULE_0__.execSync)(openCommand);
      }
    });
    process.on('SIGINT', () => {
      exit();
    });
    process.on('beforeExit', () => {
      exit();
    });

    // Handle uncaught error and exceptions
    process.on('uncaughtException', err => {
      (0,_src_logger__WEBPACK_IMPORTED_MODULE_7__.error)('Uncaught Exception');
      (0,_src_logger__WEBPACK_IMPORTED_MODULE_7__.error)(err);
      exit();
    });

    // Handle unhandled failing promises
    process.on('unhandledRejection', err => {
      (0,_src_logger__WEBPACK_IMPORTED_MODULE_7__.error)('Unhandled Rejection');
      (0,_src_logger__WEBPACK_IMPORTED_MODULE_7__.error)(err);
      exit();
    });
  }
  (0,_src_exit_handler__WEBPACK_IMPORTED_MODULE_5__.registerExitCallback)(cleanup);
  return globalPromise;
}
async function runAllWebpacks(options) {
  const {
    root,
    watch
  } = options;
  const {
    fragments
  } = (await (0,_src_project_vscode_workspace__WEBPACK_IMPORTED_MODULE_10__.readWorkspace)(root)) ?? {};
  if (!fragments) {
    throw new Error(`No workspace projects at path ${root}`);
  }
  await runWebpacks({
    root,
    workspaceFragments: fragments,
    watch
  });
}
})();

var __webpack_exports__runAllWebpacks = __webpack_exports__.runAllWebpacks;
var __webpack_exports__runWebpacks = __webpack_exports__.runWebpacks;
export { __webpack_exports__runAllWebpacks as runAllWebpacks, __webpack_exports__runWebpacks as runWebpacks };

//# sourceMappingURL=index.js.map