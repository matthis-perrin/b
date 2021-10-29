import {join} from 'path';
import {ESLINT_VERSION, PACKAGE_VERSIONS, TYPESCRIPT_VERSION} from '../versions';

import {cleanDir, writeJsonFile, writeJsFile} from '../fs';
import {ProjectType} from './models';

export async function generateForType(path: string, type: ProjectType): Promise<void> {
  await cleanDir(path);
  await Promise.all([
    writeJsonFile(join(path, 'package.json'), generatePackageJson(type)),
    writeJsonFile(join(path, 'tsconfig.json'), generateTsConfig(type)),
  ]);
}

function generateTsConfig(type: ProjectType): Record<string, unknown> {
  const test = {
    compilerOptions: {
      module: 'CommonJS',
      moduleResolution: 'Node',
      newLine: 'LF',
      noErrorTruncation: true,
      noFallthroughCasesInSwitch: true,
      noEmit: true,
      noImplicitReturns: true,
      noUncheckedIndexedAccess: true,
      pretty: true,
      skipLibCheck: true,
      tsBuildInfoFile: 'tmp/.tsbuildinfo',
      strict: true,
      target: 'ES2020',
    },
  };

  const baseCompilerOptions = {
    allowSyntheticDefaultImports: true,
    // Emit __importStar and __importDefault helpers for runtime babel ecosystem compatibility
    // and enable --allowSyntheticDefaultImports for typesystem compatibility.
    // Allow default imports from modules with no default export.
    // This does not affect code emit, just typechecking.
    // --
    // Allows us to import some library nicely. ie. import React from '@shared-frontend-lib/react'
    // Enabled automatically when setting the flag `esModuleInterop` to true
    esModuleInterop: true,
    // Enable incremental compilation by reading/writing information from prior compilations
    // to a file on disk. This file is controlled by the --tsBuildInfoFile flag.
    incremental: true,
    // Perform additional checks to ensure that separate compilation (such as with
    // transpileModule or @babel/plugin-transform-typescript) would be safe.
    isolatedModules: false,
    // The locale to use to show error messages, e.g. en-us.
    locale: 'en-us',
    // Use the specified end of line sequence to be used when emitting files:
    // "crlf" (windows) or "lf" (unix).”
    newLine: 'LF',
    // Do not truncate error messages.
    noErrorTruncation: true,
    // Report errors for fallthrough cases in switch statement.
    noFallthroughCasesInSwitch: true,
    // Do not emit outputs.
    noEmit: true,
    // Raise error on expressions and declarations with an implied any type.
    noImplicitReturns: true,
    // Add undefined to any undeclared field in an interface with an index type
    noUncheckedIndexedAccess: true,
    // Stylize errors and messages using color and context.
    pretty: true,
    // Skip type checking of all declaration files (*.d.ts).
    skipLibCheck: true,
    // Enable all strict type checking options.
    // Enables --noImplicitAny, --noImplicitThis, --alwaysStrict,
    // --strictBindCallApply, --strictNullChecks, --strictFunctionTypes
    // and --strictPropertyInitialization.
    strict: true,
    // File path where to store the incremental build info
    tsBuildInfoFile: 'tmp/.tsbuildinfo',
  };

  let additionalCompilerOptions:
    | (Record<string, boolean | string | string[]> & {
        module: string;
        moduleResolution: string;
        lib: string[];
        target: string;
      })
    | undefined;

  if (type === ProjectType.Lib) {
    additionalCompilerOptions = {
      module: 'none',
      moduleResolution: 'node',
      lib: ['es2020'],
      target: 'es2020',
    };
  } else if (type === ProjectType.Web) {
    additionalCompilerOptions = {
      module: 'esnext',
      moduleResolution: 'node',
      lib: ['es2020', 'dom', 'dom.iterable'],
      target: 'esnext',
      //
      jsx: 'react',
    };
  } else if (type === ProjectType.Node) {
    additionalCompilerOptions = {
      module: 'nodenext',
      moduleResolution: 'nodenext',
      lib: ['es2021'],
      target: 'es2021',
      //
      types: ['node'],
    };
  } else {
    throw new Error(`Unknown project type ${type}`);
  }

  return {compilerOptions: {...baseCompilerOptions, ...additionalCompilerOptions}};
}

function generatePackageJson(type: ProjectType): Record<string, unknown> {
  return {
    name: `@matthis/tsconfig-${type}`,
    version: PACKAGE_VERSIONS.tsconfig,
    license: 'UNLICENSED',
    main: 'tsconfig.json',
    dependencies: {
      typescript: TYPESCRIPT_VERSION,
    },
  };
}
