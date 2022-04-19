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
var generate_workspace_1 = __webpack_require__(5);
function initProject() {
    return __awaiter(this, void 0, void 0, function () {
        var workspacePath, workspaceName, content, workspaceType;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    workspacePath = (0, process_1.cwd)();
                    workspaceName = (0, path_1.basename)(workspacePath);
                    return [4 /*yield*/, (0, promises_1.readdir)(workspacePath)];
                case 1:
                    content = _a.sent();
                    if (!!content.every(function (f) { return f.startsWith('.'); })) return [3 /*break*/, 3];
                    // workspaceName = (
                    //   await prompts({
                    //     type: 'text',
                    //     name: 'workspaceName',
                    //     message: 'Project name',
                    //     validate: (v: string) => v.length > 0,
                    //   })
                    // ).workspaceName;
                    workspaceName = 'test-web-app';
                    if (workspaceName === undefined) {
                        throw new Error("Project name is required");
                    }
                    workspacePath = (0, path_1.join)(workspacePath, workspaceName);
                    return [4 /*yield*/, (0, promises_1.mkdir)(workspacePath)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    workspaceType = models_1.WorkspaceType.WebApp;
                    if (!(workspaceType === models_1.WorkspaceType.WebApp)) return [3 /*break*/, 5];
                    return [4 /*yield*/, (0, generate_workspace_1.generateWorkspace)(workspacePath, workspaceName, workspaceType, [
                            { name: 'frontend', type: models_1.ProjectType.Web },
                            { name: 'backend', type: models_1.ProjectType.Lambda },
                        ])];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 10];
                case 5:
                    if (!(workspaceType === models_1.WorkspaceType.StaticWebsite)) return [3 /*break*/, 7];
                    return [4 /*yield*/, (0, generate_workspace_1.generateWorkspace)(workspacePath, workspaceName, workspaceType, [
                            { name: 'website', type: models_1.ProjectType.Web },
                        ])];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 10];
                case 7:
                    if (!(workspaceType === models_1.WorkspaceType.StandaloneLambda)) return [3 /*break*/, 9];
                    return [4 /*yield*/, (0, generate_workspace_1.generateWorkspace)(workspacePath, workspaceName, workspaceType, [
                            { name: 'lambda', type: models_1.ProjectType.Lambda },
                        ])];
                case 8:
                    _a.sent();
                    return [3 /*break*/, 10];
                case 9: throw new Error("Unknown workspaceType \"" + workspaceType + "\"");
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports["default"] = initProject;
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
exports.WorkspaceType = exports.ALL_TYPES = exports.ProjectType = void 0;
var ProjectType;
(function (ProjectType) {
    ProjectType["Web"] = "web";
    ProjectType["Node"] = "node";
    ProjectType["Lib"] = "lib";
    ProjectType["Lambda"] = "lambda";
    ProjectType["ReactNative"] = "react-native";
})(ProjectType = exports.ProjectType || (exports.ProjectType = {}));
exports.ALL_TYPES = [
    ProjectType.Web,
    ProjectType.Node,
    ProjectType.Lib,
    ProjectType.Lambda,
    ProjectType.ReactNative,
];
var WorkspaceType;
(function (WorkspaceType) {
    WorkspaceType["StaticWebsite"] = "static-website";
    WorkspaceType["StandaloneLambda"] = "standalone-lambda";
    WorkspaceType["WebApp"] = "web-app";
})(WorkspaceType = exports.WorkspaceType || (exports.WorkspaceType = {}));


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
exports.generateWorkspace = void 0;
var child_process_1 = __webpack_require__(6);
var path_1 = __webpack_require__(1);
var fs_1 = __webpack_require__(7);
var models_1 = __webpack_require__(4);
var vscode_workspace_1 = __webpack_require__(10);
var deploy_script_1 = __webpack_require__(11);
var generate_project_1 = __webpack_require__(12);
var gitignore_1 = __webpack_require__(14);
var package_json_1 = __webpack_require__(15);
var setup_script_1 = __webpack_require__(16);
var all_1 = __webpack_require__(17);
function generateWorkspace(dst, workspaceName, type, projects) {
    return __awaiter(this, void 0, void 0, function () {
        var projectNames, terraformPath, terraformFiles, commands;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    projectNames = projects.map(function (p) { return p.name; });
                    // Create projects files from templates
                    return [4 /*yield*/, Promise.all(projects.map(function (project) {
                            return (0, generate_project_1.generateProject)((0, path_1.join)(dst, project.name), workspaceName + "-" + project.name, project.type);
                        }))];
                case 1:
                    // Create projects files from templates
                    _a.sent();
                    // package.json
                    return [4 /*yield*/, (0, fs_1.writeJsonFile)((0, path_1.join)(dst, 'package.json'), (0, package_json_1.generateWorkspacePackageJson)(workspaceName))];
                case 2:
                    // package.json
                    _a.sent();
                    // .gitignore
                    return [4 /*yield*/, (0, fs_1.writeFile)((0, path_1.join)(dst, '.gitignore'), (0, gitignore_1.generateGitIgnore)())];
                case 3:
                    // .gitignore
                    _a.sent();
                    // app.code-workspace
                    return [4 /*yield*/, (0, fs_1.writeJsonFile)((0, path_1.join)(dst, 'app.code-workspace'), (0, vscode_workspace_1.generateCodeWorkspace)(projectNames))];
                case 4:
                    // app.code-workspace
                    _a.sent();
                    // setup.js
                    return [4 /*yield*/, (0, fs_1.writeJsFile)((0, path_1.join)(dst, 'setup.js'), (0, setup_script_1.generateSetupScript)(projectNames))];
                case 5:
                    // setup.js
                    _a.sent();
                    if (!(type === models_1.WorkspaceType.WebApp)) return [3 /*break*/, 7];
                    return [4 /*yield*/, (0, fs_1.writeJsFile)((0, path_1.join)(dst, 'deploy.js'), (0, deploy_script_1.generateWebAppDeployScript)())];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    terraformPath = (0, path_1.join)(dst, 'terraform');
                    return [4 /*yield*/, (0, fs_1.mkdir)(terraformPath, { recursive: true })];
                case 8:
                    _a.sent();
                    terraformFiles = (0, all_1.generateTerraformForWorkspace)(workspaceName, type);
                    return [4 /*yield*/, Promise.all(terraformFiles.map(function (f) { return (0, fs_1.writeFile)((0, path_1.join)(terraformPath, f.fileName), f.content); }))];
                case 9:
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
exports.cp = exports.cleanDir = exports.writeRawFile = exports.writeJsFile = exports.writeJsonFile = exports.stat = exports.readdir = exports.readFile = exports.rm = exports.mkdir = exports.access = exports.writeFile = void 0;
var child_process_1 = __webpack_require__(6);
var fs_1 = __webpack_require__(8);
var path_1 = __webpack_require__(1);
var prettier_1 = __webpack_require__(9);
exports.writeFile = fs_1.promises.writeFile, exports.access = fs_1.promises.access, exports.mkdir = fs_1.promises.mkdir, exports.rm = fs_1.promises.rm, exports.readFile = fs_1.promises.readFile, exports.readdir = fs_1.promises.readdir, exports.stat = fs_1.promises.stat;
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
                case 0: return [4 /*yield*/, writeRawFile(path, (0, prettier_1.format)(js, { parser: 'babel' }) + "\n")];
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
                    return [4 /*yield*/, (0, exports.mkdir)((0, path_1.dirname)(path), { recursive: true })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, exports.writeFile)(path, content)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.writeRawFile = writeRawFile;
function cleanDir(dirPath) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('clean', dirPath);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, , 3, 5]);
                    return [4 /*yield*/, (0, exports.rm)(dirPath, { recursive: true, force: true })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, (0, exports.mkdir)(dirPath, { recursive: true })];
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
/***/ (function(__unused_webpack_module, exports) {


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
function generateCodeWorkspace(projects) {
    return {
        folders: __spreadArray(__spreadArray([], __read(projects.map(function (p) { return ({ path: p }); })), false), [{ path: 'terraform' }, { path: '.', name: 'root' }], false),
        settings: {
            'files.exclude': Object.fromEntries(__spreadArray(__spreadArray([], __read(projects.map(function (p) { return [p, true]; })), false), [['terraform', true]], false)),
            'editor.acceptSuggestionOnCommitCharacter': false,
            'editor.suggestSelection': 'first',
            'vsintellicode.modify.editor.suggestSelection': 'automaticallyOverrodeDefaultValue',
            'explorer.confirmDelete': false,
            'git.autofetch': true,
            'git.confirmSync': false,
            'typescript.preferences.importModuleSpecifier': 'non-relative',
            'eslint.lintTask.enable': true,
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
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateWebAppDeployScript = void 0;
function generateWebAppDeployScript() {
    return "\nconst path = require('path');\nconst {execSync} = require('child_process');\nconst {accessSync, mkdirSync, readdirSync, writeFileSync, readFileSync} = require('fs');\n\nconst backendPath = path.join(process.cwd(), 'backend');\nconst backendDist = path.join(backendPath, 'dist');\nconst frontendPath = path.join(process.cwd(), 'frontend');\nconst frontendDist = path.join(frontendPath, 'dist');\nconst terraformPath = path.join(process.cwd(), 'terraform');\n\nfunction runCommand(opts) {\n  const {command, cwd, env} = opts;\n  console.log('-----------------------------------------');\n  console.log(`Running: \\`${command}\\``);\n  console.log('-----------------------------------------');\n  execSync(command, {cwd, env, stdio: 'inherit'});\n}\n\nfunction ensureDistFolders() {\n  for (const dist of [backendDist, frontendDist]) {\n    try {\n      accessSync(dist);\n    } catch {\n      mkdirSync(dist);\n    }\n  }\n  const backendFiles = readdirSync(backendDist);\n  if (backendFiles.length === 0) {\n    writeFileSync(\n      path.join(backendDist, 'main.js'),\n      `exports.handler = async function() {return ''};`\n    );\n  }\n}\n\nfunction checkTerraformCredentials() {\n  const credentialsPath = path.join(terraformPath, '.aws-credentials');\n  try {\n    accessSync(credentialsPath);\n  } catch {\n    throw new Error(`Missing AWS credential files at \"${credentialsPath}\"`);\n  }\n}\n\nfunction terraformOutputs() {\n  return JSON.parse(execSync(`terraform output -json`, {cwd: terraformPath}).toString());\n}\n\nasync function run() {\n  // Initialize if needed and get terraform outputs\n  ensureDistFolders();\n  let outputs = terraformOutputs();\n  if (Object.keys(outputs).length === 0) {\n    checkTerraformCredentials();\n    runCommand({command: `terraform init`, cwd: terraformPath});\n    runCommand({command: `terraform apply -auto-approve`, cwd: terraformPath});\n    outputs = terraformOutputs();\n  }\n\n  // Build the frontend\n  runCommand({\n    command: `yarn build`,\n    cwd: frontendPath,\n    env: {...process.env, PUBLIC_PATH: `https://${outputs.cloudfront_domain_name.value}`},\n  });\n  const INDEX_HTML = readFileSync(path.join(frontendDist, 'index.html')).toString();\n\n  // Build the backend\n  runCommand({command: 'rm -rf dist', cwd: backendPath});\n  runCommand({\n    command: `yarn build`,\n    cwd: backendPath,\n    env: {...process.env, MATTHIS_INDEX_HTML: JSON.stringify(INDEX_HTML)},\n  });\n  runCommand({\n    command: `yarn install --modules-folder dist/node_modules --production --no-bin-links`,\n    cwd: backendPath,\n  });\n\n  // Terraform\n  runCommand({command: `terraform apply -auto-approve`, cwd: terraformPath});\n  console.log('Done');\n}\n\nrun()\n  .catch(err => console.error(err))\n  .catch(() => process.exit(13));  \n  ".trim();
}
exports.generateWebAppDeployScript = generateWebAppDeployScript;


/***/ }),
/* 12 */
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
var versions_1 = __webpack_require__(13);
var TEMPLATES_PATH = (0, path_1.join)(__dirname, 'templates');
function generateProject(dst, name, type) {
    return __awaiter(this, void 0, void 0, function () {
        var variables, files, commands;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    variables = {
                        PROJECT_NAME: name,
                        PROJECT_TYPE: type,
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
                                        return [4 /*yield*/, (0, fs_1.mkdir)((0, path_1.dirname)(fPath), { recursive: true })];
                                    case 2:
                                        _a.sent();
                                        return [4 /*yield*/, (0, fs_1.writeFile)(fPath, compiledContent)];
                                    case 3:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })), false))];
                case 2:
                    _a.sent();
                    // Post generation script for React Native project
                    if (type === models_1.ProjectType.ReactNative) {
                        console.log('Running post install script');
                        commands = [
                            "pushd " + dst,
                            "npx --yes react-native init " + name,
                            "mv " + name + "/ios .",
                            "mv " + name + "/android .",
                            "rm -rf " + name,
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
/* 13 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NODE_TYPES_VERSION = exports.STYLED_COMPONENTS_VERSION = exports.STYLED_COMPONENTS_TYPES_VERSION = exports.REACT_NATIVE_VERSION = exports.REACT_ROUTER_VERSION = exports.REACT_VERSION = exports.TYPESCRIPT_VERSION = exports.PRETTIER_VERSION = exports.ESLINT_VERSION = exports.PACKAGE_VERSIONS = void 0;
exports.PACKAGE_VERSIONS = {
    project: '1.1.9',
    eslint: '1.0.22',
    prettier: '1.0.3',
    tsconfig: '1.0.8',
    webpack: '1.0.23',
};
exports.ESLINT_VERSION = '8.13.x';
exports.PRETTIER_VERSION = '2.6.x';
exports.TYPESCRIPT_VERSION = '4.6.x';
exports.REACT_VERSION = '17.0.x';
exports.REACT_ROUTER_VERSION = '5.2.x';
exports.REACT_NATIVE_VERSION = '0.66.x';
exports.STYLED_COMPONENTS_TYPES_VERSION = '5.1.x';
exports.STYLED_COMPONENTS_VERSION = '5.1.x';
exports.NODE_TYPES_VERSION = '16.11.x';


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateGitIgnore = void 0;
function generateGitIgnore() {
    return "\n.DS_Store\nnode_modules\nbuild\ndist\ntmp\n    ".trim();
}
exports.generateGitIgnore = generateGitIgnore;


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateWorkspacePackageJson = void 0;
function generateWorkspacePackageJson(projectName) {
    return {
        name: projectName,
        license: 'UNLICENSED',
        scripts: {
            setup: 'node ./setup.js',
            deploy: 'node ./deploy.js',
        },
    };
}
exports.generateWorkspacePackageJson = generateWorkspacePackageJson;


/***/ }),
/* 16 */
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
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateTerraformForWorkspace = void 0;
var models_1 = __webpack_require__(4);
var api_gateway_1 = __webpack_require__(18);
var cloudfront_1 = __webpack_require__(19);
var lambda_1 = __webpack_require__(20);
var output_1 = __webpack_require__(21);
var provider_1 = __webpack_require__(22);
var s3_1 = __webpack_require__(23);
function generateBaseTerraform(projectName) {
    return [(0, provider_1.generateAwsProviderTerraform)(projectName), (0, s3_1.generateS3BucketTerraform)(projectName)].join('\n\n');
}
function generateTerraformForWorkspace(projectName, type) {
    var baseFileContent = '';
    var extraFileContent = '';
    if (type === models_1.WorkspaceType.StandaloneLambda) {
        baseFileContent = generateStandaloneLambdaTerraform(projectName);
        extraFileContent = (0, lambda_1.generateExtraLambdaTerraform)(projectName);
    }
    else if (type === models_1.WorkspaceType.StaticWebsite) {
        baseFileContent = generateStaticWebsiteTerraform(projectName);
    }
    else if (type === models_1.WorkspaceType.WebApp) {
        baseFileContent = generateWebAppTerraform(projectName);
        extraFileContent = (0, lambda_1.generateExtraLambdaTerraform)(projectName);
    }
    else {
        throw new Error("Unknown workspace type " + type);
    }
    return [
        {
            fileName: 'base.tf',
            content: [generateBaseTerraform(projectName), baseFileContent].join('\n\n'),
        },
        { fileName: 'extra.tf', content: extraFileContent },
    ];
}
exports.generateTerraformForWorkspace = generateTerraformForWorkspace;
function generateWebAppTerraform(projectName) {
    return [
        generateStaticWebsiteTerraform(projectName),
        generateStandaloneLambdaTerraform(projectName),
        (0, output_1.generateLambdaApiOutputsTerraform)(),
        (0, api_gateway_1.generateApiGatewayTerraform)(projectName),
    ].join('\n\n');
}
function generateStaticWebsiteTerraform(projectName) {
    return [
        (0, output_1.generateWebOutputsTerraform)(),
        (0, s3_1.generateFrontendFileUploadTerraform)(),
        (0, cloudfront_1.generateCloudfrontDistributionTerraform)(projectName),
    ].join('\n\n');
}
function generateStandaloneLambdaTerraform(projectName) {
    return [(0, s3_1.generateBackendFileUploadTerraform)(), (0, lambda_1.generateLambdaTerraform)(projectName)].join('\n\n');
}


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateApiGatewayTerraform = void 0;
function generateApiGatewayTerraform(projectName) {
    return ("\n  resource \"aws_api_gateway_rest_api\" \"api\" {\n    name        = \"" + projectName + "-RestAPI\"\n    description = \"Rest API for the \\\"" + projectName + "\\\" app\"\n  }\n  \n  resource \"aws_api_gateway_resource\" \"api\" {\n    rest_api_id = aws_api_gateway_rest_api.api.id\n    parent_id   = aws_api_gateway_rest_api.api.root_resource_id\n    path_part   = \"{proxy+}\"\n  }\n   \n  resource \"aws_api_gateway_method\" \"api\" {\n    rest_api_id   = aws_api_gateway_rest_api.api.id\n    resource_id   = aws_api_gateway_resource.api.id\n    http_method   = \"ANY\"\n    authorization = \"NONE\"\n  }\n  \n  resource \"aws_api_gateway_method\" \"api_root\" {\n     rest_api_id   = aws_api_gateway_rest_api.api.id\n     resource_id   = aws_api_gateway_rest_api.api.root_resource_id\n     http_method   = \"ANY\"\n     authorization = \"NONE\"\n  }\n  \n  resource \"aws_api_gateway_integration\" \"api\" {\n    rest_api_id = aws_api_gateway_rest_api.api.id\n    resource_id = aws_api_gateway_method.api.resource_id\n    http_method = aws_api_gateway_method.api.http_method\n   \n    integration_http_method = \"POST\"\n    type                    = \"AWS_PROXY\"\n    uri                     = aws_lambda_function.api.invoke_arn\n  }\n  \n  resource \"aws_api_gateway_integration\" \"api_root\" {\n    rest_api_id = aws_api_gateway_rest_api.api.id\n    resource_id = aws_api_gateway_method.api_root.resource_id\n    http_method = aws_api_gateway_method.api_root.http_method\n  \n    integration_http_method = \"POST\"\n    type                    = \"AWS_PROXY\"\n    uri                     = aws_lambda_function.api.invoke_arn\n  }\n  \n  resource \"aws_api_gateway_deployment\" \"api\" {\n    depends_on = [\n      aws_api_gateway_integration.api,\n      aws_api_gateway_integration.api_root,\n    ]\n    rest_api_id = aws_api_gateway_rest_api.api.id\n    stage_name  = \"prod\"\n  \n    triggers = {\n      redeployment = sha1(jsonencode(aws_api_gateway_integration.api))\n    }\n  \n    lifecycle {\n      create_before_destroy = true\n    }\n  }\n  \n  resource \"aws_lambda_permission\" \"api\" {\n    statement_id  = \"AllowAPIGatewayInvoke\"\n    action        = \"lambda:InvokeFunction\"\n    function_name = aws_lambda_function.api.function_name\n    principal     = \"apigateway.amazonaws.com\"\n    source_arn    = \"${aws_api_gateway_rest_api.api.execution_arn}/*/*\"\n  }      \n").trim();
}
exports.generateApiGatewayTerraform = generateApiGatewayTerraform;


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateCloudfrontDistributionTerraform = void 0;
function generateCloudfrontDistributionTerraform(projectName) {
    var bucketName = projectName.toLowerCase().replace(/[^\d.a-z-]+/gu, '-');
    var originId = bucketName + "-origin-id";
    return ("\nresource \"aws_cloudfront_distribution\" \"s3\" {\n  origin {\n    domain_name = aws_s3_bucket.code.bucket_regional_domain_name\n    origin_id   = \"" + originId + "\"\n    origin_path = \"/frontend\"\n\n    s3_origin_config {\n      origin_access_identity = aws_cloudfront_origin_access_identity.s3.cloudfront_access_identity_path\n    }\n  }\n  \n  enabled             = true\n  is_ipv6_enabled     = true\n  default_root_object = \"index.html\"\n  price_class         = \"PriceClass_100\"\n\n  default_cache_behavior {\n    allowed_methods  = [\"HEAD\", \"GET\"]\n    cached_methods   = [\"HEAD\", \"GET\"]\n    compress         = true\n    target_origin_id = \"" + originId + "\"\n    viewer_protocol_policy = \"redirect-to-https\"\n    \n    forwarded_values {\n      query_string = false\n      cookies {\n        forward = \"none\"\n      }\n    }\n  }\n\n  restrictions {\n    geo_restriction {\n      restriction_type = \"none\"\n    }\n  }\n\n  viewer_certificate {\n    cloudfront_default_certificate = true\n  }\n}\n\nresource \"aws_cloudfront_origin_access_identity\" \"s3\" {}\n  ").trim();
}
exports.generateCloudfrontDistributionTerraform = generateCloudfrontDistributionTerraform;


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateExtraLambdaTerraform = exports.generateLambdaTerraform = void 0;
function generateLambdaTerraform(projectName) {
    return ("\nresource \"aws_lambda_function\" \"api\" {\n  function_name     = \"" + projectName + "-API\"\n  s3_bucket         = aws_s3_bucket.code.id\n  s3_key            = aws_s3_bucket_object.backend_archive.id\n  source_code_hash  = data.archive_file.backend_archive.output_sha\n  handler           = \"main.handler\"\n  runtime           = \"nodejs14.x\"\n  role              = aws_iam_role.lambda_api_exec.arn\n}\n\nresource \"aws_iam_role\" \"lambda_api_exec\" {\n  name = \"" + projectName + "-API-assume-role\"\n  assume_role_policy = jsonencode({\n    Version = \"2012-10-17\"\n    Statement = [\n      {\n        Action    = \"sts:AssumeRole\"\n        Principal = {\n          Service = \"lambda.amazonaws.com\"\n        }\n        Effect    = \"Allow\"\n        Sid       = \"\"\n      },\n    ]\n  })\n\n  inline_policy {\n    name = \"" + projectName + "-API-cloudwatch-role\"\n    policy = jsonencode({\n      Version = \"2012-10-17\"\n      Statement = [\n        {\n          Action   = [\n            \"logs:CreateLogGroup\",\n            \"logs:CreateLogStream\",\n            \"logs:PutLogEvents\"\n          ]\n          Effect   = \"Allow\"\n          Resource = \"arn:aws:logs:*:*:*\"\n        },\n      ]\n    })\n  }\n  \n  inline_policy {\n    name = \"" + projectName + "-API-extra-role\"\n    policy = data.aws_iam_policy_document.lambda_extra_role.json\n  }\n}\n").trim();
}
exports.generateLambdaTerraform = generateLambdaTerraform;
function generateExtraLambdaTerraform(projectName) {
    return "\ndata \"aws_iam_policy_document\" \"lambda_extra_role\" {\n  statement {\n    actions   = [\"s3:ListAllMyBuckets\"]\n    resources = [\"*\"]\n  }\n}\n".trim();
}
exports.generateExtraLambdaTerraform = generateExtraLambdaTerraform;


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateLambdaApiOutputsTerraform = exports.generateWebOutputsTerraform = void 0;
function generateWebOutputsTerraform() {
    return "\noutput \"s3_bucket_id\" {\n  value       = aws_s3_bucket.code.id\n  description = \"Bucket id where the code lives. Used during s3-sync.\"\n}\noutput \"cloudfront_distribution_id\" {\n  value       = aws_cloudfront_distribution.s3.id\n  description = \"Cloudfront distribution id serving the frontend assets. Used during s3-sync.\"\n}\noutput \"cloudfront_domain_name\" {\n  value       = aws_cloudfront_distribution.s3.domain_name\n  description = \"Domain (from cloudfront) where the frontend is available.\"\n}\n  ".trim();
}
exports.generateWebOutputsTerraform = generateWebOutputsTerraform;
function generateLambdaApiOutputsTerraform() {
    return "\noutput \"api_url\" {\n  value = aws_api_gateway_deployment.api.invoke_url\n  description = \"URL where the lambda api can be called.\"\n}\n  ".trim();
}
exports.generateLambdaApiOutputsTerraform = generateLambdaApiOutputsTerraform;


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateAwsProviderTerraform = void 0;
function generateAwsProviderTerraform(projectName) {
    return ("\nterraform {\n  required_providers {\n    aws = {\n      source  = \"hashicorp/aws\"\n      version = \"~> 3.0\"\n    }\n  }\n}\n\nprovider \"aws\" {\n  region  = \"eu-west-3\"\n  shared_credentials_file = \"./.aws-credentials\"\n  default_tags {\n    tags = {\n      Project = \"" + projectName + "\"\n    }\n  }\n}\n").trim();
}
exports.generateAwsProviderTerraform = generateAwsProviderTerraform;


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateBackendFileUploadTerraform = exports.generateFrontendFileUploadTerraform = exports.generateS3BucketTerraform = void 0;
function generateS3BucketTerraform(projectName) {
    var bucketName = projectName.toLowerCase().replace(/[^a-z0-9.-]+/gu, '-');
    return ("\nresource \"aws_s3_bucket\" \"code\" {\n  bucket_prefix = \"" + bucketName + "-\"\n}\n\nresource \"aws_s3_bucket_acl\" \"code_bucket_acl\" {\n  bucket = aws_s3_bucket.code.id\n  acl    = \"private\"\n}\n\ndata \"aws_iam_policy_document\" \"code\" {\n  statement {\n    actions   = [\"s3:GetObject\"]\n    resources = [\"${aws_s3_bucket.code.arn}/frontend/*\"]\n\n    principals {\n      type        = \"AWS\"\n      identifiers = [aws_cloudfront_origin_access_identity.s3.iam_arn]\n    }\n  }\n}\n\nresource \"aws_s3_bucket_policy\" \"code\" {\n  bucket = aws_s3_bucket.code.id\n  policy = data.aws_iam_policy_document.code.json\n}\n\n").trim();
}
exports.generateS3BucketTerraform = generateS3BucketTerraform;
function generateFrontendFileUploadTerraform() {
    return "\n  module \"template_files\" {\n    source = \"hashicorp/dir/template\"\n    base_dir = \"../frontend/dist\"\n  }\n  \n  resource \"aws_s3_bucket_object\" \"frontend_files\" {\n    for_each     = module.template_files.files\n    bucket       = aws_s3_bucket.code.id\n    key          = \"frontend/${each.key}\"\n    content_type = each.value.content_type\n    source       = each.value.source_path\n    content      = each.value.content\n    etag         = each.value.digests.md5\n  }\n".trim();
}
exports.generateFrontendFileUploadTerraform = generateFrontendFileUploadTerraform;
function generateBackendFileUploadTerraform() {
    return "\n  data \"archive_file\" \"backend_archive\" {\n    type        = \"zip\"\n    source_dir  = \"../backend/dist\"\n    output_path = \"./backend.zip\"\n  }\n  \n  resource \"aws_s3_bucket_object\" \"backend_archive\" {\n    bucket       = aws_s3_bucket.code.id\n    key          = \"backend/dist.zip\"\n    source       = data.archive_file.backend_archive.output_path\n    etag         = data.archive_file.backend_archive.output_sha\n  }\n".trim();
}
exports.generateBackendFileUploadTerraform = generateBackendFileUploadTerraform;


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