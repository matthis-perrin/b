import { createRequire as __WEBPACK_EXTERNAL_createRequire } from "module";
/******/ var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   nodeConfig: () => (/* binding */ nodeConfig)
/* harmony export */ });
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_webpack_common_configs_base_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _src_webpack_loaders_babel_loader_node__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(25);
/* harmony import */ var _src_webpack_loaders_source_map_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(30);
/* harmony import */ var _src_webpack_plugins_dependency_packer_plugin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(32);
/* harmony import */ var _src_webpack_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6);






function nodeConfig(opts) {
  const {
    context,
    watch,
    isLib,
    noEntry,
    packageJsonProperties
  } = opts;
  const base = (0,_src_webpack_common_configs_base_config__WEBPACK_IMPORTED_MODULE_1__.baseConfig)({
    context,
    watch
  });
  return {
    ...base,
    target: 'node',
    entry: noEntry ? {} : {
      index: (0,node_path__WEBPACK_IMPORTED_MODULE_0__.join)(context, `src/index.ts`)
    },
    output: {
      path: (0,node_path__WEBPACK_IMPORTED_MODULE_0__.join)(context, 'dist'),
      filename: `[name].js`,
      clean: {
        keep: fileName => fileName.startsWith('node_modules') || fileName === 'yarn.lock'
      },
      chunkFormat: 'module',
      ...(isLib ? {
        library: {
          type: 'module'
        }
      } : {})
    },
    module: {
      rules: [(0,_src_webpack_loaders_babel_loader_node__WEBPACK_IMPORTED_MODULE_2__.babelLoaderNode)(), (0,_src_webpack_loaders_source_map_loader__WEBPACK_IMPORTED_MODULE_3__.sourceMapLoader)()],
      parser: {
        javascript: {
          importMeta: false
        }
      }
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      modules: ['node_modules', '../shared-node/node_modules', '../shared/node_modules'],
      alias: {
        '@src': (0,node_path__WEBPACK_IMPORTED_MODULE_0__.join)(context, 'src'),
        '@shared': (0,node_path__WEBPACK_IMPORTED_MODULE_0__.join)(context, '../shared/src'),
        '@shared-node': (0,node_path__WEBPACK_IMPORTED_MODULE_0__.join)(context, '../shared-node/src')
      }
    },
    plugins: [...(base.plugins ?? []), (0,_src_webpack_plugins_dependency_packer_plugin__WEBPACK_IMPORTED_MODULE_4__.dependencyPackerPlugin)(packageJsonProperties)],
    externals: (ctx, cb) => {
      const {
        request,
        context,
        contextInfo,
        getResolve
      } = ctx;
      if (request === undefined) {
        return cb();
      }
      if (request.startsWith('node:')) {
        return cb(undefined, `node-commonjs ${request}`);
      }
      const resolver = getResolve === null || getResolve === void 0 ? void 0 : getResolve();
      if (!resolver) {
        return cb(new Error('No resolver when checking for externals'));
      }
      resolver(context ?? '', request).then(res => {
        if (!res.includes('/node_modules/')) {
          return cb();
        }
        (0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_5__.findPackageJson)(res).then(packageJson => {
          if (packageJson && packageJson['type'] === 'module') {
            return cb(undefined, `module ${request}`);
          }
          cb(undefined, `node-commonjs ${request}`);
        }).catch(() => cb(undefined, `node-commonjs ${request}`));
      }).catch(() => {
        cb(new Error(`Can't resolve '${request}' in '${contextInfo === null || contextInfo === void 0 ? void 0 : contextInfo.issuer}'`));
      });
    },
    experiments: {
      ...base.experiments,
      outputModule: true
    }
  };
}

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:path");

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   baseConfig: () => (/* binding */ baseConfig)
/* harmony export */ });
/* harmony import */ var _src_webpack_plugins_define_plugin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _src_webpack_plugins_eslint_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var _src_webpack_plugins_fork_ts_checker_plugin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(20);
/* harmony import */ var _src_webpack_plugins_terser_plugin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(22);
/* harmony import */ var _src_webpack_plugins_yarn_plugin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(24);
/* harmony import */ var _src_webpack_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6);






