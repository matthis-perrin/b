import {PROJECT_TYPE_TO_METADATA, ProjectType, RuntimeType, WorkspaceName} from '@src/models';
import {WorkspaceProject} from '@src/project/generate_workspace';
import {generateCloudfrontDistributionTerraform} from '@src/project/terraform/cloudfront';
import {generateLambdaTerraform} from '@src/project/terraform/lambda';
import {generateAwsProviderTerraform} from '@src/project/terraform/provider';
import {generateS3BucketTerraform} from '@src/project/terraform/s3';
import {neverHappens} from '@src/type_utils';

export function generateCommonTerraform(
  workspaceName: WorkspaceName,
  projects: WorkspaceProject[]
): string {
  return [
    generateAwsProviderTerraform(workspaceName),
    generateS3BucketTerraform(
      workspaceName,
      projects
        .filter(p => PROJECT_TYPE_TO_METADATA[p.type].runtimeType === RuntimeType.Web)
        .map(p => p.projectName)
    ),
  ].join('\n\n');
}

export function generateWorkspaceProjectTerraform(
  workspaceName: WorkspaceName,
  project: WorkspaceProject
): string | undefined {
  const {projectName, type} = project;
  if (type === ProjectType.Web) {
    return generateCloudfrontDistributionTerraform(workspaceName, projectName);
  } else if (type === ProjectType.LambdaFunction) {
    return generateLambdaTerraform(workspaceName, projectName, {api: false});
  } else if (type === ProjectType.LambdaApi) {
    return generateLambdaTerraform(workspaceName, projectName, {api: true});
  } else if (type === ProjectType.NodeLib) {
    return undefined;
  } else if (type === ProjectType.NodeScript) {
    return undefined;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  } else if (type === ProjectType.Shared) {
    return undefined;
  }
  neverHappens(type, 'ProjectType');
}
