import * as __WEBPACK_EXTERNAL_MODULE__babel_core_2e08d31d__ from "@babel/core";
import * as __WEBPACK_EXTERNAL_MODULE__babel_preset_env_a24bbad6__ from "@babel/preset-env";
import * as __WEBPACK_EXTERNAL_MODULE__babel_preset_typescript_328b6127__ from "@babel/preset-typescript";
import * as __WEBPACK_EXTERNAL_MODULE_babel_loader_91c76fa1__ from "babel-loader";
import * as __WEBPACK_EXTERNAL_MODULE_eslint_webpack_plugin_6c2e632d__ from "eslint-webpack-plugin";
import * as __WEBPACK_EXTERNAL_MODULE_fork_ts_checker_webpack_plugin_a37ada7e__ from "fork-ts-checker-webpack-plugin";
import * as __WEBPACK_EXTERNAL_MODULE_node_child_process_7aa195c7__ from "node:child_process";
import * as __WEBPACK_EXTERNAL_MODULE_node_fs_promises_4a3ebc43__ from "node:fs/promises";
import * as __WEBPACK_EXTERNAL_MODULE_node_http_b674be28__ from "node:http";
import * as __WEBPACK_EXTERNAL_MODULE_node_path_02319fef__ from "node:path";
import * as __WEBPACK_EXTERNAL_MODULE_source_map_loader_e8528deb__ from "source-map-loader";
import * as __WEBPACK_EXTERNAL_MODULE_terser_webpack_plugin_3cd6887c__ from "terser-webpack-plugin";
import * as __WEBPACK_EXTERNAL_MODULE_tsconfig_paths_0bde1786__ from "tsconfig-paths";
import * as __WEBPACK_EXTERNAL_MODULE_tsconfig_paths_webpack_plugin_a86394ce__ from "tsconfig-paths-webpack-plugin";
import * as __WEBPACK_EXTERNAL_MODULE_webpack__ from "webpack";
/******/ var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "nodeConfig": () => (/* binding */ nodeConfig)
/* harmony export */ });
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _src_webpack_configs_base_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _src_webpack_loaders_babel_loader_node__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);
/* harmony import */ var _src_webpack_loaders_source_map_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14);
/* harmony import */ var _src_webpack_plugins_clean_terminal_plugin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(16);
/* harmony import */ var _src_webpack_plugins_define_plugin__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(17);
/* harmony import */ var _src_webpack_plugins_dependency_packer_plugin__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(19);
/* harmony import */ var _src_webpack_plugins_eslint_plugin__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(22);
/* harmony import */ var _src_webpack_plugins_fork_ts_checker_plugin__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(24);
/* harmony import */ var _src_webpack_plugins_lambda_server_plugin__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(26);
/* harmony import */ var _src_webpack_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(8);











function nodeConfig(opts) {
    const { isLambda } = opts;
    const entry = (0,node_path__WEBPACK_IMPORTED_MODULE_0__.join)((0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_10__.getProjectDir)(), `src/index.ts`);
    return {
        ...(0,_src_webpack_configs_base_config__WEBPACK_IMPORTED_MODULE_1__.baseConfig)(),
        target: 'node',
        entry: { main: entry },
        output: {
            path: (0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_10__.getDistDir)(),
            filename: `[name].js`,
            clean: true,
            chunkFormat: 'module',
            ...(isLambda ? { library: 'handler', libraryTarget: 'umd' } : {}),
        },
        module: {
            rules: [(0,_src_webpack_loaders_babel_loader_node__WEBPACK_IMPORTED_MODULE_2__.babelLoaderNode)(), (0,_src_webpack_loaders_source_map_loader__WEBPACK_IMPORTED_MODULE_3__.sourceMapLoader)()],
        },
        plugins: [
            (0,_src_webpack_plugins_define_plugin__WEBPACK_IMPORTED_MODULE_5__.definePlugin)(),
            (0,_src_webpack_plugins_fork_ts_checker_plugin__WEBPACK_IMPORTED_MODULE_8__.forkTsCheckerPlugin)(),
            (0,_src_webpack_plugins_eslint_plugin__WEBPACK_IMPORTED_MODULE_7__.eslintPlugin)(),
            (0,_src_webpack_plugins_clean_terminal_plugin__WEBPACK_IMPORTED_MODULE_4__.cleanTerminalPlugin)(),
            (0,_src_webpack_plugins_lambda_server_plugin__WEBPACK_IMPORTED_MODULE_9__.lambdaServerPlugin)(),
            (0,_src_webpack_plugins_dependency_packer_plugin__WEBPACK_IMPORTED_MODULE_6__.dependencyPackerPlugin)(),
        ],
        externalsType: 'module',
        externals: (ctx, cb) => {
            const { request, context } = ctx;
            if ((request?.startsWith('.') && !context?.includes('node_modules')) ||
                request?.startsWith('@src/') ||
                request?.startsWith('@shared/') ||
                request?.startsWith('@shared-node/') ||
                request === entry) {
                return cb();
            }
            return cb(undefined, request);
        },
        experiments: {
            outputModule: true,
        },
    };
}


