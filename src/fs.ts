import {exec} from 'child_process';
import {promises} from 'fs';
import {dirname} from 'path';
import {format} from 'prettier';

export const {writeFile, access, mkdir, rm, readFile, readdir, stat} = promises;

export async function writeJsonFile(path: string, json: unknown): Promise<void> {
  await writeRawFile(path, `${JSON.stringify(json, undefined, 2)}\n`);
}

export async function writeJsFile(path: string, js: string): Promise<void> {
  await writeRawFile(path, `${format(js, {parser: 'babel'})}\n`);
}

export async function writeRawFile(path: string, content: string): Promise<void> {
  console.log(`write ${path}`);
  await mkdir(dirname(path), {recursive: true});
  await writeFile(path, content);
}

export async function cleanDir(dirPath: string): Promise<void> {
  console.log('clean', dirPath);
  try {
    await rm(dirPath, {recursive: true, force: true});
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
