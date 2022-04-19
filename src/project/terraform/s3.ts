export function generateS3BucketTerraform(projectName: string): string {
  const bucketName = projectName.toLowerCase().replace(/[^a-z0-9.-]+/gu, '-');
  return `
resource "aws_s3_bucket" "code" {
  bucket_prefix = "${bucketName}-"
}

resource "aws_s3_bucket_acl" "code_bucket_acl" {
  bucket = aws_s3_bucket.code.id
  acl    = "private"
}

data "aws_iam_policy_document" "code" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["\${aws_s3_bucket.code.arn}/frontend/*"]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.s3.iam_arn]
    }
  }
}

resource "aws_s3_bucket_policy" "code" {
  bucket = aws_s3_bucket.code.id
  policy = data.aws_iam_policy_document.code.json
}

`.trim();
}

export function generateFrontendFileUploadTerraform(): string {
  return `
  module "template_files" {
    source = "hashicorp/dir/template"
    base_dir = "../frontend/dist"
  }
  
  resource "aws_s3_bucket_object" "frontend_files" {
    for_each     = module.template_files.files
    bucket       = aws_s3_bucket.code.id
    key          = "frontend/\${each.key}"
    content_type = each.value.content_type
    source       = each.value.source_path
    content      = each.value.content
    etag         = each.value.digests.md5
  }
`.trim();
}

export function generateBackendFileUploadTerraform(): string {
  return `
  data "archive_file" "backend_archive" {
    type        = "zip"
    source_dir  = "../backend/dist"
    output_path = "./backend.zip"
  }
  
  resource "aws_s3_bucket_object" "backend_archive" {
    bucket       = aws_s3_bucket.code.id
    key          = "backend/dist.zip"
    source       = data.archive_file.backend_archive.output_path
    etag         = data.archive_file.backend_archive.output_sha
  }
`.trim();
}
