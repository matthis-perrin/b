import * as __WEBPACK_EXTERNAL_MODULE__babel_core_2e08d31d__ from "@babel/core";
import * as __WEBPACK_EXTERNAL_MODULE__babel_preset_env_a24bbad6__ from "@babel/preset-env";
import * as __WEBPACK_EXTERNAL_MODULE__babel_preset_react_5605368a__ from "@babel/preset-react";
import * as __WEBPACK_EXTERNAL_MODULE__babel_preset_typescript_328b6127__ from "@babel/preset-typescript";
import * as __WEBPACK_EXTERNAL_MODULE_babel_loader_91c76fa1__ from "babel-loader";
import * as __WEBPACK_EXTERNAL_MODULE_babel_plugin_react_remove_properties_6138ae9f__ from "babel-plugin-react-remove-properties";
import * as __WEBPACK_EXTERNAL_MODULE_eslint_webpack_plugin_6c2e632d__ from "eslint-webpack-plugin";
import * as __WEBPACK_EXTERNAL_MODULE_fork_ts_checker_webpack_plugin_a37ada7e__ from "fork-ts-checker-webpack-plugin";
import * as __WEBPACK_EXTERNAL_MODULE_html_webpack_plugin_ea66bb30__ from "html-webpack-plugin";
import * as __WEBPACK_EXTERNAL_MODULE_node_path_02319fef__ from "node:path";
import * as __WEBPACK_EXTERNAL_MODULE_source_map_loader_e8528deb__ from "source-map-loader";
import * as __WEBPACK_EXTERNAL_MODULE_terser_webpack_plugin_3cd6887c__ from "terser-webpack-plugin";
import * as __WEBPACK_EXTERNAL_MODULE_tsconfig_paths_webpack_plugin_a86394ce__ from "tsconfig-paths-webpack-plugin";
import * as __WEBPACK_EXTERNAL_MODULE_webpack__ from "webpack";
import * as __WEBPACK_EXTERNAL_MODULE_webpack_dev_server_49d33e28__ from "webpack-dev-server";
/******/ var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "webConfig": () => (/* binding */ webConfig)
/* harmony export */ });
/* harmony import */ var webpack_dev_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _src_webpack_configs_base_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _src_webpack_loaders_babel_loader_web__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);
/* harmony import */ var _src_webpack_loaders_source_map_loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(17);
/* harmony import */ var _src_webpack_plugins_clean_terminal_plugin__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(19);
/* harmony import */ var _src_webpack_plugins_define_plugin__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(20);
/* harmony import */ var _src_webpack_plugins_eslint_plugin__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(22);
/* harmony import */ var _src_webpack_plugins_fork_ts_checker_plugin__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(24);
/* harmony import */ var _src_webpack_plugins_html_plugin__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(26);
/* harmony import */ var _src_webpack_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(9);
// eslint-disable-next-line import/no-unassigned-import











function webConfig() {
    const base = (0,_src_webpack_configs_base_config__WEBPACK_IMPORTED_MODULE_2__.baseConfig)();
    return {
        ...base,
        target: 'web',
        entry: {
            main: (0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)((0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_10__.getProjectDir)(), `src/index.tsx`),
        },
        output: {
            path: (0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_10__.getDistDir)(),
            filename: `[name].[contenthash].js`,
            clean: true,
            publicPath: '/',
        },
        module: {
            rules: [(0,_src_webpack_loaders_babel_loader_web__WEBPACK_IMPORTED_MODULE_3__.babelLoaderWeb)(), (0,_src_webpack_loaders_source_map_loader__WEBPACK_IMPORTED_MODULE_4__.sourceMapLoader)()],
        },
        plugins: [
            (0,_src_webpack_plugins_define_plugin__WEBPACK_IMPORTED_MODULE_6__.definePlugin)(),
            (0,_src_webpack_plugins_html_plugin__WEBPACK_IMPORTED_MODULE_9__.htmlPlugin)(),
            (0,_src_webpack_plugins_fork_ts_checker_plugin__WEBPACK_IMPORTED_MODULE_8__.forkTsCheckerPlugin)(),
            (0,_src_webpack_plugins_eslint_plugin__WEBPACK_IMPORTED_MODULE_7__.eslintPlugin)(),
            (0,_src_webpack_plugins_clean_terminal_plugin__WEBPACK_IMPORTED_MODULE_5__.cleanTerminalPlugin)(),
        ],
        devServer: !(0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_10__.isProd)()
            ? {
                static: (0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_10__.getDistDir)(),
                compress: true,
                hot: true,
                open: true,
            }
            : undefined,
        optimization: {
            ...base.optimization,
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[/\\]node_modules[/\\]/u,
                        chunks: 'initial',
                        name: 'vendor',
                        enforce: true,
                    },
                },
            },
        },
    };
}


