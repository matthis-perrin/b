import {WorkspaceFragment} from '@src/models';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function generateBuildScript(workspaceFragments: WorkspaceFragment[]): string {
  // const projects = workspaceFragments.flatMap(getProjectsFromWorkspaceFragment);
  return `
import {join, resolve} from 'node:path';
import {runWebpacks} from '@matthis/webpack-runner';

const target = resolve('./script');

runWebpacks({projectPaths: [target]}).catch(console.error);
`.trim();
}
