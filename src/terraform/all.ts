import {generateApiGateway} from './api_gateway';
import {generateCloudfrontDistribution} from './cloudfront';
import {generateLambda} from './lambda';
import {generateLambdaApiOutputs, generateWebOutputs} from './output';
import {generateAwsProvider} from './provider';
import {generateS3Bucket} from './s3';

export function generateTerraform(projectName: string): string {
  return [
    generateAwsProvider(projectName),
    generateWebOutputs(),
    generateLambdaApiOutputs(),
    generateS3Bucket(projectName),
    generateCloudfrontDistribution(projectName),
    generateLambda(projectName),
    generateApiGateway(projectName),
  ].join('\n\n');
}