function baseConfig(opts) {
  const {
    context
  } = opts;
  return {
    mode: 'none',
    context,
    entry: {},
    devtool: 'source-map',
    plugins: [new _src_webpack_plugins_yarn_plugin__WEBPACK_IMPORTED_MODULE_4__.YarnPlugin(), (0,_src_webpack_plugins_fork_ts_checker_plugin__WEBPACK_IMPORTED_MODULE_2__.forkTsCheckerPlugin)(context), (0,_src_webpack_plugins_eslint_plugin__WEBPACK_IMPORTED_MODULE_1__.eslintPlugin)(), (0,_src_webpack_plugins_define_plugin__WEBPACK_IMPORTED_MODULE_0__.definePlugin)()],
    stats: false,
    infrastructureLogging: {
      level: 'error'
    },
    optimization: {
      minimize: (0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_5__.isProd)(),
      minimizer: [(0,_src_webpack_plugins_terser_plugin__WEBPACK_IMPORTED_MODULE_3__.terserPlugin)()]
    },
    experiments: {
      backCompat: true
    }
  };
}

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   definePlugin: () => (/* binding */ definePlugin)
/* harmony export */ });
/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_webpack_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
 // eslint-disable-line import/no-named-as-default


function definePlugin() {
  const envPrefix = 'MATTHIS_';
  const extraEnv = Object.fromEntries(Object.entries(process.env) // eslint-disable-line node/no-process-env
  .filter(([name]) => name.startsWith(envPrefix)).map(([name, value]) => [String(name.slice(envPrefix.length)), JSON.stringify(value)]));
  return new (webpack__WEBPACK_IMPORTED_MODULE_0___default().DefinePlugin)({
    'process.env.NODE_ENV': JSON.stringify((0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_1__.getEnv)()),
    ...extraEnv
  });
}

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("webpack");

