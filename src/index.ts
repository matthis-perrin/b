import {eslintPackages} from './eslint';
import { ProjectType } from './models';
import {prettierPackage} from './prettier';
import {projectPackage} from './project';
import {tsconfigPackages} from './tsconfig';
import {webpackPackages} from './webpack';

interface PackagesToGenerate {
  eslint: boolean;
  tsconfig: boolean;
  webpack: boolean;
}

const toGenerate: Record<ProjectType, PackagesToGenerate> = {
  [ProjectType.Web]: {
    eslint: true,
    tsconfig: true,
    webpack: true,
  },
  [ProjectType.Node]: {
    eslint: true,
    tsconfig: true,
    webpack: true,
  },
  [ProjectType.Lib]: {
    eslint: true,
    tsconfig: true,
    webpack: false,
  },
  [ProjectType.Lambda]: {
    eslint: false,
    tsconfig: false,
    webpack: true,
  },
  [ProjectType.ReactNative]: {
    eslint: true,
    tsconfig: true,
    webpack: false,
  },
};

const generationEntries = Object.entries(toGenerate) as [ProjectType, PackagesToGenerate][];

(async () => {
  await Promise.all([
    projectPackage(),
    eslintPackages(generationEntries.filter(([type, config]) => config.eslint).map(([type]) => type)),
    prettierPackage(),
    tsconfigPackages(generationEntries.filter(([type, config]) => config.tsconfig).map(([type]) => type)),
    webpackPackages(generationEntries.filter(([type, config]) => config.webpack).map(([type]) => type)),
  ]);
})().catch(console.error);
