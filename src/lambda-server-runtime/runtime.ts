import {randomUUID} from 'node:crypto';
import {appendFileSync, writeFileSync} from 'node:fs';
import {createServer, IncomingMessage, ServerResponse} from 'node:http';

import {asMap, errorAndStackAsString} from '@src/type_utils';
import {LambdaServerEvent} from '@src/webpack/plugins/lambda_server_plugin';

//
// ENV VARIABLES LOADING
//

// eslint-disable-next-line node/no-process-env
const {PORT, RUNTIME_LOG_FILE, APP_LOG_FILE, HANDLER_PATH, TIMEOUT_MS} = process.env;

const port = parseFloat(PORT ?? '');
if (isNaN(port)) {
  runtimeLog({event: 'error', err: `Invalid process.env.PORT: ${PORT}`, path: '', method: ''});
  // eslint-disable-next-line node/no-process-exit
  process.exit(0);
}

const timeoutMs = parseFloat(TIMEOUT_MS ?? '');
if (isNaN(timeoutMs)) {
  runtimeLog({
    event: 'error',
    err: `Invalid process.env.TIMEOUT_MS: ${TIMEOUT_MS}`,
    path: '',
    method: '',
  });
  // eslint-disable-next-line node/no-process-exit
  process.exit(0);
}

if (HANDLER_PATH === undefined) {
  runtimeLog({event: 'error', err: `Missing process.env.HANDLER_PATH`, path: '', method: ''});
  // eslint-disable-next-line node/no-process-exit
  process.exit(0);
}

//
// LOGGING FUNCTIONS
//

function appLog(
  appendFileSync: (file: string, content: string) => void,
  log: string | string[]
): void {
  const logs = Array.isArray(log) ? log : [log];
  if (APP_LOG_FILE === undefined || logs.length === 0) {
    return;
  }
  appendFileSync(APP_LOG_FILE, logs.map(log => `[${new Date().toISOString()}] ${log}\n`).join(''));
}

function runtimeLog(event: LambdaServerEvent): void {
  if (RUNTIME_LOG_FILE === undefined) {
    return;
  }
  appendFileSync(RUNTIME_LOG_FILE, `${JSON.stringify({t: new Date().toISOString(), ...event})}\n`);
}

// Clear all previous logs
if (APP_LOG_FILE !== undefined) {
  writeFileSync(APP_LOG_FILE, '');
}
if (RUNTIME_LOG_FILE !== undefined) {
  writeFileSync(RUNTIME_LOG_FILE, '');
}

//
// HANDLER LOADING
//

// eslint-disable-next-line no-null/no-null
const logger = appLog.bind(null, appendFileSync);
function serialize(val: unknown): string {
  return val instanceof Error ? errorAndStackAsString(val) : JSON.stringify(val);
}
console.log = (...args: unknown[]) => logger(args.map(serialize));
console.error = (...args: unknown[]) => logger(args.map(serialize));

let handler: Function | undefined;
// eslint-disable-next-line import/dynamic-import-chunkname, node/no-unsupported-features/es-syntax
import(/* webpackIgnore: true */ HANDLER_PATH)
  .then(imported => {
    const importedHandler = asMap(imported)?.['handler'];
    if (typeof importedHandler !== 'function') {
      runtimeLog({
        event: 'error',
        err: `Lambda is not exporting a "handler" function`,
        path: '',
        method: '',
      });
      // eslint-disable-next-line node/no-process-exit
      process.exit(0);
    }
    handler = importedHandler;
  })
  .catch(err => {
    runtimeLog({
      event: 'error',
      err: `Failure to load lambda handler: ${errorAndStackAsString(err)}`,
      path: '',
      method: '',
    });
    // eslint-disable-next-line node/no-process-exit
    process.exit(0);
  });

//
// LAMBDA SERVER
//

let currentRes: ServerResponse | undefined;
function globalError(err: unknown): void {
  runtimeLog({event: 'error', err: String(err), path: '', method: ''});
  if (currentRes) {
    currentRes.statusCode = 500;
    currentRes.end();
    currentRes = undefined;
  }
}

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  currentRes = res;
  const url = req.url ?? '';

  if (url.startsWith('/favicon')) {
    res.end();
    currentRes = undefined;
    return;
  }

  const method = req.method ?? '';

  const internalError = (err: string): void => {
    runtimeLog({event: 'error', err, path: url, method});
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
    const queryStringParameters = Object.fromEntries([
      ...new URLSearchParams(decodeURIComponent(rawQueryString)).entries(),
    ]);

    const sendRes = (
      body: string | Buffer,
      duration: number,
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      statusCode = 200,
      headers: Record<string, string> = {}
    ): void => {
      runtimeLog({
        event: 'response',
        path: url,
        method,
        statusCode,
        duration,
        headers,
        bodyLength: body.length,
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
      runtimeLog({event: 'request', path: url, method, bodyLength: body.length});

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
            userAgent: req.headers['user-agent'],
          },
          requestId: randomUUID(),
          routeKey: '$default',
          stage: '$default',
          timeEpoch: Date.now(),
        },
        body,
        isBase64Encoded: false,
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
          },
        };
        Promise.resolve(handler(event, context))
          .then(handlerRes => {
            const duration = Date.now() - startTs;
            try {
              if (handlerRes === undefined) {
                return internalError(`Invalid response: ${JSON.stringify(handlerRes)}`);
              }
              res.setHeader('Content-Type', 'application/json');
              if (
                typeof handlerRes === 'object' &&
                // eslint-disable-next-line no-null/no-null
                handlerRes !== null &&
                !Array.isArray(handlerRes)
              ) {
                const {body, headers, statusCode, isBase64Encoded} = handlerRes;
                if (!('statusCode' in handlerRes)) {
                  return sendRes(JSON.stringify(handlerRes), duration);
                } else if (typeof statusCode !== 'number') {
                  return internalError(`statusCode ${JSON.stringify(statusCode)} is not a number`);
                }
                const resBody =
                  typeof body === 'string'
                    ? typeof isBase64Encoded === 'boolean' && isBase64Encoded
                      ? Buffer.from(body, 'base64')
                      : body
                    : JSON.stringify(body);
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                return sendRes(resBody, duration, statusCode, headers);
              } else if (typeof handlerRes === 'string') {
                return sendRes(handlerRes, duration);
              }
              return sendRes(JSON.stringify(handlerRes), duration);
            } catch (err: unknown) {
              internalError(errorAndStackAsString(err));
            }
          })
          .catch((err: unknown) => {
            internalError(errorAndStackAsString(err));
          });
      } catch (err: unknown) {
        internalError(errorAndStackAsString(err));
      }
    });
  } catch (err: unknown) {
    internalError(String(err));
  }
})
  .listen(PORT)
  .on('error', err => {
    globalError(err);
  })
  .on('listening', () => {
    runtimeLog({event: 'start', port});
  });

function cleanup(): void {
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
