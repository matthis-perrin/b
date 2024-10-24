import {ProjectName} from '@src/models';
import {WorkspaceOptions} from '@src/project/vscode_workspace';

export function generateS3BucketTerraform(
  workspaceOptions: WorkspaceOptions,
  webProjectNames: ProjectName[]
): string {
  const {workspaceName} = workspaceOptions;
  const bucketName = workspaceName.toLowerCase().replace(/[^a-z0-9.-]+/gu, '-');

  const CODE_BUCKET = `
resource "aws_s3_bucket" "code" {
  bucket_prefix = "${bucketName}-code-"
}

output "code_bucket" {
  value = aws_s3_bucket.code.id
}
`.trim();

  const CLOUDFRONT_ACCESS = `
data "aws_iam_policy_document" "cloudfront_access_to_code_policy" {
  ${webProjectNames
    .map(p =>
      `
  statement {
    actions = ["s3:GetObject"]
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

resource "aws_s3_bucket_policy" "cloudfront_access_to_code" {
  bucket = aws_s3_bucket.code.id
  policy = data.aws_iam_policy_document.cloudfront_access_to_code_policy.json
}
`.trim();

  const out = [CODE_BUCKET];
  if (webProjectNames.length > 0) {
    out.push(CLOUDFRONT_ACCESS);
  }
  return out.join('\n\n');
}
