import {join} from 'path';
import {ProjectType} from '../models';
import {cleanDir, writeJsonFile} from '../fs';
import {compile} from '../packager';
import {PACKAGE_VERSIONS} from '../versions';
import {webConfig} from './web';

export async function generateForType(path: string, type: ProjectType): Promise<void> {
  await cleanDir(path);
  await Promise.all([
    writeJsonFile(join(path, 'package.json'), generatePackageJson(type)),
    writeWebpackConfig(type, path),
  ]);
}

function generatePackageJson(type: ProjectType): Record<string, unknown> {
  if (type !== ProjectType.Web) {
    throw new Error(`Project type "${type}" not supported for webpack`);
  }
  const {dependencies} = webConfig();
  return {
    name: `@matthis/webpack-${type}`,
    version: PACKAGE_VERSIONS.webpack,
    license: 'UNLICENSED',
    main: 'index.js',
    dependencies,
  };
}

async function writeWebpackConfig(type: ProjectType, path: string): Promise<void> {
  const entry = join(__dirname, `${type}_config.ts`);
  const dst = join(path);
  await compile(entry, dst);
}
