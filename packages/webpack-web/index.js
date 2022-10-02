import { createRequire as __WEBPACK_EXTERNAL_createRequire } from "module";
/******/ var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "webConfig": () => (/* binding */ webConfig)
/* harmony export */ });
/* harmony import */ var webpack_dev_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var webpack_dev_server__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack_dev_server__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _src_webpack_configs_base_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _src_webpack_loaders_babel_loader_web__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(21);
/* harmony import */ var _src_webpack_loaders_source_map_loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(28);
/* harmony import */ var _src_webpack_plugins_html_plugin__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(30);
/* harmony import */ var _src_webpack_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);
// eslint-disable-next-line import/no-unassigned-import







function webConfig() {
  const base = (0,_src_webpack_configs_base_config__WEBPACK_IMPORTED_MODULE_2__.baseConfig)();
  return { ...base,
    target: 'web',
    entry: {
      main: (0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)((0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_6__.getProjectDir)(), `src/index.tsx`)
    },
    output: {
      path: (0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_6__.getDistDir)(),
      filename: `[name].[contenthash].js`,
      clean: true,
      publicPath: '/'
    },
    module: {
      rules: [(0,_src_webpack_loaders_babel_loader_web__WEBPACK_IMPORTED_MODULE_3__.babelLoaderWeb)(), (0,_src_webpack_loaders_source_map_loader__WEBPACK_IMPORTED_MODULE_4__.sourceMapLoader)()]
    },
    plugins: [...(base.plugins ?? []), (0,_src_webpack_plugins_html_plugin__WEBPACK_IMPORTED_MODULE_5__.htmlPlugin)()],
    devServer: !(0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_6__.isProd)() ? {
      static: (0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_6__.getDistDir)(),
      compress: true,
      hot: true,
      open: true
    } : undefined,
    optimization: { ...base.optimization,
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[/\\]node_modules[/\\]/u,
            chunks: 'initial',
            name: 'vendor',
            enforce: true
          }
        }
      }
    }
  };
}

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("webpack-dev-server");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:path");

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "baseConfig": () => (/* binding */ baseConfig)
/* harmony export */ });
/* harmony import */ var _src_webpack_plugins_clean_terminal_plugin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _src_webpack_plugins_define_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _src_webpack_plugins_eslint_plugin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/* harmony import */ var _src_webpack_plugins_fork_ts_checker_plugin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(15);
/* harmony import */ var _src_webpack_plugins_terser_plugin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(17);
/* harmony import */ var _src_webpack_plugins_tsconfig_paths_plugin__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(19);
/* harmony import */ var _src_webpack_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);







function baseConfig() {
  return {
    mode: 'none',
    // devtool: isProd() ? 'source-map' : 'eval',
    resolve: {
      plugins: [(0,_src_webpack_plugins_tsconfig_paths_plugin__WEBPACK_IMPORTED_MODULE_5__.tsconfigPathsPlugin)()],
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    plugins: [(0,_src_webpack_plugins_fork_ts_checker_plugin__WEBPACK_IMPORTED_MODULE_3__.forkTsCheckerPlugin)(), (0,_src_webpack_plugins_eslint_plugin__WEBPACK_IMPORTED_MODULE_2__.eslintPlugin)(), (0,_src_webpack_plugins_define_plugin__WEBPACK_IMPORTED_MODULE_1__.definePlugin)(), (0,_src_webpack_plugins_clean_terminal_plugin__WEBPACK_IMPORTED_MODULE_0__.cleanTerminalPlugin)()],
    stats: {
      preset: 'errors-warnings',
      assets: true,
      timings: true
    },
    optimization: {
      minimize: (0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_6__.isProd)(),
      minimizer: [(0,_src_webpack_plugins_terser_plugin__WEBPACK_IMPORTED_MODULE_4__.terserPlugin)()]
    },
    externals: (ctx, cb) => {
      var _ctx$getResolve;

      const {
        request,
        context
      } = ctx;
      const resolver = (_ctx$getResolve = ctx.getResolve) === null || _ctx$getResolve === void 0 ? void 0 : _ctx$getResolve.call(ctx);

      if (!resolver) {
        return cb(new Error('No resolver when checking for externals'));
      }

      resolver(context ?? '', request ?? '').then(res => {
        if (!res.includes('/node_modules/')) {
          return cb();
        }

        (0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_6__.findPackageJson)(res).then(packageJson => {
          if (packageJson && packageJson['type'] === 'module') {
            return cb(undefined, `module ${request}`);
          }

          cb(undefined, `node-commonjs ${request}`);
        }).catch(() => cb(undefined, `node-commonjs ${request}`));
      }).catch(err => {
        if (!(request !== null && request !== void 0 && request.startsWith('node:'))) {
          console.log(String(err));
        }

        cb(undefined, `node-commonjs ${request}`);
      });
    },
    experiments: {
      backCompat: true
    }
  };
}

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cleanTerminalPlugin": () => (/* binding */ cleanTerminalPlugin)
/* harmony export */ });
class CleanTerminalPlugin {
  firstRun = true;

