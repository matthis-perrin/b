import {exec} from 'node:child_process';
import {promises} from 'node:fs';
import {dirname, join} from 'node:path';

import {BuiltInParserName, format} from 'prettier';

export const {access, readFile: readFileInternal, readdir, stat} = promises;
const {writeFile, mkdir, rm} = promises;

export async function readFile(path: string): Promise<string> {
  const buffer = await readFileInternal(path);
  return buffer.toString();
}

const prettierConfig = (parser: BuiltInParserName) =>
  ({
    parser,
    printWidth: 100,
    singleQuote: true,
    trailingComma: 'es5',
    bracketSpacing: false,
    arrowParens: 'avoid',
    endOfLine: 'auto',
  }) as const;

export async function prettierFormat(str: string, parser: BuiltInParserName): Promise<string> {
  return format(str, prettierConfig(parser));
}

export async function writeRawFile(path: string, content: string): Promise<void> {
  await mkdir(dirname(path), {recursive: true});
  await writeFile(path, content);
}

export async function prettyJson(json: unknown, opts?: {compact?: boolean}): Promise<string> {
  const {compact} = opts ?? {};
  return format(
    compact ? JSON.stringify(json) : JSON.stringify(json, undefined, 2),
    prettierConfig('json')
  );
}
export async function writeJsonFile(path: string, json: unknown): Promise<void> {
  await writeRawFile(path, await prettyJson(json));
}

export async function prettyJs(js: string): Promise<string> {
  return format(js, prettierConfig('babel'));
}
export async function writeJsFile(path: string, js: string): Promise<void> {
  await writeRawFile(path, await prettyJs(js));
}

export async function prettyTs(ts: string): Promise<string> {
  return format(ts, prettierConfig('typescript'));
}
export async function writeTsFile(path: string, ts: string): Promise<void> {
  await writeRawFile(path, await prettyTs(ts));
}

export async function writeRawFileIfNotExists(path: string, content: string): Promise<void> {
  if (await exists(path)) {
    return;
  }
  await writeRawFile(path, content);
}

export async function rmDir(dirPath: string): Promise<void> {
  await rm(dirPath, {recursive: true, force: true});
}

export async function cleanDir(dirPath: string): Promise<void> {
  try {
    await rmDir(dirPath);
  } finally {
    await mkdir(dirPath, {recursive: true});
  }
}

export async function cp(from: string, to: string): Promise<void> {
  return new Promise((resolve, reject) => {
    exec(`cp -R ${from} ${to}`, err => (err ? reject(err) : resolve()));
  });
}

export async function exists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

export async function maybeReadFile(path: string): Promise<string | undefined> {
  try {
    const fileContent = await readFile(path);
    return fileContent.toString();
  } catch {
    return undefined;
  }
}

export async function listFiles(path: string): Promise<string[]> {
  const files: string[] = [];
  const ents = await readdir(path, {withFileTypes: true});
  const promises: Promise<void>[] = [];
  for (const ent of ents) {
    const entPath = join(path, ent.name);
    if (ent.isDirectory()) {
      promises.push(
        listFiles(entPath).then(subFiles => {
          files.push(...subFiles);
        })
      );
    } else if (ent.isFile()) {
      files.push(entPath);
    }
  }
  await Promise.all(promises);
  return files;
}