/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
module.exports = x({  });

/***/ }),
/* 3 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
module.exports = x({ ["join"]: () => __WEBPACK_EXTERNAL_MODULE_node_path_02319fef__.join, ["resolve"]: () => __WEBPACK_EXTERNAL_MODULE_node_path_02319fef__.resolve });

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "baseConfig": () => (/* binding */ baseConfig)
/* harmony export */ });
/* harmony import */ var _src_webpack_plugins_terser_plugin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _src_webpack_plugins_tsconfig_paths_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _src_webpack_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);
// import {dependencyPackerPlugin} from '@src/webpack/plugins/dependency_packer_plugin';



function baseConfig() {
    return {
        mode: 'none',
        devtool: (0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_2__.isProd)() ? 'source-map' : 'eval',
        resolve: {
            plugins: [(0,_src_webpack_plugins_tsconfig_paths_plugin__WEBPACK_IMPORTED_MODULE_1__.tsconfigPathsPlugin)()],
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        stats: {
            preset: 'errors-warnings',
            assets: true,
            timings: true,
        },
        optimization: {
            minimize: (0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_2__.isProd)(),
            minimizer: [(0,_src_webpack_plugins_terser_plugin__WEBPACK_IMPORTED_MODULE_0__.terserPlugin)()],
        },
        externals: (ctx, cb) => {
            const { request, context } = ctx;
            const resolver = ctx.getResolve?.();
            if (!resolver) {
                return cb(new Error('No resolver when checking for externals'));
            }
            resolver(context ?? '', request ?? '')
                .then(res => (res.includes('/node_modules/') ? cb(undefined, request) : cb()))
                .catch(() => cb(undefined, request));
        },
        experiments: {
            backCompat: true,
        },
    };
}


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "terserPlugin": () => (/* binding */ terserPlugin)
/* harmony export */ });
/* harmony import */ var terser_webpack_plugin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);

function terserPlugin() {
    return new terser_webpack_plugin__WEBPACK_IMPORTED_MODULE_0__["default"]({
        terserOptions: {
            format: {
                comments: false,
            },
        },
        extractComments: false,
    });
}


/***/ }),
/* 6 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
module.exports = x({ ["default"]: () => __WEBPACK_EXTERNAL_MODULE_terser_webpack_plugin_3cd6887c__["default"] });

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tsconfigPathsPlugin": () => (/* binding */ tsconfigPathsPlugin)
/* harmony export */ });
/* harmony import */ var tsconfig_paths_webpack_plugin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);

function tsconfigPathsPlugin() {
    return new tsconfig_paths_webpack_plugin__WEBPACK_IMPORTED_MODULE_0__.TsconfigPathsPlugin({});
}


/***/ }),
/* 8 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
module.exports = x({ ["TsconfigPathsPlugin"]: () => __WEBPACK_EXTERNAL_MODULE_tsconfig_paths_webpack_plugin_a86394ce__.TsconfigPathsPlugin });

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getDistDir": () => (/* binding */ getDistDir),
/* harmony export */   "getEnv": () => (/* binding */ getEnv),
/* harmony export */   "getProjectDir": () => (/* binding */ getProjectDir),
/* harmony export */   "isProd": () => (/* binding */ isProd),
/* harmony export */   "isSelenium": () => (/* binding */ isSelenium)
/* harmony export */ });
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);

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
    return (0,node_path__WEBPACK_IMPORTED_MODULE_0__.join)((0,node_path__WEBPACK_IMPORTED_MODULE_0__.resolve)('.'));
}
function getDistDir() {
    return (0,node_path__WEBPACK_IMPORTED_MODULE_0__.join)(getProjectDir(), 'dist');
}


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "babelLoaderWeb": () => (/* binding */ babelLoaderWeb)
/* harmony export */ });
/* harmony import */ var _babel_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _babel_preset_env__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var _babel_preset_typescript__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);
/* harmony import */ var babel_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14);
/* harmony import */ var _babel_preset_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(15);
/* harmony import */ var babel_plugin_react_remove_properties__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(16);
/* harmony import */ var _src_webpack_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9);
/* eslint-disable import/no-unassigned-import */







/* eslint-enable import/no-unassigned-import */
function babelLoaderWeb() {
    return {
        test: /\.tsx?$/u,
        exclude: /\/node_modules\//u,
        loader: 'babel-loader',
        options: {
            presets: [
                [
                    '@babel/preset-env',
                    {
                        targets: '> 10%',
                        bugfixes: true,
                        useBuiltIns: 'usage',
                        corejs: { version: '3.10' },
                    },
                ],
                ['@babel/preset-react'],
                ['@babel/preset-typescript'],
            ],
            plugins: (0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_6__.isSelenium)() ? [] : [['react-remove-properties', { properties: ['data-test-id'] }]],
        },
    };
}


