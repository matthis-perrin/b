import {ProjectType, WorkspaceName} from '@src/models';
import {WorkspaceProject} from '@src/project/generate_workspace';
import {generateFrontendTerraform} from '@src/project/terraform/frontend';
import {generateLambdaTerraform} from '@src/project/terraform/lambda';
import {generateAwsProviderTerraform} from '@src/project/terraform/provider';
import {generateS3BucketTerraform} from '@src/project/terraform/s3';
import {WorkspaceOptions} from '@src/project/vscode_workspace';
import {neverHappens} from '@src/type_utils';

export interface AppDomain {
  rootDomain: string;
  subDomain: string;
}

export function generateCommonTerraform(
  workspaceName: WorkspaceName,
  projects: WorkspaceProject[],
  workspaceOptions: WorkspaceOptions
): string {
  return [
    generateAwsProviderTerraform(workspaceName, workspaceOptions),
    generateS3BucketTerraform(
      workspaceName,
      projects.filter(p => p.type === ProjectType.Web).map(p => p.projectName)
    ),
  ].join('\n\n');
}

export function generateWorkspaceProjectTerraform(
  workspaceName: WorkspaceName,
  project: WorkspaceProject
): string | undefined {
  const {projectName, terraform} = project;

  if (terraform.type === 'frontend') {
    return generateFrontendTerraform(projectName, terraform);
  } else if (terraform.type === 'lambda') {
    return generateLambdaTerraform(workspaceName, projectName, terraform);
  }
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  else if (terraform.type === 'no-terraform') {
    return undefined;
  }
  neverHappens(terraform, 'Terraform type');
}
