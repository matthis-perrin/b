import {exec} from 'child_process';
import {promises} from 'fs';
import {dirname} from 'path';
import {format} from 'prettier';

export const {access, readFile, readdir, stat} = promises;
const {writeFile, mkdir, rm} = promises;

export async function writeJsonFile(path: string, json: unknown): Promise<void> {
  await writeRawFile(path, `${JSON.stringify(json, undefined, 2)}\n`);
}

export async function writeJsFile(path: string, js: string): Promise<void> {
  await writeRawFile(
    path,
    `${format(js, {
      parser: 'babel',
      printWidth: 100,
      singleQuote: true,
      trailingComma: 'es5',
      bracketSpacing: false,
      arrowParens: 'avoid',
      endOfLine: 'auto',
    })}\n`
  );
}

export async function writeRawFile(path: string, content: string): Promise<void> {
  console.log(`write ${path}`);
  await mkdir(dirname(path), {recursive: true});
  await writeFile(path, content);
}

export async function rmDir(dirPath: string): Promise<void> {
  await rm(dirPath, {recursive: true, force: true});
}

export async function cleanDir(dirPath: string): Promise<void> {
  console.log('clean', dirPath);
  try {
    await rmDir(dirPath);
  } finally {
    await mkdir(dirPath, {recursive: true});
  }
}

export async function cp(from: string, to: string): Promise<void> {
  console.log('copy', from, to);
  return new Promise((resolve, reject) =>
    exec(`cp -R ${from} ${to}`, err => (err ? reject(err) : resolve()))
  );
}