/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
module.exports = x({ ["join"]: () => __WEBPACK_EXTERNAL_MODULE_node_path_02319fef__.join, ["resolve"]: () => __WEBPACK_EXTERNAL_MODULE_node_path_02319fef__.resolve });

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "baseConfig": () => (/* binding */ baseConfig)
/* harmony export */ });
/* harmony import */ var _src_webpack_plugins_terser_plugin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _src_webpack_plugins_tsconfig_paths_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _src_webpack_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
// import {dependencyPackerPlugin} from '@src/webpack/plugins/dependency_packer_plugin';



function baseConfig() {
    return {
        mode: 'none',
        devtool: (0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_2__.isProd)() ? 'source-map' : 'eval',
        resolve: {
            plugins: [(0,_src_webpack_plugins_tsconfig_paths_plugin__WEBPACK_IMPORTED_MODULE_1__.tsconfigPathsPlugin)()],
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        // stats: {
        //   preset: 'errors-warnings',
        //   assets: true,
        //   timings: true,
        //   chunkModules: true,
        // },
        optimization: {
            minimize: (0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_2__.isProd)(),
            minimizer: [(0,_src_webpack_plugins_terser_plugin__WEBPACK_IMPORTED_MODULE_0__.terserPlugin)()],
        },
        experiments: {
            backCompat: true,
        },
    };
}


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "terserPlugin": () => (/* binding */ terserPlugin)
/* harmony export */ });
/* harmony import */ var terser_webpack_plugin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

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
/* 5 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
module.exports = x({ ["default"]: () => __WEBPACK_EXTERNAL_MODULE_terser_webpack_plugin_3cd6887c__["default"] });

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tsconfigPathsPlugin": () => (/* binding */ tsconfigPathsPlugin)
/* harmony export */ });
/* harmony import */ var tsconfig_paths_webpack_plugin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);

function tsconfigPathsPlugin() {
    return new tsconfig_paths_webpack_plugin__WEBPACK_IMPORTED_MODULE_0__.TsconfigPathsPlugin({});
}


/***/ }),
/* 7 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
module.exports = x({ ["TsconfigPathsPlugin"]: () => __WEBPACK_EXTERNAL_MODULE_tsconfig_paths_webpack_plugin_a86394ce__.TsconfigPathsPlugin });

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getDistDir": () => (/* binding */ getDistDir),
/* harmony export */   "getEnv": () => (/* binding */ getEnv),
/* harmony export */   "getProjectDir": () => (/* binding */ getProjectDir),
/* harmony export */   "isProd": () => (/* binding */ isProd)
/* harmony export */ });
/* unused harmony export isSelenium */
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);

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
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "babelLoaderNode": () => (/* binding */ babelLoaderNode)
/* harmony export */ });
/* harmony import */ var _babel_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _babel_preset_env__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var _babel_preset_typescript__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12);
/* harmony import */ var babel_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(13);
/* eslint-disable import/no-unassigned-import */




/* eslint-enable import/no-unassigned-import */
function babelLoaderNode() {
    return {
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
    };
}


