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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var path_1 = __webpack_require__(1);
var process_1 = __webpack_require__(2);
var promises_1 = __webpack_require__(3);
var models_1 = __webpack_require__(4);
var generate_workspace_1 = __webpack_require__(5);
var type_utils_1 = __webpack_require__(17);
var fs_1 = __webpack_require__(7);
function cancel(workspacePath) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Cancelling...');
                    if (!workspacePath) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, fs_1.rmDir)(workspacePath)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    process.exit(0);
                    return [2 /*return*/];
            }
        });
    });
}
function initProject() {
    return __awaiter(this, void 0, void 0, function () {
        var prompts, workspaceName, workspacePath, frags, takenNames, alreadyGenerated, workspaceContent, _a, _b, project, projectNames, frag, err_1, name_1, err_2;
        var e_1, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    prompts = __webpack_require__(25);
                    workspacePath = (0, process_1.cwd)();
                    frags = [];
                    takenNames = ['terraform'];
                    alreadyGenerated = [];
                    return [4 /*yield*/, (0, fs_1.maybeReadFile)((0, path_1.join)(workspacePath, 'app.code-workspace'))];
                case 1:
                    workspaceContent = _d.sent();
                    if (!(workspaceContent !== undefined)) return [3 /*break*/, 2];
                    workspaceName = (0, path_1.basename)(workspacePath);
                    try {
                        for (_a = __values(JSON.parse(workspaceContent).projects), _b = _a.next(); !_b.done; _b = _a.next()) {
                            project = _b.value;
                            frags.push(project);
                            projectNames = (0, generate_workspace_1.getProjectsFromWorkspaceFragment)(project).map(function (p) { return p.projectName; });
                            takenNames.push.apply(takenNames, __spreadArray([], __read(projectNames), false));
                            alreadyGenerated.push.apply(alreadyGenerated, __spreadArray([], __read(projectNames), false));
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    return [3 /*break*/, 5];
                case 2: return [4 /*yield*/, prompts({
                        type: 'text',
                        name: 'workspaceName',
                        message: 'Workspace name',
                        validate: function (v) { return v.length > 0; },
                    })];
                case 3:
                    // Ask for workspace name
                    workspaceName = (_d.sent()).workspaceName;
                    if (typeof workspaceName !== 'string') {
                        cancel();
                    }
                    workspacePath = (0, path_1.join)(workspacePath, workspaceName);
                    return [4 /*yield*/, (0, promises_1.mkdir)(workspacePath)];
                case 4:
                    _d.sent();
                    _d.label = 5;
                case 5:
                    _d.trys.push([5, 13, , 14]);
                    _d.label = 6;
                case 6:
                    if (false) {}
                    frag = void 0;
                    _d.label = 7;
                case 7:
                    _d.trys.push([7, 9, , 10]);
                    return [4 /*yield*/, askForWorkspaceFragment(takenNames)];
                case 8:
                    frag = _d.sent();
                    return [3 /*break*/, 10];
                case 9:
                    err_1 = _d.sent();
                    console.error(String(err_1));
                    return [3 /*break*/, 6];
                case 10:
                    if (frag) {
                        frags.push(frag);
                        takenNames.push.apply(takenNames, __spreadArray([], __read((0, generate_workspace_1.getProjectsFromWorkspaceFragment)(frag).map(function (p) { return p.projectName; })), false));
                    }
                    else {
                        return [3 /*break*/, 11];
                    }
                    return [3 /*break*/, 6];
                case 11:
                    name_1 = workspaceName;
                    return [4 /*yield*/, (0, generate_workspace_1.generateWorkspace)(workspacePath, name_1, frags, alreadyGenerated)];
                case 12:
                    _d.sent();
                    return [3 /*break*/, 14];
                case 13:
                    err_2 = _d.sent();
                    console.error(String(err_2));
                    cancel(workspaceName);
                    return [3 /*break*/, 14];
                case 14: return [2 /*return*/];
            }
        });
    });
}
function askForWorkspaceFragment(takenNames) {
    return __awaiter(this, void 0, void 0, function () {
        var prompts, DONE_GENERATING, workspaceFragmentType, type, websiteName, lambdaName, websiteName, lambdaName;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    prompts = __webpack_require__(25);
                    DONE_GENERATING = 'done_generating';
                    return [4 /*yield*/, prompts({
                            type: 'select',
                            name: 'workspaceFragmentType',
                            message: 'Choose a type of project to add to the workspace',
                            choices: [
                                { title: 'Web App', value: models_1.WorkspaceFragmentType.WebApp },
                                { title: 'Static Website', value: models_1.WorkspaceFragmentType.StaticWebsite },
                                { title: 'Standalone Lambda', value: models_1.WorkspaceFragmentType.StandaloneLambda },
                                { title: "I'm done", value: DONE_GENERATING },
                            ],
                        })];
                case 1:
                    workspaceFragmentType = (_a.sent()).workspaceFragmentType;
                    if (workspaceFragmentType === undefined || workspaceFragmentType === DONE_GENERATING) {
                        return [2 /*return*/, undefined];
                    }
                    type = workspaceFragmentType;
                    if (!(type === models_1.WorkspaceFragmentType.StaticWebsite)) return [3 /*break*/, 3];
                    return [4 /*yield*/, askForProjectName('Website project name', 'website', takenNames)];
                case 2:
                    websiteName = _a.sent();
                    return [2 /*return*/, { type: type, websiteName: websiteName }];
                case 3:
                    if (!(type === models_1.WorkspaceFragmentType.StandaloneLambda)) return [3 /*break*/, 5];
                    return [4 /*yield*/, askForProjectName('Lambda project name', 'lambda', takenNames)];
                case 4:
                    lambdaName = _a.sent();
                    return [2 /*return*/, { type: type, lambdaName: lambdaName }];
                case 5:
                    if (!(type === models_1.WorkspaceFragmentType.WebApp)) return [3 /*break*/, 8];
                    return [4 /*yield*/, askForProjectName('Frontend project name', 'frontend', takenNames)];
                case 6:
                    websiteName = _a.sent();
                    return [4 /*yield*/, askForProjectName('Backend project name', 'backend', takenNames)];
                case 7:
                    lambdaName = _a.sent();
                    return [2 /*return*/, { type: type, websiteName: websiteName, lambdaName: lambdaName }];
                case 8:
                    (0, type_utils_1.neverHappens)(type, 'WorkspaceFragmentType');
                    _a.label = 9;
                case 9: return [2 /*return*/];
            }
        });
    });
}
function askForProjectName(question, defaultValue, takenNames) {
    return __awaiter(this, void 0, void 0, function () {
        var prompts, initial, index, value;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    prompts = __webpack_require__(25);
                    initial = defaultValue;
                    if (takenNames.includes(initial)) {
                        index = 2;
                        while (takenNames.includes(initial)) {
                            initial = defaultValue + "_" + index;
                            index++;
                        }
                    }
                    return [4 /*yield*/, prompts({
                            type: 'text',
                            name: 'value',
                            message: question,
                            initial: initial,
                            validate: function (v) { return v.length > 0; },
                        })];
                case 1:
                    value = (_a.sent()).value;
                    if (typeof value !== 'string') {
                        throw new Error(question + " is required");
                    }
                    if (takenNames.includes(value)) {
                        throw new Error(value + " is taken");
                    }
                    return [2 /*return*/, value];
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


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorkspaceFragmentType = exports.PROJECT_TYPE_TO_METADATA = exports.ProjectType = exports.ALL_RUNTIME_TYPES = exports.RuntimeType = void 0;
//
// Runtime types
//
var RuntimeType;
(function (RuntimeType) {
    RuntimeType["Web"] = "web";
    RuntimeType["Node"] = "node";
    RuntimeType["Lib"] = "lib";
    RuntimeType["Lambda"] = "lambda";
    RuntimeType["ReactNative"] = "react-native";
})(RuntimeType = exports.RuntimeType || (exports.RuntimeType = {}));
exports.ALL_RUNTIME_TYPES = [
    RuntimeType.Web,
    RuntimeType.Node,
    RuntimeType.Lib,
    RuntimeType.Lambda,
    RuntimeType.ReactNative,
];
//
// Project type
//
var ProjectType;
(function (ProjectType) {
    ProjectType["Web"] = "web";
    ProjectType["LambdaFunction"] = "lambda_function";
    ProjectType["LambdaApi"] = "lambda_api";
})(ProjectType = exports.ProjectType || (exports.ProjectType = {}));
exports.PROJECT_TYPE_TO_METADATA = (_a = {},
    _a[ProjectType.Web] = { runtimeType: RuntimeType.Web },
    _a[ProjectType.LambdaFunction] = { runtimeType: RuntimeType.Lambda },
    _a[ProjectType.LambdaApi] = { runtimeType: RuntimeType.Lambda },
    _a);
//
// Workspace Fragment type
//
var WorkspaceFragmentType;
(function (WorkspaceFragmentType) {
    WorkspaceFragmentType["StaticWebsite"] = "static-website";
    WorkspaceFragmentType["StandaloneLambda"] = "standalone-lambda";
    WorkspaceFragmentType["WebApp"] = "web-app";
})(WorkspaceFragmentType = exports.WorkspaceFragmentType || (exports.WorkspaceFragmentType = {}));


/***/ }),
/* 5 */
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
exports.generateWorkspace = exports.getProjectsFromWorkspaceFragment = void 0;
var child_process_1 = __webpack_require__(6);
var path_1 = __webpack_require__(1);
var fs_1 = __webpack_require__(7);
var models_1 = __webpack_require__(4);
var vscode_workspace_1 = __webpack_require__(10);
var generate_project_1 = __webpack_require__(11);
var gitignore_1 = __webpack_require__(13);
var package_json_1 = __webpack_require__(14);
var setup_script_1 = __webpack_require__(15);
var deploy_script_1 = __webpack_require__(16);
var all_1 = __webpack_require__(18);
var type_utils_1 = __webpack_require__(17);
function getProjectsFromWorkspaceFragment(fragment) {
    var type = fragment.type;
    if (type === models_1.WorkspaceFragmentType.StaticWebsite) {
        return [
            {
                projectName: fragment.websiteName,
                type: models_1.ProjectType.Web,
            },
        ];
    }
    else if (type === models_1.WorkspaceFragmentType.StandaloneLambda) {
        return [
            {
                projectName: fragment.lambdaName,
                type: models_1.ProjectType.LambdaApi,
            },
        ];
    }
    else if (type === models_1.WorkspaceFragmentType.WebApp) {
        return [
            {
                projectName: fragment.websiteName,
                type: models_1.ProjectType.Web,
            },
            {
                projectName: fragment.lambdaName,
                type: models_1.ProjectType.LambdaApi,
            },
        ];
    }
    else {
        (0, type_utils_1.neverHappens)(type, 'ProjectType');
    }
}
exports.getProjectsFromWorkspaceFragment = getProjectsFromWorkspaceFragment;
function generateWorkspace(dst, workspaceName, workspaceFragments, alreadyGenerated) {
    return __awaiter(this, void 0, void 0, function () {
        var projects, projectNames, terraformPath, commands;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    projects = workspaceFragments.flatMap(getProjectsFromWorkspaceFragment);
                    projectNames = projects.map(function (p) { return p.projectName; });
                    // Create projects files from templates
                    return [4 /*yield*/, Promise.all(projects
                            .filter(function (p) { return !alreadyGenerated.includes(p.projectName); })
                            .map(function (project) { return (0, generate_project_1.generateProject)((0, path_1.join)(dst, project.projectName), project); }))];
                case 1:
                    // Create projects files from templates
                    _a.sent();
                    // package.json
                    return [4 /*yield*/, (0, fs_1.writeJsonFile)((0, path_1.join)(dst, 'package.json'), (0, package_json_1.generateWorkspacePackageJson)(workspaceName))];
                case 2:
                    // package.json
                    _a.sent();
                    // .gitignore
                    return [4 /*yield*/, (0, fs_1.writeRawFile)((0, path_1.join)(dst, '.gitignore'), (0, gitignore_1.generateGitIgnore)())];
                case 3:
                    // .gitignore
                    _a.sent();
                    // app.code-workspace
                    return [4 /*yield*/, (0, fs_1.writeJsonFile)((0, path_1.join)(dst, 'app.code-workspace'), (0, vscode_workspace_1.generateCodeWorkspace)(workspaceFragments))];
                case 4:
                    // app.code-workspace
                    _a.sent();
                    // setup.js
                    return [4 /*yield*/, (0, fs_1.writeJsFile)((0, path_1.join)(dst, 'setup.js'), (0, setup_script_1.generateSetupScript)(projectNames))];
                case 5:
                    // setup.js
                    _a.sent();
                    // deploy.js
                    return [4 /*yield*/, (0, fs_1.writeJsFile)((0, path_1.join)(dst, 'deploy.js'), (0, deploy_script_1.generateDeployScript)(workspaceFragments))];
                case 6:
                    // deploy.js
                    _a.sent();
                    terraformPath = (0, path_1.join)(dst, 'terraform');
                    (0, fs_1.writeRawFile)((0, path_1.join)(terraformPath, 'base.tf'), (0, all_1.generateCommonTerraform)(workspaceName, projects));
                    return [4 /*yield*/, Promise.all(projects
                            .filter(function (p) { return !alreadyGenerated.includes(p.projectName); })
                            .map(function (p) { return __awaiter(_this, void 0, void 0, function () {
                            var content, name;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        content = (0, all_1.generateWorkspaceProjectTerraform)(p);
                                        name = p.projectName + "_terraform";
                                        return [4 /*yield*/, (0, fs_1.writeRawFile)((0, path_1.join)(terraformPath, name + ".tf"), content)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 7:
                    _a.sent();
                    // Run setup.js
                    console.log('Running post install script');
                    commands = ["cd " + dst, "node setup.js"];
                    (0, child_process_1.execSync)(commands.join(' && '), { stdio: ['ignore', 'inherit', 'inherit'] });
                    return [2 /*return*/];
            }
        });
    });
}
exports.generateWorkspace = generateWorkspace;


/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),
/* 7 */
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
exports.maybeReadFile = exports.exists = exports.cp = exports.cleanDir = exports.rmDir = exports.writeRawFile = exports.writeJsFile = exports.writeJsonFile = exports.stat = exports.readdir = exports.readFile = exports.access = void 0;
var child_process_1 = __webpack_require__(6);
var fs_1 = __webpack_require__(8);
var path_1 = __webpack_require__(1);
var prettier_1 = __webpack_require__(9);
exports.access = fs_1.promises.access, exports.readFile = fs_1.promises.readFile, exports.readdir = fs_1.promises.readdir, exports.stat = fs_1.promises.stat;
var writeFile = fs_1.promises.writeFile, mkdir = fs_1.promises.mkdir, rm = fs_1.promises.rm;
function writeJsonFile(path, json) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, writeRawFile(path, JSON.stringify(json, undefined, 2) + "\n")];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.writeJsonFile = writeJsonFile;
function writeJsFile(path, js) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, writeRawFile(path, (0, prettier_1.format)(js, {
                        parser: 'babel',
                        printWidth: 100,
                        singleQuote: true,
                        trailingComma: 'es5',
                        bracketSpacing: false,
                        arrowParens: 'avoid',
                        endOfLine: 'auto',
                    }) + "\n")];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.writeJsFile = writeJsFile;
function writeRawFile(path, content) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("write " + path);
                    return [4 /*yield*/, mkdir((0, path_1.dirname)(path), { recursive: true })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, writeFile(path, content)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.writeRawFile = writeRawFile;
function rmDir(dirPath) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, rm(dirPath, { recursive: true, force: true })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.rmDir = rmDir;
function cleanDir(dirPath) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('clean', dirPath);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, , 3, 5]);
                    return [4 /*yield*/, rmDir(dirPath)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, mkdir(dirPath, { recursive: true })];
                case 4:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.cleanDir = cleanDir;
function cp(from, to) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log('copy', from, to);
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    return (0, child_process_1.exec)("cp -R " + from + " " + to, function (err) { return (err ? reject(err) : resolve()); });
                })];
        });
    });
}
exports.cp = cp;
function exists(path) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, exports.access)(path)];
                case 1:
                    _b.sent();
                    return [2 /*return*/, true];
                case 2:
                    _a = _b.sent();
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.exists = exists;
function maybeReadFile(path) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, exports.readFile)(path)];
                case 1: return [2 /*return*/, (_b.sent()).toString()];
                case 2:
                    _a = _b.sent();
                    return [2 /*return*/, undefined];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.maybeReadFile = maybeReadFile;


