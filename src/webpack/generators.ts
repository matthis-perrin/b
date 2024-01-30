import {join} from 'node:path';
import {fileURLToPath} from 'node:url';

import {cleanDir, readFile, writeRawFile} from '@src/fs';
import {WebpackType} from '@src/models';
import {compile} from '@src/packager';
import {asMap} from '@src/type_utils';
import {PACKAGE_VERSIONS} from '@src/versions';

export async function generateForType(path: string, type: WebpackType): Promise<void> {
  await cleanDir(path);
  await compileWebpackConfig(type, path);
}

const webpackConfigFiles: Record<WebpackType, string> = {
  [WebpackType.Lambda]: 'src/webpack/configs/lambda.ts',
  [WebpackType.Lib]: 'src/webpack/configs/lib.ts',
  [WebpackType.NodeScript]: 'src/webpack/configs/node_script.ts',
  [WebpackType.Web]: 'src/webpack/configs/web.ts',
};

async function compileWebpackConfig(type: WebpackType, path: string): Promise<void> {
  const entry = join(fileURLToPath(import.meta.url), `../../${webpackConfigFiles[type]}`);
  const dst = join(path);
  await compile(entry, dst, true, {
    name: `@matthis/webpack-${type}`,
    version: PACKAGE_VERSIONS.webpack,
  });

  if (type === WebpackType.Lambda) {
    await injectDependencies('webpack-lambda', {
      '@matthis/lambda-server-runtime': PACKAGE_VERSIONS.lambdaServerRuntime,
    });
  } else if (type === WebpackType.Web) {
    await injectDependencies('webpack-web', {favicons: '7.1.x', sharp: '0.33.x'});
  }
}

async function injectDependencies(project: string, dep: Record<string, string>): Promise<void> {
  const packageJsonPath = join(
    fileURLToPath(import.meta.url),
    `../../packages/${project}/package.json`
  );
  const packageJsonContent = await readFile(packageJsonPath);
  const packageJson = JSON.parse(packageJsonContent);
  const dependencies = asMap(packageJson.dependencies, {});
  const newDependencies = Object.fromEntries(
    Object.entries({...dependencies, ...dep}).sort((d1, d2) => d1[0].localeCompare(d2[0]))
  );
  packageJson.dependencies = newDependencies;
  await writeRawFile(packageJsonPath, JSON.stringify(packageJson, undefined, 2));
}
