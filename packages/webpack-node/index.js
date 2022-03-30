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
var lambda_server_plugin_1 = __webpack_require__(12);
function nodeConfig(opts) {
    var isLambda = opts.isLambda;
    var base = (0, base_1.baseConfig)({ hashOutput: false, libraryExportName: isLambda ? 'handler' : undefined });
    var define = (0, plugins_1.definePlugin)();
    var forkTsChecker = (0, plugins_1.forkTsCheckerPlugin)();
    var cleanTerminal = (0, plugins_1.cleanTerminalPlugin)();
    var babel = (0, loaders_1.babelLoaderNode)();
    var sourceMap = (0, loaders_1.sourceMapLoader)();
    var entry = (0, path_1.join)((0, utils_1.getProjectDir)(), "src/index.ts");
    return {
        dependencies: __assign(__assign(__assign(__assign(__assign(__assign({}, base.dependencies), define.dependencies), forkTsChecker.dependencies), cleanTerminal.dependencies), babel.dependencies), sourceMap.dependencies),
        config: function () {
            var plugins = [
                define.config(),
                forkTsChecker.config(),
                cleanTerminal.config(),
                new lambda_server_plugin_1.LambdaServerPlugin(),
            ];
            return __assign(__assign({}, base.config()), { target: 'node', entry: { main: entry }, module: {
                    rules: [babel.config(), sourceMap.config()],
                }, plugins: plugins, externals: function (ctx, cb) {
                    var request = ctx.request, context = ctx.context;
                    if ((request.startsWith('.') && !context.includes('node_modules')) || request === entry) {
                        return cb();
                    }
                    return cb(null, 'commonjs ' + request);
                } });
        },
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
    var hashOutput = opts.hashOutput, libraryExportName = opts.libraryExportName;
    var terserPluginConfig = (0, plugins_1.terserPlugin)();
    return {
        dependencies: __assign({ webpack: '5.65.x', 'webpack-cli': '4.9.x' }, terserPluginConfig.dependencies),
        config: function () { return ({
            mode: 'none',
            devtool: (0, utils_1.isProd)() ? 'source-map' : 'eval',
            output: __assign({ path: (0, utils_1.getDistDir)(), filename: "[name]" + (hashOutput ? '.[contenthash]' : '') + ".js", clean: true, publicPath: '/' }, (libraryExportName === undefined ? {} : { library: 'handler', libraryTarget: 'umd' })),
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
            'fork-ts-checker-webpack-plugin': '6.5.x',
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
            'terser-webpack-plugin': '5.3.x',
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


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LambdaServerPlugin = void 0;
var child_process_1 = __webpack_require__(13);
var http_1 = __webpack_require__(14);
var LambdaServerPlugin = /** @class */ (function () {
    function LambdaServerPlugin() {
    }
    LambdaServerPlugin.prototype.apply = function (compiler) {
        var server;
        compiler.hooks.initialize.tap('LambdaServerPlugin', function () {
            if (!compiler.options.watch) {
                return;
            }
            // [START] SETUP CODE
            server = (0, http_1.createServer)(function (req, res) {
                var url = req.url;
                var method = req.method;
                // Parse body
                var body = '';
                req.on('data', function (chunk) {
                    body += chunk;
                });
                // Parse headers
                var headers = {};
                while (true) {
                    var key = req.rawHeaders.shift();
                    var value = req.rawHeaders.shift();
                    if (key === undefined || value === undefined) {
                        break;
                    }
                    if (['HOST', 'CONNECTION', 'CONTENT-LENGTH'].includes(key.toUpperCase())) {
                        continue;
                    }
                    headers[key] = value;
                }
                req.on('end', function () {
                    var command = "node -e \"require('./dist/main').handler({httpMethod: '" + method + "', path: '" + url + "', body: " + (body === '' ? 'null' : "atob('" + btoa(body) + "')") + ", headers: " + ("JSON.parse(atob('" + btoa(JSON.stringify(headers)) + "'))") + "}).then(json => console.log(JSON.stringify(json))).catch(console.error);\"";
                    (0, child_process_1.exec)(command, function (error, stdout, stderr) {
                        var err = error ? String(error) : stderr;
                        if (err.length > 0) {
                            var output = JSON.stringify({ err: 'Failure to run lambda', message: err });
                            console.error(output);
                            res.statusCode = 500;
                            res.setHeader('Content-Type', 'application/json');
                            res.write(output);
                            res.end();
                        }
                        else {
                            try {
                                var _a = JSON.parse(stdout), statusCode = _a.statusCode, body_1 = _a.body;
                                res.statusCode = statusCode;
                                res.setHeader('Content-Type', 'application/json');
                                res.write(body_1);
                                res.end();
                            }
                            catch (err) {
                                var output = JSON.stringify({
                                    err: 'Invalid lambda response',
                                    message: String(err),
                                    response: stdout,
                                });
                                console.error(output);
                                res.statusCode = 500;
                                res.setHeader('Content-Type', 'application/json');
                                res.write(output);
                                res.end();
                            }
                        }
                    });
                    //
                    // TODO: Add those headers
                    //
                    // "CloudFront-Forwarded-Proto": "https",
                    // "CloudFront-Is-Desktop-Viewer": "true",
                    // "CloudFront-Is-Mobile-Viewer": "false",
                    // "CloudFront-Is-SmartTV-Viewer": "false",
                    // "CloudFront-Is-Tablet-Viewer": "false",
                    // "CloudFront-Viewer-Country": "FR",
                    // "Via": "2.0 c06f5d2130689f511352f5187fabf420.cloudfront.net (CloudFront)",
                    // "X-Amz-Cf-Id": "AuD_VLlE0k9_Di4k3sbzvJsvqMvX1KB6Hrko2oML94_l5oAE26QQaA==",
                    // "X-Amzn-Trace-Id": "Root=1-62430173-334e883b77b37ba6721ccc09",
                    // "X-Forwarded-For": "82.65.31.41, 130.176.183.40",
                    // "X-Forwarded-Port": "443",
                    // "X-Forwarded-Proto": "https"
                });
            })
                .listen(7777);
            // [END] SETUP CODE
        });
        var hasExited = false;
        function exitHandler() {
            if (hasExited) {
                return;
            }
            hasExited = true;
            if (!compiler.options.watch || !server) {
                return;
            }
            // [START] TEARDOWN CODE
            server.close();
            // [END] TEARDOWN CODE
        }
        process.on('beforeExit', exitHandler);
        process.on('exit', exitHandler);
        process.on('SIGTERM', function () {
            exitHandler();
            process.exit(0);
        });
        process.on('SIGINT', function () {
            exitHandler();
            process.exit(0);
        });
        process.on('uncaughtException', function () {
            exitHandler();
            process.exit(1);
        });
    };
    return LambdaServerPlugin;
}());
exports.LambdaServerPlugin = LambdaServerPlugin;


/***/ }),
/* 13 */
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("http");

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
exports["default"] = (0, node_1.nodeConfig)({ isLambda: false }).config();

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});