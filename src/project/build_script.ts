import {WorkspaceFragment} from '@src/models';
import {getProjectsFromWorkspaceFragment} from '@src/project/generate_workspace';

export function generateBuildScript(workspaceFragments: WorkspaceFragment[]): string {
  const projects = workspaceFragments.flatMap(getProjectsFromWorkspaceFragment);
  return `
import {resolve} from 'node:path';
import {runWebpacks} from '@matthis/webpack-runner';

runWebpacks({root: resolve('.'), projectPaths: [${projects
    .map(p => `resolve('./${p.projectName}'),`)
    .join('')}]}).catch(console.error);
`.trim();
}
