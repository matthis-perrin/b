export function generateWebOutputsTerraform(): string {
  return `
output "s3_bucket_id" {
  value       = aws_s3_bucket.code.id
  description = "Bucket id where the code lives. Used during s3-sync."
}
output "cloudfront_distribution_id" {
  value       = aws_cloudfront_distribution.s3.id
  description = "Cloudfront distribution id serving the frontend assets. Used during s3-sync."
}
output "cloudfront_domain_name" {
  value       = aws_cloudfront_distribution.s3.domain_name
  description = "Domain (from cloudfront) where the frontend is available."
}
  `.trim();
}

export function generateLambdaApiOutputsTerraform(): string {
  return `
output "api_url" {
  value = aws_api_gateway_deployment.api.invoke_url
  description = "URL where the lambda api can be called."
}
  `.trim();
}
