import {createHash} from 'node:crypto';
import {readdir, readFile} from 'node:fs/promises';
import {createServer, IncomingMessage, ServerResponse} from 'node:http';
import {basename, join} from 'node:path';

interface File {
  path: string;
  content: string;
}

function iterFiles(opts: {
  root: string;
  excludeDirs?: (path: string) => boolean;
  excludeFiles?: (path: string) => boolean;
}): AsyncIterable<File> {
  const {root, excludeDirs, excludeFiles} = opts;
  const dirs: string[] = [root];
  const files: string[] = [];

  async function next(): Promise<IteratorResult<File, undefined>> {
    // If we have a file in the queue, we process it
    const nextFile = files.shift();
    if (nextFile !== undefined) {
      const buffer = await readFile(nextFile);
      return {done: false, value: {path: nextFile, content: buffer.toString()}};
    }
    // Otherwise we need to find more files
    // Check if we still have dir to walk
    const nextDir = dirs.shift();
    if (nextDir === undefined) {
      return {done: true, value: undefined};
    }
    // List dir and add to queues
    const dirEnts = await readdir(nextDir, {withFileTypes: true});
    for (const dirEnt of dirEnts) {
      const path = join(nextDir, dirEnt.name);
      if (dirEnt.isDirectory()) {
        if (excludeDirs?.(path)) {
          continue;
        }
        dirs.push(path);
      } else if (dirEnt.isFile()) {
        if (excludeFiles?.(path)) {
          continue;
        }
        files.push(path);
      }
    }
    // Reprocess
    return await next();
  }

  return {
    [Symbol.asyncIterator]() {
      return {next};
    },
  };
}

interface Icon {
  viewBox: string;
  element: string;
  name: string;
}

const extension = '.tsx';

async function findIcons(root: string): Promise<Icon[]> {
  const icons: Icon[] = [];
  for await (const f of iterFiles({
    root,
    excludeDirs: p => p.includes('node_modules') || p.includes('/.'),
    excludeFiles: p => !p.endsWith(extension),
  })) {
    if (f.content.includes('SvgIconData')) {
      const [viewBox, element] =
        /\{\s*viewBox:\s*'(?<viewbox>[^']*)',\s*element:\s*(?<element>[^;]+);/u
          .exec(f.content)
          ?.slice(1) ?? [];
      if (viewBox === undefined) {
        continue;
      }
      if (element === undefined) {
        continue;
      }
      let trimmed = element;
      while (true) {
        if (trimmed.includes('\n')) {
          trimmed = trimmed.replace('\n', '');
        } else if (trimmed.startsWith(' ') || trimmed.startsWith('\t') || trimmed.startsWith('(')) {
          trimmed = trimmed.slice(1);
        } else if (
          trimmed.endsWith(' ') ||
          trimmed.endsWith('\t') ||
          trimmed.endsWith(')') ||
          trimmed.endsWith(',') ||
          trimmed.endsWith('}')
        ) {
          trimmed = trimmed.slice(0, -1);
        } else {
          break;
        }
      }
      icons.push({name: basename(f.path).slice(0, -extension.length), viewBox, element: trimmed});
    }
  }
  return icons;
}

function html(body: string): string {
  return `
<!DOCTYPE html>
<html lang="en-US">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>ICONS</title>
        <style>
            .wrapper {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 32px;
                padding: 32px;
            }
            .icon {
                width: 80px;
                display: flex;
                flex-direction: column;
                gap: 8px;
                align-items: center;
                justify-content: center;
            }
            .icon svg {
                fill: #000;
            }
            .icon-label {
                color: #aaa;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                width: 100%;
                text-align: center;
            }
        </style>
    </head>
    <body>
        ${body}
    </body>
</html>

  `.trim();
}

export async function startIconServer(
  root: string
): Promise<{port: number; hasIcons: boolean; stopServer: () => void}> {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const hexHash = createHash('md5').update(root).digest('hex').slice(0, 4);
  const port = 1024 + Math.floor(parseInt(hexHash, 16) / 2);
  const initialIcons = await findIcons(root);

  const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    findIcons(root)
      .then(icons => {
        const body = html(
          `<div class="wrapper">${icons
            .map(
              icon => `
              <div class="icon">
                  <svg viewbox="${icon.viewBox}" width="48" height="48">${icon.element}</svg>
                  <div class="icon-label" title="${icon.name}">${icon.name}</div>
              </div>
          `
            )
            .join('')}</div>`
        );
        res.write(body);
        res.end();
      })
      .catch((err: unknown) => {
        res.write(html(`Failure to load icons: ${String(err)}`));
        res.end();
      });
  }).listen(port);

  return {
    port,
    hasIcons: initialIcons.length > 0,
    stopServer: () => server.close(),
  };
}
