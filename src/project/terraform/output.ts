import {ProjectName} from '../../models';

export function generateCloudfrontDomainNameOutputTerraform(projectName: ProjectName): string {
  return `
output "${projectName}_cloudfront_domain_name" {
  value       = aws_cloudfront_distribution.${projectName}.domain_name
  description = "Domain (from cloudfront) where the \\"${projectName}\\" frontend is available."
}`.trim();
}

export function generateLambdaApiOutputsTerraform(projectName: ProjectName): string {
  return `
output "${projectName}_api_url" {
  value = aws_api_gateway_deployment.${projectName}.invoke_url
  description = "URL where the \\"${projectName}\\" lambda api can be called."
}`.trim();
}
