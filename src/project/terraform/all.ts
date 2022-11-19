import {
  PROJECT_TYPE_TO_METADATA,
  ProjectName,
  ProjectType,
  RuntimeType,
  WorkspaceName,
} from '@src/models';
import {WorkspaceProject} from '@src/project/generate_workspace';
import {generateApiGatewayTerraform} from '@src/project/terraform/api_gateway';
import {generateCloudfrontDistributionTerraform} from '@src/project/terraform/cloudfront';
import {generateLambdaTerraform} from '@src/project/terraform/lambda';
import {
  generateCloudfrontDomainNameOutputTerraform,
  generateLambdaApiOutputsTerraform,
} from '@src/project/terraform/output';
import {generateAwsProviderTerraform} from '@src/project/terraform/provider';
import {
  generateLambdaFileUploadTerraform,
  generateS3BucketTerraform,
  generateWebFileUploadTerraform,
} from '@src/project/terraform/s3';
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
    return generateWebTerraform(workspaceName, projectName);
  } else if (type === ProjectType.LambdaFunction) {
    return generateLambdaFunctionTerraform(workspaceName, projectName);
  } else if (type === ProjectType.LambdaApi) {
    return generateLambdaApiTerraform(workspaceName, projectName);
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

export function generateWebTerraform(
  workspaceName: WorkspaceName,
  projectName: ProjectName
): string {
  return [
    generateCloudfrontDomainNameOutputTerraform(workspaceName, projectName),
    generateWebFileUploadTerraform(workspaceName, projectName),
    generateCloudfrontDistributionTerraform(workspaceName, projectName),
  ].join('\n\n');
}

export function generateLambdaFunctionTerraform(
  workspaceName: WorkspaceName,
  projectName: ProjectName
): string {
  return [
    generateLambdaTerraform(workspaceName, projectName),
    generateLambdaFileUploadTerraform(workspaceName, projectName),
  ].join('\n\n');
}

export function generateLambdaApiTerraform(
  workspaceName: WorkspaceName,
  projectName: ProjectName
): string {
  return [
    generateLambdaFunctionTerraform(workspaceName, projectName),
    generateLambdaApiOutputsTerraform(workspaceName, projectName),
    generateApiGatewayTerraform(workspaceName, projectName),
  ].join('\n\n');
}
