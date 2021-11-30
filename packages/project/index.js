#!/usr/bin/env node
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
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var path_1 = __webpack_require__(1);
var process_1 = __webpack_require__(2);
var promises_1 = __webpack_require__(3);
var models_1 = __webpack_require__(4);
var versions_1 = __webpack_require__(5);
var templatesPath = (0, path_1.join)(__dirname, 'templates');
function initProject() {
    return __awaiter(this, void 0, void 0, function () {
        var prompts, projectPath, projectName, content, projectType;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    prompts = __webpack_require__(6);
                    projectPath = (0, process_1.cwd)();
                    projectName = (0, path_1.basename)(projectPath);
                    return [4 /*yield*/, (0, promises_1.readdir)(projectPath)];
                case 1:
                    content = _a.sent();
                    if (!!content.every(function (f) { return f.startsWith('.'); })) return [3 /*break*/, 4];
                    return [4 /*yield*/, prompts({
                            type: 'text',
                            name: 'projectName',
                            message: 'Project name',
                            validate: function (v) { return v.length > 0; },
                        })];
                case 2:
                    projectName = (_a.sent()).projectName;
                    if (projectName === undefined) {
                        throw new Error("Project name is required");
                    }
                    projectPath = (0, path_1.join)(projectPath, projectName);
                    return [4 /*yield*/, (0, promises_1.mkdir)(projectPath)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [4 /*yield*/, prompts({
                        type: 'select',
                        name: 'projectType',
                        message: 'Project type',
                        choices: [
                            { title: 'NodeJS', value: models_1.ProjectType.Node },
                            { title: 'Web (React)', value: models_1.ProjectType.Web },
                            { title: 'Lib', value: models_1.ProjectType.Lib },
                        ],
                    })];
                case 5:
                    projectType = (_a.sent()).projectType;
                    if (projectType === undefined) {
                        throw new Error("Project type is required");
                    }
                    return [4 /*yield*/, generateProject(projectPath, projectName, projectType)];
                case 6:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports["default"] = initProject;
function generateProject(dst, name, type) {
    return __awaiter(this, void 0, void 0, function () {
        var variables, files;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(dst, name, type);
                    variables = {
                        PROJECT_NAME: name,
                        PROJECT_TYPE: type,
                        REACT_ROUTER_VERSION: versions_1.REACT_ROUTER_VERSION,
                        REACT_VERSION: versions_1.REACT_VERSION,
                        STYLED_COMPONENTS_TYPES_VERSION: versions_1.STYLED_COMPONENTS_TYPES_VERSION,
                        STYLED_COMPONENTS_VERSION: versions_1.STYLED_COMPONENTS_VERSION,
                        NODE_TYPES_VERSION: versions_1.NODE_TYPES_VERSION,
                    };
                    return [4 /*yield*/, getFiles((0, path_1.join)(templatesPath, type))];
                case 1:
                    files = _a.sent();
                    return [4 /*yield*/, Promise.all(files.map(function (f) { return __awaiter(_this, void 0, void 0, function () {
                            var fileContent, compiledContent, fPath;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, (0, promises_1.readFile)((0, path_1.join)(templatesPath, type, f))];
                                    case 1:
                                        fileContent = _a.sent();
                                        compiledContent = fileContent
                                            .toString()
                                            .replace(/\{\{([^\}]+)\}\}/gu, function (match, vName) { var _a; return (_a = variables[vName]) !== null && _a !== void 0 ? _a : ''; });
                                        fPath = (0, path_1.join)(dst, f);
                                        return [4 /*yield*/, (0, promises_1.mkdir)((0, path_1.dirname)(fPath), { recursive: true })];
                                    case 2:
                                        _a.sent();
                                        return [4 /*yield*/, (0, promises_1.writeFile)(fPath, compiledContent)];
                                    case 3:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function getFiles(path) {
    return __awaiter(this, void 0, void 0, function () {
        var subdirs, files;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, promises_1.readdir)(path)];
                case 1:
                    subdirs = _a.sent();
                    return [4 /*yield*/, Promise.all(subdirs.map(function (subdir) { return __awaiter(_this, void 0, void 0, function () {
                            var p, _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        p = (0, path_1.join)(path, subdir);
                                        return [4 /*yield*/, (0, promises_1.stat)(p)];
                                    case 1:
                                        if (!(_b.sent()).isDirectory()) return [3 /*break*/, 3];
                                        return [4 /*yield*/, getFiles(p)];
                                    case 2:
                                        _a = (_b.sent()).map(function (f) { return (0, path_1.join)(subdir, f); });
                                        return [3 /*break*/, 4];
                                    case 3:
                                        _a = subdir;
                                        _b.label = 4;
                                    case 4: return [2 /*return*/, _a];
                                }
                            });
                        }); }))];
                case 2:
                    files = _a.sent();
                    return [2 /*return*/, files.flat()];
            }
        });
    });
}
initProject().catch(console.error);


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("process");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("fs/promises");

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ALL_TYPES = exports.ProjectType = void 0;
var ProjectType;
(function (ProjectType) {
    ProjectType["Web"] = "web";
    ProjectType["Node"] = "node";
    ProjectType["Lib"] = "lib";
})(ProjectType = exports.ProjectType || (exports.ProjectType = {}));
exports.ALL_TYPES = [ProjectType.Web, ProjectType.Node, ProjectType.Lib];


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NODE_TYPES_VERSION = exports.STYLED_COMPONENTS_VERSION = exports.STYLED_COMPONENTS_TYPES_VERSION = exports.REACT_ROUTER_VERSION = exports.REACT_VERSION = exports.TYPESCRIPT_VERSION = exports.PRETTIER_VERSION = exports.ESLINT_VERSION = exports.PACKAGE_VERSIONS = void 0;
exports.PACKAGE_VERSIONS = {
    project: '1.0.12',
    eslint: '1.0.19',
    prettier: '1.0.1',
    tsconfig: '1.0.5',
    webpack: '1.0.14',
};
exports.ESLINT_VERSION = '8.3.x';
exports.PRETTIER_VERSION = '2.4.x';
exports.TYPESCRIPT_VERSION = '4.5.x';
exports.REACT_VERSION = '17.0.x';
exports.REACT_ROUTER_VERSION = '5.2.x';
exports.STYLED_COMPONENTS_TYPES_VERSION = '5.1.x';
exports.STYLED_COMPONENTS_VERSION = '5.1.x';
exports.NODE_TYPES_VERSION = '16.11.x';


/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("prompts");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	__webpack_exports__ = __webpack_exports__["default"];
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});