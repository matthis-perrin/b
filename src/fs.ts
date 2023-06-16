import {exec} from 'node:child_process';
import {mkdirSync, promises, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';

import {BuiltInParserName, format} from 'prettier';

export const {access, readFile, readdir, stat} = promises;
const {writeFile, mkdir, rm} = promises;

let logEnabled = true;
export const setLogging = (enabled: boolean): void => {
  logEnabled = enabled;
};

export async function writeJsonFile(path: string, json: unknown): Promise<void> {
  await writeRawFile(path, `${JSON.stringify(json, undefined, 2)}\n`);
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
  } as const);

async function writePrettyFile(
  parser: BuiltInParserName,
  path: string,
  code: string
): Promise<void> {
  await writeRawFile(path, format(code, prettierConfig(parser)));
}

function writePrettyFileSync(parser: BuiltInParserName, path: string, code: string): void {
  writeRawFileSync(path, format(code, prettierConfig(parser)));
}

export async function writeJsFile(path: string, js: string): Promise<void> {
  return writePrettyFile('babel', path, js);
}

export function writeJsFileSync(path: string, js: string): void {
  return writePrettyFileSync('babel', path, js);
}

export async function writeTsFile(path: string, ts: string): Promise<void> {
  return writePrettyFile('typescript', path, ts);
}

export function writeTsFileSync(path: string, ts: string): void {
  return writePrettyFileSync('typescript', path, ts);
}

export async function writeRawFile(path: string, content: string): Promise<void> {
  if (logEnabled) {
    console.log(`write ${path}`);
  }
  await mkdir(dirname(path), {recursive: true});
  await writeFile(path, content);
}

export function writeRawFileSync(path: string, content: string): void {
  if (logEnabled) {
    console.log(`write ${path}`);
  }
  mkdirSync(dirname(path), {recursive: true});
  writeFileSync(path, content);
}

export async function rmDir(dirPath: string): Promise<void> {
  await rm(dirPath, {recursive: true, force: true});
}

export async function cleanDir(dirPath: string): Promise<void> {
  if (logEnabled) {
    console.log('clean', dirPath);
  }
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
