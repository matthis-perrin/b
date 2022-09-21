import {mkdir} from 'fs/promises';
import {join, resolve} from 'path';
import {fileURLToPath} from 'url';

import {cleanDir, cp, readdir, readFile, writeJsonFile, writeRawFile} from './fs';
import {RuntimeType} from './models';
import {LIB_VERSIONS} from './versions';

const TEMPLATES_DIR = join(fileURLToPath(import.meta.url), '../../templates');

export async function generateTemplatesRootPackageJson(
  eslint: RuntimeType[],
  tsConfig: RuntimeType[],
  webpack: RuntimeType[]
): Promise<void> {
  const deps = [
    ...eslint.map(runtime => `eslint-config-${runtime}`),
    ...tsConfig.map(runtime => `tsconfig-${runtime}`),
    ...webpack.map(runtime => `webpack-${runtime}`),
    'prettier-config',
  ].sort((d1, d2) => d1.localeCompare(d2));

  const devDependencies = Object.fromEntries(
    deps.map(dep => [`@matthis/${dep}`, `file:../packages/${dep}`])
  );
  await writeJsonFile(join(resolve('.'), 'templates', 'package.json'), {
    name: 'all-dependencies',
    devDependencies,
  });
}

export async function updateTemplatesLibVersions(): Promise<void> {
  const templatesEnts = await readdir(TEMPLATES_DIR, {withFileTypes: true});
  const templatesDirs = templatesEnts.filter(
    ent => ent.isDirectory() && ent.name !== 'node_modules'
  );
  await Promise.all([
    ...templatesDirs.map(async template => {
      const filePath = join(TEMPLATES_DIR, template.name, 'package.json');
      const fileContent = await readFile(filePath);
      const compiledContent = fileContent
        .toString()
        .replace(/"(?<depName>[^"]+)": "(?<depVersion>[^"]+)"/gu, (match, depName: string) =>
          depName in LIB_VERSIONS
            ? `"${depName}": "${(LIB_VERSIONS as Record<string, string>)[depName]}"`
            : match
        );
      await writeRawFile(filePath, compiledContent);
    }),
  ]);
}

export async function copyTemplatesDirs(dst: string): Promise<void> {
  await cleanDir(dst);
  const templatesDirEnts = await readdir(TEMPLATES_DIR, {withFileTypes: true});
  const dirs = templatesDirEnts.filter(ent => ent.isDirectory() && ent.name !== 'node_modules');
  await Promise.all(
    dirs.map(async d => {
      const srcDir = join(TEMPLATES_DIR, d.name);
      const dstDir = join(join(dst, d.name));
      await mkdir(dstDir);
      const dirEnts = await readdir(srcDir, {withFileTypes: true});
      const toCopy = dirEnts.filter(ent => !['node_modules', 'yarn.lock'].includes(ent.name));
      await Promise.all(toCopy.map(async ent => cp(join(srcDir, ent.name), dstDir)));
    })
  );
}
