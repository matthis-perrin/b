/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
import { createRequire as __WEBPACK_EXTERNAL_createRequire } from "module";
/******/ var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"config\": () => (/* binding */ config)\n/* harmony export */ });\n/* harmony import */ var _src_webpack_configs_web_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);\n\nfunction config(opts) {\n  return (0,_src_webpack_configs_web_config__WEBPACK_IMPORTED_MODULE_0__.webConfig)(opts);\n}\n\n//# sourceURL=webpack://b/./src/webpack/web.ts?");

/***/ }),
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"webConfig\": () => (/* binding */ webConfig)\n/* harmony export */ });\n/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);\n/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _src_webpack_configs_base_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);\n/* harmony import */ var _src_webpack_loaders_babel_loader_web__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(26);\n/* harmony import */ var _src_webpack_loaders_source_map_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(33);\n/* harmony import */ var _src_webpack_plugins_html_plugin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(35);\n/* harmony import */ var _src_webpack_plugins_webpack_dev_server__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(37);\n\n\n\n\n\n\nfunction webConfig(opts) {\n  const {\n    context,\n    watch\n  } = opts;\n  const base = (0,_src_webpack_configs_base_config__WEBPACK_IMPORTED_MODULE_1__.baseConfig)({\n    context,\n    watch\n  });\n  return {\n    ...base,\n    target: 'web',\n    entry: {\n      main: (0,node_path__WEBPACK_IMPORTED_MODULE_0__.join)(context, 'src/index.tsx')\n    },\n    output: {\n      path: (0,node_path__WEBPACK_IMPORTED_MODULE_0__.join)(context, 'dist'),\n      filename: `[name].[contenthash].js`,\n      clean: true,\n      publicPath: '/'\n    },\n    module: {\n      rules: [(0,_src_webpack_loaders_babel_loader_web__WEBPACK_IMPORTED_MODULE_2__.babelLoaderWeb)(), (0,_src_webpack_loaders_source_map_loader__WEBPACK_IMPORTED_MODULE_3__.sourceMapLoader)()]\n    },\n    plugins: [...(base.plugins ?? []), (0,_src_webpack_plugins_html_plugin__WEBPACK_IMPORTED_MODULE_4__.htmlPlugin)(context)],\n    devServer: watch ? (0,_src_webpack_plugins_webpack_dev_server__WEBPACK_IMPORTED_MODULE_5__.webpackDevServer)(context) : undefined,\n    optimization: {\n      ...base.optimization,\n      splitChunks: {\n        cacheGroups: {\n          vendor: {\n            test: /[/\\\\]node_modules[/\\\\]/u,\n            chunks: 'initial',\n            name: 'vendor',\n            enforce: true\n          }\n        }\n      }\n    }\n  };\n}\n\n//# sourceURL=webpack://b/./src/webpack/configs/web_config.ts?");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:path");

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"baseConfig\": () => (/* binding */ baseConfig)\n/* harmony export */ });\n/* harmony import */ var _src_webpack_plugins_define_plugin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);\n/* harmony import */ var _src_webpack_plugins_eslint_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);\n/* harmony import */ var _src_webpack_plugins_fork_ts_checker_plugin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(20);\n/* harmony import */ var _src_webpack_plugins_terser_plugin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(22);\n/* harmony import */ var _src_webpack_plugins_ts_config_alias__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(24);\n/* harmony import */ var _src_webpack_plugins_yarn_plugin__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(25);\n/* harmony import */ var _src_webpack_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6);\n\n\n\n\n\n\n\nfunction baseConfig(opts) {\n  const {\n    context\n  } = opts;\n  return {\n    mode: 'none',\n    context,\n    entry: {},\n    devtool: (0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_6__.isProd)() ? 'source-map' : 'eval',\n    resolve: {\n      extensions: ['.js', '.jsx', '.ts', '.tsx'],\n      alias: (0,_src_webpack_plugins_ts_config_alias__WEBPACK_IMPORTED_MODULE_4__.getTsConfigAlias)(context)\n    },\n    plugins: [new _src_webpack_plugins_yarn_plugin__WEBPACK_IMPORTED_MODULE_5__.YarnPlugin(), (0,_src_webpack_plugins_fork_ts_checker_plugin__WEBPACK_IMPORTED_MODULE_2__.forkTsCheckerPlugin)(context), (0,_src_webpack_plugins_eslint_plugin__WEBPACK_IMPORTED_MODULE_1__.eslintPlugin)(), (0,_src_webpack_plugins_define_plugin__WEBPACK_IMPORTED_MODULE_0__.definePlugin)()],\n    stats: false,\n    infrastructureLogging: {\n      level: 'error'\n    },\n    optimization: {\n      minimize: (0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_6__.isProd)(),\n      minimizer: [(0,_src_webpack_plugins_terser_plugin__WEBPACK_IMPORTED_MODULE_3__.terserPlugin)()]\n    },\n    experiments: {\n      backCompat: true\n    }\n  };\n}\n\n//# sourceURL=webpack://b/./src/webpack/configs/base_config.ts?");

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"definePlugin\": () => (/* binding */ definePlugin)\n/* harmony export */ });\n/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);\n/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _src_webpack_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);\n // eslint-disable-line import/no-named-as-default\n\n\nfunction definePlugin() {\n  const envPrefix = 'MATTHIS_';\n  const extraEnv = Object.fromEntries(Object.entries(process.env) // eslint-disable-line node/no-process-env\n  .filter(([name]) => name.startsWith(envPrefix)).map(([name, value]) => [String(name.slice(envPrefix.length)), JSON.stringify(value)]));\n  return new (webpack__WEBPACK_IMPORTED_MODULE_0___default().DefinePlugin)({\n    /* eslint-disable @typescript-eslint/naming-convention */\n    NODE_ENV: JSON.stringify((0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_1__.getEnv)()),\n    'process.env.NODE_ENV': JSON.stringify((0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_1__.getEnv)()),\n    /* eslint-enable @typescript-eslint/naming-convention */\n    ...extraEnv\n  });\n}\n\n//# sourceURL=webpack://b/./src/webpack/plugins/define_plugin.ts?");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("webpack");

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"findPackageJson\": () => (/* binding */ findPackageJson),\n/* harmony export */   \"getEnv\": () => (/* binding */ getEnv),\n/* harmony export */   \"getPort\": () => (/* binding */ getPort),\n/* harmony export */   \"initLogFile\": () => (/* binding */ initLogFile),\n/* harmony export */   \"isProd\": () => (/* binding */ isProd),\n/* harmony export */   \"isSelenium\": () => (/* binding */ isSelenium)\n/* harmony export */ });\n/* harmony import */ var node_crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);\n/* harmony import */ var node_crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_crypto__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);\n/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_fs_promises__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);\n/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _src_fs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);\n\n\n\n\nfunction isProd() {\n  return process.env['NODE_ENV'] === 'production'; // eslint-disable-line node/no-process-env\n}\n\nfunction isSelenium() {\n  return process.env['IS_SELENIUM'] === '1'; // eslint-disable-line node/no-process-env\n}\n\nfunction getEnv() {\n  return isProd() ? 'production' : 'development';\n}\nconst packageJsonCache = new Map();\nasync function findPackageJson(p) {\n  if (packageJsonCache.has(p)) {\n    return packageJsonCache.get(p);\n  }\n  try {\n    const pStat = await (0,node_fs_promises__WEBPACK_IMPORTED_MODULE_1__.stat)(p);\n    if (pStat.isDirectory()) {\n      const dir = await (0,node_fs_promises__WEBPACK_IMPORTED_MODULE_1__.readdir)(p);\n      if (dir.includes('package.json')) {\n        const fileContent = await (0,node_fs_promises__WEBPACK_IMPORTED_MODULE_1__.readFile)((0,node_path__WEBPACK_IMPORTED_MODULE_2__.join)(p, 'package.json'));\n        const json = JSON.parse(fileContent.toString());\n        packageJsonCache.set(p, json);\n        return json;\n      }\n      if (p === '/') {\n        return undefined;\n      }\n    }\n    const res = await findPackageJson((0,node_path__WEBPACK_IMPORTED_MODULE_2__.resolve)(`${p}/..`));\n    packageJsonCache.set(p, res);\n    return res;\n  } catch (err) {\n    console.log('findPackageJson');\n    console.log(err);\n    packageJsonCache.set(p, undefined);\n    return undefined;\n  }\n}\nfunction getPort(context) {\n  // eslint-disable-next-line @typescript-eslint/no-magic-numbers\n  const hexHash = (0,node_crypto__WEBPACK_IMPORTED_MODULE_0__.createHash)('md5').update(context).digest('hex').slice(0, 4);\n  const port = 1024 + Math.floor(parseInt(hexHash, 16) / 2);\n  return port;\n}\nasync function initLogFile(context, logFileName) {\n  // Find the root of the project and create the log dir there\n  try {\n    const root = await lookupRoot(context);\n    const logDir = (0,node_path__WEBPACK_IMPORTED_MODULE_2__.join)(root, 'log');\n    await (0,_src_fs__WEBPACK_IMPORTED_MODULE_3__.rmDir)(logDir);\n    await (0,node_fs_promises__WEBPACK_IMPORTED_MODULE_1__.mkdir)(logDir, {\n      recursive: true\n    });\n    const logFile = (0,node_path__WEBPACK_IMPORTED_MODULE_2__.join)(logDir, logFileName);\n    if (await (0,_src_fs__WEBPACK_IMPORTED_MODULE_3__.exists)(logFile)) {\n      await (0,node_fs_promises__WEBPACK_IMPORTED_MODULE_1__.rm)(logFile);\n    }\n    return logFile;\n  } catch {\n    throw new Error(`Failure to identify project root from ${context}`);\n  }\n}\nasync function lookupRoot(fromPath) {\n  if (await (0,_src_fs__WEBPACK_IMPORTED_MODULE_3__.exists)((0,node_path__WEBPACK_IMPORTED_MODULE_2__.join)(fromPath, 'package.json'))) {\n    return fromPath;\n  }\n  const parent = (0,node_path__WEBPACK_IMPORTED_MODULE_2__.join)(fromPath, '..');\n  if (parent === fromPath) {\n    throw new Error('Failure to lookup root');\n  }\n  return lookupRoot(parent);\n}\n\n//# sourceURL=webpack://b/./src/webpack/utils.ts?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"access\": () => (/* binding */ access),\n/* harmony export */   \"cleanDir\": () => (/* binding */ cleanDir),\n/* harmony export */   \"cp\": () => (/* binding */ cp),\n/* harmony export */   \"exists\": () => (/* binding */ exists),\n/* harmony export */   \"listFiles\": () => (/* binding */ listFiles),\n/* harmony export */   \"maybeReadFile\": () => (/* binding */ maybeReadFile),\n/* harmony export */   \"readFile\": () => (/* binding */ readFile),\n/* harmony export */   \"readdir\": () => (/* binding */ readdir),\n/* harmony export */   \"rmDir\": () => (/* binding */ rmDir),\n/* harmony export */   \"stat\": () => (/* binding */ stat),\n/* harmony export */   \"writeJsFile\": () => (/* binding */ writeJsFile),\n/* harmony export */   \"writeJsonFile\": () => (/* binding */ writeJsonFile),\n/* harmony export */   \"writeRawFile\": () => (/* binding */ writeRawFile),\n/* harmony export */   \"writeTsFile\": () => (/* binding */ writeTsFile)\n/* harmony export */ });\n/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);\n/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_child_process__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);\n/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);\n/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var prettier__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12);\n/* harmony import */ var prettier__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prettier__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nconst {\n  access,\n  readFile,\n  readdir,\n  stat\n} = node_fs__WEBPACK_IMPORTED_MODULE_1__.promises;\nconst {\n  writeFile,\n  mkdir,\n  rm\n} = node_fs__WEBPACK_IMPORTED_MODULE_1__.promises;\nasync function writeJsonFile(path, json) {\n  await writeRawFile(path, `${JSON.stringify(json, undefined, 2)}\\n`);\n}\nasync function writePrettyFile(parser, path, code) {\n  await writeRawFile(path, (0,prettier__WEBPACK_IMPORTED_MODULE_3__.format)(code, {\n    parser,\n    printWidth: 100,\n    singleQuote: true,\n    trailingComma: 'es5',\n    bracketSpacing: false,\n    arrowParens: 'avoid',\n    endOfLine: 'auto'\n  }));\n}\nasync function writeJsFile(path, js) {\n  return writePrettyFile('babel', path, js);\n}\nasync function writeTsFile(path, ts) {\n  return writePrettyFile('typescript', path, ts);\n}\nasync function writeRawFile(path, content) {\n  console.log(`write ${path}`);\n  await mkdir((0,node_path__WEBPACK_IMPORTED_MODULE_2__.dirname)(path), {\n    recursive: true\n  });\n  await writeFile(path, content);\n}\nasync function rmDir(dirPath) {\n  await rm(dirPath, {\n    recursive: true,\n    force: true\n  });\n}\nasync function cleanDir(dirPath) {\n  console.log('clean', dirPath);\n  try {\n    await rmDir(dirPath);\n  } finally {\n    await mkdir(dirPath, {\n      recursive: true\n    });\n  }\n}\nasync function cp(from, to) {\n  return new Promise((resolve, reject) => {\n    (0,node_child_process__WEBPACK_IMPORTED_MODULE_0__.exec)(`cp -R ${from} ${to}`, err => err ? reject(err) : resolve());\n  });\n}\nasync function exists(path) {\n  try {\n    await access(path);\n    return true;\n  } catch {\n    return false;\n  }\n}\nasync function maybeReadFile(path) {\n  try {\n    const fileContent = await readFile(path);\n    return fileContent.toString();\n  } catch {\n    return undefined;\n  }\n}\nasync function listFiles(path) {\n  const files = [];\n  const ents = await readdir(path, {\n    withFileTypes: true\n  });\n  const promises = [];\n  for (const ent of ents) {\n    const entPath = (0,node_path__WEBPACK_IMPORTED_MODULE_2__.join)(path, ent.name);\n    if (ent.isDirectory()) {\n      promises.push(listFiles(entPath).then(subFiles => {\n        files.push(...subFiles);\n      }));\n    } else if (ent.isFile()) {\n      files.push(entPath);\n    }\n  }\n  await Promise.all(promises);\n  return files;\n}\n\n//# sourceURL=webpack://b/./src/fs.ts?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"EslintWebpackError\": () => (/* binding */ EslintWebpackError),\n/* harmony export */   \"eslintPlugin\": () => (/* binding */ eslintPlugin)\n/* harmony export */ });\n/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);\n/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var chokidar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14);\n/* harmony import */ var chokidar__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(chokidar__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var eslint__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(15);\n/* harmony import */ var eslint__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(eslint__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);\n/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(webpack__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _src_webpack_plugins_formatter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(16);\n/* harmony import */ var _src_webpack_plugins_standalone_plugin__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(17);\n\n\n\n\n\n\nclass EslintWebpackError extends webpack__WEBPACK_IMPORTED_MODULE_3__.WebpackError {\n  name = 'EslintWebpackError';\n  constructor(eslintRunId, message, filePath, loc, ruleId) {\n    super(message);\n    this.eslintRunId = eslintRunId;\n    this.ruleId = ruleId;\n    if (filePath !== undefined) {\n      this.file = filePath;\n    }\n    if (loc) {\n      this.loc = loc;\n    }\n  }\n}\nconst RUN_ESLINT_INTERVAL = 500;\nclass EslintPlugin extends _src_webpack_plugins_standalone_plugin__WEBPACK_IMPORTED_MODULE_5__.StandalonePlugin {\n  name = 'EslintPlugin';\n  fileStates = new Map();\n  async setup(compiler) {\n    return new Promise(resolve => {\n      this.runEslintInterval = setInterval(() => this.runEslint(), RUN_ESLINT_INTERVAL);\n      this.watcher = (0,chokidar__WEBPACK_IMPORTED_MODULE_1__.watch)(['src/**/*.ts', 'src/**/*.tsx'].map(p => (0,node_path__WEBPACK_IMPORTED_MODULE_0__.join)(this.context, p)));\n      this.watcher.on('add', path => {\n        this.fileStates.set(path, {\n          status: 'queued'\n        });\n      }).on('change', path => {\n        this.fileStates.set(path, {\n          status: 'queued'\n        });\n      }).on('unlink', path => {\n        this.fileStates.delete(path);\n      }).on('ready', () => {\n        this.runEslint();\n        resolve();\n      });\n      compiler.hooks.compilation.tap(this.name, comp => {\n        this.compilation = comp;\n        this.syncErrorsAndWarnings();\n      });\n      compiler.hooks.afterCompile.tapAsync(this.name, (compilation, cb) => {\n        setTimeout(() => {\n          this.awaitIdle().finally(cb);\n        }, RUN_ESLINT_INTERVAL);\n      });\n    });\n  }\n  runEslint() {\n    const filesQueued = [...this.fileStates.entries()].filter(e => e[1].status === 'queued');\n    if (filesQueued.length === 0) {\n      return;\n    }\n    const eslintRunId = Math.random();\n    for (const [filePath] of filesQueued) {\n      this.fileStates.set(filePath, {\n        status: 'in-progress',\n        eslintRunId\n      });\n    }\n    const handleError = err => {\n      for (const [filePath] of filesQueued) {\n        const currentState = this.fileStates.get(filePath);\n        if (!currentState || currentState.status !== 'in-progress' || currentState.eslintRunId !== eslintRunId) {\n          continue;\n        }\n        this.fileStates.set(filePath, {\n          status: 'errored',\n          eslintRunId,\n          err\n        });\n      }\n    };\n    try {\n      const tsConfigPath = (0,node_path__WEBPACK_IMPORTED_MODULE_0__.join)(this.context, 'tsconfig.json');\n      const eslint = new eslint__WEBPACK_IMPORTED_MODULE_2__.ESLint({\n        cwd: this.context,\n        overrideConfig: {\n          settings: {\n            // eslint-disable-next-line @typescript-eslint/naming-convention\n            'import/resolver': {\n              typescript: {\n                project: tsConfigPath\n              }\n            }\n          },\n          parserOptions: {\n            project: tsConfigPath\n          }\n        }\n      });\n      eslint.lintFiles(filesQueued.map(e => e[0])).then(results => {\n        for (const result of results) {\n          const currentState = this.fileStates.get(result.filePath);\n          if (!currentState || currentState.status !== 'in-progress' || currentState.eslintRunId !== eslintRunId) {\n            continue;\n          }\n          if (result.messages.length > 0) {\n            this.fileStates.set(result.filePath, {\n              status: 'failed',\n              eslintRunId,\n              messages: result.messages\n            });\n          } else {\n            this.fileStates.set(result.filePath, {\n              status: 'success',\n              eslintRunId\n            });\n          }\n        }\n      }).catch(handleError).finally(() => {\n        this.syncErrorsAndWarnings();\n        this.checkIdle();\n      });\n    } catch (err) {\n      handleError(err);\n      this.syncErrorsAndWarnings();\n      this.checkIdle();\n    }\n  }\n  syncErrorsAndWarnings() {\n    if (!this.compilation) {\n      return;\n    }\n\n    // Errors\n    let eslintError;\n    for (const fileState of this.fileStates.values()) {\n      if (fileState.status === 'errored') {\n        eslintError = new EslintWebpackError(fileState.eslintRunId, `Failure to run ESLint:\\n${fileState.err instanceof Error ? fileState.err.stack : String(fileState.err)}`);\n      }\n    }\n    this.compilation.errors = [...this.compilation.errors.filter(w => !('eslintRunId' in w)), ...(eslintError ? [eslintError] : [])];\n\n    // Warnings\n    this.compilation.warnings = [...this.compilation.warnings.filter(w => !('eslintRunId' in w)), ...[...this.fileStates.entries()].sort((e1, e2) => e1[0].localeCompare(e2[0])).flatMap(([filePath, fileState]) => {\n      if (fileState.status !== 'failed') {\n        return [];\n      }\n      return fileState.messages.map(msg => new EslintWebpackError(fileState.eslintRunId, (0,_src_webpack_plugins_formatter__WEBPACK_IMPORTED_MODULE_4__.stripAnsi)(msg.message), filePath, {\n        start: {\n          line: msg.line,\n          column: msg.column\n        },\n        end: msg.endLine === undefined ? undefined : {\n          line: msg.endLine,\n          column: msg.endColumn\n        }\n      }, msg.ruleId ?? undefined));\n    })];\n  }\n  checkIdle() {\n    if (!this.resolveAwaitIdlePromise) {\n      return;\n    }\n    for (const state of this.fileStates.values()) {\n      if (state.status === 'queued' || state.status === 'in-progress') {\n        return;\n      }\n    }\n    this.resolveAwaitIdlePromise();\n  }\n  async awaitIdle() {\n    return new Promise(resolve => {\n      this.resolveAwaitIdlePromise = resolve;\n      this.checkIdle();\n    });\n  }\n  async teardown() {\n    var _this$watcher;\n    clearInterval(this.runEslintInterval);\n    await ((_this$watcher = this.watcher) === null || _this$watcher === void 0 ? void 0 : _this$watcher.close());\n  }\n}\nfunction eslintPlugin() {\n  return new EslintPlugin();\n}\n\n//# sourceURL=webpack://b/./src/webpack/plugins/eslint_plugin.ts?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"stripAnsi\": () => (/* binding */ stripAnsi)\n/* harmony export */ });\nconst ansiRegex = new RegExp(['[\\\\u001B\\\\u009B][[\\\\]()#;?]*(?:(?:(?:[a-zA-Z\\\\d]*(?:;[-a-zA-Z\\\\d\\\\/#&.:=?%@~_]*)*)?\\\\u0007)', '(?:(?:\\\\d{1,4}(?:;\\\\d{0,4})*)?[\\\\dA-PR-TZcf-ntqry=><~]))'].join('|'), 'gu');\nconst stripAnsi = s => s.replace(ansiRegex, '');\n\n//# sourceURL=webpack://b/./src/webpack/plugins/formatter.ts?");

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"StandalonePlugin\": () => (/* binding */ StandalonePlugin)\n/* harmony export */ });\n/* harmony import */ var _src_exit_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18);\n/* harmony import */ var _src_global_error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);\n\n\nclass StandalonePlugin {\n  context = process.cwd();\n\n  // INITIALIZE\n\n  apply(compiler) {\n    this.context = compiler.context;\n    compiler.hooks.beforeRun.tapPromise(this.name, async () => this.setupHandler(compiler));\n    compiler.hooks.watchRun.tapPromise(this.name, async () => this.setupHandler(compiler));\n    compiler.hooks.shutdown.tapPromise(this.name, async () => this.exitHandlerAsync(compiler));\n    (0,_src_exit_handler__WEBPACK_IMPORTED_MODULE_0__.registerExitCallback)(() => this.exitHandler(compiler));\n  }\n  // SETUP\n\n  hasStarted = false;\n  async setupHandler(compiler) {\n    if (this.hasStarted) {\n      return;\n    }\n    this.hasStarted = true;\n    await this.setup(compiler);\n  }\n\n  // EXIT\n\n  hasExited = false;\n  exitHandler(compiler) {\n    if (this.hasExited) {\n      return;\n    }\n    this.hasExited = true;\n    Promise.resolve(this.teardown(compiler)).catch(err => {\n      (0,_src_global_error__WEBPACK_IMPORTED_MODULE_1__.globalError)(`Error during teardown of plugin ${this.name}`, err);\n    });\n  }\n  async exitHandlerAsync(compiler) {\n    if (this.hasExited) {\n      return;\n    }\n    this.hasExited = true;\n    await this.teardown(compiler);\n  }\n}\n\n//# sourceURL=webpack://b/./src/webpack/plugins/standalone_plugin.ts?");

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"registerExitCallback\": () => (/* binding */ registerExitCallback)\n/* harmony export */ });\n/* harmony import */ var _src_global_error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);\n\nlet called = false;\nconst callbacks = [];\nfunction runCallbacks() {\n  if (called) {\n    return;\n  }\n  called = true;\n  for (const fn of callbacks) {\n    Promise.resolve(fn()).catch(err => (0,_src_global_error__WEBPACK_IMPORTED_MODULE_0__.globalError)('Failure to run exit cleanup callback', err));\n  }\n}\nprocess.on('beforeExit', () => runCallbacks());\nprocess.on('exit', () => runCallbacks());\nprocess.on('SIGTERM', () => runCallbacks());\nprocess.on('SIGINT', () => runCallbacks());\nprocess.on('uncaughtException', err => {\n  (0,_src_global_error__WEBPACK_IMPORTED_MODULE_0__.globalError)('uncaughtException', err);\n  runCallbacks();\n});\nfunction registerExitCallback(cb) {\n  callbacks.push(cb);\n}\n\n//# sourceURL=webpack://b/./src/exit_handler.ts?");

