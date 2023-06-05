import {
  PROJECT_TYPE_TO_METADATA,
  RUNTIME_TYPE_TO_METADATA,
  RuntimeType,
  RuntimeTypeMetadata,
  WorkspaceName,
} from '@src/models';
import {WorkspaceProject} from '@src/project/generate_workspace';
import {PACKAGE_VERSIONS, TYPESCRIPT_VERSION} from '@src/versions';

function uniq(runtimes: (RuntimeType | undefined)[]): RuntimeType[] {
  return [...new Set(runtimes.filter((r): r is RuntimeType => r !== undefined)).values()];
}

function projectMetadata(p: WorkspaceProject): RuntimeTypeMetadata {
  return RUNTIME_TYPE_TO_METADATA[PROJECT_TYPE_TO_METADATA[p.type].runtimeType];
}

export function generateWorkspacePackageJson(
  workspaceName: WorkspaceName,
  projects: WorkspaceProject[]
): Record<string, unknown> {
  const eslintRuntimes = uniq(projects.map(p => projectMetadata(p).eslint));
  const tsconfigRuntimes = uniq(projects.map(p => projectMetadata(p).tsconfig));
  const webpackRuntimes = uniq(projects.map(p => projectMetadata(p).webpack));

  return {
    name: workspaceName,
    license: 'UNLICENSED',
    type: 'module',
    scripts: {
      setup: 'node ./setup.js',
      deploy: 'node ./deploy.js',
      build: 'node ./build.js',
      watch: 'node ./build.js --watch',
    },
    eslintConfig: {
      ignorePatterns: ['**/*.js'],
    },
    devDependencies: Object.fromEntries(
      (
        [
          ...eslintRuntimes.map(runtime => [
            `@matthis/eslint-config-${runtime}`,
            PACKAGE_VERSIONS.eslint,
          ]),
          ['@matthis/prettier-config', PACKAGE_VERSIONS.prettier],
          ...tsconfigRuntimes.map(runtime => [
            `@matthis/tsconfig-${runtime}`,
            PACKAGE_VERSIONS.tsconfig,
          ]),
          ...webpackRuntimes.map(runtime => [
            `@matthis/webpack-${runtime}`,
            PACKAGE_VERSIONS.webpack,
          ]),
          ['@matthis/webpack-runner', PACKAGE_VERSIONS.runner],
          ['typescript', TYPESCRIPT_VERSION],
        ] as [string, string][]
      ).sort((d1, d2) => d1[0].localeCompare(d2[0]))
    ),
  };
}