/***/ }),
/* 6 */
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
/* harmony import */ var node_crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var node_crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_crypto__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_fs_promises__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _src_fs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);




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
/* 7 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:crypto");

/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:fs/promises");

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   access: () => (/* binding */ access),
/* harmony export */   cleanDir: () => (/* binding */ cleanDir),
/* harmony export */   cp: () => (/* binding */ cp),
/* harmony export */   exists: () => (/* binding */ exists),
/* harmony export */   listFiles: () => (/* binding */ listFiles),
/* harmony export */   maybeReadFile: () => (/* binding */ maybeReadFile),
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
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_child_process__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prettier__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12);
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
/* 10 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:child_process");

/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:fs");

/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("prettier");

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EslintWebpackError: () => (/* binding */ EslintWebpackError),
/* harmony export */   eslintPlugin: () => (/* binding */ eslintPlugin)
/* harmony export */ });
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var chokidar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14);
/* harmony import */ var chokidar__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(chokidar__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var eslint__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(15);
/* harmony import */ var eslint__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(eslint__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);
/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(webpack__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _src_webpack_plugins_formatter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(16);
/* harmony import */ var _src_webpack_plugins_standalone_plugin__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(17);







class EslintWebpackError extends webpack__WEBPACK_IMPORTED_MODULE_4__.WebpackError {
  name = 'EslintWebpackError';
  constructor(eslintRunId, message, filePath, loc, ruleId) {
    super(message);
    this.eslintRunId = eslintRunId;
    this.ruleId = ruleId;
    if (filePath !== undefined) {
      this.file = filePath;
    }
    if (loc) {
      this.loc = loc;
    }
  }
}
const RUN_ESLINT_INTERVAL = 500;
class EslintPlugin extends _src_webpack_plugins_standalone_plugin__WEBPACK_IMPORTED_MODULE_6__.StandalonePlugin {
  name = 'EslintPlugin';
  fileStates = new Map();
  shouldRun = false;
  async setup(compiler) {
    return new Promise(resolve => {
      this.runEslintInterval = setInterval(() => this.runEslint(), RUN_ESLINT_INTERVAL);

      // Generate the patterns of all the files across the workspace
      const projectPath = this.context;
      const workspacePath = (0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(projectPath, '..');
      const workspaceDirs = (0,node_fs__WEBPACK_IMPORTED_MODULE_0__.readdirSync)(workspacePath, {
        withFileTypes: true
      }).filter(e => e.isDirectory() && (0,node_fs__WEBPACK_IMPORTED_MODULE_0__.existsSync)((0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(workspacePath, e.name, 'package.json'))).map(e => (0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(workspacePath, e.name));
      const patterns = ['src/**/*.ts', 'src/**/*.tsx'].flatMap(pattern => workspaceDirs.map(dir => (0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(dir, pattern)));
      this.watcher = (0,chokidar__WEBPACK_IMPORTED_MODULE_2__.watch)(patterns);
      this.watcher.on('add', path => {
        this.shouldRun = true;
        if (path.startsWith(`${projectPath}/`)) {
          this.fileStates.set(path, {
            status: 'queued'
          });
        }
      }).on('change', path => {
        this.shouldRun = true;
        if (path.startsWith(`${projectPath}/`)) {
          this.fileStates.set(path, {
            status: 'queued'
          });
        }
      }).on('unlink', path => {
        this.shouldRun = true;
        if (path.startsWith(`${projectPath}/`)) {
          this.fileStates.delete(path);
        }
      }).on('ready', () => {
        this.runEslint();
        resolve();
      });
      compiler.hooks.compilation.tap(this.name, comp => {
        this.compilation = comp;
        this.syncErrorsAndWarnings();
      });
      compiler.hooks.afterCompile.tapAsync(this.name, (compilation, cb) => {
        setTimeout(() => {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          this.awaitIdle().finally(cb);
        }, RUN_ESLINT_INTERVAL);
      });
    });
  }
  runEslint() {
    if (!this.shouldRun) {
      return;
    }
    this.shouldRun = false;
    const filesQueued = [...this.fileStates.entries()];
    if (filesQueued.length === 0) {
      return;
    }
    const eslintRunId = Math.random();
    for (const [filePath] of filesQueued) {
      this.fileStates.set(filePath, {
        status: 'in-progress',
        eslintRunId
      });
    }
    const handleError = err => {
      for (const [filePath] of filesQueued) {
        const currentState = this.fileStates.get(filePath);
        if (!currentState || currentState.status !== 'in-progress' || currentState.eslintRunId !== eslintRunId) {
          continue;
        }
        this.fileStates.set(filePath, {
          status: 'errored',
          eslintRunId,
          err
        });
      }
    };
    try {
      const tsConfigPath = (0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(this.context, 'tsconfig.json');
      const eslint = new eslint__WEBPACK_IMPORTED_MODULE_3__.ESLint({
        cwd: this.context,
        overrideConfig: {
          settings: {
            'import/resolver': {
              typescript: {
                project: tsConfigPath
              }
            }
          },
          parserOptions: {
            project: tsConfigPath
          }
        }
      });
      eslint.lintFiles(filesQueued.map(e => e[0])).then(results => {
        for (const result of results) {
          const currentState = this.fileStates.get(result.filePath);
          if (!currentState || currentState.status !== 'in-progress' || currentState.eslintRunId !== eslintRunId) {
            continue;
          }
          if (result.messages.length > 0) {
            this.fileStates.set(result.filePath, {
              status: 'failed',
              eslintRunId,
              messages: result.messages
            });
          } else {
            this.fileStates.set(result.filePath, {
              status: 'success',
              eslintRunId
            });
          }
        }
      }).catch(handleError).finally(() => {
        this.syncErrorsAndWarnings();
        this.checkIdle();
      });
    } catch (err) {
      handleError(err);
      this.syncErrorsAndWarnings();
      this.checkIdle();
    }
  }
  syncErrorsAndWarnings() {
    if (!this.compilation) {
      return;
    }

    // Errors
    let eslintError;
    for (const fileState of this.fileStates.values()) {
      if (fileState.status === 'errored') {
        eslintError = new EslintWebpackError(fileState.eslintRunId, `Failure to run ESLint:\n${fileState.err instanceof Error ? fileState.err.stack : String(fileState.err)}`);
      }
    }
    this.compilation.errors = [...this.compilation.errors.filter(w => !('eslintRunId' in w)), ...(eslintError ? [eslintError] : [])];

    // Warnings
    this.compilation.warnings = [...this.compilation.warnings.filter(w => !('eslintRunId' in w)), ...[...this.fileStates.entries()].sort((e1, e2) => e1[0].localeCompare(e2[0])).flatMap(([filePath, fileState]) => {
      if (fileState.status !== 'failed') {
        return [];
      }
      return fileState.messages.map(msg => new EslintWebpackError(fileState.eslintRunId, (0,_src_webpack_plugins_formatter__WEBPACK_IMPORTED_MODULE_5__.stripAnsi)(msg.message), filePath, {
        start: {
          line: msg.line,
          column: msg.column
        },
        end: msg.endLine === undefined ? undefined : {
          line: msg.endLine,
          column: msg.endColumn
        }
      }, msg.ruleId ?? undefined));
    })];
  }
  checkIdle() {
    if (!this.resolveAwaitIdlePromise) {
      return;
    }
    for (const state of this.fileStates.values()) {
      if (state.status === 'queued' || state.status === 'in-progress') {
        return;
      }
    }
    this.resolveAwaitIdlePromise();
  }
  async awaitIdle() {
    return new Promise(resolve => {
      this.resolveAwaitIdlePromise = resolve;
      this.checkIdle();
    });
  }
  async teardown() {
    var _this$watcher;
    clearInterval(this.runEslintInterval);
    await ((_this$watcher = this.watcher) === null || _this$watcher === void 0 ? void 0 : _this$watcher.close());
  }
}
function eslintPlugin() {
  return new EslintPlugin();
}

/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("chokidar");

/***/ }),
/* 15 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("eslint");

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   stripAnsi: () => (/* binding */ stripAnsi)
/* harmony export */ });
const ansiRegex = new RegExp(['[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)', '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))'].join('|'), 'gu');
const stripAnsi = s => s.replace(ansiRegex, '');

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StandalonePlugin: () => (/* binding */ StandalonePlugin)
/* harmony export */ });
/* harmony import */ var _src_exit_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18);
/* harmony import */ var _src_global_error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);