/***/ }),
/* 10 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
module.exports = x({  });

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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sourceMapLoader": () => (/* binding */ sourceMapLoader)
/* harmony export */ });
/* harmony import */ var _babel_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _babel_preset_env__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var _babel_preset_typescript__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12);
/* harmony import */ var babel_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(13);
/* harmony import */ var source_map_loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(15);
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
/* 15 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
module.exports = x({  });

/***/ }),
/* 16 */
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
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "definePlugin": () => (/* binding */ definePlugin)
/* harmony export */ });
/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18);
/* harmony import */ var _src_webpack_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
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
/* 18 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
module.exports = x({ ["default"]: () => __WEBPACK_EXTERNAL_MODULE_webpack__["default"] });

/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dependencyPackerPlugin": () => (/* binding */ dependencyPackerPlugin)
/* harmony export */ });
/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var tsconfig_paths__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(21);



async function findPackageJsonVersion(p) {
    const pStat = await (0,node_fs_promises__WEBPACK_IMPORTED_MODULE_0__.stat)(p);
    if (pStat.isDirectory()) {
        const dir = await (0,node_fs_promises__WEBPACK_IMPORTED_MODULE_0__.readdir)(p);
        if (dir.includes('package.json')) {
            const fileContent = await (0,node_fs_promises__WEBPACK_IMPORTED_MODULE_0__.readFile)((0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(p, 'package.json'));
            const { name, version } = JSON.parse(fileContent.toString());
            return { name, version };
        }
        if (p === '/') {
            return undefined;
        }
    }
    return findPackageJsonVersion((0,node_path__WEBPACK_IMPORTED_MODULE_1__.resolve)(`${p}/..`));
}
class DependencyPackerPlugin {
    apply(compiler) {
        const name = 'DependencyPackerPlugin';
        const depMap = new Map();
        const loadResult = (0,tsconfig_paths__WEBPACK_IMPORTED_MODULE_2__.loadConfig)(process.cwd());
        if (loadResult.resultType === 'failed') {
            return;
        }
        const matcher = (0,tsconfig_paths__WEBPACK_IMPORTED_MODULE_2__.createMatchPathAsync)(loadResult.absoluteBaseUrl, loadResult.paths);
        const matcherAsync = async (req) => {
            return new Promise(resolve => {
                matcher(req, undefined, undefined, undefined, (err, res) => {
                    resolve(err || res === undefined ? undefined : res);
                });
            });
        };
        compiler.hooks.beforeRun.tap(name, () => depMap.clear());
        compiler.hooks.compilation.tap(name, compilation => {
            compilation.hooks.finishModules.tapPromise(name, async (modules) => {
                await Promise.allSettled([...modules].map(async (m) => {
                    if (!('userRequest' in m)) {
                        return;
                    }
                    const module = m;
                    const res = await matcherAsync(module.userRequest);
                    if (res === undefined) {
                        return;
                    }
                    const dep = await findPackageJsonVersion(res);
                    if (dep === undefined) {
                        return;
                    }
                    depMap.set(dep.name, dep.version);
                }));
            });
        });
        compiler.hooks.done.tapPromise(name, async (stats) => {
            if (stats.hasErrors()) {
                return;
            }
            const outputDirectory = stats.compilation.compiler.options.output.path;
            const dependencies = Object.fromEntries([...depMap.entries()].sort((e1, e2) => e1[0].localeCompare(e2[0])));
            await (0,node_fs_promises__WEBPACK_IMPORTED_MODULE_0__.writeFile)(`${outputDirectory}/package.json`, JSON.stringify({
                type: 'module',
                dependencies,
            }, undefined, 2));
        });
    }
}
function dependencyPackerPlugin() {
    return new DependencyPackerPlugin();
}


/***/ }),
/* 20 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
module.exports = x({ ["readFile"]: () => __WEBPACK_EXTERNAL_MODULE_node_fs_promises_4a3ebc43__.readFile, ["readdir"]: () => __WEBPACK_EXTERNAL_MODULE_node_fs_promises_4a3ebc43__.readdir, ["stat"]: () => __WEBPACK_EXTERNAL_MODULE_node_fs_promises_4a3ebc43__.stat, ["writeFile"]: () => __WEBPACK_EXTERNAL_MODULE_node_fs_promises_4a3ebc43__.writeFile });

/***/ }),
/* 21 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
module.exports = x({ ["createMatchPathAsync"]: () => __WEBPACK_EXTERNAL_MODULE_tsconfig_paths_0bde1786__.createMatchPathAsync, ["loadConfig"]: () => __WEBPACK_EXTERNAL_MODULE_tsconfig_paths_0bde1786__.loadConfig });

/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "eslintPlugin": () => (/* binding */ eslintPlugin)
/* harmony export */ });
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var eslint_webpack_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(23);
/* harmony import */ var _src_webpack_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);



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
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var fork_ts_checker_webpack_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(25);
/* harmony import */ var _src_webpack_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);



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
/* harmony export */   "lambdaServerPlugin": () => (/* binding */ lambdaServerPlugin)
/* harmony export */ });
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(27);
/* harmony import */ var node_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(28);