/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"globalError\": () => (/* binding */ globalError)\n/* harmony export */ });\n/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);\n/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction globalError(...val) {\n  for (const data of val) {\n    try {\n      const str = typeof data === 'string' ? data : data instanceof Error ? data.stack ?? String(data) : JSON.stringify(data);\n      console.error(str);\n      (0,node_fs__WEBPACK_IMPORTED_MODULE_0__.appendFileSync)('error.log', str);\n    } catch {\n      console.error(String(val));\n      (0,node_fs__WEBPACK_IMPORTED_MODULE_0__.appendFileSync)('error.log', String(val));\n    }\n  }\n}\n\n//# sourceURL=webpack://b/./src/global_error.ts?");

/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"forkTsCheckerPlugin\": () => (/* binding */ forkTsCheckerPlugin)\n/* harmony export */ });\n/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);\n/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var fork_ts_checker_webpack_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(21);\n/* harmony import */ var fork_ts_checker_webpack_plugin__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fork_ts_checker_webpack_plugin__WEBPACK_IMPORTED_MODULE_1__);\n\n\nfunction forkTsCheckerPlugin(context) {\n  return new (fork_ts_checker_webpack_plugin__WEBPACK_IMPORTED_MODULE_1___default())({\n    typescript: {\n      diagnosticOptions: {\n        syntactic: true,\n        semantic: true,\n        declaration: true,\n        global: true\n      },\n      mode: 'readonly',\n      configFile: (0,node_path__WEBPACK_IMPORTED_MODULE_0__.join)(context, 'tsconfig.json')\n    },\n    formatter: 'basic',\n    logger: {\n      log: () => {},\n      error: () => {}\n    }\n  });\n}\n\n//# sourceURL=webpack://b/./src/webpack/plugins/fork_ts_checker_plugin.ts?");