class StandalonePlugin {
  context = process.cwd();

  // INITIALIZE

  apply(compiler) {
    this.context = compiler.context;
    compiler.hooks.beforeRun.tapPromise(this.name, async () => this.setupHandler(compiler));
    compiler.hooks.watchRun.tapPromise(this.name, async () => this.setupHandler(compiler));
    compiler.hooks.shutdown.tapPromise(this.name, async () => this.exitHandlerAsync(compiler));
    (0,_src_exit_handler__WEBPACK_IMPORTED_MODULE_0__.registerExitCallback)(() => this.exitHandler(compiler));
  }
  // SETUP

  hasStarted = false;
  async setupHandler(compiler) {
    if (this.hasStarted) {
      return;
    }
    this.hasStarted = true;
    await this.setup(compiler);
  }

  // EXIT

  hasExited = false;
  exitHandler(compiler) {
    if (this.hasExited) {
      return;
    }
    this.hasExited = true;
    Promise.resolve(this.teardown(compiler)).catch(err => {
      (0,_src_global_error__WEBPACK_IMPORTED_MODULE_1__.globalError)(`Error during teardown of plugin ${this.name}`, err);
    });
  }
  async exitHandlerAsync(compiler) {
    if (this.hasExited) {
      return;
    }
    this.hasExited = true;
    await this.teardown(compiler);
  }
}

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   registerExitCallback: () => (/* binding */ registerExitCallback)
/* harmony export */ });
/* harmony import */ var _src_global_error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);

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
/* 19 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   globalError: () => (/* binding */ globalError)
/* harmony export */ });
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
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
/* 20 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   forkTsCheckerPlugin: () => (/* binding */ forkTsCheckerPlugin)
/* harmony export */ });
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fork_ts_checker_webpack_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(21);
/* harmony import */ var fork_ts_checker_webpack_plugin__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fork_ts_checker_webpack_plugin__WEBPACK_IMPORTED_MODULE_1__);


function forkTsCheckerPlugin(context) {
  return new (fork_ts_checker_webpack_plugin__WEBPACK_IMPORTED_MODULE_1___default())({
    typescript: {
      diagnosticOptions: {
        syntactic: true,
        semantic: true,
        declaration: false,
        global: true
      },
      mode: 'readonly',
      configFile: (0,node_path__WEBPACK_IMPORTED_MODULE_0__.join)(context, 'tsconfig.json')
    },
    formatter: 'basic',
    logger: {
      log: () => {},
      error: () => {}
    }
  });
}

/***/ }),
/* 21 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("fork-ts-checker-webpack-plugin");

/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   terserPlugin: () => (/* binding */ terserPlugin)
/* harmony export */ });
/* harmony import */ var terser_webpack_plugin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23);
/* harmony import */ var terser_webpack_plugin__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(terser_webpack_plugin__WEBPACK_IMPORTED_MODULE_0__);

