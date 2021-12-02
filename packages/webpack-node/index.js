(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.nodeConfig = void 0;
var path_1 = __webpack_require__(2);
var base_1 = __webpack_require__(3);
var loaders_1 = __webpack_require__(11);
var plugins_1 = __webpack_require__(4);
var utils_1 = __webpack_require__(5);
function nodeConfig() {
    var base = (0, base_1.baseConfig)({ hashOutput: false });
    var define = (0, plugins_1.definePlugin)();
    var forkTsChecker = (0, plugins_1.forkTsCheckerPlugin)();
    var cleanTerminal = (0, plugins_1.cleanTerminalPlugin)();
    var babel = (0, loaders_1.babelLoaderNode)();
    var sourceMap = (0, loaders_1.sourceMapLoader)();
    var entry = (0, path_1.join)((0, utils_1.getProjectDir)(), "src/index.ts");
    return {
        dependencies: __assign(__assign(__assign(__assign(__assign(__assign({}, base.dependencies), define.dependencies), forkTsChecker.dependencies), cleanTerminal.dependencies), babel.dependencies), sourceMap.dependencies),
        config: function () { return (__assign(__assign({}, base.config()), { target: 'node', entry: { main: entry }, module: {
                rules: [babel.config(), sourceMap.config()],
            }, plugins: [define.config(), forkTsChecker.config(), cleanTerminal.config()], externals: function (ctx, cb) {
                var request = ctx.request, context = ctx.context;
                if ((request.startsWith('.') && !context.includes('node_modules')) || request === entry) {
                    return cb();
                }
                return cb(null, 'commonjs ' + request);
            } })); },
    };
}
exports.nodeConfig = nodeConfig;


/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.baseConfig = void 0;
var plugins_1 = __webpack_require__(4);
var utils_1 = __webpack_require__(5);
function baseConfig(opts) {
    var hashOutput = opts.hashOutput;
    var terserPluginConfig = (0, plugins_1.terserPlugin)();
    return {
        dependencies: __assign({ webpack: '5.64.x', 'webpack-cli': '4.9.x' }, terserPluginConfig.dependencies),
        config: function () { return ({
            mode: 'none',
            devtool: (0, utils_1.isProd)() ? 'source-map' : 'eval',
            output: {
                path: (0, utils_1.getDistDir)(),
                filename: "[name]" + (hashOutput ? '.[contenthash]' : '') + ".js",
                clean: true,
                publicPath: '/',
            },
            resolve: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
            stats: {
                preset: 'errors-warnings',
                assets: true,
                timings: true,
            },
            optimization: {
                minimize: (0, utils_1.isProd)(),
                minimizer: [terserPluginConfig.config()],
            },
            experiments: {
                backCompat: true,
            },
        }); },
    };
}
exports.baseConfig = baseConfig;


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.terserPlugin = exports.cleanTerminalPlugin = exports.forkTsCheckerPlugin = exports.htmlPlugin = exports.definePlugin = void 0;
var path_1 = __webpack_require__(2);
var utils_1 = __webpack_require__(5);
function definePlugin() {
    return {
        dependencies: {},
        config: function () {
            var DefinePlugin = __webpack_require__(6).DefinePlugin;
            return new DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify((0, utils_1.getEnv)()),
            });
        },
    };
}
exports.definePlugin = definePlugin;
function htmlPlugin() {
    return {
        dependencies: {
            'html-webpack-plugin': '5.5.x',
        },
        config: function () {
            var HtmlWebpackPlugin = __webpack_require__(7);
            return new HtmlWebpackPlugin({
                template: (0, path_1.join)((0, utils_1.getProjectDir)(), 'src/index.html'),
                minify: (0, utils_1.isProd)(),
            });
        },
    };
}
exports.htmlPlugin = htmlPlugin;
function forkTsCheckerPlugin() {
    return {
        dependencies: {
            'fork-ts-checker-webpack-plugin': '6.4.x',
        },
        config: function () {
            var ForkTsCheckerWebpackPlugin = __webpack_require__(8);
            return new ForkTsCheckerWebpackPlugin({
                typescript: {
                    diagnosticOptions: {
                        semantic: true,
                        syntactic: true,
                    },
                    mode: 'write-references',
                    configFile: (0, path_1.join)((0, utils_1.getProjectDir)(), 'tsconfig.json'),
                },
                eslint: {
                    enabled: true,
                    files: [(0, path_1.join)((0, utils_1.getProjectDir)(), 'src/**/*.ts*')],
                },
            });
        },
    };
}
exports.forkTsCheckerPlugin = forkTsCheckerPlugin;
function cleanTerminalPlugin() {
    return {
        dependencies: {
            'clean-terminal-webpack-plugin': '3.0.x',
        },
        config: function () {
            var CleanTerminalPlugin = __webpack_require__(9);
            return new CleanTerminalPlugin();
        },
    };
}
exports.cleanTerminalPlugin = cleanTerminalPlugin;
function terserPlugin() {
    return {
        dependencies: {
            'terser-webpack-plugin': '5.2.x',
        },
        config: function () {
            var TerserWebpackPlugin = __webpack_require__(10);
            return new TerserWebpackPlugin({
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
                extractComments: false,
            });
        },
    };
}
exports.terserPlugin = terserPlugin;


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getDistDir = exports.getProjectDir = exports.getEnv = exports.isSelenium = exports.isProd = void 0;
var path_1 = __webpack_require__(2);
function isProd() {
    return process.env['NODE_ENV'] === 'production';
}
exports.isProd = isProd;
function isSelenium() {
    return process.env['IS_SELENIUM'] === '1';
}
exports.isSelenium = isSelenium;
function getEnv() {
    return isProd() ? 'production' : 'development';
}
exports.getEnv = getEnv;
function getProjectDir() {
    return (0, path_1.join)((0, path_1.resolve)('.'));
}
exports.getProjectDir = getProjectDir;
function getDistDir() {
    return (0, path_1.join)(getProjectDir(), 'dist');
}
exports.getDistDir = getDistDir;


