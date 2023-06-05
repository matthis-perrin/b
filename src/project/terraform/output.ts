import {ProjectName, WorkspaceName} from '@src/models';

export function generateCloudfrontDomainNameOutputTerraform(
  workspaceName: WorkspaceName,
  projectName: ProjectName
): string {
  return `
output "${projectName}_cloudfront_domain_name" {
  value       = aws_cloudfront_distribution.${projectName}.domain_name
  description = "Domain (from cloudfront) where the \\"${workspaceName}-${projectName}\\" frontend is available."
}`.trim();
}
