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

export async function cleanDir(dirPath: string, prefix?: string): Promise<void> {
  try {
    await access(dirPath);
    const dirs = await readdir(dirPath);
    if (prefix !== undefined) {
      const dirsToDelete = dirs.filter(d => d.startsWith(prefix));
      await Promise.all(dirsToDelete);
    }
  } catch {
    await mkdir(dirPath, {recursive: true});
  }
}
