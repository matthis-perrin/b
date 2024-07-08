/* eslint-disable import/no-named-as-default-member */
import {readdir, readFile} from 'node:fs/promises';
import {join, resolve} from 'node:path';

// eslint-disable-next-line @typescript-eslint/no-restricted-imports, node/file-extension-in-import
import {error, log} from './logger.js';
// eslint-disable-next-line @typescript-eslint/no-restricted-imports, node/file-extension-in-import
import {removeUndefined} from './type_utils.js';
// eslint-disable-next-line @typescript-eslint/no-restricted-imports, node/file-extension-in-import
import {table} from './webpack-runner/text_table.js';
// eslint-disable-next-line import/default
import colors from 'ansi-colors';
import packageMetadata from 'package-json';
import {satisfies} from 'semver';

function sameVersion(v1: string, v2: string): boolean {
  // eslint-disable-next-line unicorn/no-for-loop
  for (let index = 0; index < v1.length; index++) {
    if (v1[index] !== 'x' && v2[index] !== 'x' && v1[index] !== v2[index]) {
      return false;
    }
  }
  return true;
}

export async function check(): Promise<void> {
  const packagePath = join(resolve('.'), 'packages');
  const packageDirs = await readdir(packagePath);
  const packageJsonFiles = await Promise.all(
    packageDirs.map(async d => ({
      project: d,
      content: JSON.parse(
        await readFile(join(packagePath, d, 'package.json')).then(buff => buff.toString())
      ),
    }))
  );

  const dependencies: Record<string, {version: string; projects: string[]; dev: boolean}> = {};
  const errors: string[] = [];
  for (const {content, project} of packageJsonFiles) {
    const dep = (content.dependencies ?? {}) as Record<string, string>;
    const devDep = (content.devDependencies ?? {}) as Record<string, string>;
    for (const {name, version, dev} of [
      ...Object.entries(dep).map(([name, version]) => ({name, version, dev: false})),
      ...Object.entries(devDep).map(([name, version]) => ({name, version, dev: true})),
    ]) {
      let current = dependencies[name];
      if (!current) {
        current = {version, projects: [], dev: true};
        dependencies[name] = current;
      }
      if (!sameVersion(current.version, version)) {
        errors.push(
          `Package ${name} has version ${version} in ${project} and version ${
            current.version
          } in ${current.projects.join(', ')}`
        );
      } else {
        current.projects.push(project);
        current.dev = current.dev && dev;
      }
    }
  }

  if (errors.length > 0) {
    error(errors.join('\n'));
    process.exit(1); // eslint-disable-line node/no-process-exit
  }

  const res = await Promise.all(
    Object.entries(dependencies).map(async ([name, {version, projects, dev}]) =>
      checkPackage(name, projects, dev, version)
    )
  );
  const outdated = removeUndefined(res).sort(([name1], [name2]) => name1.localeCompare(name2));
  if (outdated.length === 0) {
    log(colors.green('Everything is up-to-date'));
  } else {
    log(table(outdated, {align: ['l', 'r', 'l', 'l', 'l']}));
  }
}

async function checkPackage(
  name: string,
  projects: string[],
  dev: boolean,
  version: string
): Promise<[string, string, string, string, string] | undefined> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const latest = ((await packageMetadata(name)) as any).version as string;
  if (!satisfies(latest, version)) {
    return [
      name,
      [...version].map((c, i) => (latest[i] !== c ? colors.red(c) : c)).join(''),
      colors.gray('->'),
      [...latest].map((c, i) => (version[i] !== c ? colors.green(c) : c)).join(''),
      `${colors.gray(projects.join(', '))}${dev ? ' (dev)' : ''}`,
    ];
  }
  return undefined;
}

check().catch(error);
/* eslint-enable import/no-named-as-default-member */