function terserPlugin() {
  return new (terser_webpack_plugin__WEBPACK_IMPORTED_MODULE_0___default())({
    terserOptions: {
      format: {
        comments: false
      }
    },
    extractComments: false
  });
}

/***/ }),
/* 23 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("terser-webpack-plugin");

/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   YarnPlugin: () => (/* binding */ YarnPlugin)
/* harmony export */ });
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_child_process__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_2__);



class YarnPlugin {
  apply(compiler) {
    compiler.hooks.beforeRun.tapAsync('YarnPlugin', (compiler, cb) => {
      const command = ['yarn', 'install', '--audit', '--check-files', '--ignore-optional', '--non-interactive', '--production=false'].join(' ');
      (0,node_child_process__WEBPACK_IMPORTED_MODULE_0__.exec)(command, {
        cwd: compiler.context
      }, (error, stdout, stderr) => {
        if (error) {
          console.error(`Yarn failed in ${compiler.context}`);
          cb(error);
          return;
        }
        const warnings = stderr.split('\n').filter(l => l.trim().length > 0);
        if (warnings.length > 0) {
          (0,node_fs__WEBPACK_IMPORTED_MODULE_1__.appendFileSync)((0,node_path__WEBPACK_IMPORTED_MODULE_2__.join)(compiler.context, `.yarn-warnings.log`), stderr);
        }
        cb();
      });
    });
  }
}

/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   babelLoaderNode: () => (/* binding */ babelLoaderNode)
/* harmony export */ });
/* harmony import */ var _babel_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(26);
/* harmony import */ var _babel_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_preset_env__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(27);
/* harmony import */ var _babel_preset_env__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_preset_env__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_preset_typescript__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(28);
/* harmony import */ var _babel_preset_typescript__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_preset_typescript__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var babel_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(29);
/* harmony import */ var babel_loader__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(babel_loader__WEBPACK_IMPORTED_MODULE_3__);
/* eslint-disable import/no-unassigned-import */




/* eslint-enable import/no-unassigned-import */

function babelLoaderNode() {
  return {
    test: /\.tsx?$/u,
    exclude: /\/node_modules\//u,
    loader: 'babel-loader',
    options: {
      presets: [['@babel/preset-env', {
        targets: {
          node: 16
        }
      }], ['@babel/preset-typescript']]
    }
  };
}

/***/ }),
/* 26 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("@babel/core");

/***/ }),
/* 27 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("@babel/preset-env");

/***/ }),
/* 28 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("@babel/preset-typescript");

/***/ }),
/* 29 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("babel-loader");

/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   sourceMapLoader: () => (/* binding */ sourceMapLoader)
/* harmony export */ });
/* harmony import */ var _babel_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(26);
/* harmony import */ var _babel_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_preset_env__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(27);
/* harmony import */ var _babel_preset_env__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_preset_env__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_preset_typescript__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(28);
/* harmony import */ var _babel_preset_typescript__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_preset_typescript__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var babel_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(29);
/* harmony import */ var babel_loader__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(babel_loader__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var source_map_loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(31);
/* harmony import */ var source_map_loader__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(source_map_loader__WEBPACK_IMPORTED_MODULE_4__);
/* eslint-disable import/no-unassigned-import */





/* eslint-enable import/no-unassigned-import */

function sourceMapLoader() {
  return {
    test: /\.js$/u,
    use: ['source-map-loader'],
    enforce: 'pre'
  };
}

/***/ }),
/* 31 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("source-map-loader");

/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dependencyPackerPlugin: () => (/* binding */ dependencyPackerPlugin)
/* harmony export */ });
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_child_process__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_fs_promises__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _src_global_error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(19);
/* harmony import */ var _src_webpack_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);




