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

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("ansi-colors");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("webpack");

/***/ }),
/* 5 */
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
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_child_process__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prettier__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
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
/* 6 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:child_process");

/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:fs");

/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("prettier");

/***/ }),
/* 9 */
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
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parseError": () => (/* binding */ parseError)
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
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderErrorWarningCount": () => (/* binding */ renderErrorWarningCount),
/* harmony export */   "renderErrors": () => (/* binding */ renderErrors),
/* harmony export */   "renderProjectStatus": () => (/* binding */ renderProjectStatus)
/* harmony export */ });
/* harmony import */ var ansi_colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var ansi_colors__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ansi_colors__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_webpack_runner_error_formatter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);


function renderErrors(errors) {
  const {
    errorsByProjectByFile,
    globalErrors
  } = errors;
  const blocks = [];
  for (const globalError of globalErrors) {
    blocks.push((0,_src_webpack_runner_error_formatter__WEBPACK_IMPORTED_MODULE_1__.formatError)(globalError));
  }
  for (const [project, projectErrors] of errorsByProjectByFile.entries()) {
    blocks.push((0,_src_webpack_runner_error_formatter__WEBPACK_IMPORTED_MODULE_1__.formatProject)(project));
    for (const [file, errors] of projectErrors.entries()) {
      blocks.push([(0,_src_webpack_runner_error_formatter__WEBPACK_IMPORTED_MODULE_1__.formatFilePath)(file), ...errors.map(err => (0,_src_webpack_runner_error_formatter__WEBPACK_IMPORTED_MODULE_1__.formatError)(err))].join('\n'));
    }
  }
  return blocks.join('\n\n');
}
function renderProjectStatus(name, firstRun, isRunning, errors) {
  const out = [(0,_src_webpack_runner_error_formatter__WEBPACK_IMPORTED_MODULE_1__.formatProject)(name)];
  const projectErrors = errors.errorsByProjectByFile.get(name);
  if (projectErrors) {
    out.push(renderErrorWarningCount([...projectErrors.values()].flat()));
  } else if (!firstRun) {
    out.push((0,ansi_colors__WEBPACK_IMPORTED_MODULE_0__.green)('success'));
  }
  if (isRunning) {
    out.push((0,ansi_colors__WEBPACK_IMPORTED_MODULE_0__.gray)('in progress'));
  }
  return out;
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

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "formatError": () => (/* binding */ formatError),
/* harmony export */   "formatFilePath": () => (/* binding */ formatFilePath),
/* harmony export */   "formatProject": () => (/* binding */ formatProject)
/* harmony export */ });
/* harmony import */ var ansi_colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var ansi_colors__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ansi_colors__WEBPACK_IMPORTED_MODULE_0__);

function formatProject(project) {
  return (0,ansi_colors__WEBPACK_IMPORTED_MODULE_0__.cyan)(project);
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
  return `[${err.severity}] ${err.message}`;
}

/***/ }),
/* 13 */
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
/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fs_promises__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ansi_colors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var ansi_colors__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ansi_colors__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(webpack__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _src_fs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);
/* harmony import */ var _src_webpack_runner_error_grouper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9);
/* harmony import */ var _src_webpack_runner_error_parser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(10);
/* harmony import */ var _src_webpack_runner_renderer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(11);
/* harmony import */ var _src_webpack_runner_text_table__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(13);









