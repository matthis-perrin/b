import {eslintPackages} from './eslint';
import {RuntimeType} from './models';
import {prettierPackage} from './prettier';
import {projectPackage} from './project';
import {tsconfigPackages} from './tsconfig';
import {webpackPackages} from './webpack';

interface PackagesToGenerate {
  eslint: boolean;
  tsconfig: boolean;
  webpack: boolean;
}

const toGenerate: Record<RuntimeType, PackagesToGenerate> = {
  [RuntimeType.Web]: {
    eslint: true,
    tsconfig: true,
    webpack: true,
  },
  [RuntimeType.Node]: {
    eslint: true,
    tsconfig: true,
    webpack: true,
  },
  [RuntimeType.Lib]: {
    eslint: true,
    tsconfig: true,
    webpack: false,
  },
  [RuntimeType.Lambda]: {
    eslint: false,
    tsconfig: false,
    webpack: true,
  },
  [RuntimeType.ReactNative]: {
    eslint: true,
    tsconfig: true,
    webpack: false,
  },
};

const generationEntries = Object.entries(toGenerate) as [RuntimeType, PackagesToGenerate][];

(async () => {
  await Promise.all([
    projectPackage(),
    eslintPackages(
      generationEntries.filter(([type, config]) => config.eslint).map(([type]) => type)
    ),
    prettierPackage(),
    tsconfigPackages(
      generationEntries.filter(([type, config]) => config.tsconfig).map(([type]) => type)
    ),
    webpackPackages(
      generationEntries.filter(([type, config]) => config.webpack).map(([type]) => type)
    ),
  ]);
})().catch(console.error);
