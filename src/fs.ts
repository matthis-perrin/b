import {promises} from 'fs';
import {format} from 'prettier';

export const {writeFile, access, mkdir, rm, readFile, readdir} = promises;

export async function writeJsonFile(path: string, json: unknown): Promise<void> {
  console.log(`writing ${path}`);
  await writeFile(path, `${JSON.stringify(json, undefined, 2)}\n`);
}

export async function writeJsFile(path: string, js: string): Promise<void> {
  console.log(`writing ${path}`);
  await writeFile(path, `${format(js, {parser: 'babel'})}\n`);
}

export async function cleanDir(dirPath: string): Promise<void> {
  try {
    await rm(dirPath, {recursive: true});
  } catch {
    // dir doesn't exist
  } finally {
    await mkdir(dirPath, {recursive: true});
  }
}