  apply(compiler) {
    this.firstRun = true;
    compiler.hooks.afterCompile.tap('CleanTerminalPlugin', () => {
      if (this.firstRun) {
        this.firstRun = false;
        return;
      }

      process.stdout.write('\u001B[2J\u001B[3J\u001B[H');
    });
  }

}

function cleanTerminalPlugin() {
  return new CleanTerminalPlugin();
}

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "definePlugin": () => (/* binding */ definePlugin)
/* harmony export */ });
/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_webpack_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
 // eslint-disable-line import/no-named-as-default


function definePlugin() {
  const envPrefix = 'MATTHIS_';
  const extraEnv = Object.fromEntries(Object.entries(process.env) // eslint-disable-line node/no-process-env
  .filter(([name]) => name.startsWith(envPrefix)).map(([name, value]) => [`process.env.${name.slice(envPrefix.length)}`, value]));
  return new (webpack__WEBPACK_IMPORTED_MODULE_0___default().DefinePlugin)({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'process.env.NODE_ENV': JSON.stringify((0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_1__.getEnv)()),
    ...extraEnv
  });
}

/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("webpack");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "findPackageJson": () => (/* binding */ findPackageJson),
/* harmony export */   "getDistDir": () => (/* binding */ getDistDir),
/* harmony export */   "getEnv": () => (/* binding */ getEnv),
/* harmony export */   "getProjectDir": () => (/* binding */ getProjectDir),
/* harmony export */   "isProd": () => (/* binding */ isProd),
/* harmony export */   "isSelenium": () => (/* binding */ isSelenium)
/* harmony export */ });
/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fs_promises__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_1__);


