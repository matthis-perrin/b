import {exec} from 'child_process';
import {createServer, IncomingMessage, Server, ServerResponse} from 'http';
import {Compiler} from 'webpack';

export class LambdaServerPlugin {
  public apply(compiler: Compiler): void {
    let server: Server | undefined;
    compiler.hooks.initialize.tap('LambdaServerPlugin', () => {
      if (!compiler.options.watch) {
        return;
      }
      // [START] SETUP CODE
      server = createServer((req: IncomingMessage, res: ServerResponse) => {
        const url = req.url;
        const method = req.method;

        // Parse body
        let body = '';
        req.on('data', chunk => {
          body += chunk;
        });

        // Parse headers
        const headers: Record<string, string> = {};
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
          const command = `node -e "require('./dist/main').handler({httpMethod: '${method}', path: '${url}', body: ${
            body === '' ? 'null' : `atob('${btoa(body)}')`
          }, headers: ${`JSON.parse(atob('${btoa(
            JSON.stringify(headers)
          )}'))`}}).then(json => console.log(JSON.stringify(json))).catch(console.error);"`;
          exec(command, (error, stdout, stderr) => {
            const err = error ? String(error) : stderr;
            if (err.length > 0) {
              const output = JSON.stringify({err: 'Failure to run lambda', message: err});
              console.error(output);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.write(output);
              res.end();
            } else {
              try {
                const {statusCode, body} = JSON.parse(stdout);
                res.statusCode = statusCode;
                res.setHeader('Content-Type', 'application/json');
                res.write(body);
                res.end();
              } catch (err: unknown) {
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
    function exitHandler(): void {
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
