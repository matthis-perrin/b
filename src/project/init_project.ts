import {basename, dirname, join} from 'path';
import {cwd} from 'process';
import {readdir, readFile, stat, mkdir, writeFile} from 'fs/promises';

import {ProjectType} from '../models';
import {
  REACT_ROUTER_VERSION,
  REACT_VERSION,
  STYLED_COMPONENTS_TYPES_VERSION,
  STYLED_COMPONENTS_VERSION,
  NODE_TYPES_VERSION,
  REACT_NATIVE_VERSION,
} from '../versions';

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

async function generateProject(dst: string, name: string, type: ProjectType): Promise<void> {
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
  await Promise.all(
    files.map(async f => {
      const fileContent = await readFile(join(templatesPath, type, f));
      const compiledContent = fileContent
        .toString()
        .replace(/\{\{([^\}]+)\}\}/gu, (match, vName) => variables[vName] ?? '');
      const fPath = join(dst, f);
      await mkdir(dirname(fPath), {recursive: true});
      await writeFile(fPath, compiledContent);
    })
  );
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