/***/ }),
/* 11 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
module.exports = x({  });

/***/ }),
/* 12 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
module.exports = x({  });

/***/ }),
/* 13 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
module.exports = x({  });

/***/ }),
/* 14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
module.exports = x({  });

/***/ }),
/* 15 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
module.exports = x({  });

/***/ }),
/* 16 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
module.exports = x({  });

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sourceMapLoader": () => (/* binding */ sourceMapLoader)
/* harmony export */ });
/* harmony import */ var _babel_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _babel_preset_env__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var _babel_preset_typescript__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);
/* harmony import */ var babel_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14);
/* harmony import */ var source_map_loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(18);
/* eslint-disable import/no-unassigned-import */





/* eslint-enable import/no-unassigned-import */
function sourceMapLoader() {
    return {
        test: /\.js$/u,
        use: ['source-map-loader'],
        enforce: 'pre',
    };
}


/***/ }),
/* 18 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
module.exports = x({  });

/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
/* 20 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "definePlugin": () => (/* binding */ definePlugin)
/* harmony export */ });
/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _src_webpack_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
 // eslint-disable-line import/no-named-as-default

function definePlugin() {
    const envPrefix = 'MATTHIS_';
    const extraEnv = Object.fromEntries(Object.entries(process.env) // eslint-disable-line node/no-process-env
        .filter(([name]) => name.startsWith(envPrefix))
        .map(([name, value]) => [`process.env.${name.slice(envPrefix.length)}`, value]));
    return new webpack__WEBPACK_IMPORTED_MODULE_0__["default"].DefinePlugin({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'process.env.NODE_ENV': JSON.stringify((0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_1__.getEnv)()),
        ...extraEnv,
    });
}


/***/ }),
/* 21 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
module.exports = x({ ["default"]: () => __WEBPACK_EXTERNAL_MODULE_webpack__["default"] });

/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "eslintPlugin": () => (/* binding */ eslintPlugin)
/* harmony export */ });
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var eslint_webpack_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(23);
/* harmony import */ var _src_webpack_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);



function eslintPlugin() {
    return new eslint_webpack_plugin__WEBPACK_IMPORTED_MODULE_1__["default"]({
        extensions: ['ts', 'tsx'],
        files: [(0,node_path__WEBPACK_IMPORTED_MODULE_0__.join)((0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_2__.getProjectDir)(), 'src/**/*.ts*')],
        threads: true,
    });
}


/***/ }),
/* 23 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
module.exports = x({ ["default"]: () => __WEBPACK_EXTERNAL_MODULE_eslint_webpack_plugin_6c2e632d__["default"] });

/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "forkTsCheckerPlugin": () => (/* binding */ forkTsCheckerPlugin)
/* harmony export */ });
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var fork_ts_checker_webpack_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(25);
/* harmony import */ var _src_webpack_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);



function forkTsCheckerPlugin() {
    return new fork_ts_checker_webpack_plugin__WEBPACK_IMPORTED_MODULE_1__["default"]({
        typescript: {
            diagnosticOptions: {
                semantic: true,
                syntactic: true,
            },
            mode: 'write-references',
            configFile: (0,node_path__WEBPACK_IMPORTED_MODULE_0__.join)((0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_2__.getProjectDir)(), 'tsconfig.json'),
        },
    });
}


/***/ }),
/* 25 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
module.exports = x({ ["default"]: () => __WEBPACK_EXTERNAL_MODULE_fork_ts_checker_webpack_plugin_a37ada7e__["default"] });

/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "htmlPlugin": () => (/* binding */ htmlPlugin)
/* harmony export */ });
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var html_webpack_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(27);
/* harmony import */ var _src_webpack_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);



function htmlPlugin() {
    return new html_webpack_plugin__WEBPACK_IMPORTED_MODULE_1__["default"]({
        template: (0,node_path__WEBPACK_IMPORTED_MODULE_0__.join)((0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_2__.getProjectDir)(), 'src/index.html'),
        minify: (0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_2__.isProd)(),
    });
}


/***/ }),
/* 27 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
module.exports = x({ ["default"]: () => __WEBPACK_EXTERNAL_MODULE_html_webpack_plugin_ea66bb30__["default"] });

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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _configs_web_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

// eslint-disable-next-line import/no-default-export
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_configs_web_config__WEBPACK_IMPORTED_MODULE_0__.webConfig)());

})();

var __webpack_exports__default = __webpack_exports__["default"];
export { __webpack_exports__default as default };