class LambdaServerPlugin {
    apply(compiler) {
        let server;
        compiler.hooks.initialize.tap('LambdaServerPlugin', () => {
            if (!compiler.options.watch) {
                return;
            }
            // [START] SETUP CODE
            server = (0,node_http__WEBPACK_IMPORTED_MODULE_1__.createServer)((req, res) => {
                const url = req.url;
                const method = req.method;
                // Parse body
                let body = '';
                req.on('data', chunk => {
                    body += chunk;
                });
                // Parse headers
                const headers = {};
                while (true) {
                    const key = req.rawHeaders.shift();
                    const value = req.rawHeaders.shift();
                    if (key === undefined || value === undefined) {
                        break;
                    }
                    if (['HOST', 'CONNECTION', 'CONTENT-LENGTH'].includes(key.toUpperCase())) {
                        continue;
                    }
                    headers[key] = value;
                }
                req.on('end', () => {
                    const command = `node -e "require('./dist/main').handler({httpMethod: '${method}', path: '${url}', body: ${body === '' ? 'null' : `atob('${btoa(body)}')`}, headers: ${`JSON.parse(atob('${btoa(JSON.stringify(headers))}'))`}}).then(json => console.log(JSON.stringify(json))).catch(console.error);"`;
                    (0,node_child_process__WEBPACK_IMPORTED_MODULE_0__.exec)(command, (error, stdout, stderr) => {
                        const err = error ? String(error) : stderr;
                        if (err.length > 0) {
                            const output = JSON.stringify({ err: 'Failure to run lambda', message: err });
                            console.error(output);
                            res.statusCode = 500;
                            res.setHeader('Content-Type', 'application/json');
                            res.write(output);
                            res.end();
                        }
                        else {
                            try {
                                const { statusCode, body } = JSON.parse(stdout);
                                res.statusCode = statusCode;
                                res.setHeader('Content-Type', 'application/json');
                                res.write(body);
                                res.end();
                            }
                            catch (err) {
                                const output = JSON.stringify({
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
                // eslint-disable-next-line @typescript-eslint/no-magic-numbers
            }).listen(7777);
            // [END] SETUP CODE
        });
        let hasExited = false;
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
        process.on('SIGTERM', () => {
            exitHandler();
            process.exit(0); // eslint-disable-line node/no-process-exit
        });
        process.on('SIGINT', () => {
            exitHandler();
            process.exit(0); // eslint-disable-line node/no-process-exit
        });
        process.on('uncaughtException', () => {
            exitHandler();
            process.exit(1); // eslint-disable-line node/no-process-exit
        });
    }
}
function lambdaServerPlugin() {
    return new LambdaServerPlugin();
}


/***/ }),
/* 27 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
module.exports = x({ ["exec"]: () => __WEBPACK_EXTERNAL_MODULE_node_child_process_7aa195c7__.exec });

/***/ }),
/* 28 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
module.exports = x({ ["createServer"]: () => __WEBPACK_EXTERNAL_MODULE_node_http_b674be28__.createServer });

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
/* harmony import */ var _configs_node_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

// eslint-disable-next-line import/no-default-export
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_configs_node_config__WEBPACK_IMPORTED_MODULE_0__.nodeConfig)({ isLambda: true }));

})();

var __webpack_exports__default = __webpack_exports__["default"];
export { __webpack_exports__default as default };