/***/ }),
/* 21 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("fork-ts-checker-webpack-plugin");

/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"terserPlugin\": () => (/* binding */ terserPlugin)\n/* harmony export */ });\n/* harmony import */ var terser_webpack_plugin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23);\n/* harmony import */ var terser_webpack_plugin__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(terser_webpack_plugin__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction terserPlugin() {\n  return new (terser_webpack_plugin__WEBPACK_IMPORTED_MODULE_0___default())({\n    terserOptions: {\n      format: {\n        comments: false\n      }\n    },\n    extractComments: false\n  });\n}\n\n//# sourceURL=webpack://b/./src/webpack/plugins/terser_plugin.ts?");

/***/ }),
/* 23 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("terser-webpack-plugin");

/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getTsConfigAlias\": () => (/* binding */ getTsConfigAlias)\n/* harmony export */ });\n/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);\n/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);\n/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_1__);\n\n\nfunction loadConfig(path) {\n  const config = JSON.parse((0,node_fs__WEBPACK_IMPORTED_MODULE_0__.readFileSync)(path).toString());\n  if (typeof config.extends !== 'string') {\n    return config;\n  }\n  let extendConfig = {};\n  let dir = (0,node_path__WEBPACK_IMPORTED_MODULE_1__.dirname)(path);\n  const extendPath = config.extends + (config.extends.endsWith('.json') ? '' : '.json');\n  if (extendPath.startsWith('./')) {\n    extendConfig = loadConfig((0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(dir, extendPath));\n  } else {\n    while (true) {\n      const pathToTry = (0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(dir, 'node_modules', extendPath);\n      if ((0,node_fs__WEBPACK_IMPORTED_MODULE_0__.existsSync)(pathToTry)) {\n        extendConfig = loadConfig(pathToTry);\n        break;\n      }\n      const newDir = (0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(dir, '..');\n      if (newDir === dir) {\n        break;\n      }\n      dir = newDir;\n    }\n  }\n  delete config.extends;\n  return {\n    ...extendConfig,\n    ...config,\n    compilerOptions: {\n      ...extendConfig.compilerOptions,\n      ...config.compilerOptions\n    }\n  };\n}\nfunction getTsConfigAlias(context) {\n  const tsconfigPath = (0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(context, 'tsconfig.json');\n  const {\n    paths = {}\n  } = loadConfig(tsconfigPath)['compilerOptions'] ?? {};\n  const alias = {};\n  for (const item of Object.keys(paths)) {\n    var _paths$item;\n    const key = item.replace('/*', '');\n    const value = ((_paths$item = paths[item]) === null || _paths$item === void 0 ? void 0 : _paths$item.map(v => (0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(context, v.replace('/*', '').replace('*', '')))) ?? [];\n    alias[key] = value;\n  }\n  return alias;\n}\n\n//# sourceURL=webpack://b/./src/webpack/plugins/ts_config_alias.ts?");

/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"YarnPlugin\": () => (/* binding */ YarnPlugin)\n/* harmony export */ });\n/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);\n/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_child_process__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);\n/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);\n/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nclass YarnPlugin {\n  apply(compiler) {\n    compiler.hooks.beforeRun.tapAsync('YarnPlugin', (compiler, cb) => {\n      const command = ['yarn', 'install', '--audit', '--check-files', '--ignore-optional', '--non-interactive'].join(' ');\n      (0,node_child_process__WEBPACK_IMPORTED_MODULE_0__.exec)(command, {\n        cwd: compiler.context\n      }, (error, stdout, stderr) => {\n        if (error) {\n          console.error(`Yarn failed in ${compiler.context}`);\n          cb(error);\n          return;\n        }\n        const warnings = stderr.split('\\n').filter(l => l.trim().length > 0);\n        if (warnings.length > 0) {\n          (0,node_fs__WEBPACK_IMPORTED_MODULE_1__.appendFileSync)((0,node_path__WEBPACK_IMPORTED_MODULE_2__.join)(compiler.context, `.yarn-warnings.log`), stderr);\n        }\n        cb();\n      });\n    });\n  }\n}\n\n//# sourceURL=webpack://b/./src/webpack/plugins/yarn_plugin.ts?");

/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"babelLoaderWeb\": () => (/* binding */ babelLoaderWeb)\n/* harmony export */ });\n/* harmony import */ var _babel_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(27);\n/* harmony import */ var _babel_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_core__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_preset_env__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(28);\n/* harmony import */ var _babel_preset_env__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_preset_env__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_preset_typescript__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(29);\n/* harmony import */ var _babel_preset_typescript__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_preset_typescript__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var babel_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(30);\n/* harmony import */ var babel_loader__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(babel_loader__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _babel_preset_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(31);\n/* harmony import */ var _babel_preset_react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_preset_react__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var babel_plugin_react_remove_properties__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(32);\n/* harmony import */ var babel_plugin_react_remove_properties__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(babel_plugin_react_remove_properties__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _src_webpack_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6);\n/* eslint-disable import/no-unassigned-import */\n\n\n\n\n\n\n\n/* eslint-enable import/no-unassigned-import */\n\nfunction babelLoaderWeb() {\n  return {\n    test: /\\.tsx?$/u,\n    exclude: /\\/node_modules\\//u,\n    loader: 'babel-loader',\n    options: {\n      presets: [['@babel/preset-env', {\n        targets: '> 10%',\n        bugfixes: true,\n        useBuiltIns: 'usage',\n        corejs: {\n          version: '3.10'\n        }\n      }], ['@babel/preset-react'], ['@babel/preset-typescript']],\n      plugins: (0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_6__.isSelenium)() ? [] : [['react-remove-properties', {\n        properties: ['data-test-id']\n      }]]\n    }\n  };\n}\n\n//# sourceURL=webpack://b/./src/webpack/loaders/babel_loader_web.ts?");

/***/ }),
/* 27 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("@babel/core");

/***/ }),
/* 28 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("@babel/preset-env");

/***/ }),
/* 29 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("@babel/preset-typescript");

/***/ }),
/* 30 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("babel-loader");

/***/ }),
/* 31 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("@babel/preset-react");

/***/ }),
/* 32 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("babel-plugin-react-remove-properties");

/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"sourceMapLoader\": () => (/* binding */ sourceMapLoader)\n/* harmony export */ });\n/* harmony import */ var _babel_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(27);\n/* harmony import */ var _babel_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_core__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_preset_env__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(28);\n/* harmony import */ var _babel_preset_env__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_preset_env__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_preset_typescript__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(29);\n/* harmony import */ var _babel_preset_typescript__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_preset_typescript__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var babel_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(30);\n/* harmony import */ var babel_loader__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(babel_loader__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var source_map_loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(34);\n/* harmony import */ var source_map_loader__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(source_map_loader__WEBPACK_IMPORTED_MODULE_4__);\n/* eslint-disable import/no-unassigned-import */\n\n\n\n\n\n/* eslint-enable import/no-unassigned-import */\n\nfunction sourceMapLoader() {\n  return {\n    test: /\\.js$/u,\n    use: ['source-map-loader'],\n    enforce: 'pre'\n  };\n}\n\n//# sourceURL=webpack://b/./src/webpack/loaders/source_map_loader.ts?");

/***/ }),
/* 34 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("source-map-loader");

/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"htmlPlugin\": () => (/* binding */ htmlPlugin)\n/* harmony export */ });\n/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);\n/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var html_webpack_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(36);\n/* harmony import */ var html_webpack_plugin__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(html_webpack_plugin__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _src_webpack_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);\n\n\n\nfunction htmlPlugin(context) {\n  return new (html_webpack_plugin__WEBPACK_IMPORTED_MODULE_1___default())({\n    template: (0,node_path__WEBPACK_IMPORTED_MODULE_0__.join)(context, 'src/index.html'),\n    minify: (0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_2__.isProd)()\n  });\n}\n\n//# sourceURL=webpack://b/./src/webpack/plugins/html_plugin.ts?");

