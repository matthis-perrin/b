import {WorkspaceName} from '../models';

export function generateWorkspacePackageJson(
  workspaceName: WorkspaceName
): Record<string, unknown> {
  return {
    name: workspaceName,
    license: 'UNLICENSED',
    scripts: {
      setup: 'node ./setup.js',
      deploy: 'node ./deploy.js',
    },
  };
}
