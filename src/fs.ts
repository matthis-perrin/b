import {promises} from 'fs';
import {format} from 'prettier';

export const {writeFile, access, mkdir, rm, readFile, readdir} = promises;

export async function writeJsonFile(path: string, json: unknown): Promise<void> {
  console.log(`write ${path}`);
  await writeFile(path, `${JSON.stringify(json, undefined, 2)}\n`);
}

export async function writeJsFile(path: string, js: string): Promise<void> {
  console.log(`write ${path}`);
  await writeFile(path, `${format(js, {parser: 'babel'})}\n`);
}

export async function cleanDir(dirPath: string): Promise<void> {
  console.log('clean', dirPath);
  try {
    await rm(dirPath, {recursive: true, force: true});
  } finally {
    await mkdir(dirPath, {recursive: true});
  }
}