function isProd() {
  return process.env['NODE_ENV'] === 'production'; // eslint-disable-line node/no-process-env
}
function isSelenium() {
  return process.env['IS_SELENIUM'] === '1'; // eslint-disable-line node/no-process-env
}
function getEnv() {
  return isProd() ? 'production' : 'development';
}
function getProjectDir() {
  return (0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)((0,node_path__WEBPACK_IMPORTED_MODULE_1__.resolve)('.'));
}
function getDistDir() {
  return (0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(getProjectDir(), 'dist');
}
async function findPackageJson(p) {
  const pStat = await (0,node_fs_promises__WEBPACK_IMPORTED_MODULE_0__.stat)(p);

  if (pStat.isDirectory()) {
    const dir = await (0,node_fs_promises__WEBPACK_IMPORTED_MODULE_0__.readdir)(p);

    if (dir.includes('package.json')) {
      const fileContent = await (0,node_fs_promises__WEBPACK_IMPORTED_MODULE_0__.readFile)((0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(p, 'package.json'));
      return JSON.parse(fileContent.toString());
    }

    if (p === '/') {
      return undefined;
    }
  }

  return findPackageJson((0,node_path__WEBPACK_IMPORTED_MODULE_1__.resolve)(`${p}/..`));
}

/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:fs/promises");

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "eslintPlugin": () => (/* binding */ eslintPlugin)
/* harmony export */ });
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var chokidar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var chokidar__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(chokidar__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var eslint__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12);
/* harmony import */ var eslint__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(eslint__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(webpack__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _src_webpack_plugins_formatter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var _src_webpack_plugins_standalone_plugin__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(14);
/* harmony import */ var _src_webpack_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);








class EslintWebpackError extends webpack__WEBPACK_IMPORTED_MODULE_3__.WebpackError {
  name = 'EslintWebpackError';

  constructor(eslintRunId, filePath, message, loc) {
    super(message);
    this.eslintRunId = eslintRunId;
    this.file = filePath;

    if (loc) {
      this.loc = loc;
    }
  }

}

const RUN_ESLINT_INTERVAL = 500;

class EslintPlugin extends _src_webpack_plugins_standalone_plugin__WEBPACK_IMPORTED_MODULE_5__.StandalonePlugin {
  name = 'EslintPlugin';
  fileStates = new Map();

  setup(compiler) {
    this.runEslintInterval = setInterval(() => this.runEslint(), RUN_ESLINT_INTERVAL);
    this.watcher = (0,chokidar__WEBPACK_IMPORTED_MODULE_1__.watch)(['src/**/*.ts', 'src/**/*.tsx'].map(p => (0,node_path__WEBPACK_IMPORTED_MODULE_0__.join)((0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_6__.getProjectDir)(), p)));
    this.watcher.on('add', path => {
      this.fileStates.set(path, {
        status: 'queued'
      });
    }).on('change', path => {
      this.fileStates.set(path, {
        status: 'queued'
      });
    }).on('unlink', path => {
      this.fileStates.delete(path);
    }).on('ready', () => {
      this.runEslint();
    });
    compiler.hooks.compilation.tap(this.name, comp => {
      this.compilation = comp;
      this.syncErrorsAndWarnings();
    });
    compiler.hooks.afterCompile.tapPromise(this.name, async compilation => {
      if (!compilation.options.watch) {
        await this.awaitIdle();
      }
    });
  }

  runEslint() {
    const filesQueued = [...this.fileStates.entries()].filter(e => e[1].status === 'queued');

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

    const eslint = new eslint__WEBPACK_IMPORTED_MODULE_2__.ESLint({
      cwd: (0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_6__.getProjectDir)()
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
    }).catch(err => {
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
    }).finally(() => {
      this.syncErrorsAndWarnings();
      this.checkIdle();
    });
  }

  syncErrorsAndWarnings() {
    if (!this.compilation) {
      return;
    }

    this.compilation.warnings = [...this.compilation.warnings.filter(w => !('eslintRunId' in w)), ...[...this.fileStates.entries()].sort((e1, e2) => e1[0].localeCompare(e2[0])).flatMap(([filePath, fileState]) => {
      if (fileState.status === 'errored') {
        return [new EslintWebpackError(fileState.eslintRunId, filePath, `Failure to run ESLint (${String(fileState.err)}):\n${fileState.err instanceof Error ? fileState.err.stack : 'no stack'}`)];
      }

      if (fileState.status === 'failed') {
        return fileState.messages.map(msg => new EslintWebpackError(fileState.eslintRunId, filePath, (0,_src_webpack_plugins_formatter__WEBPACK_IMPORTED_MODULE_4__.stripAnsi)(msg.message), {
          start: {
            line: msg.line,
            column: msg.column
          },
          end: msg.endLine === undefined ? undefined : {
            line: msg.endLine,
            column: msg.endColumn
          }
        }));
      }

      return [];
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
/* 11 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("chokidar");

/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("eslint");

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "stripAnsi": () => (/* binding */ stripAnsi)
/* harmony export */ });
const ansiRegex = new RegExp(['[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)', '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))'].join('|'), 'gu');
const stripAnsi = s => s.replace(ansiRegex, '');

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StandalonePlugin": () => (/* binding */ StandalonePlugin)
/* harmony export */ });
class StandalonePlugin {
  apply(compiler) {
    compiler.hooks.initialize.tap(this.name, () => {
      this.setup(compiler);
    });
    compiler.hooks.shutdown.tapPromise(this.name, async () => this.exitHandlerAsync(compiler));
    process.on('beforeExit', () => this.exitHandler(compiler));
    process.on('exit', () => this.exitHandler(compiler));
    process.on('SIGTERM', () => this.exitHandler(compiler));
    process.on('SIGINT', () => this.exitHandler(compiler));
    process.on('uncaughtException', () => this.exitHandler(compiler));
  }

  hasExited = false;

  exitHandler(compiler) {
    if (this.hasExited) {
      return;
    }

    this.hasExited = true;
    this.teardown(compiler).catch(err => {
      console.error(`Error during teardown of plugin ${this.name}`);
      console.error(err);
    }) // eslint-disable-next-line node/no-process-exit
    .finally(() => process.exit(0));
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
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "forkTsCheckerPlugin": () => (/* binding */ forkTsCheckerPlugin)
/* harmony export */ });
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fork_ts_checker_webpack_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16);
/* harmony import */ var fork_ts_checker_webpack_plugin__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fork_ts_checker_webpack_plugin__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _src_webpack_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);



