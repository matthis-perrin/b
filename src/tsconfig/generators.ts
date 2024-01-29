import {join} from 'node:path';

import {cleanDir, writeJsonFile} from '@src/fs';
import {TsConfigType} from '@src/models';
import {neverHappens} from '@src/type_utils';
import {PACKAGE_VERSIONS, TYPESCRIPT_VERSION} from '@src/versions';

export async function generateForType(path: string, type: TsConfigType): Promise<void> {
  await cleanDir(path);
  await Promise.all([
    writeJsonFile(join(path, 'package.json'), generatePackageJson(type)),
    writeJsonFile(join(path, 'tsconfig.json'), generateTsConfig(type)),
  ]);
}

function generateTsConfig(type: TsConfigType): Record<string, unknown> {
  const baseCompilerOptions = {
    // Type Checking
    allowUnreachableCode: false,
    allowUnusedLabels: false,
    alwaysStrict: true,
    exactOptionalPropertyTypes: false, // disabled
    noFallthroughCasesInSwitch: true,
    noImplicitAny: true,
    noImplicitOverride: true,
    noImplicitReturns: true,
    noImplicitThis: true,
    noPropertyAccessFromIndexSignature: true,
    noUncheckedIndexedAccess: true,
    noUnusedLocals: false, // disabled (handled by eslint)
    noUnusedParameters: false, // disabled (handled by eslint)
    strict: true,
    strictBindCallApply: true,
    strictFunctionTypes: true,
    strictNullChecks: true,
    strictPropertyInitialization: true,
    useUnknownInCatchVariables: true,
    // Modules
    types: [],
    // Emit
    noEmit: true,
    // Interop Constraints
    allowSyntheticDefaultImports: true,
    esModuleInterop: false, // disabled
    // Output Formatting
    noErrorTruncation: true,
    pretty: true,
    // Completeness
    skipLibCheck: true,
  };

  let additionalCompilerOptions:
    | (Record<string, boolean | string | string[] | Record<string, string[]>> & {
        module: string;
        moduleResolution: string;
        lib: string[];
        target: string;
      })
    | undefined;

  if (type === TsConfigType.Lib) {
    additionalCompilerOptions = {
      module: 'none',
      moduleResolution: 'node',
      lib: ['es2023'],
      target: 'es2022',
    };
  } else if (type === TsConfigType.Web) {
    additionalCompilerOptions = {
      module: 'esnext',
      moduleResolution: 'node',
      lib: ['es2023', 'dom', 'dom.iterable'],
      target: 'esnext',
      //
      jsx: 'react-jsx',
    };
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  } else if (type === TsConfigType.Node) {
    additionalCompilerOptions = {
      module: 'es2022',
      moduleResolution: 'node',
      lib: ['es2023'],
      target: 'es2022',
      //
      types: ['node'],
    };
  } else {
    neverHappens(type, `Unknown project type ${type}`);
  }

  return {compilerOptions: {...baseCompilerOptions, ...additionalCompilerOptions}};
}

function generatePackageJson(type: TsConfigType): Record<string, unknown> {
  return {
    name: `@matthis/tsconfig-${type}`,
    version: PACKAGE_VERSIONS.tsconfig,
    license: 'UNLICENSED',
    type: 'module',
    main: 'tsconfig.json',
    dependencies: {
      typescript: TYPESCRIPT_VERSION,
    },
  };
}