const name = 'WebpackRunner';
async function runWebpacks(opts) {
  const {
    root,
    projectPaths,
    watch
  } = opts;
  const statuses = new Map();
  function handleStart(project) {
    const current = statuses.get(project) ?? {
      firstRun: true,
      isRunning: true,
      errors: []
    };
    statuses.set(project, {
      ...current,
      isRunning: true
    });
    if (watch) {
      redraw();
    }
  }
  function handleResults(project, stats) {
    const errors = [...stats.compilation.errors.map(err => (0,_src_webpack_runner_error_parser__WEBPACK_IMPORTED_MODULE_6__.parseError)(err, {
      root,
      severity: 'error'
    })), ...stats.compilation.warnings.map(warn => (0,_src_webpack_runner_error_parser__WEBPACK_IMPORTED_MODULE_6__.parseError)(warn, {
      root,
      severity: 'warning'
    }))];
    statuses.set(project, {
      firstRun: false,
      isRunning: false,
      errors
    });
    if (watch) {
      redraw();
    }
  }
  function redraw() {
    const errors = [...statuses.values()].flatMap(v => v.errors);
    const groupedErrors = (0,_src_webpack_runner_error_grouper__WEBPACK_IMPORTED_MODULE_5__.groupAndSortErrors)(errors);
    const summary = [...statuses.entries()].map(([projectPath, status]) => (0,_src_webpack_runner_renderer__WEBPACK_IMPORTED_MODULE_7__.renderProjectStatus)(projectPath, status.firstRun, status.isRunning, groupedErrors));
    summary.unshift([(0,ansi_colors__WEBPACK_IMPORTED_MODULE_2__.underline)(`Projects (${projectPaths.length})`), (0,ansi_colors__WEBPACK_IMPORTED_MODULE_2__.underline)('Status'), (0,ansi_colors__WEBPACK_IMPORTED_MODULE_2__.underline)('Run')]);
    const report = (0,_src_webpack_runner_renderer__WEBPACK_IMPORTED_MODULE_7__.renderErrors)(groupedErrors);
    if (watch) {
      process.stdout.write('\u001B[2J\u001B[3J\u001B[H'); // clear terminal
    }

    console.log((0,_src_webpack_runner_text_table__WEBPACK_IMPORTED_MODULE_8__.table)(summary));
    if (report.length > 0) {
      console.log(`\nBuild completed with ${(0,_src_webpack_runner_renderer__WEBPACK_IMPORTED_MODULE_7__.renderErrorWarningCount)(errors)}\n`);
      console.log(report);
    }
  }
  for (const projectPath of projectPaths.sort((p1, p2) => p1.localeCompare(p2))) {
    const projectName = (0,node_path__WEBPACK_IMPORTED_MODULE_1__.relative)(root, projectPath);
    statuses.set(projectName, {
      firstRun: true,
      isRunning: true,
      errors: []
    });
    // eslint-disable-next-line import/dynamic-import-chunkname, node/no-unsupported-features/es-syntax, no-await-in-loop
    const config = await import( /*webpackIgnore: true*/(0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(projectPath, 'webpack.config.js')).then(({
      getConfig
    }) => getConfig(projectPath));
    const compiler = (0,webpack__WEBPACK_IMPORTED_MODULE_3__.webpack)(config);
    compiler.hooks.beforeRun.tap(name, () => handleStart(projectName));
    compiler.hooks.watchRun.tap(name, () => handleStart(projectName));
    compiler.hooks.done.tap(name, stats => handleResults(projectName, stats));
    if (watch) {
      compiler.watch({}, (err, res) => {
        if (err || !res) {
          console.log(err);
          // eslint-disable-next-line node/no-process-exit
          process.exit(1);
        }
      });
    } else {
      compiler.run((err, res) => {
        if (err || !res) {
          console.log(err);
          // eslint-disable-next-line node/no-process-exit
          process.exit(1);
        }
        if ([...statuses.values()].every(status => !status.isRunning)) {
          redraw();
          // eslint-disable-next-line node/no-process-exit
          process.exit(0);
        }
      });
    }
  }
}
async function runAllWebpacks(options) {
  const {
    root,
    watch
  } = options;
  const rootFiles = await (0,node_fs_promises__WEBPACK_IMPORTED_MODULE_0__.readdir)(root, {
    withFileTypes: true
  });
  const dirs = rootFiles.filter(ent => ent.isDirectory()).map(dir => (0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(root, dir.name));
  const packages = await Promise.all(dirs.map(async dir => (await (0,_src_fs__WEBPACK_IMPORTED_MODULE_4__.exists)((0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(dir, 'package.json'))) ? dir : undefined));
  await runWebpacks({
    root,
    projectPaths: packages.filter(p => p !== undefined),
    watch
  });
}
})();

var __webpack_exports__runAllWebpacks = __webpack_exports__.runAllWebpacks;
var __webpack_exports__runWebpacks = __webpack_exports__.runWebpacks;
export { __webpack_exports__runAllWebpacks as runAllWebpacks, __webpack_exports__runWebpacks as runWebpacks };
