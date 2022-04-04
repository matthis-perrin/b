import {basename, dirname, join} from 'path';
import {cwd} from 'process';
import {readdir, readFile, stat, mkdir, writeFile} from 'fs/promises';

import {ProjectType, WorkspaceType} from '../models';
import {
  REACT_ROUTER_VERSION,
  REACT_VERSION,
  STYLED_COMPONENTS_TYPES_VERSION,
  STYLED_COMPONENTS_VERSION,
  NODE_TYPES_VERSION,
  REACT_NATIVE_VERSION,
} from '../versions';
import {execSync} from 'child_process';
import {generateTerraform} from '../terraform/all';
import {generateCustomTerraform} from '../terraform/custom';

const templatesPath = join(__dirname, 'templates');

export default async function initProject(): Promise<void> {
  const prompts = require('prompts');
  let projectPath = cwd();
  let projectName = basename(projectPath);

  // Ask for project name and create folder if directory is not empty
  const content = await readdir(projectPath);
  if (!content.every(f => f.startsWith('.'))) {
    projectName = (
      await prompts({
        type: 'text',
        name: 'projectName',
        message: 'Project name',
        validate: (v: string) => v.length > 0,
      })
    ).projectName;
    if (projectName === undefined) {
      throw new Error(`Project name is required`);
    }
    projectPath = join(projectPath, projectName);
    await mkdir(projectPath);
  }

  // Ask for the type of project
  const {projectType} = await prompts({
    type: 'select',
    name: 'projectType',
    message: 'Project type',
    choices: [
      {title: 'NodeJS', value: ProjectType.Node},
      {title: 'Web App', value: WorkspaceType.WebApp},
      {title: 'Web (React)', value: ProjectType.Web},
      {title: 'Lib', value: ProjectType.Lib},
      {title: 'React Native', value: ProjectType.ReactNative},
    ],
  });
  if (projectType === undefined) {
    throw new Error(`Project type is required`);
  }

  await generateProject(projectPath, projectName, projectType);
}

async function generateProject(
  dst: string,
  name: string,
  type: ProjectType | WorkspaceType
): Promise<void> {
  console.log(dst, name, type);
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
  const files = await getFiles(join(templatesPath, type));
  await Promise.all([
    ...files.map(async f => {
      const fileContent = await readFile(join(templatesPath, type, f));
      const compiledContent = fileContent
        .toString()
        .replace(/\{\{([^\}]+)\}\}/gu, (match, vName) => variables[vName] ?? match);
      const fPath = join(dst, f);
      await mkdir(dirname(fPath), {recursive: true});
      await writeFile(fPath, compiledContent);
    }),
    type === WorkspaceType.WebApp
      ? (async () => {
          const terraformBasePath = join(dst, 'terraform', 'terraform.tf');
          const terraformCustomPath = join(dst, 'terraform', 'custom.tf');
          await mkdir(dirname(terraformBasePath), {recursive: true});
          await writeFile(terraformBasePath, await generateTerraform(name));
          await writeFile(terraformCustomPath, await generateCustomTerraform(name));
        })()
      : Promise.resolve(),
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

  // Initialization script for Web App project
  if (type === WorkspaceType.WebApp) {
    console.log('Running post install script');
    const commands = [`pushd ${dst}`, `node setup.js`, `popd`];
    execSync(commands.join(' && '), {stdio: ['ignore', 'inherit', 'inherit']});
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

initProject().catch(console.error);
