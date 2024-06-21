import { createRequire as __WEBPACK_EXTERNAL_createRequire } from "module";
/******/ var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:crypto");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:fs");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:http");

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addPrefix: () => (/* binding */ addPrefix),
/* harmony export */   asArray: () => (/* binding */ asArray),
/* harmony export */   asArrayOrThrow: () => (/* binding */ asArrayOrThrow),
/* harmony export */   asBoolean: () => (/* binding */ asBoolean),
/* harmony export */   asBooleanOrThrow: () => (/* binding */ asBooleanOrThrow),
/* harmony export */   asConstantOrThrow: () => (/* binding */ asConstantOrThrow),
/* harmony export */   asDate: () => (/* binding */ asDate),
/* harmony export */   asDateOrThrow: () => (/* binding */ asDateOrThrow),
/* harmony export */   asError: () => (/* binding */ asError),
/* harmony export */   asJson: () => (/* binding */ asJson),
/* harmony export */   asJsonOrThrow: () => (/* binding */ asJsonOrThrow),
/* harmony export */   asJsonString: () => (/* binding */ asJsonString),
/* harmony export */   asJsonStringOrThrow: () => (/* binding */ asJsonStringOrThrow),
/* harmony export */   asMap: () => (/* binding */ asMap),
/* harmony export */   asMapArray: () => (/* binding */ asMapArray),
/* harmony export */   asMapArrayOrThrow: () => (/* binding */ asMapArrayOrThrow),
/* harmony export */   asMapOrThrow: () => (/* binding */ asMapOrThrow),
/* harmony export */   asNumber: () => (/* binding */ asNumber),
/* harmony export */   asNumberOrThrow: () => (/* binding */ asNumberOrThrow),
/* harmony export */   asString: () => (/* binding */ asString),
/* harmony export */   asStringArray: () => (/* binding */ asStringArray),
/* harmony export */   asStringArrayOrThrow: () => (/* binding */ asStringArrayOrThrow),
/* harmony export */   asStringEnum: () => (/* binding */ asStringEnum),
/* harmony export */   asStringEnumOrThrow: () => (/* binding */ asStringEnumOrThrow),
/* harmony export */   asStringOrThrow: () => (/* binding */ asStringOrThrow),
/* harmony export */   errorAndStackAsString: () => (/* binding */ errorAndStackAsString),
/* harmony export */   errorAsString: () => (/* binding */ errorAsString),
/* harmony export */   isNonEmptyArray: () => (/* binding */ isNonEmptyArray),
/* harmony export */   isNull: () => (/* binding */ isNull),
/* harmony export */   isNumber: () => (/* binding */ isNumber),
/* harmony export */   isString: () => (/* binding */ isString),
/* harmony export */   iterNumberEnum: () => (/* binding */ iterNumberEnum),
/* harmony export */   iterStringEnum: () => (/* binding */ iterStringEnum),
/* harmony export */   neverHappens: () => (/* binding */ neverHappens),
/* harmony export */   nonEmptyArray: () => (/* binding */ nonEmptyArray),
/* harmony export */   parseJson: () => (/* binding */ parseJson),
/* harmony export */   removeUndefined: () => (/* binding */ removeUndefined),
/* harmony export */   removeUndefinedOrNullProps: () => (/* binding */ removeUndefinedOrNullProps)
/* harmony export */ });
function notUndefined(val) {
  return val !== undefined;
}
function isString(val) {
  return typeof val === 'string';
}
function isNumber(val) {
  return typeof val === 'number';
}
function iterNumberEnum(e) {
  return Object.values(e).filter(isNumber);
}
function iterStringEnum(e) {
  return Object.values(e).filter(isString);
}
function removeUndefined(arr) {
  return arr.filter(notUndefined);
}
function removeUndefinedOrNullProps(obj) {
  return Object.fromEntries(Object.entries(obj).filter(e => e[1] !== undefined && e[1] !== null));
}
function neverHappens(value, errorMessage) {
  throw new Error(errorMessage);
}
function asMap(value, defaultValue) {
  return typeof value === 'object' && value !== null && !Array.isArray(value) ? value : defaultValue;
}
function asMapOrThrow(value) {
  const valueAsMap = asMap(value);
  if (valueAsMap === undefined) {
    throw new Error(`Invalid value: \`${value}\` is not a map`);
  }
  return valueAsMap;
}
function asJson(value, defaultValue) {
  try {
    const json = JSON.parse(value);
    const res = asMap(json);
    return res ?? defaultValue;
  } catch {
    return defaultValue;
  }
}
function asJsonOrThrow(value) {
  const valueAsJson = asJson(value);
  if (valueAsJson === undefined) {
    throw new Error(`Invalid value: \`${value}\` is not a valid JSON string of a map`);
  }
  return valueAsJson;
}
function asJsonString(value, defaultValue) {
  const str = asString(value);
  return str === undefined ? defaultValue : defaultValue === undefined ? asJson(str) : asJson(str, defaultValue);
}
function asJsonStringOrThrow(value) {
  return asJsonOrThrow(asStringOrThrow(value));
}
function asString(value, defaultValue) {
  return typeof value === 'string' ? value : defaultValue;
}
function asStringOrThrow(value) {
  const valueAsString = asString(value);
  if (valueAsString === undefined) {
    throw new Error(`Invalid value: \`${value}\` is not a string`);
  }
  return valueAsString;
}
function asStringEnum(value, enu, defaultValue) {
  return typeof value === 'string' && Object.values(enu).includes(value) ? value : defaultValue;
}
function asStringEnumOrThrow(value, enu) {
  const valueAsString = asStringEnum(value, enu);
  if (valueAsString === undefined) {
    throw new Error(`Invalid value: \`${value}\` is not a string or not one of ${JSON.stringify(Object.values(enu))}`);
  }
  return valueAsString;
}
function asArray(value, defaultValue) {
  return Array.isArray(value) ? value : defaultValue;
}
function asArrayOrThrow(value) {
  if (!Array.isArray(value)) {
    throw new Error(`Invalid value: \`${value}\` is not an array`);
  }
  return value;
}
function asStringArray(value, defaultValue) {
  const arr = asArray(value);
  if (arr === undefined) {
    return defaultValue;
  }
  return removeUndefined(arr.map(s => asString(s)));
}
function asStringArrayOrThrow(value) {
  const arr = asArrayOrThrow(value);
  return arr.map(s => asStringOrThrow(s));
}
function asMapArray(value, defaultValue) {
  const arr = asArray(value);
  if (arr === undefined) {
    return defaultValue;
  }
  return removeUndefined(arr.map(s => asMap(s)));
}
function asMapArrayOrThrow(value) {
  const arr = asArrayOrThrow(value);
  return arr.map(s => asMapOrThrow(s));
}
function asNumber(value, defaultValue) {
  if (typeof value === 'number') {
    return !isNaN(value) ? value : defaultValue;
  }
  if (typeof value === 'string') {
    try {
      const parsedValue = parseFloat(value);
      return !isNaN(parsedValue) ? parsedValue : defaultValue;
    } catch {
      return defaultValue;
    }
  }
  return defaultValue;
}
function asNumberOrThrow(value) {
  const valueAsNumber = asNumber(value);
  if (valueAsNumber === undefined) {
    throw new Error(`Invalid value: \`${value}\` is not a number`);
  }
  return valueAsNumber;
}
function asBoolean(value, defaultValue) {
  if (typeof value === 'boolean') {
    return value;
  }
  if (typeof value === 'number') {
    return !isNaN(value) ? value !== 0 : false;
  }
  if (typeof value === 'string') {
    if (value === '0' || value === 'false') {
      return false;
    } else if (value === '1' || value === 'true') {
      return true;
    }
    return defaultValue;
  }
  return defaultValue;
}
function asBooleanOrThrow(value) {
  const valueAsBoolean = asBoolean(value);
  if (valueAsBoolean === undefined) {
    throw new Error(`Invalid value: \`${value}\` is not a boolean`);
  }
  return valueAsBoolean;
}
const TIMESTAMP_REGEX = /^[0-9]{1,15}$/u;
function asDate(value, defaultValue) {
  const date = value instanceof Date ? value : new Date(typeof value === 'string' && TIMESTAMP_REGEX.test(value) ? parseFloat(value) : String(value));
  return isNaN(date.getTime()) ? defaultValue : date;
}
function asDateOrThrow(value) {
  const valueAsDate = asDate(value);
  if (valueAsDate === undefined) {
    throw new Error(`Invalid value: \`${value}\` cannot be parsed as a Date`);
  }
  return valueAsDate;
}

