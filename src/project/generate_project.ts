import {execSync} from 'child_process';
import {join, dirname} from 'path';
import {readFile, mkdir, writeFile, readdir, stat} from '../fs';
import {ProjectType} from '../models';
import {
  REACT_ROUTER_VERSION,
  REACT_VERSION,
  REACT_NATIVE_VERSION,
  STYLED_COMPONENTS_TYPES_VERSION,
  STYLED_COMPONENTS_VERSION,
  NODE_TYPES_VERSION,
} from '../versions';

const TEMPLATES_PATH = join(__dirname, 'templates');

export async function generateProject(dst: string, name: string, type: ProjectType): Promise<void> {
  // Generate project files based on template
  const variables: Record<string, string> = {
    PROJECT_NAME: name,
    PROJECT_TYPE: type,
    REACT_ROUTER_VERSION,
    REACT_VERSION,
    REACT_NATIVE_VERSION,
    STYLED_COMPONENTS_TYPES_VERSION,
    STYLED_COMPONENTS_VERSION,
    NODE_TYPES_VERSION,
  };
  const files = await getFiles(join(TEMPLATES_PATH, type));
  await Promise.all([
    ...files.map(async f => {
      const fileContent = await readFile(join(TEMPLATES_PATH, type, f));
      const compiledContent = fileContent
        .toString()
        .replace(/\{\{([^\}]+)\}\}/gu, (match, vName) => variables[vName] ?? match);
      const fPath = join(dst, f);
      await mkdir(dirname(fPath), {recursive: true});
      await writeFile(fPath, compiledContent);
    }),
  ]);

  // Post generation script for React Native project
  if (type === ProjectType.ReactNative) {
    console.log('Running post install script');
    const commands = [
      `pushd ${dst}`,
      `npx --yes react-native init ${name}`,
      `mv ${name}/ios .`,
      `mv ${name}/android .`,
      `rm -rf ${name}`,
      `popd`,
    ];
    execSync(commands.join(' && '));
  }
}

async function getFiles(path: string): Promise<string[]> {
  const subdirs = await readdir(path);
  const files = await Promise.all(
    subdirs.map(async subdir => {
      const p = join(path, subdir);
      return (await stat(p)).isDirectory() ? (await getFiles(p)).map(f => join(subdir, f)) : subdir;
    })
  );
  return files.flat();
}
