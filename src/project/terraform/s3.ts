import {ProjectName, WorkspaceName} from '../../models';

export function generateS3BucketTerraform(
  workspaceName: WorkspaceName,
  webProjectNames: ProjectName[]
): string {
  const bucketName = workspaceName.toLowerCase().replace(/[^a-z0-9.-]+/gu, '-');
  return `
resource "aws_s3_bucket" "code" {
  bucket_prefix = "${bucketName}-"
}

resource "aws_s3_bucket_acl" "code_bucket_acl" {
  bucket = aws_s3_bucket.code.id
  acl    = "private"
}

data "aws_iam_policy_document" "cloudfront_access_to_code" {
  ${webProjectNames
    .map(p =>
      `
  statement {
    actions   = ["s3:GetObject"]
    resources = [
      "\${aws_s3_bucket.code.arn}/${p}/*",
    ]
    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.${p}.iam_arn]
    }
  }
`.trim()
    )
    .join('\n\n')}
}

resource "aws_s3_bucket_policy" "code" {
  bucket = aws_s3_bucket.code.id
  policy = data.aws_iam_policy_document.cloudfront_access_to_code.json
}

`.trim();
}

export function generateWebFileUploadTerraform(projectName: ProjectName): string {
  return `
module "${projectName}_template_files" {
  source = "hashicorp/dir/template"
  base_dir = "../${projectName}/dist"
}

resource "aws_s3_bucket_object" "${projectName}_files" {
  for_each     = module.${projectName}_template_files.files
  bucket       = aws_s3_bucket.code.id
  key          = "${projectName}/\${each.key}"
  content_type = each.value.content_type
  source       = each.value.source_path
  content      = each.value.content
  etag         = each.value.digests.md5
}
`.trim();
}

export function generateLambdaFileUploadTerraform(projectName: ProjectName): string {
  return `
data "archive_file" "${projectName}_archive" {
  type        = "zip"
  source_dir  = "../${projectName}/dist"
  output_path = "./archives/${projectName}.zip"
}

resource "aws_s3_bucket_object" "${projectName}_archive" {
  bucket       = aws_s3_bucket.code.id
  key          = "${projectName}/dist.zip"
  source       = data.archive_file.${projectName}_archive.output_path
  etag         = data.archive_file.${projectName}_archive.output_sha
}
`.trim();
}
