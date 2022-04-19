import {WorkspaceType} from '../../models';
import {generateApiGatewayTerraform} from './api_gateway';
import {generateCloudfrontDistributionTerraform} from './cloudfront';
import {generateExtraLambdaTerraform, generateLambdaTerraform} from './lambda';
import {generateLambdaApiOutputsTerraform, generateWebOutputsTerraform} from './output';
import {generateAwsProviderTerraform} from './provider';
import {
  generateBackendFileUploadTerraform,
  generateFrontendFileUploadTerraform,
  generateS3BucketTerraform,
} from './s3';

interface TerraformFiles {
  fileName: string;
  content: string;
}

function generateBaseTerraform(projectName: string): string {
  return [generateAwsProviderTerraform(projectName), generateS3BucketTerraform(projectName)].join(
    '\n\n'
  );
}

export function generateTerraformForWorkspace(
  projectName: string,
  type: WorkspaceType
): TerraformFiles[] {
  let baseFileContent = '';
  let extraFileContent = '';
  if (type === WorkspaceType.StandaloneLambda) {
    baseFileContent = generateStandaloneLambdaTerraform(projectName);
    extraFileContent = generateExtraLambdaTerraform(projectName);
  } else if (type === WorkspaceType.StaticWebsite) {
    baseFileContent = generateStaticWebsiteTerraform(projectName);
  } else if (type === WorkspaceType.WebApp) {
    baseFileContent = generateWebAppTerraform(projectName);
    extraFileContent = generateExtraLambdaTerraform(projectName);
  } else {
    throw new Error(`Unknown workspace type ${type}`);
  }
  return [
    {
      fileName: 'base.tf',
      content: [generateBaseTerraform(projectName), baseFileContent].join('\n\n'),
    },
    {fileName: 'extra.tf', content: extraFileContent},
  ];
}

function generateWebAppTerraform(projectName: string): string {
  return [
    generateStaticWebsiteTerraform(projectName),
    generateStandaloneLambdaTerraform(projectName),
    generateLambdaApiOutputsTerraform(),
    generateApiGatewayTerraform(projectName),
  ].join('\n\n');
}

function generateStaticWebsiteTerraform(projectName: string): string {
  return [
    generateWebOutputsTerraform(),
    generateFrontendFileUploadTerraform(),
    generateCloudfrontDistributionTerraform(projectName),
  ].join('\n\n');
}

function generateStandaloneLambdaTerraform(projectName: string): string {
  return [generateBackendFileUploadTerraform(), generateLambdaTerraform(projectName)].join('\n\n');
}
