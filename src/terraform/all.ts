import {generateApiGateway} from './api_gateway';
import {generateCloudfrontDistribution} from './cloudfront';
import {generateLambda} from './lambda';
import {generateLambdaApiOutputs, generateWebOutputs} from './output';
import {generateAwsProvider} from './provider';
import {generateBackendFileUpload, generateFrontendFileUpload, generateS3Bucket} from './s3';

export function generateWebAppTerraform(projectName: string): string {
  return [
    generateAwsProvider(projectName),
    generateWebOutputs(),
    generateLambdaApiOutputs(),
    generateS3Bucket(projectName),
    generateFrontendFileUpload(),
    generateBackendFileUpload(),
    generateCloudfrontDistribution(projectName),
    generateLambda(projectName),
    generateApiGateway(projectName),
  ].join('\n\n');
}

export function generateWebTerraform(projectName: string): string {
  return [
    generateAwsProvider(projectName),
    generateWebOutputs(),
    generateS3Bucket(projectName),
    generateFrontendFileUpload(),
    generateCloudfrontDistribution(projectName),
  ].join('\n\n');
}