/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("prettier");

/***/ }),
/* 10 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateCodeWorkspace = void 0;
var generate_workspace_1 = __webpack_require__(5);
function generateCodeWorkspace(workspaceFragments) {
    var projects = workspaceFragments.flatMap(generate_workspace_1.getProjectsFromWorkspaceFragment);
    var projectNames = projects.map(function (p) { return p.projectName; });
    return {
        projects: workspaceFragments,
        folders: __spreadArray(__spreadArray([], __read(projectNames.map(function (p) { return ({ path: p }); })), false), [
            { path: 'terraform' },
            { path: '.', name: 'root' },
        ], false),
        settings: {
            'files.exclude': Object.fromEntries(__spreadArray(__spreadArray([], __read(projectNames.map(function (p) { return [p, true]; })), false), [
                ['terraform', true],
            ], false)),
            'editor.acceptSuggestionOnCommitCharacter': false,
            'editor.suggestSelection': 'first',
            'vsintellicode.modify.editor.suggestSelection': 'automaticallyOverrodeDefaultValue',
            'explorer.confirmDelete': false,
            'git.autofetch': true,
            'git.confirmSync': false,
            'typescript.preferences.importModuleSpecifier': 'non-relative',
            'eslint.lintTask.enable': true,
            "eslint.useESLintClass": true,
            "eslint.options": {
                "reportUnusedDisableDirectives": "warn"
            },
            'editor.formatOnSave': true,
            'editor.codeActionsOnSave': {
                'source.fixAll': false,
                'source.fixAll.eslint': true,
            },
            'editor.defaultFormatter': 'esbenp.prettier-vscode',
            'emmet.showExpandedAbbreviation': 'never',
        },
        extensions: {
            recommendations: [
                'dbaeumer.vscode-eslint',
                'esbenp.prettier-vscode',
                'VisualStudioExptTeam.vscodeintellicode',
                'styled-components.vscode-styled-components',
                'naumovs.color-highlight',
                'eamodio.gitlens',
            ],
        },
    };
}
exports.generateCodeWorkspace = generateCodeWorkspace;


/***/ }),
/* 11 */
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateProject = void 0;
var child_process_1 = __webpack_require__(6);
var path_1 = __webpack_require__(1);
var fs_1 = __webpack_require__(7);
var models_1 = __webpack_require__(4);
var versions_1 = __webpack_require__(12);
var TEMPLATES_PATH = (0, path_1.join)(__dirname, 'templates');
function generateProject(dst, project) {
    return __awaiter(this, void 0, void 0, function () {
        var projectName, type, variables, files, commands;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    projectName = project.projectName, type = project.type;
                    variables = {
                        PROJECT_NAME: projectName,
                        REACT_ROUTER_VERSION: versions_1.REACT_ROUTER_VERSION,
                        REACT_VERSION: versions_1.REACT_VERSION,
                        REACT_NATIVE_VERSION: versions_1.REACT_NATIVE_VERSION,
                        STYLED_COMPONENTS_TYPES_VERSION: versions_1.STYLED_COMPONENTS_TYPES_VERSION,
                        STYLED_COMPONENTS_VERSION: versions_1.STYLED_COMPONENTS_VERSION,
                        NODE_TYPES_VERSION: versions_1.NODE_TYPES_VERSION,
                    };
                    return [4 /*yield*/, getFiles((0, path_1.join)(TEMPLATES_PATH, type))];
                case 1:
                    files = _a.sent();
                    return [4 /*yield*/, Promise.all(__spreadArray([], __read(files.map(function (f) { return __awaiter(_this, void 0, void 0, function () {
                            var fileContent, compiledContent, fPath;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, (0, fs_1.readFile)((0, path_1.join)(TEMPLATES_PATH, type, f))];
                                    case 1:
                                        fileContent = _a.sent();
                                        compiledContent = fileContent
                                            .toString()
                                            .replace(/\{\{([^\}]+)\}\}/gu, function (match, vName) { var _a; return (_a = variables[vName]) !== null && _a !== void 0 ? _a : match; });
                                        fPath = (0, path_1.join)(dst, f);
                                        return [4 /*yield*/, (0, fs_1.writeRawFile)(fPath, compiledContent)];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })), false))];
                case 2:
                    _a.sent();
                    // Post generation script for React Native project
                    if (models_1.PROJECT_TYPE_TO_METADATA[type].runtimeType === models_1.RuntimeType.ReactNative) {
                        console.log('Running post install script');
                        commands = [
                            "pushd " + dst,
                            "npx --yes react-native init " + projectName,
                            "mv " + projectName + "/ios .",
                            "mv " + projectName + "/android .",
                            "rm -rf " + projectName,
                            "popd",
                        ];
                        (0, child_process_1.execSync)(commands.join(' && '));
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.generateProject = generateProject;
function getFiles(path) {
    return __awaiter(this, void 0, void 0, function () {
        var subdirs, files;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, fs_1.readdir)(path)];
                case 1:
                    subdirs = _a.sent();
                    return [4 /*yield*/, Promise.all(subdirs.map(function (subdir) { return __awaiter(_this, void 0, void 0, function () {
                            var p, _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        p = (0, path_1.join)(path, subdir);
                                        return [4 /*yield*/, (0, fs_1.stat)(p)];
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


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NODE_TYPES_VERSION = exports.STYLED_COMPONENTS_VERSION = exports.STYLED_COMPONENTS_TYPES_VERSION = exports.REACT_NATIVE_VERSION = exports.REACT_ROUTER_VERSION = exports.REACT_VERSION = exports.TYPESCRIPT_VERSION = exports.PRETTIER_VERSION = exports.ESLINT_VERSION = exports.PACKAGE_VERSIONS = void 0;
exports.PACKAGE_VERSIONS = {
    project: '1.1.14',
    eslint: '1.0.25',
    prettier: '1.0.4',
    tsconfig: '1.0.9',
    webpack: '1.0.25',
};
exports.ESLINT_VERSION = '8.23.x';
exports.PRETTIER_VERSION = '2.7.x';
exports.TYPESCRIPT_VERSION = '4.8.x';
exports.REACT_VERSION = '17.0.x';
exports.REACT_ROUTER_VERSION = '5.2.x';
exports.REACT_NATIVE_VERSION = '0.66.x';
exports.STYLED_COMPONENTS_TYPES_VERSION = '5.1.x';
exports.STYLED_COMPONENTS_VERSION = '5.1.x';
exports.NODE_TYPES_VERSION = '16.11.x';


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateGitIgnore = void 0;
function generateGitIgnore() {
    return "\n.DS_Store\nnode_modules\nbuild\ndist\ntmp\nyarn-error.log\nyarn.lock\nterraform/.terraform\nterraform/.terraform*\nterraform/*.tfstate.backup\nterraform/.aws-credentials\nterraform/archives\n    ".trim();
}
exports.generateGitIgnore = generateGitIgnore;


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateWorkspacePackageJson = void 0;
function generateWorkspacePackageJson(workspaceName) {
    return {
        name: workspaceName,
        license: 'UNLICENSED',
        scripts: {
            setup: 'node ./setup.js',
            deploy: 'node ./deploy.js',
        },
    };
}
exports.generateWorkspacePackageJson = generateWorkspacePackageJson;


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateSetupScript = void 0;
function generateSetupScript(projects) {
    return ("\nconst path = require('path');\nconst {execSync, exec} = require('child_process');\n\n//\n\nfunction detectYarn() {\n  try {\n    const yarnVersion = execSync('yarn -v', {stdio: ['ignore', 'pipe', 'ignore']}).toString();\n    if (!yarnVersion.split('\\n')[0].match(/^\\d+.\\d+.\\d+$/)) {\n      return `Invalid yarn version \"${yarnVersion}\"`;\n    }\n  } catch (err) {\n    return 'Yarn is not installed';\n  }\n}\n\nfunction detectTerraform() {\n  try {\n    const terraformVersion = execSync('terraform -v', {\n      stdio: ['ignore', 'pipe', 'ignore'],\n    }).toString();\n    if (!terraformVersion.split('\\n')[0].match(/^Terraform v\\d+.\\d+.\\d+$/)) {\n      return `Invalid terraform version \"${terraformVersion}\"`;\n    }\n  } catch (err) {\n    return 'Terraform is not installed';\n  }\n}\n\nfunction requirementDetection() {\n  const errors = [detectYarn(), detectTerraform()].filter(err => typeof err === 'string');\n  if (errors.length > 0) {\n    console.error(errors.join('\\n'));\n    return false;\n  }\n  return true;\n}\n\n//\n\nasync function installNodeModulesAtPath(path) {\n  return new Promise((resolve, reject) => {\n    exec(`yarn install --non-interactive`, {cwd: path}, (error, stdout, stderr) => {\n      if (!error) {\n        resolve();\n      } else {\n        console.error(`Failure to run \\`yarn install\\` at \"${path}\"`);\n        reject();\n      }\n    });\n  });\n}\n\nasync function installNodeModules() {\n" + projects
        .map(function (p) { return "  await installNodeModulesAtPath(path.join(process.cwd(), '" + p + "'));"; })
        .join('\n') + "\n}\n\nasync function run() {\n  console.log('Checking requirements...');\n  if (!requirementDetection()) {\n    throw 'requirementDetection failure';\n  }\n  console.log('Installing node_modules...');\n  await installNodeModules();\n  console.log('Done');\n}\n\nrun()\n  .catch(err => {\n    console.error(err);\n    console.log('Fix the issue then run `node setup.js` manually');\n  })\n  .catch(() => process.exit(13));\n  ").trim();
}
exports.generateSetupScript = generateSetupScript;


/***/ }),
/* 16 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateBuildStandaloneLambdaProjectFn = exports.generateBuildStaticWebsiteProjectFn = exports.generateBuildWebAppProjectFn = exports.generateBuildWorkspaceFn = exports.generateDeployScript = void 0;
var models_1 = __webpack_require__(4);
var type_utils_1 = __webpack_require__(17);
var generate_workspace_1 = __webpack_require__(5);
function generateDeployScript(workspaceFragments) {
    var projects = workspaceFragments.flatMap(generate_workspace_1.getProjectsFromWorkspaceFragment);
    return ("\nconst path = require('path');\nconst child_process = require('child_process');\nconst fs = require('fs');\n\nconst terraformPath = path.join(process.cwd(), 'terraform');\n\nfunction runCommand(opts) {\n  const {command, cwd, env} = opts;\n  console.log('-----------------------------------------');\n  console.log(`Running: \\`${command}\\``);\n  console.log('-----------------------------------------');\n  child_process.execSync(command, {cwd, env, stdio: 'inherit'});\n}\n\nfunction ensureDistFolders(projects) {\n  for (const {dist, isLambda} of projects) {\n    try {\n      fs.accessSync(dist);\n    } catch {\n      fs.mkdirSync(dist);\n    }\n    if (isLambda) {\n      const files = fs.readdirSync(dist);\n      if (files.length === 0) {\n        fs.writeFileSync(\n          path.join(dist, 'main.js'),\n          `exports.handler = async function() {return ''};`\n        );\n      }\n    }\n  }\n}\n\nfunction checkTerraformCredentials() {\n  const credentialsPath = path.join(terraformPath, '.aws-credentials');\n  try {\n    fs.accessSync(credentialsPath);\n  } catch {\n    throw new Error(`Missing AWS credential files at \"${credentialsPath}\"\\nTo use your current credentials with this project run:\\ncp ~/.aws/credentials ${credentialsPath}`);\n  }\n}\n\nfunction terraformOutputs() {\n  return JSON.parse(child_process.execSync(`terraform output -json`, {cwd: terraformPath}).toString());\n}\n\n" + projects
        .flatMap(function (p) { return [
        "    const " + p.projectName + "Path = path.join(process.cwd(), '" + p.projectName + "');",
        "    const " + p.projectName + "Dist = path.join(" + p.projectName + "Path, 'dist');",
    ]; })
        .join('\n') + "\n\n" + generateBuildWorkspaceFn(workspaceFragments) + "\n\nasync function run() {\n  // Initialize if needed and get terraform outputs\n  ensureDistFolders([\n" + projects
        .map(function (p) {
        var isLambda = models_1.PROJECT_TYPE_TO_METADATA[p.type].runtimeType === models_1.RuntimeType.Lambda;
        return "    {dist: " + p.projectName + "Dist" + (isLambda ? ', isLambda: true' : '') + "},";
    })
        .join('\n') + "\n  ]);\n  let outputs = terraformOutputs();\n  if (Object.keys(outputs).length === 0) {\n    checkTerraformCredentials();\n    runCommand({command: `terraform init`, cwd: terraformPath});\n    runCommand({command: `terraform apply -auto-approve`, cwd: terraformPath});\n    outputs = terraformOutputs();\n  }\n\n  // Build the projects\n  await buildWorkspace(outputs);\n\n  // Terraform\n  runCommand({command: `terraform apply -auto-approve`, cwd: terraformPath});\n  console.log('Done');\n}\n\nrun()\n  .catch(err => console.error(err))\n  .catch(() => process.exit(13));  \n  ").trim();
}
exports.generateDeployScript = generateDeployScript;
function generateBuildWorkspaceFn(fragments) {
    var buildFunctions = fragments.map(function (fragment) {
        var type = fragment.type;
        if (type === models_1.WorkspaceFragmentType.WebApp) {
            return generateBuildWebAppProjectFn(fragment);
        }
        else if (type === models_1.WorkspaceFragmentType.StaticWebsite) {
            return generateBuildStaticWebsiteProjectFn(fragment);
        }
        else if (type === models_1.WorkspaceFragmentType.StandaloneLambda) {
            return generateBuildStandaloneLambdaProjectFn(fragment);
        }
        else {
            (0, type_utils_1.neverHappens)(type, 'WorkspaceFragmentType');
        }
    });
    return __spreadArray(__spreadArray([], __read(buildFunctions.map(function (fn) { return fn.sourceCode; })), false), [
        ("\nasync function buildWorkspace(outputs) {\n  await Promise.all([" + buildFunctions.map(function (fn) { return fn.name + "(outputs)"; }).join(', ') + "]);\n}\n  ").trim(),
    ], false).join('\n\n')
        .trim();
}
exports.generateBuildWorkspaceFn = generateBuildWorkspaceFn;
function generateBuildWebAppProjectFn(fragment) {
    var functionName = "buildWebApp_" + fragment.websiteName;
    return {
        sourceCode: "\nasync function " + functionName + "(outputs) {\n  // Build the \"" + fragment.websiteName + "\" frontend\n  runCommand({\n    command: `yarn build`,\n    cwd: " + fragment.websiteName + "Path,\n    env: {...process.env, PUBLIC_PATH: `https://${outputs." + fragment.websiteName + "_cloudfront_domain_name.value}`},\n  });\n  const INDEX_HTML = fs.readFileSync(path.join(" + fragment.websiteName + "Dist, 'index.html')).toString();\n\n  // Build the \"" + fragment.lambdaName + "\" backend\n  runCommand({command: 'rm -rf dist', cwd: " + fragment.lambdaName + "Path});\n  runCommand({\n    command: `yarn build`,\n    cwd: " + fragment.lambdaName + "Path,\n    env: {...process.env, MATTHIS_INDEX_HTML: JSON.stringify(INDEX_HTML)},\n  });\n  runCommand({\n    command: `yarn install --modules-folder dist/node_modules --production --no-bin-links`,\n    cwd: " + fragment.lambdaName + "Path,\n  });\n}\n",
        name: functionName,
    };
}
exports.generateBuildWebAppProjectFn = generateBuildWebAppProjectFn;
function generateBuildStaticWebsiteProjectFn(fragment) {
    var functionName = "buildStaticWebsite_" + fragment.websiteName;
    return {
        sourceCode: "\nasync function " + functionName + "(outputs) {\n  runCommand({\n    command: `yarn build`,\n    cwd: " + fragment.websiteName + "Path,\n    env: {...process.env, PUBLIC_PATH: `https://${outputs." + fragment.websiteName + "_cloudfront_domain_name.value}`},\n  });\n}\n",
        name: functionName,
    };
}
exports.generateBuildStaticWebsiteProjectFn = generateBuildStaticWebsiteProjectFn;
function generateBuildStandaloneLambdaProjectFn(fragment) {
    var functionName = "buildStandaloneLambda_" + fragment.lambdaName;
    return {
        sourceCode: "\nasync function " + functionName + "(outputs) {\n  runCommand({command: 'rm -rf dist', cwd: " + fragment.lambdaName + "Path});\n  runCommand({\n    command: `yarn build`,\n    cwd: " + fragment.lambdaName + "Path,\n  });\n  runCommand({\n    command: `yarn install --modules-folder dist/node_modules --production --no-bin-links`,\n    cwd: " + fragment.lambdaName + "Path,\n  });\n}\n",
        name: functionName,
    };
}
exports.generateBuildStandaloneLambdaProjectFn = generateBuildStandaloneLambdaProjectFn;


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.neverHappens = void 0;
function neverHappens(value, typeName) {
    throw new Error("Invalid " + typeName + " value \"" + value + "\"");
}
exports.neverHappens = neverHappens;


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateLambdaApiTerraform = exports.generateLambdaFunctionTerraform = exports.generateWebTerraform = exports.generateWorkspaceProjectTerraform = exports.generateCommonTerraform = void 0;
var models_1 = __webpack_require__(4);
var type_utils_1 = __webpack_require__(17);
var api_gateway_1 = __webpack_require__(19);
var cloudfront_1 = __webpack_require__(20);
var lambda_1 = __webpack_require__(21);
var output_1 = __webpack_require__(22);
var provider_1 = __webpack_require__(23);
var s3_1 = __webpack_require__(24);
function generateCommonTerraform(workspaceName, projects) {
    return [
        (0, provider_1.generateAwsProviderTerraform)(workspaceName),
        (0, s3_1.generateS3BucketTerraform)(workspaceName, projects
            .filter(function (p) { return models_1.PROJECT_TYPE_TO_METADATA[p.type].runtimeType === models_1.RuntimeType.Web; })
            .map(function (p) { return p.projectName; })),
    ].join('\n\n');
}
exports.generateCommonTerraform = generateCommonTerraform;
function generateWorkspaceProjectTerraform(project) {
    var projectName = project.projectName, type = project.type;
    if (type === models_1.ProjectType.Web) {
        return generateWebTerraform(projectName);
    }
    else if (type === models_1.ProjectType.LambdaFunction) {
        return generateLambdaFunctionTerraform(projectName);
    }
    else if (type === models_1.ProjectType.LambdaApi) {
        return generateLambdaApiTerraform(projectName);
    }
    else {
        (0, type_utils_1.neverHappens)(type, 'ProjectType');
    }
}
exports.generateWorkspaceProjectTerraform = generateWorkspaceProjectTerraform;
function generateWebTerraform(projectName) {
    return [
        (0, output_1.generateCloudfrontDomainNameOutputTerraform)(projectName),
        (0, s3_1.generateWebFileUploadTerraform)(projectName),
        (0, cloudfront_1.generateCloudfrontDistributionTerraform)(projectName),
    ].join('\n\n');
}
exports.generateWebTerraform = generateWebTerraform;
function generateLambdaFunctionTerraform(projectName) {
    return [
        (0, lambda_1.generateLambdaTerraform)(projectName),
        (0, s3_1.generateLambdaFileUploadTerraform)(projectName),
    ].join('\n\n');
}
exports.generateLambdaFunctionTerraform = generateLambdaFunctionTerraform;
function generateLambdaApiTerraform(projectName) {
    return [
        generateLambdaFunctionTerraform(projectName),
        (0, output_1.generateLambdaApiOutputsTerraform)(projectName),
        (0, api_gateway_1.generateApiGatewayTerraform)(projectName),
    ].join('\n\n');
}
exports.generateLambdaApiTerraform = generateLambdaApiTerraform;


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateApiGatewayTerraform = void 0;
function generateApiGatewayTerraform(projectName) {
    return ("\nresource \"aws_api_gateway_rest_api\" \"" + projectName + "\" {\n  name        = \"" + projectName + "-RestAPI\"\n  description = \"Rest API for the \\\"" + projectName + "\\\" app\"\n}\n\nresource \"aws_api_gateway_resource\" \"" + projectName + "\" {\n  rest_api_id = aws_api_gateway_rest_api." + projectName + ".id\n  parent_id   = aws_api_gateway_rest_api." + projectName + ".root_resource_id\n  path_part   = \"{proxy+}\"\n}\n  \nresource \"aws_api_gateway_method\" \"" + projectName + "\" {\n  rest_api_id   = aws_api_gateway_rest_api." + projectName + ".id\n  resource_id   = aws_api_gateway_resource." + projectName + ".id\n  http_method   = \"ANY\"\n  authorization = \"NONE\"\n}\n\nresource \"aws_api_gateway_method\" \"" + projectName + "_root\" {\n    rest_api_id   = aws_api_gateway_rest_api." + projectName + ".id\n    resource_id   = aws_api_gateway_rest_api." + projectName + ".root_resource_id\n    http_method   = \"ANY\"\n    authorization = \"NONE\"\n}\n\nresource \"aws_api_gateway_integration\" \"" + projectName + "\" {\n  rest_api_id = aws_api_gateway_rest_api." + projectName + ".id\n  resource_id = aws_api_gateway_method." + projectName + ".resource_id\n  http_method = aws_api_gateway_method." + projectName + ".http_method\n  \n  integration_http_method = \"POST\"\n  type                    = \"AWS_PROXY\"\n  uri                     = aws_lambda_function." + projectName + ".invoke_arn\n}\n\nresource \"aws_api_gateway_integration\" \"" + projectName + "_root\" {\n  rest_api_id = aws_api_gateway_rest_api." + projectName + ".id\n  resource_id = aws_api_gateway_method." + projectName + "_root.resource_id\n  http_method = aws_api_gateway_method." + projectName + "_root.http_method\n\n  integration_http_method = \"POST\"\n  type                    = \"AWS_PROXY\"\n  uri                     = aws_lambda_function." + projectName + ".invoke_arn\n}\n\nresource \"aws_api_gateway_deployment\" \"" + projectName + "\" {\n  depends_on = [\n    aws_api_gateway_integration." + projectName + ",\n    aws_api_gateway_integration." + projectName + "_root,\n  ]\n  rest_api_id = aws_api_gateway_rest_api." + projectName + ".id\n  stage_name  = \"prod\"\n\n  triggers = {\n    redeployment = sha1(jsonencode(aws_api_gateway_integration." + projectName + "))\n  }\n\n  lifecycle {\n    create_before_destroy = true\n  }\n}\n\nresource \"aws_lambda_permission\" \"" + projectName + "\" {\n  statement_id  = \"AllowAPIGatewayInvoke\"\n  action        = \"lambda:InvokeFunction\"\n  function_name = aws_lambda_function." + projectName + ".function_name\n  principal     = \"apigateway.amazonaws.com\"\n  source_arn    = \"${aws_api_gateway_rest_api." + projectName + ".execution_arn}/*/*\"\n}      \n").trim();
}
exports.generateApiGatewayTerraform = generateApiGatewayTerraform;


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateCloudfrontDistributionTerraform = void 0;
function generateCloudfrontDistributionTerraform(projectName) {
    var bucketName = projectName.toLowerCase().replace(/[^\d.a-z-]+/gu, '-');
    var originId = bucketName + "-origin-id";
    return ("\nresource \"aws_cloudfront_distribution\" \"" + projectName + "\" {\n  origin {\n    domain_name = aws_s3_bucket.code.bucket_regional_domain_name\n    origin_id   = \"" + originId + "\"\n    origin_path = \"/" + projectName + "\"\n\n    s3_origin_config {\n      origin_access_identity = aws_cloudfront_origin_access_identity." + projectName + ".cloudfront_access_identity_path\n    }\n  }\n  \n  enabled             = true\n  wait_for_deployment = false\n  is_ipv6_enabled     = true\n  price_class         = \"PriceClass_100\"\n  \n  default_root_object   = \"/index.html\"\n  custom_error_response {\n    error_code         = 400\n    response_code      = 200\n    response_page_path = \"/index.html\"\n  }\n  custom_error_response {\n    error_code         = 403\n    response_code      = 200\n    response_page_path = \"/index.html\"\n  }\n  custom_error_response {\n    error_code         = 404\n    response_code      = 200\n    response_page_path = \"/index.html\"\n  }\n\n  default_cache_behavior {\n    allowed_methods  = [\"HEAD\", \"GET\"]\n    cached_methods   = [\"HEAD\", \"GET\"]\n    compress         = true\n    target_origin_id = \"" + originId + "\"\n    viewer_protocol_policy = \"redirect-to-https\"\n    \n    forwarded_values {\n      query_string = false\n      cookies {\n        forward = \"none\"\n      }\n    }\n  }\n\n  restrictions {\n    geo_restriction {\n      restriction_type = \"none\"\n    }\n  }\n\n  viewer_certificate {\n    cloudfront_default_certificate = true\n  }\n}\n\nresource \"aws_cloudfront_origin_access_identity\" \"" + projectName + "\" {}\n  ").trim();
}
exports.generateCloudfrontDistributionTerraform = generateCloudfrontDistributionTerraform;


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateLambdaTerraform = void 0;
function generateLambdaTerraform(projectName) {
    return ("\n# Define any extra role for the lambda here\ndata \"aws_iam_policy_document\" \"lambda_" + projectName + "_extra_role\" {\n  statement {\n    actions   = [\"s3:ListAllMyBuckets\"]\n    resources = [\"*\"]\n  }\n}\n\nresource \"aws_lambda_function\" \"" + projectName + "\" {\n  function_name     = \"" + projectName + "-API\"\n  s3_bucket         = aws_s3_bucket.code.id\n  s3_key            = aws_s3_bucket_object." + projectName + "_archive.id\n  source_code_hash  = data.archive_file." + projectName + "_archive.output_sha\n  handler           = \"main.handler\"\n  runtime           = \"nodejs14.x\"\n  role              = aws_iam_role.lambda_" + projectName + "_exec.arn\n}\n\nresource \"aws_iam_role\" \"lambda_" + projectName + "_exec\" {\n  name = \"" + projectName + "-API-assume-role\"\n  assume_role_policy = jsonencode({\n    Version = \"2012-10-17\"\n    Statement = [\n      {\n        Action    = \"sts:AssumeRole\"\n        Principal = {\n          Service = \"lambda.amazonaws.com\"\n        }\n        Effect    = \"Allow\"\n        Sid       = \"\"\n      },\n    ]\n  })\n\n  inline_policy {\n    name = \"" + projectName + "-API-cloudwatch-role\"\n    policy = jsonencode({\n      Version = \"2012-10-17\"\n      Statement = [\n        {\n          Action   = [\n            \"logs:CreateLogGroup\",\n            \"logs:CreateLogStream\",\n            \"logs:PutLogEvents\"\n          ]\n          Effect   = \"Allow\"\n          Resource = \"arn:aws:logs:*:*:*\"\n        },\n      ]\n    })\n  }\n  \n  inline_policy {\n    name = \"" + projectName + "-API-extra-role\"\n    policy = data.aws_iam_policy_document.lambda_" + projectName + "_extra_role.json\n  }\n}\n").trim();
}
exports.generateLambdaTerraform = generateLambdaTerraform;


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateLambdaApiOutputsTerraform = exports.generateCloudfrontDomainNameOutputTerraform = void 0;
function generateCloudfrontDomainNameOutputTerraform(projectName) {
    return ("\noutput \"" + projectName + "_cloudfront_domain_name\" {\n  value       = aws_cloudfront_distribution." + projectName + ".domain_name\n  description = \"Domain (from cloudfront) where the \\\"" + projectName + "\\\" frontend is available.\"\n}").trim();
}
exports.generateCloudfrontDomainNameOutputTerraform = generateCloudfrontDomainNameOutputTerraform;
function generateLambdaApiOutputsTerraform(projectName) {
    return ("\noutput \"" + projectName + "_api_url\" {\n  value = aws_api_gateway_deployment." + projectName + ".invoke_url\n  description = \"URL where the \\\"" + projectName + "\\\" lambda api can be called.\"\n}").trim();
}
exports.generateLambdaApiOutputsTerraform = generateLambdaApiOutputsTerraform;


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateAwsProviderTerraform = void 0;
function generateAwsProviderTerraform(workspaceName) {
    return ("\nterraform {\n  required_providers {\n    aws = {\n      source  = \"hashicorp/aws\"\n      version = \"~> 3.0\"\n    }\n  }\n}\n\nprovider \"aws\" {\n  region  = \"eu-west-3\"\n  shared_credentials_file = \"./.aws-credentials\"\n  default_tags {\n    tags = {\n      Project = \"" + workspaceName + "\"\n    }\n  }\n}\n").trim();
}
exports.generateAwsProviderTerraform = generateAwsProviderTerraform;


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateLambdaFileUploadTerraform = exports.generateWebFileUploadTerraform = exports.generateS3BucketTerraform = void 0;
function generateS3BucketTerraform(workspaceName, webProjectNames) {
    var bucketName = workspaceName.toLowerCase().replace(/[^a-z0-9.-]+/gu, '-');
    return ("\nresource \"aws_s3_bucket\" \"code\" {\n  bucket_prefix = \"" + bucketName + "-\"\n}\n\nresource \"aws_s3_bucket_acl\" \"code_bucket_acl\" {\n  bucket = aws_s3_bucket.code.id\n  acl    = \"private\"\n}\n\ndata \"aws_iam_policy_document\" \"cloudfront_access_to_code\" {\n  " + webProjectNames
        .map(function (p) {
        return ("\n  statement {\n    actions   = [\"s3:GetObject\"]\n    resources = [\n      \"${aws_s3_bucket.code.arn}/" + p + "/*\",\n    ]\n    principals {\n      type        = \"AWS\"\n      identifiers = [aws_cloudfront_origin_access_identity." + p + ".iam_arn]\n    }\n  }\n").trim();
    })
        .join('\n\n') + "\n}\n\nresource \"aws_s3_bucket_policy\" \"code\" {\n  bucket = aws_s3_bucket.code.id\n  policy = data.aws_iam_policy_document.cloudfront_access_to_code.json\n}\n\n").trim();
}
exports.generateS3BucketTerraform = generateS3BucketTerraform;
function generateWebFileUploadTerraform(projectName) {
    return ("\nmodule \"" + projectName + "_template_files\" {\n  source = \"hashicorp/dir/template\"\n  base_dir = \"../" + projectName + "/dist\"\n}\n\nresource \"aws_s3_bucket_object\" \"" + projectName + "_files\" {\n  for_each     = module." + projectName + "_template_files.files\n  bucket       = aws_s3_bucket.code.id\n  key          = \"" + projectName + "/${each.key}\"\n  content_type = each.value.content_type\n  source       = each.value.source_path\n  content      = each.value.content\n  etag         = each.value.digests.md5\n}\n").trim();
}
exports.generateWebFileUploadTerraform = generateWebFileUploadTerraform;
function generateLambdaFileUploadTerraform(projectName) {
    return ("\ndata \"archive_file\" \"" + projectName + "_archive\" {\n  type        = \"zip\"\n  source_dir  = \"../" + projectName + "/dist\"\n  output_path = \"./archives/" + projectName + ".zip\"\n}\n\nresource \"aws_s3_bucket_object\" \"" + projectName + "_archive\" {\n  bucket       = aws_s3_bucket.code.id\n  key          = \"" + projectName + "/dist.zip\"\n  source       = data.archive_file." + projectName + "_archive.output_path\n  etag         = data.archive_file." + projectName + "_archive.output_sha\n}\n").trim();
}
exports.generateLambdaFileUploadTerraform = generateLambdaFileUploadTerraform;


/***/ }),
/* 25 */
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