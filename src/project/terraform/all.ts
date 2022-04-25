import {
  ProjectName,
  ProjectType,
  PROJECT_TYPE_TO_METADATA,
  RuntimeType,
  WorkspaceFragment,
  WorkspaceFragmentType,
  WorkspaceName,
} from '../../models';
import {neverHappens} from '../../type_utils';
import {WorkspaceProject} from '../generate_workspace';
import {generateApiGatewayTerraform} from './api_gateway';
import {generateCloudfrontDistributionTerraform} from './cloudfront';
import {generateLambdaTerraform} from './lambda';
import {
  generateLambdaApiOutputsTerraform,
  generateCloudfrontDomainNameOutputTerraform,
} from './output';
import {generateAwsProviderTerraform} from './provider';
import {
  generateLambdaFileUploadTerraform,
  generateWebFileUploadTerraform,
  generateS3BucketTerraform,
} from './s3';

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

export function generateWorkspaceProjectTerraform(project: WorkspaceProject): string {
  const {projectName, type} = project;
  if (type === ProjectType.Web) {
    return generateWebTerraform(projectName);
  } else if (type === ProjectType.LambdaFunction) {
    return generateLambdaFunctionTerraform(projectName);
  } else if (type === ProjectType.LambdaApi) {
    return generateLambdaApiTerraform(projectName);
  } else {
    neverHappens(type, 'ProjectType');
  }
}

export function generateWebTerraform(projectName: ProjectName): string {
  return [
    generateCloudfrontDomainNameOutputTerraform(projectName),
    generateWebFileUploadTerraform(projectName),
    generateCloudfrontDistributionTerraform(projectName),
  ].join('\n\n');
}

export function generateLambdaFunctionTerraform(projectName: ProjectName): string {
  return [
    generateLambdaTerraform(projectName),
    generateLambdaFileUploadTerraform(projectName),
  ].join('\n\n');
}

export function generateLambdaApiTerraform(projectName: ProjectName): string {
  return [
    generateLambdaFunctionTerraform(projectName),
    generateLambdaApiOutputsTerraform(projectName),
    generateApiGatewayTerraform(projectName),
  ].join('\n\n');
}