/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("webpack");

/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("html-webpack-plugin");

/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("fork-ts-checker-webpack-plugin");

/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("clean-terminal-webpack-plugin");

/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("terser-webpack-plugin");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


//   'source-map-loader': '3.0.x',
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sourceMapLoader = exports.babelLoaderNode = exports.babelLoaderWeb = void 0;
var utils_1 = __webpack_require__(5);
function babelLoaderWeb() {
    return {
        dependencies: {
            '@babel/core': '7.16.x',
            '@babel/preset-env': '7.16.x',
            '@babel/preset-react': '7.16.x',
            '@babel/preset-typescript': '7.16.x',
            'babel-loader': '8.2.x',
            'babel-plugin-react-remove-properties': '0.3.x',
        },
        config: function () { return ({
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
                plugins: (0, utils_1.isSelenium)() ? [] : [['react-remove-properties', { properties: ['data-test-id'] }]],
            },
        }); },
    };
}
exports.babelLoaderWeb = babelLoaderWeb;
function babelLoaderNode() {
    return {
        dependencies: {
            '@babel/core': '7.16.x',
            '@babel/preset-env': '7.16.x',
            '@babel/preset-typescript': '7.16.x',
            'babel-loader': '8.2.x',
        },
        config: function () { return ({
            test: /\.tsx?$/u,
            exclude: /\/node_modules\//u,
            loader: 'babel-loader',
            options: {
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            targets: {
                                node: 16,
                            },
                        },
                    ],
                    ['@babel/preset-typescript'],
                ],
            },
        }); },
    };
}
exports.babelLoaderNode = babelLoaderNode;
function sourceMapLoader() {
    return {
        dependencies: {
            'source-map-loader': '3.0.x',
        },
        config: function () { return ({
            test: /\.js$/,
            use: ['source-map-loader'],
            enforce: 'pre',
        }); },
    };
}
exports.sourceMapLoader = sourceMapLoader;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
var node_1 = __webpack_require__(1);
exports["default"] = (0, node_1.nodeConfig)().config();

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});