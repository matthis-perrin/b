export function generateWorkspacePackageJson(projectName: string): Record<string, unknown> {
  return {
    name: projectName,
    license: 'UNLICENSED',
    scripts: {
      setup: 'node ./setup.js',
      deploy: 'node ./deploy.js',
    },
  };
}