class DependencyPackerPlugin {
  constructor(packageJsonProperties = {}) {
    this.packageJsonProperties = packageJsonProperties;
  }
  apply(compiler) {
    const name = 'DependencyPackerPlugin';
    const depMap = new Map();
    compiler.resolverFactory.hooks.resolver.for('normal').tap(name, resolver => {
      resolver.hooks.result.tap(name, result => {
        if (result.descriptionFileRoot !== undefined && !result.descriptionFileRoot.includes('/node_modules/')) {
          return result;
        }
        if (result.descriptionFileData && 'name' in result.descriptionFileData && 'version' in result.descriptionFileData) {
          const {
            name,
            version
          } = result.descriptionFileData;
          depMap.set(name, version);
        } else {
          console.log('failure to identify module', result.descriptionFileData);
        }
        return result;
      });
    });
    compiler.hooks.beforeRun.tap(name, () => depMap.clear());
    // compiler.hooks.compilation.tap(name, compilation => {
    //   // compilation.hooks.finishModules.tapPromise(name, async modules => {
    //   //   await Promise.allSettled(
    //   //     [...modules].map(async m => {
    //   //       if (!('userRequest' in m)) {
    //   //         return;
    //   //       }
    //   //       // console.log(
    //   //       //   compilation.resolverFactory
    //   //       //     .get('normal')
    //   //       //     .resolveSync(m.context, compiler.context, m.request)
    //   //       // );
    //   //       const module = m as ExternalModule | NormalModule;
    //   //       const request = module.userRequest;
    //   //       if (request.startsWith('node:')) {
    //   //         return;
    //   //       }
    //   //       const res = await matcherAsync(module.userRequest);
    //   //       if (res === undefined) {
    //   //         return;
    //   //       }
    //   //       const packageJson = await findPackageJson(res);
    //   //       if (packageJson === undefined) {
    //   //         return;
    //   //       }
    //   //       depMap.set(packageJson['name'] as string, packageJson['version'] as string);
    //   //     })
    //   //   );
    //   // });
    // });
    compiler.hooks.done.tapPromise(name, async stats => {
      const dependencies = Object.fromEntries([...depMap.entries()].sort((e1, e2) => e1[0].localeCompare(e2[0])));
      let {
        name,
        version,
        ...extraProps
      } = this.packageJsonProperties;
      if (name === undefined || version === undefined) {
        const entryPoints = Object.values(stats.compilation.compiler.options.entry);
        const [firstEntryPoint] = entryPoints;
        if (firstEntryPoint === undefined) {
          return;
        }
        const entryPoint = firstEntryPoint.import.at(-1);
        const entryPackageJson = await (0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_3__.findPackageJson)(entryPoint);
        if (!entryPackageJson) {
          (0,_src_global_error__WEBPACK_IMPORTED_MODULE_2__.globalError)(`Failure to retrieve entryPoint's package.json for ${entryPoint}`);
          return;
        }
        name = entryPackageJson['name'];
        version = entryPackageJson['version'];
      }
      const outputDirectory = stats.compilation.compiler.options.output.path;
      await (0,node_fs_promises__WEBPACK_IMPORTED_MODULE_1__.writeFile)(`${outputDirectory}/package.json`, JSON.stringify({
        name,
        version,
        type: 'module',
        main: 'index.js',
        ...extraProps,
        dependencies
      }, undefined, 2));
      await yarnInstall(outputDirectory);
    });
  }
}
async function yarnInstall(path) {
  return new Promise((resolve, reject) => {
    (0,node_child_process__WEBPACK_IMPORTED_MODULE_0__.exec)(`yarn install --non-interactive --ignore-optional --production`, {
      cwd: path
    }, (error, stdout, stderr) => {
      if (!error) {
        resolve();
      } else {
        console.error(`Failure to run \`yarn install\` at "${path}"\n${stderr}`);
        reject(new Error(stderr));
      }
    });
  });
}
function dependencyPackerPlugin(packageJsonProperties) {
  return new DependencyPackerPlugin(packageJsonProperties);
}

/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   lambdaServerPlugin: () => (/* binding */ lambdaServerPlugin)
/* harmony export */ });
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_child_process__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_crypto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var node_crypto__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_crypto__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var node_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(34);
/* harmony import */ var node_http__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(node_http__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _src_webpack_plugins_standalone_plugin__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(17);
/* harmony import */ var _src_webpack_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6);







