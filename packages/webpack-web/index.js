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
exports.webConfig = void 0;
var path_1 = __webpack_require__(2);
var base_1 = __webpack_require__(3);
var loaders_1 = __webpack_require__(12);
var plugins_1 = __webpack_require__(4);
var utils_1 = __webpack_require__(5);
function webConfig() {
    var base = (0, base_1.baseConfig)({ hashOutput: true });
    var define = (0, plugins_1.definePlugin)();
    var html = (0, plugins_1.htmlPlugin)();
    var forkTsChecker = (0, plugins_1.forkTsCheckerPlugin)();
    var eslint = (0, plugins_1.eslintPlugin)();
    var cleanTerminal = (0, plugins_1.cleanTerminalPlugin)();
    var babel = (0, loaders_1.babelLoaderWeb)();
    var sourceMap = (0, loaders_1.sourceMapLoader)();
    return {
        dependencies: __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({ 'webpack-dev-server': '4.8.x' }, base.dependencies), define.dependencies), html.dependencies), forkTsChecker.dependencies), eslint.dependencies), cleanTerminal.dependencies), babel.dependencies), sourceMap.dependencies),
        config: function () {
            var baseWebpackConfig = base.config();
            return __assign(__assign({}, baseWebpackConfig), { target: 'web', entry: {
                    main: (0, path_1.join)((0, utils_1.getProjectDir)(), "src/index.tsx"),
                }, module: {
                    rules: [babel.config(), sourceMap.config()],
                }, plugins: [
                    define.config(),
                    html.config(),
                    forkTsChecker.config(),
                    eslint.config(),
                    cleanTerminal.config(),
                ], devServer: !(0, utils_1.isProd)()
                    ? {
                        static: (0, utils_1.getDistDir)(),
                        compress: true,
                        hot: true,
                        open: true,
                    }
                    : undefined, optimization: __assign(__assign({}, baseWebpackConfig.optimization), { splitChunks: {
                        cacheGroups: {
                            vendor: {
                                test: /[\\/]node_modules[\\/]/,
                                chunks: 'initial',
                                name: 'vendor',
                                enforce: true,
                            },
                        },
                    } }) });
        },
    };
}
exports.webConfig = webConfig;


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
    var hashOutput = opts.hashOutput, libraryExportName = opts.libraryExportName;
    var terserPluginConfig = (0, plugins_1.terserPlugin)();
    return {
        dependencies: __assign({ webpack: '5.72.x', 'webpack-cli': '4.9.x' }, terserPluginConfig.dependencies),
        config: function () {
            var _a;
            return ({
                mode: 'none',
                devtool: (0, utils_1.isProd)() ? 'source-map' : 'eval',
                output: __assign({ path: (0, utils_1.getDistDir)(), filename: "[name]" + (hashOutput ? '.[contenthash]' : '') + ".js", clean: true, publicPath: (_a = process.env['PUBLIC_PATH']) !== null && _a !== void 0 ? _a : '/' }, (libraryExportName === undefined ? {} : { library: 'handler', libraryTarget: 'umd' })),
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
            });
        },
    };
}
exports.baseConfig = baseConfig;


/***/ }),
/* 4 */
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.terserPlugin = exports.cleanTerminalPlugin = exports.eslintPlugin = exports.forkTsCheckerPlugin = exports.htmlPlugin = exports.definePlugin = void 0;
var path_1 = __webpack_require__(2);
var utils_1 = __webpack_require__(5);
function definePlugin() {
    return {
        dependencies: {},
        config: function () {
            var DefinePlugin = __webpack_require__(6).DefinePlugin;
            var envPrefix = 'MATTHIS_';
            var extraEnv = Object.fromEntries(Object.entries(process.env)
                .filter(function (_a) {
                var _b = __read(_a, 1), name = _b[0];
                return name.startsWith(envPrefix);
            })
                .map(function (_a) {
                var _b = __read(_a, 2), name = _b[0], value = _b[1];
                return ["process.env." + name.slice(envPrefix.length), value];
            }));
            return new DefinePlugin(__assign({ 'process.env.NODE_ENV': JSON.stringify((0, utils_1.getEnv)()) }, extraEnv));
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
            'fork-ts-checker-webpack-plugin': '7.2.x',
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
            });
        },
    };
}
exports.forkTsCheckerPlugin = forkTsCheckerPlugin;
function eslintPlugin() {
    return {
        dependencies: {
            'eslint-webpack-plugin': '3.1.x',
        },
        config: function () {
            var EslintWebpackPlugin = __webpack_require__(9);
            return new EslintWebpackPlugin({
                extensions: ['ts', 'tsx'],
                files: [(0, path_1.join)((0, utils_1.getProjectDir)(), 'src/**/*.ts*')],
                threads: true,
            });
        },
    };
}
exports.eslintPlugin = eslintPlugin;
function cleanTerminalPlugin() {
    return {
        dependencies: {
            'clean-terminal-webpack-plugin': '3.0.x',
        },
        config: function () {
            var CleanTerminalPlugin = __webpack_require__(10);
            return new CleanTerminalPlugin();
        },
    };
}
exports.cleanTerminalPlugin = cleanTerminalPlugin;
function terserPlugin() {
    return {
        dependencies: {
            'terser-webpack-plugin': '5.3.x',
        },
        config: function () {
            var TerserWebpackPlugin = __webpack_require__(11);
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

module.exports = require("eslint-webpack-plugin");

/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("clean-terminal-webpack-plugin");

/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = require("terser-webpack-plugin");

/***/ }),
/* 12 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


//   'source-map-loader': '3.0.x',
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
exports.sourceMapLoader = exports.babelLoaderNode = exports.babelLoaderWeb = void 0;
var utils_1 = __webpack_require__(5);
var babelBaseDependencies = {
    '@babel/core': '7.17.x',
    '@babel/preset-env': '7.16.x',
    '@babel/preset-typescript': '7.16.x',
    'babel-loader': '8.2.x',
};
function babelLoaderWeb() {
    return {
        dependencies: __assign(__assign({}, babelBaseDependencies), { '@babel/preset-react': '7.16.x', 'babel-plugin-react-remove-properties': '0.3.x' }),
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
        dependencies: __assign({}, babelBaseDependencies),
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
var web_1 = __webpack_require__(1);
exports["default"] = (0, web_1.webConfig)().config();

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});