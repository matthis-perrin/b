export function generateLambda(projectName: string): string {
  return `
resource "aws_lambda_function" "api" {
  function_name     = "test-API"
  s3_bucket         = aws_s3_bucket.code.id
  s3_key            = aws_s3_bucket_object.backend_archive.id
  source_code_hash  = data.archive_file.backend_archive.output_sha
  handler           = "index.handler"
  runtime           = "nodejs14.x"
  role              = aws_iam_role.lambda_api_exec.arn
}

resource "aws_iam_role" "lambda_api_exec" {
    name = "${projectName}-API-role"

    assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
 EOF

 }
  `.trim();
}
