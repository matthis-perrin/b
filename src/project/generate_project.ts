import {execSync} from 'child_process';
import {join} from 'path';
import {readFile, readdir, stat, writeRawFile} from '../fs';
import {PROJECT_TYPE_TO_METADATA, RuntimeType} from '../models';
import {
  REACT_ROUTER_VERSION,
  REACT_VERSION,
  REACT_NATIVE_VERSION,
  STYLED_COMPONENTS_TYPES_VERSION,
  STYLED_COMPONENTS_VERSION,
  NODE_TYPES_VERSION,
  PACKAGE_VERSIONS,
} from '../versions';
import {WorkspaceProject} from './generate_workspace';

const TEMPLATES_PATH = join(__dirname, 'templates');

export async function generateProject(dst: string, project: WorkspaceProject): Promise<void> {
  const {projectName, type} = project;
  // Generate project files based on template
  const variables: Record<string, string> = {
    PROJECT_NAME: projectName,
    REACT_ROUTER_VERSION,
    REACT_VERSION,
    REACT_NATIVE_VERSION,
    STYLED_COMPONENTS_TYPES_VERSION,
    STYLED_COMPONENTS_VERSION,
    NODE_TYPES_VERSION,
    ESLINT_CONFIG_VERSION: PACKAGE_VERSIONS.eslint,
    PRETTIER_CONFIG_VERSION: PACKAGE_VERSIONS.prettier,
    TSCONFIG_VERSION: PACKAGE_VERSIONS.tsconfig,
    WEBPACK_VERSION: PACKAGE_VERSIONS.webpack,
  };
  const files = await getFiles(join(TEMPLATES_PATH, type));
  await Promise.all([
    ...files.map(async f => {
      const fileContent = await readFile(join(TEMPLATES_PATH, type, f));
      const compiledContent = fileContent
        .toString()
        .replace(/\{\{([^\}]+)\}\}/gu, (match, vName) => variables[vName] ?? match);
      const fPath = join(dst, f);
      await writeRawFile(fPath, compiledContent);
    }),
  ]);

  // Post generation script for React Native project
  if (PROJECT_TYPE_TO_METADATA[type].runtimeType === RuntimeType.ReactNative) {
    console.log('Running post install script');
    const commands = [
      `pushd ${dst}`,
      `npx --yes react-native init ${projectName}`,
      `mv ${projectName}/ios .`,
      `mv ${projectName}/android .`,
      `rm -rf ${projectName}`,
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
