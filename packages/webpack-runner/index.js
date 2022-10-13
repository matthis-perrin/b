import { createRequire as __WEBPACK_EXTERNAL_createRequire } from "module";
/******/ var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:path");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("webpack");

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "formatError": () => (/* binding */ formatError)
/* harmony export */ });
function formatError(err, type) {
  if (err.name === 'EslintWebpackError') {
    console.log(`[eslint-${type}] (${err.file}) ${err.message}`);
  } else if ('issue' in err) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const issue = err['issue'];
    console.log(`[tsc-${type}] (${issue.file}) ${issue.message} [${issue.code}]`);
  } else if (err.name === 'ModuleNotFoundError') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const msg = err.error.message;
    const match = /(?<msg>Can't resolve '[^']+') in '(?<file>[^']+)'/u.exec(msg);

    if (match) {
      console.log(`[module-not-found] (${match[2]}) ${match[1]}`);
    } else {
      console.log(`[module-not-found] ${msg}`);
    }
  } else {
    console.log('-----');
    console.log(type);
    console.log(err.stack);
    console.log(err);
    console.log(Object.keys(err));
    console.log('-----');
  }
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
/* harmony export */   "runWebpacks": () => (/* binding */ runWebpacks)
/* harmony export */ });
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(webpack__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _src_webpack_runner_formatter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);



async function runWebpacks(opts) {
  const configs = await Promise.all(opts.projectPaths.map(async projectPath => // eslint-disable-next-line import/dynamic-import-chunkname, node/no-unsupported-features/es-syntax
  import(
  /*webpackIgnore: true*/
  (0,node_path__WEBPACK_IMPORTED_MODULE_0__.join)(projectPath, 'webpack.config.js')).then(({
    getConfig
  }) => getConfig(projectPath))));
  (0,webpack__WEBPACK_IMPORTED_MODULE_1__.webpack)(configs.map(c => ({ ...c,
    watch: false
  })), (err, res) => {
    try {
      if (err || !res) {
        console.log('####### ERROR #######');
        console.log(err);
        console.log('#####################');
        return;
      }

      res.stats.map(stats => {
        const {
          errors,
          warnings
        } = stats.compilation;

        for (const error of errors) {
          (0,_src_webpack_runner_formatter__WEBPACK_IMPORTED_MODULE_2__.formatError)(error, 'error');
        }

        for (const warning of warnings) {
          (0,_src_webpack_runner_formatter__WEBPACK_IMPORTED_MODULE_2__.formatError)(warning, 'warning');
        }

        return undefined;
      });
    } catch (err) {
      console.log('Failed to handled webpack result');
      console.log(err);
    }
  });
}
})();

var __webpack_exports__runWebpacks = __webpack_exports__.runWebpacks;
export { __webpack_exports__runWebpacks as runWebpacks };