/***/ }),
/* 36 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("html-webpack-plugin");

/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"webpackDevServer\": () => (/* binding */ webpackDevServer)\n/* harmony export */ });\n/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);\n/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);\n/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _src_webpack_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);\n\n\n\nfunction webpackDevServer(context) {\n  const port = (0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_2__.getPort)(context);\n  let logFile;\n  let logsSaved = [];\n  (0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_2__.initLogFile)(context, 'webpack_dev_server.txt').then(file => {\n    logFile = file;\n    for (const logEvent of logsSaved) {\n      log(logEvent);\n    }\n    logsSaved = [];\n  }).catch(console.error);\n  function log(event) {\n    if (logFile === undefined) {\n      logsSaved.push(event);\n    } else {\n      (0,node_fs__WEBPACK_IMPORTED_MODULE_0__.appendFileSync)(logFile, `${JSON.stringify({\n        t: new Date().toISOString(),\n        ...event\n      })}\\n`);\n    }\n  }\n  return {\n    static: (0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(context, 'dist'),\n    compress: true,\n    hot: true,\n    port,\n    client: {\n      logging: 'none',\n      overlay: false\n    },\n    devMiddleware: {\n      writeToDisk: true\n    },\n    onListening: () => log({\n      event: 'start',\n      port\n    })\n  };\n}\n\n//# sourceURL=webpack://b/./src/webpack/plugins/webpack_dev_server.ts?");

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
/******/ 
/******/ // startup
/******/ // Load entry module and return exports
/******/ // This entry module can't be inlined because the eval devtool is used.
/******/ var __webpack_exports__ = __webpack_require__(0);
/******/ var __webpack_exports__config = __webpack_exports__.config;
/******/ export { __webpack_exports__config as config };
/******/ 