class LambdaServerPlugin extends _src_webpack_plugins_standalone_plugin__WEBPACK_IMPORTED_MODULE_5__.StandalonePlugin {
  name = 'LambdaServerPlugin';
  async setup(compiler) {
    // Only starts the lambda server in watch mode
    if (!compiler.options.watch) {
      return;
    }
    this.runtimeLogFile = await (0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_6__.initLogFile)(compiler.context, 'lambda_server_runtime.txt');
    this.appLogFile = await (0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_6__.initLogFile)(compiler.context, 'lambda_server_log.txt');
    return new Promise((resolve, reject) => {
      const port = (0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_6__.getPort)(compiler.context);
      this.server = (0,node_http__WEBPACK_IMPORTED_MODULE_3__.createServer)((req, res) => {
        const url = req.url ?? '';
        if (url.startsWith('/favicon')) {
          res.end();
          return;
        }
        const method = req.method ?? '';
        const internalError = err => {
          this.runtimeLog({
            event: 'error',
            err,
            path: url,
            method
          });
          res.statusCode = 500;
          res.end();
        };
        try {
          // Parse body
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });

          // Parse URL
          const parsedUrl = new URL(`http://localhost${url}`);
          const rawQueryString = parsedUrl.search.slice(1);
          const queryStringParameters = Object.fromEntries([...new URLSearchParams(decodeURIComponent(rawQueryString)).entries()]);
          const sendRes = (body, duration,
          // eslint-disable-next-line @typescript-eslint/no-magic-numbers
          statusCode = 200, headers = {}) => {
            this.runtimeLog({
              event: 'response',
              path: url,
              method,
              statusCode,
              duration,
              headers,
              body: typeof body === 'string' ? body : 'Buffer'
            });
            res.statusCode = statusCode;
            for (const [headerName, headerValue] of Object.entries(headers)) {
              res.setHeader(headerName, headerValue);
            }
            res.write(body);
            res.end();
          };
          req.on('end', () => {
            // Log the request
            this.runtimeLog({
              event: 'request',
              path: url,
              method,
              body
            });

            // Create the lambda event
            const event = {
              version: '2.0',
              routeKey: '$default',
              rawPath: parsedUrl.pathname,
              rawQueryString,
              headers: req.headers,
              queryStringParameters,
              requestContext: {
                accountId: 'anonymous',
                // apiId: 'rqez6mmiihukf4yvq2l7rrq2340xpkvp',
                // domainName: 'rqez6mmiihukf4yvq2l7rrq2340xpkvp.lambda-url.eu-west-3.on.aws',
                // domainPrefix: 'rqez6mmiihukf4yvq2l7rrq2340xpkvp',
                http: {
                  method,
                  path: parsedUrl.pathname,
                  // protocol: 'HTTP/1.1',
                  // sourceIp: '88.138.164.86',
                  userAgent: req.headers['user-agent']
                },
                requestId: (0,node_crypto__WEBPACK_IMPORTED_MODULE_1__.randomUUID)(),
                routeKey: '$default',
                stage: '$default',
                timeEpoch: Date.now()
              },
              body,
              isBase64Encoded: false
            };
            const TOKEN = (0,node_crypto__WEBPACK_IMPORTED_MODULE_1__.randomUUID)();
            const handlerPath = (0,node_path__WEBPACK_IMPORTED_MODULE_4__.join)(this.context, 'dist/index.js');
            const commandJs = `
(async () => {
  try {
    const {handler} = await import('${handlerPath}');
    const json = await handler(JSON.parse(atob('${btoa(JSON.stringify(event))}')));
    process.stdout.write(\`${TOKEN}\${JSON.stringify(json)}${TOKEN}\`);
  }
  catch (err) {
    process.stderr.write(\`${TOKEN}\${String(err)}${TOKEN}\`);
  }
})()
        `.trim();
            const command = [`node --enable-source-maps -e "eval(atob('${btoa(commandJs)}'))"`].join('');
            const startTs = Date.now();
            (0,node_child_process__WEBPACK_IMPORTED_MODULE_0__.exec)(command, {
              env: {
                AWS_SHARED_CREDENTIALS_FILE: (0,node_path__WEBPACK_IMPORTED_MODULE_4__.join)(this.context, '../terraform/.aws-credentials'),
                PATH: process.env['PATH'] // eslint-disable-line node/no-process-env
              }
            }, (error, stdout, stderr) => {
              const duration = Date.now() - startTs;
              const infoOutput = this.parseOutput(stdout, TOKEN);
              const errOutput = this.parseOutput(stderr, TOKEN);
              this.appLog(infoOutput.logs);
              this.appLog(errOutput.logs);
              const err = error ? String(error) : errOutput.result;
              if (err !== undefined) {
                return internalError(err.split('\n')[0] ?? err);
              }
              const stdoutRes = infoOutput.result ?? '';
              try {
                if (stdoutRes === 'undefined') {
                  return internalError(`Lambda returned undefined`);
                }
                const result = JSON.parse(stdoutRes);
                if (result === undefined) {
                  return internalError(`Invalid response: ${stdoutRes}`);
                }
                res.setHeader('Content-Type', 'application/json');
                // eslint-disable-next-line no-null/no-null
                if (typeof result === 'object' && result !== null && !Array.isArray(result)) {
                  const {
                    body,
                    headers,
                    statusCode,
                    isBase64Encoded
                  } = result;
                  if (!('statusCode' in result)) {
                    return sendRes(stdoutRes, duration);
                  } else if (typeof statusCode !== 'number') {
                    return internalError(`statusCode ${JSON.stringify(statusCode)} is not a number`);
                  }
                  const resBody = typeof body === 'string' ? typeof isBase64Encoded === 'boolean' && isBase64Encoded ? Buffer.from(body, 'base64') : body : JSON.stringify(body);
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                  return sendRes(resBody, duration, statusCode, headers);
                } else if (typeof result === 'string') {
                  return sendRes(result, duration);
                }
                return sendRes(stdoutRes, duration);
              } catch (err) {
                return internalError(String(err));
              }
            });
          });
        } catch (err) {
          internalError(String(err));
        }
      }).listen(port).on('error', err => {
        reject(err);
      }).on('listening', () => {
        resolve();
        this.runtimeLog({
          event: 'start',
          port
        });
      });
    });
  }
  async teardown() {
    return new Promise((resolve, reject) => {
      var _this$server;
      (_this$server = this.server) === null || _this$server === void 0 || _this$server.close(err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  // Parse the output (stdout or stderr) of a script and extract the data
  // that is wrapped by the value of `token`.
  // parseOutput('Hello###foo###World', '###') => {result: 'foo', logs: 'HelloWorld'}
  // parseOutput('Hello World', '###') => {result: undefined, logs: 'Hello World'}
  parseOutput(output, token) {
    const tokenIndex1 = output.indexOf(token);
    if (tokenIndex1 !== -1) {
      const tokenIndex2 = output.indexOf(token, tokenIndex1 + token.length);
      if (tokenIndex1 !== -1) {
        return {
          result: output.slice(tokenIndex1 + token.length, tokenIndex2),
          logs: (output.slice(0, tokenIndex1) + output.slice(tokenIndex2 + token.length)).trim()
        };
      }
    }
    return {
      logs: output.trim()
    };
  }
  runtimeLog(event) {
    if (this.runtimeLogFile === undefined) {
      return;
    }
    (0,node_fs__WEBPACK_IMPORTED_MODULE_2__.appendFileSync)(this.runtimeLogFile, `${JSON.stringify({
      t: new Date().toISOString(),
      ...event
    })}\n`);
  }
  appLog(log) {
    var _logs$;
    const logs = Array.isArray(log) ? log : [log];
    if (this.appLogFile === undefined || logs.length === 0 || logs.length === 1 && ((_logs$ = logs[0]) === null || _logs$ === void 0 ? void 0 : _logs$.length) === 0) {
      return;
    }
    (0,node_fs__WEBPACK_IMPORTED_MODULE_2__.appendFileSync)(this.appLogFile, logs.map(log => `[${new Date().toISOString()}] ${log}\n`).join(''));
  }
}
function lambdaServerPlugin() {
  return new LambdaServerPlugin();
}

/***/ }),
/* 34 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:http");

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
/* harmony export */   config: () => (/* binding */ config)
/* harmony export */ });
/* harmony import */ var _src_webpack_common_configs_node_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _src_webpack_plugins_lambda_server_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(33);


function config(opts) {
  const baseConfig = (0,_src_webpack_common_configs_node_config__WEBPACK_IMPORTED_MODULE_0__.nodeConfig)({
    ...opts,
    isLib: true
  });
  return {
    ...baseConfig,
    plugins: [...(baseConfig.plugins ?? []), (0,_src_webpack_plugins_lambda_server_plugin__WEBPACK_IMPORTED_MODULE_1__.lambdaServerPlugin)()]
  };
}
})();

var __webpack_exports__config = __webpack_exports__.config;
export { __webpack_exports__config as config };

//# sourceMappingURL=index.js.map