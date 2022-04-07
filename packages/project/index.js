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
var versions_1 = __webpack_require__(5);
var child_process_1 = __webpack_require__(6);
var all_1 = __webpack_require__(7);
var custom_1 = __webpack_require__(14);
var templatesPath = (0, path_1.join)(__dirname, 'templates');
function initProject() {
    return __awaiter(this, void 0, void 0, function () {
        var prompts, projectPath, projectName, content, projectType;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    prompts = __webpack_require__(15);
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
                            { title: 'Web App', value: models_1.WorkspaceType.WebApp },
                            { title: 'Web (React)', value: models_1.ProjectType.Web },
                            { title: 'Lib', value: models_1.ProjectType.Lib },
                            { title: 'React Native', value: models_1.ProjectType.ReactNative },
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
        var variables, files, commands, commands;
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
                        REACT_NATIVE_VERSION: versions_1.REACT_NATIVE_VERSION,
                        STYLED_COMPONENTS_TYPES_VERSION: versions_1.STYLED_COMPONENTS_TYPES_VERSION,
                        STYLED_COMPONENTS_VERSION: versions_1.STYLED_COMPONENTS_VERSION,
                        NODE_TYPES_VERSION: versions_1.NODE_TYPES_VERSION,
                    };
                    return [4 /*yield*/, getFiles((0, path_1.join)(templatesPath, type))];
                case 1:
                    files = _a.sent();
                    return [4 /*yield*/, Promise.all(__spreadArray(__spreadArray([], __read(files.map(function (f) { return __awaiter(_this, void 0, void 0, function () {
                            var fileContent, compiledContent, fPath;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, (0, promises_1.readFile)((0, path_1.join)(templatesPath, type, f))];
                                    case 1:
                                        fileContent = _a.sent();
                                        compiledContent = fileContent
                                            .toString()
                                            .replace(/\{\{([^\}]+)\}\}/gu, function (match, vName) { var _a; return (_a = variables[vName]) !== null && _a !== void 0 ? _a : match; });
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
                        }); })), false), [
                            type === models_1.WorkspaceType.WebApp
                                ? (function () { return __awaiter(_this, void 0, void 0, function () {
                                    var terraformBasePath, terraformCustomPath, _a, _b, _c, _d;
                                    return __generator(this, function (_e) {
                                        switch (_e.label) {
                                            case 0:
                                                terraformBasePath = (0, path_1.join)(dst, 'terraform', 'terraform.tf');
                                                terraformCustomPath = (0, path_1.join)(dst, 'terraform', 'custom.tf');
                                                return [4 /*yield*/, (0, promises_1.mkdir)((0, path_1.dirname)(terraformBasePath), { recursive: true })];
                                            case 1:
                                                _e.sent();
                                                _a = promises_1.writeFile;
                                                _b = [terraformBasePath];
                                                return [4 /*yield*/, (0, all_1.generateWebAppTerraform)(name)];
                                            case 2: return [4 /*yield*/, _a.apply(void 0, _b.concat([_e.sent()]))];
                                            case 3:
                                                _e.sent();
                                                _c = promises_1.writeFile;
                                                _d = [terraformCustomPath];
                                                return [4 /*yield*/, (0, custom_1.generateCustomTerraform)(name)];
                                            case 4: return [4 /*yield*/, _c.apply(void 0, _d.concat([_e.sent()]))];
                                            case 5:
                                                _e.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); })()
                                : type === models_1.ProjectType.Web
                                    ? (function () { return __awaiter(_this, void 0, void 0, function () {
                                        var terraformBasePath, _a, _b;
                                        return __generator(this, function (_c) {
                                            switch (_c.label) {
                                                case 0:
                                                    terraformBasePath = (0, path_1.join)(dst, 'terraform', 'terraform.tf');
                                                    return [4 /*yield*/, (0, promises_1.mkdir)((0, path_1.dirname)(terraformBasePath), { recursive: true })];
                                                case 1:
                                                    _c.sent();
                                                    _a = promises_1.writeFile;
                                                    _b = [terraformBasePath];
                                                    return [4 /*yield*/, (0, all_1.generateWebTerraform)(name)];
                                                case 2: return [4 /*yield*/, _a.apply(void 0, _b.concat([_c.sent()]))];
                                                case 3:
                                                    _c.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); })() : Promise.resolve(),
                        ], false))];
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
                    // Initialization script for Web App project
                    if (type === models_1.WorkspaceType.WebApp || type === models_1.ProjectType.Web) {
                        console.log('Running post install script');
                        commands = ["pushd " + dst, "node setup.js", "popd"];
                        (0, child_process_1.execSync)(commands.join(' && '), { stdio: ['ignore', 'inherit', 'inherit'] });
                    }
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
    WorkspaceType["WebApp"] = "web-app";
})(WorkspaceType = exports.WorkspaceType || (exports.WorkspaceType = {}));


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NODE_TYPES_VERSION = exports.STYLED_COMPONENTS_VERSION = exports.STYLED_COMPONENTS_TYPES_VERSION = exports.REACT_NATIVE_VERSION = exports.REACT_ROUTER_VERSION = exports.REACT_VERSION = exports.TYPESCRIPT_VERSION = exports.PRETTIER_VERSION = exports.ESLINT_VERSION = exports.PACKAGE_VERSIONS = void 0;
exports.PACKAGE_VERSIONS = {
    project: '1.1.8',
    eslint: '1.0.21',
    prettier: '1.0.3',
    tsconfig: '1.0.8',
    webpack: '1.0.21',
};
exports.ESLINT_VERSION = '8.12.x';
exports.PRETTIER_VERSION = '2.6.x';
exports.TYPESCRIPT_VERSION = '4.6.x';
exports.REACT_VERSION = '17.0.x';
exports.REACT_ROUTER_VERSION = '5.2.x';
exports.REACT_NATIVE_VERSION = '0.66.x';
exports.STYLED_COMPONENTS_TYPES_VERSION = '5.1.x';
exports.STYLED_COMPONENTS_VERSION = '5.1.x';
exports.NODE_TYPES_VERSION = '16.11.x';


/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateWebTerraform = exports.generateWebAppTerraform = void 0;
var api_gateway_1 = __webpack_require__(8);
var cloudfront_1 = __webpack_require__(9);
var lambda_1 = __webpack_require__(10);
var output_1 = __webpack_require__(11);
var provider_1 = __webpack_require__(12);
var s3_1 = __webpack_require__(13);
function generateWebAppTerraform(projectName) {
    return [
        (0, provider_1.generateAwsProvider)(projectName),
        (0, output_1.generateWebOutputs)(),
        (0, output_1.generateLambdaApiOutputs)(),
        (0, s3_1.generateS3Bucket)(projectName),
        (0, s3_1.generateFrontendFileUpload)(),
        (0, s3_1.generateBackendFileUpload)(),
        (0, cloudfront_1.generateCloudfrontDistribution)(projectName),
        (0, lambda_1.generateLambda)(projectName),
        (0, api_gateway_1.generateApiGateway)(projectName),
    ].join('\n\n');
}
exports.generateWebAppTerraform = generateWebAppTerraform;
function generateWebTerraform(projectName) {
    return [
        (0, provider_1.generateAwsProvider)(projectName),
        (0, output_1.generateWebOutputs)(),
        (0, s3_1.generateS3Bucket)(projectName),
        (0, s3_1.generateFrontendFileUpload)(),
        (0, cloudfront_1.generateCloudfrontDistribution)(projectName),
    ].join('\n\n');
}
exports.generateWebTerraform = generateWebTerraform;


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateApiGateway = void 0;
function generateApiGateway(projectName) {
    return ("\n  resource \"aws_api_gateway_rest_api\" \"api\" {\n    name        = \"" + projectName + "-RestAPI\"\n    description = \"Rest API for the \\\"" + projectName + "\\\" app\"\n  }\n  \n  resource \"aws_api_gateway_resource\" \"api\" {\n    rest_api_id = aws_api_gateway_rest_api.api.id\n    parent_id   = aws_api_gateway_rest_api.api.root_resource_id\n    path_part   = \"{proxy+}\"\n  }\n   \n  resource \"aws_api_gateway_method\" \"api\" {\n    rest_api_id   = aws_api_gateway_rest_api.api.id\n    resource_id   = aws_api_gateway_resource.api.id\n    http_method   = \"ANY\"\n    authorization = \"NONE\"\n  }\n  \n  resource \"aws_api_gateway_method\" \"api_root\" {\n     rest_api_id   = aws_api_gateway_rest_api.api.id\n     resource_id   = aws_api_gateway_rest_api.api.root_resource_id\n     http_method   = \"ANY\"\n     authorization = \"NONE\"\n  }\n  \n  resource \"aws_api_gateway_integration\" \"api\" {\n    rest_api_id = aws_api_gateway_rest_api.api.id\n    resource_id = aws_api_gateway_method.api.resource_id\n    http_method = aws_api_gateway_method.api.http_method\n   \n    integration_http_method = \"POST\"\n    type                    = \"AWS_PROXY\"\n    uri                     = aws_lambda_function.api.invoke_arn\n  }\n  \n  resource \"aws_api_gateway_integration\" \"api_root\" {\n    rest_api_id = aws_api_gateway_rest_api.api.id\n    resource_id = aws_api_gateway_method.api_root.resource_id\n    http_method = aws_api_gateway_method.api_root.http_method\n  \n    integration_http_method = \"POST\"\n    type                    = \"AWS_PROXY\"\n    uri                     = aws_lambda_function.api.invoke_arn\n  }\n  \n  resource \"aws_api_gateway_deployment\" \"api\" {\n    depends_on = [\n      aws_api_gateway_integration.api,\n      aws_api_gateway_integration.api_root,\n    ]\n    rest_api_id = aws_api_gateway_rest_api.api.id\n    stage_name  = \"prod\"\n  \n    triggers = {\n      redeployment = sha1(jsonencode(aws_api_gateway_integration.api))\n    }\n  \n    lifecycle {\n      create_before_destroy = true\n    }\n  }\n  \n  resource \"aws_lambda_permission\" \"api\" {\n    statement_id  = \"AllowAPIGatewayInvoke\"\n    action        = \"lambda:InvokeFunction\"\n    function_name = aws_lambda_function.api.function_name\n    principal     = \"apigateway.amazonaws.com\"\n    source_arn    = \"${aws_api_gateway_rest_api.api.execution_arn}/*/*\"\n  }      \n").trim();
}
exports.generateApiGateway = generateApiGateway;


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateCloudfrontDistribution = void 0;
function generateCloudfrontDistribution(projectName) {
    var bucketName = projectName.toLowerCase().replace(/[^\d.a-z-]+/gu, '-');
    var originId = bucketName + "-origin-id";
    return ("\nresource \"aws_cloudfront_distribution\" \"s3\" {\n  origin {\n    domain_name = aws_s3_bucket.code.bucket_regional_domain_name\n    origin_id   = \"" + originId + "\"\n    origin_path = \"/frontend\"\n\n    s3_origin_config {\n      origin_access_identity = aws_cloudfront_origin_access_identity.s3.cloudfront_access_identity_path\n    }\n  }\n  \n  enabled             = true\n  is_ipv6_enabled     = true\n  default_root_object = \"index.html\"\n  price_class         = \"PriceClass_100\"\n\n  default_cache_behavior {\n    allowed_methods  = [\"HEAD\", \"GET\"]\n    cached_methods   = [\"HEAD\", \"GET\"]\n    compress         = true\n    target_origin_id = \"" + originId + "\"\n    viewer_protocol_policy = \"redirect-to-https\"\n    \n    forwarded_values {\n      query_string = false\n      cookies {\n        forward = \"none\"\n      }\n    }\n  }\n\n  restrictions {\n    geo_restriction {\n      restriction_type = \"none\"\n    }\n  }\n\n  viewer_certificate {\n    cloudfront_default_certificate = true\n  }\n}\n\nresource \"aws_cloudfront_origin_access_identity\" \"s3\" {}\n  ").trim();
}
exports.generateCloudfrontDistribution = generateCloudfrontDistribution;


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateLambda = void 0;
function generateLambda(projectName) {
    return ("\nresource \"aws_lambda_function\" \"api\" {\n  function_name     = \"" + projectName + "-API\"\n  s3_bucket         = aws_s3_bucket.code.id\n  s3_key            = aws_s3_bucket_object.backend_archive.id\n  source_code_hash  = data.archive_file.backend_archive.output_sha\n  handler           = \"main.handler\"\n  runtime           = \"nodejs14.x\"\n  role              = aws_iam_role.lambda_api_exec.arn\n}\n\nresource \"aws_iam_role\" \"lambda_api_exec\" {\n  name = \"" + projectName + "-API-assume-role\"\n  assume_role_policy = jsonencode({\n    Version = \"2012-10-17\"\n    Statement = [\n      {\n        Action    = \"sts:AssumeRole\"\n        Principal = {\n          Service = \"lambda.amazonaws.com\"\n        }\n        Effect    = \"Allow\"\n        Sid       = \"\"\n      },\n    ]\n  })\n\n  inline_policy {\n    name = \"" + projectName + "-API-cloudwatch-role\"\n    policy = jsonencode({\n      Version = \"2012-10-17\"\n      Statement = [\n        {\n          Action   = [\n            \"logs:CreateLogGroup\",\n            \"logs:CreateLogStream\",\n            \"logs:PutLogEvents\"\n          ]\n          Effect   = \"Allow\"\n          Resource = \"arn:aws:logs:*:*:*\"\n        },\n      ]\n    })\n  }\n  \n  inline_policy {\n    name = \"" + projectName + "-API-extra-role\"\n    policy = data.aws_iam_policy_document.lambda_extra_role.json\n  }\n}\n").trim();
}
exports.generateLambda = generateLambda;


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateLambdaApiOutputs = exports.generateWebOutputs = void 0;
function generateWebOutputs() {
    return "\noutput \"s3_bucket_id\" {\n  value       = aws_s3_bucket.code.id\n  description = \"Bucket id where the code lives. Used during s3-sync.\"\n}\noutput \"cloudfront_distribution_id\" {\n  value       = aws_cloudfront_distribution.s3.id\n  description = \"Cloudfront distribution id serving the frontend assets. Used during s3-sync.\"\n}\noutput \"cloudfront_domain_name\" {\n  value       = aws_cloudfront_distribution.s3.domain_name\n  description = \"Domain (from cloudfront) where the frontend is available.\"\n}\n  ".trim();
}
exports.generateWebOutputs = generateWebOutputs;
function generateLambdaApiOutputs() {
    return "\noutput \"api_url\" {\n  value = aws_api_gateway_deployment.api.invoke_url\n  description = \"URL where the lambda api can be called.\"\n}\n  ".trim();
}
exports.generateLambdaApiOutputs = generateLambdaApiOutputs;


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateAwsProvider = void 0;
function generateAwsProvider(projectName) {
    return ("\nterraform {\n  required_providers {\n    aws = {\n      source  = \"hashicorp/aws\"\n      version = \"~> 3.0\"\n    }\n  }\n}\n\nprovider \"aws\" {\n  region  = \"eu-west-3\"\n  shared_credentials_file = \"./.aws-credentials\"\n  default_tags {\n    tags = {\n      Project = \"" + projectName + "\"\n    }\n  }\n}\n").trim();
}
exports.generateAwsProvider = generateAwsProvider;


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateBackendFileUpload = exports.generateFrontendFileUpload = exports.generateS3Bucket = void 0;
function generateS3Bucket(projectName) {
    var bucketName = projectName.toLowerCase().replace(/[^a-z0-9.-]+/gu, '-');
    return ("\nresource \"aws_s3_bucket\" \"code\" {\n  bucket_prefix = \"" + bucketName + "-\"\n}\n\nresource \"aws_s3_bucket_acl\" \"code_bucket_acl\" {\n  bucket = aws_s3_bucket.code.id\n  acl    = \"private\"\n}\n\ndata \"aws_iam_policy_document\" \"code\" {\n  statement {\n    actions   = [\"s3:GetObject\"]\n    resources = [\"${aws_s3_bucket.code.arn}/frontend/*\"]\n\n    principals {\n      type        = \"AWS\"\n      identifiers = [aws_cloudfront_origin_access_identity.s3.iam_arn]\n    }\n  }\n}\n\nresource \"aws_s3_bucket_policy\" \"code\" {\n  bucket = aws_s3_bucket.code.id\n  policy = data.aws_iam_policy_document.code.json\n}\n\n").trim();
}
exports.generateS3Bucket = generateS3Bucket;
function generateFrontendFileUpload() {
    return "\n  module \"template_files\" {\n    source = \"hashicorp/dir/template\"\n    base_dir = \"../frontend/dist\"\n  }\n  \n  resource \"aws_s3_bucket_object\" \"frontend_files\" {\n    for_each     = module.template_files.files\n    bucket       = aws_s3_bucket.code.id\n    key          = \"frontend/${each.key}\"\n    content_type = each.value.content_type\n    source       = each.value.source_path\n    content      = each.value.content\n    etag         = each.value.digests.md5\n  }\n".trim();
}
exports.generateFrontendFileUpload = generateFrontendFileUpload;
function generateBackendFileUpload() {
    return "\n  data \"archive_file\" \"backend_archive\" {\n    type        = \"zip\"\n    source_dir  = \"../backend/dist\"\n    output_path = \"./backend.zip\"\n  }\n  \n  resource \"aws_s3_bucket_object\" \"backend_archive\" {\n    bucket       = aws_s3_bucket.code.id\n    key          = \"backend/dist.zip\"\n    source       = data.archive_file.backend_archive.output_path\n    etag         = data.archive_file.backend_archive.output_sha\n  }\n".trim();
}
exports.generateBackendFileUpload = generateBackendFileUpload;


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateCustomTerraform = void 0;
function generateCustomTerraform(projectName) {
    return "\ndata \"aws_iam_policy_document\" \"lambda_extra_role\" {\n  statement {\n    actions   = [\"s3:ListAllMyBuckets\"]\n    resources = [\"*\"]\n  }\n}\n".trim();
}
exports.generateCustomTerraform = generateCustomTerraform;


/***/ }),
/* 15 */
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