function forkTsCheckerPlugin() {
  return new (fork_ts_checker_webpack_plugin__WEBPACK_IMPORTED_MODULE_1___default())({
    typescript: {
      diagnosticOptions: {
        syntactic: true,
        semantic: true,
        declaration: true,
        global: true
      },
      mode: 'readonly',
      configFile: (0,node_path__WEBPACK_IMPORTED_MODULE_0__.join)((0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_2__.getProjectDir)(), 'tsconfig.json')
    },
    formatter: issue => {
      issue.severity = 'warning';
      return issue.message;
    },
    logger: {
      log: () => {},
      error: () => {}
    }
  });
}

/***/ }),
/* 16 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("fork-ts-checker-webpack-plugin");

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "terserPlugin": () => (/* binding */ terserPlugin)
/* harmony export */ });
/* harmony import */ var terser_webpack_plugin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18);
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
/* 18 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("terser-webpack-plugin");

/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tsconfigPathsPlugin": () => (/* binding */ tsconfigPathsPlugin)
/* harmony export */ });
/* harmony import */ var tsconfig_paths_webpack_plugin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20);
/* harmony import */ var tsconfig_paths_webpack_plugin__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tsconfig_paths_webpack_plugin__WEBPACK_IMPORTED_MODULE_0__);

function tsconfigPathsPlugin() {
  return new tsconfig_paths_webpack_plugin__WEBPACK_IMPORTED_MODULE_0__.TsconfigPathsPlugin({});
}

/***/ }),
/* 20 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("tsconfig-paths-webpack-plugin");

/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "babelLoaderWeb": () => (/* binding */ babelLoaderWeb)
/* harmony export */ });
/* harmony import */ var _babel_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);
/* harmony import */ var _babel_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_preset_env__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(23);
/* harmony import */ var _babel_preset_env__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_preset_env__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_preset_typescript__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(24);
/* harmony import */ var _babel_preset_typescript__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_preset_typescript__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var babel_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(25);
/* harmony import */ var babel_loader__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(babel_loader__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_preset_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(26);
/* harmony import */ var _babel_preset_react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_preset_react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var babel_plugin_react_remove_properties__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(27);
/* harmony import */ var babel_plugin_react_remove_properties__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(babel_plugin_react_remove_properties__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _src_webpack_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);
/* eslint-disable import/no-unassigned-import */







/* eslint-enable import/no-unassigned-import */

function babelLoaderWeb() {
  return {
    test: /\.tsx?$/u,
    exclude: /\/node_modules\//u,
    loader: 'babel-loader',
    options: {
      presets: [['@babel/preset-env', {
        targets: '> 10%',
        bugfixes: true,
        useBuiltIns: 'usage',
        corejs: {
          version: '3.10'
        }
      }], ['@babel/preset-react'], ['@babel/preset-typescript']],
      plugins: (0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_6__.isSelenium)() ? [] : [['react-remove-properties', {
        properties: ['data-test-id']
      }]]
    }
  };
}

/***/ }),
/* 22 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("@babel/core");

/***/ }),
/* 23 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("@babel/preset-env");

/***/ }),
/* 24 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("@babel/preset-typescript");

/***/ }),
/* 25 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("babel-loader");

/***/ }),
/* 26 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("@babel/preset-react");

/***/ }),
/* 27 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("babel-plugin-react-remove-properties");

/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sourceMapLoader": () => (/* binding */ sourceMapLoader)
/* harmony export */ });
/* harmony import */ var _babel_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);
/* harmony import */ var _babel_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_preset_env__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(23);
/* harmony import */ var _babel_preset_env__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_preset_env__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_preset_typescript__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(24);
/* harmony import */ var _babel_preset_typescript__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_preset_typescript__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var babel_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(25);
/* harmony import */ var babel_loader__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(babel_loader__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var source_map_loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(29);
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
/* 29 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("source-map-loader");

/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "htmlPlugin": () => (/* binding */ htmlPlugin)
/* harmony export */ });
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var html_webpack_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(31);
/* harmony import */ var html_webpack_plugin__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(html_webpack_plugin__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _src_webpack_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);



function htmlPlugin() {
  return new (html_webpack_plugin__WEBPACK_IMPORTED_MODULE_1___default())({
    template: (0,node_path__WEBPACK_IMPORTED_MODULE_0__.join)((0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_2__.getProjectDir)(), 'src/index.html'),
    minify: (0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_2__.isProd)()
  });
}

/***/ }),
/* 31 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("html-webpack-plugin");

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
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _configs_web_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
 // eslint-disable-next-line import/no-default-export

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_configs_web_config__WEBPACK_IMPORTED_MODULE_0__.webConfig)());
})();

var __webpack_exports__default = __webpack_exports__["default"];
export { __webpack_exports__default as default };
