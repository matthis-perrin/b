export function generateCustomTerraform(projectName: string): string {
    return `
data "aws_iam_policy_document" "lambda_extra_role" {
  statement {
    actions   = ["s3:ListAllMyBuckets"]
    resources = ["*"]
  }
}
`.trim();
}