// export function asDate(value: unknown): Date | undefined;
// export function asDate(value: unknown, defaultValue: Date): Date;
// export function asDate(value: unknown, defaultValue?: Date): Date | undefined {
//   if (typeof value === 'number') {
//     return new Date(value);
//   }
//   return value instanceof Date ? value : defaultValue;
// }

function isNull(val) {
  return val === null;
}
function asError(err) {
  return err instanceof Error ? err : new Error(typeof err === 'string' ? err : String(err));
}
function errorAsString(err) {
  const errorMap = asMap(err);
  if (errorMap === undefined) {
    return asString(err) ?? String(err);
  }
  const errorMessage = asString(errorMap['message']);
  if (errorMessage === undefined) {
    return String(err);
  }
  return errorMessage;
}
function errorAndStackAsString(err) {
  const errorMap = asMap(err);
  if (errorMap === undefined) {
    return asString(err) ?? String(err);
  }
  const stack = asString(errorMap['stack']);
  if (stack === undefined) {
    return String(err);
  }
  return stack;
}
function asConstantOrThrow(value, expected) {
  if (value !== expected) {
    throw new Error(`Invalid value: \`${value}\`, expected \`${expected}\``);
  }
  return value;
}

// export function asParsedJson<T>(json: string): T {
//   try {
//     return JSON.parse(json) as T;
//   } catch {
//     const defaultValue = {};
//     return defaultValue as T;
//   }
// }
function parseJson(json) {
  try {
    return {
      res: JSON.parse(json),
      err: undefined
    };
  } catch (err) {
    return {
      err,
      res: undefined
    };
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any

// Get all the keys of a type including the optional attributes

// Type for an empty object (ie: {})

function isNonEmptyArray(val) {
  return val.length > 0;
}
function nonEmptyArray(val) {
  return val.length === 0 ? undefined : val;
}
function addPrefix(attr, prefix) {
  return Object.fromEntries(Object.entries(attr).map(([key, value]) => [`${prefix}${key}`, value]));
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
/* harmony import */ var node_crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var node_crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_crypto__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var node_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var node_http__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_http__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _src_type_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);




//
// ENV VARIABLES LOADING
//

// eslint-disable-next-line node/no-process-env
const {
  PORT,
  RUNTIME_LOG_FILE,
  APP_LOG_FILE,
  HANDLER_PATH,
  TIMEOUT_MS
} = process.env;
const port = parseFloat(PORT ?? '');
if (isNaN(port)) {
  runtimeLog({
    event: 'error',
    err: `Invalid process.env.PORT: ${PORT}`,
    path: '',
    method: ''
  });
  // eslint-disable-next-line node/no-process-exit
  process.exit(0);
}
const timeoutMs = parseFloat(TIMEOUT_MS ?? '');
if (isNaN(timeoutMs)) {
  runtimeLog({
    event: 'error',
    err: `Invalid process.env.TIMEOUT_MS: ${TIMEOUT_MS}`,
    path: '',
    method: ''
  });
  // eslint-disable-next-line node/no-process-exit
  process.exit(0);
}
if (HANDLER_PATH === undefined) {
  runtimeLog({
    event: 'error',
    err: `Missing process.env.HANDLER_PATH`,
    path: '',
    method: ''
  });
  // eslint-disable-next-line node/no-process-exit
  process.exit(0);
}

//
// LOGGING FUNCTIONS
//

function appLog(appendFileSync, log) {
  const logs = Array.isArray(log) ? log : [log];
  if (APP_LOG_FILE === undefined || logs.length === 0) {
    return;
  }
  appendFileSync(APP_LOG_FILE, logs.map(log => `[${new Date().toISOString()}] ${log}\n`).join(''));
}
function runtimeLog(event) {
  if (RUNTIME_LOG_FILE === undefined) {
    return;
  }
  if (event.event === 'error') {
    logger(event.err);
  }
  (0,node_fs__WEBPACK_IMPORTED_MODULE_1__.appendFileSync)(RUNTIME_LOG_FILE, `${JSON.stringify({
    t: new Date().toISOString(),
    ...event
  })}\n`);
}

// Clear all previous logs
if (APP_LOG_FILE !== undefined) {
  (0,node_fs__WEBPACK_IMPORTED_MODULE_1__.writeFileSync)(APP_LOG_FILE, '');
}
if (RUNTIME_LOG_FILE !== undefined) {
  (0,node_fs__WEBPACK_IMPORTED_MODULE_1__.writeFileSync)(RUNTIME_LOG_FILE, '');
}

//
// HANDLER LOADING
//

const logger = appLog.bind(null, node_fs__WEBPACK_IMPORTED_MODULE_1__.appendFileSync);
function serialize(val) {
  return val instanceof Error ? (0,_src_type_utils__WEBPACK_IMPORTED_MODULE_3__.errorAndStackAsString)(val) : typeof val === 'string' ? val : JSON.stringify(val);
}
console.log = (...args) => logger(args.map(serialize));
console.error = (...args) => logger(args.map(serialize));
let handler;
// eslint-disable-next-line import/dynamic-import-chunkname, node/no-unsupported-features/es-syntax
import( /* webpackIgnore: true */HANDLER_PATH).then(imported => {
  var _asMap;
  const importedHandler = (_asMap = (0,_src_type_utils__WEBPACK_IMPORTED_MODULE_3__.asMap)(imported)) === null || _asMap === void 0 ? void 0 : _asMap['handler'];
  if (typeof importedHandler !== 'function') {
    runtimeLog({
      event: 'error',
      err: `Lambda is not exporting a "handler" function`,
      path: '',
      method: ''
    });
    // eslint-disable-next-line node/no-process-exit
    process.exit(0);
  }
  handler = importedHandler;
}).catch(err => {
  runtimeLog({
    event: 'error',
    err: `Failure to load lambda handler: ${(0,_src_type_utils__WEBPACK_IMPORTED_MODULE_3__.errorAndStackAsString)(err)}`,
    path: '',
    method: ''
  });
  // eslint-disable-next-line node/no-process-exit
  process.exit(0);
});

//
// LAMBDA SERVER
//

let currentRes;
function globalError(err) {
  runtimeLog({
    event: 'error',
    err: String(err),
    path: '',
    method: ''
  });
  if (currentRes) {
    currentRes.statusCode = 500;
    currentRes.end();
    currentRes = undefined;
  }
}
const server = (0,node_http__WEBPACK_IMPORTED_MODULE_2__.createServer)((req, res) => {
  currentRes = res;
  const url = req.url ?? '';
  if (url.startsWith('/favicon')) {
    res.end();
    currentRes = undefined;
    return;
  }
  const method = req.method ?? '';
  const internalError = err => {
    runtimeLog({
      event: 'error',
      err,
      path: url,
      method
    });
    res.statusCode = 500;
    res.end();
    currentRes = undefined;
  };
  try {
    // Parse body
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });

    // Parse URL
    const parsedUrl = new URL(`http://localhost${url}`);
    const rawQueryString = parsedUrl.search.slice(1);
    const queryStringParameters = Object.fromEntries([...new URLSearchParams(decodeURIComponent(rawQueryString)).entries()]);
    const sendRes = (body, duration,
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    statusCode = 200, headers = {}) => {
      runtimeLog({
        event: 'response',
        path: url,
        method,
        statusCode,
        duration,
        headers,
        bodyLength: body.length
      });
      res.statusCode = statusCode;
      for (const [headerName, headerValue] of Object.entries(headers)) {
        res.setHeader(headerName, headerValue);
      }
      res.write(body);
      res.end();
      currentRes = undefined;
    };
    req.on('end', () => {
      // Log the request
      runtimeLog({
        event: 'request',
        path: url,
        method,
        bodyLength: body.length
      });

      // Create the lambda event
      const event = {
        version: '2.0',
        routeKey: '$default',
        rawPath: parsedUrl.pathname,
        rawQueryString,
        headers: req.headers,
        queryStringParameters,
        requestContext: {
          accountId: 'anonymous',
          // apiId: 'rqez6mmiihukf4yvq2l7rrq2340xpkvp',
          // domainName: 'rqez6mmiihukf4yvq2l7rrq2340xpkvp.lambda-url.eu-west-3.on.aws',
          // domainPrefix: 'rqez6mmiihukf4yvq2l7rrq2340xpkvp',
          http: {
            method,
            path: parsedUrl.pathname,
            // protocol: 'HTTP/1.1',
            // sourceIp: '88.138.164.86',
            userAgent: req.headers['user-agent']
          },
          requestId: (0,node_crypto__WEBPACK_IMPORTED_MODULE_0__.randomUUID)(),
          routeKey: '$default',
          stage: '$default',
          timeEpoch: Date.now()
        },
        body,
        isBase64Encoded: false
      };

      // Run the handler
      if (!handler) {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        sendRes('Lambda handler not found', 0, 404);
        return;
      }
      const startTs = Date.now();
      try {
        const context = {
          getRemainingTimeInMillis: () => {
            return timeoutMs - (Date.now() - startTs);
          }
        };
        Promise.resolve(handler(event, context)).then(handlerRes => {
          const duration = Date.now() - startTs;
          try {
            if (handlerRes === undefined) {
              return internalError(`Invalid response: ${JSON.stringify(handlerRes)}`);
            }
            res.setHeader('Content-Type', 'application/json');
            if (typeof handlerRes === 'object' && handlerRes !== null && !Array.isArray(handlerRes)) {
              const {
                body,
                headers,
                statusCode,
                isBase64Encoded
              } = handlerRes;
              if (!('statusCode' in handlerRes)) {
                return sendRes(JSON.stringify(handlerRes), duration);
              } else if (typeof statusCode !== 'number') {
                return internalError(`statusCode ${JSON.stringify(statusCode)} is not a number`);
              }
              const resBody = typeof body === 'string' ? typeof isBase64Encoded === 'boolean' && isBase64Encoded ? Buffer.from(body, 'base64') : body : JSON.stringify(body);
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              return sendRes(resBody, duration, statusCode, headers);
            } else if (typeof handlerRes === 'string') {
              return sendRes(handlerRes, duration);
            }
            return sendRes(JSON.stringify(handlerRes), duration);
          } catch (err) {
            internalError((0,_src_type_utils__WEBPACK_IMPORTED_MODULE_3__.errorAndStackAsString)(err));
          }
        }).catch(err => {
          internalError((0,_src_type_utils__WEBPACK_IMPORTED_MODULE_3__.errorAndStackAsString)(err));
        });
      } catch (err) {
        internalError((0,_src_type_utils__WEBPACK_IMPORTED_MODULE_3__.errorAndStackAsString)(err));
      }
    });
  } catch (err) {
    internalError(String(err));
  }
}).listen(PORT).on('error', err => {
  globalError(err);
}).on('listening', () => {
  runtimeLog({
    event: 'start',
    port
  });
});
function cleanup() {
  server.close();
}
process.on('SIGINT', () => cleanup());
process.on('SIGTERM', () => cleanup());
process.on('uncaughtException', err => {
  globalError(err);
  cleanup();
});
process.on('unhandledRejection', err => {
  globalError(err);
  cleanup();
});
})();


//# sourceMappingURL=index.js.map