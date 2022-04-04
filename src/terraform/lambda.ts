export function generateLambda(projectName: string): string {
  return `
resource "aws_lambda_function" "api" {
  function_name     = "${projectName}-API"
  s3_bucket         = aws_s3_bucket.code.id
  s3_key            = aws_s3_bucket_object.backend_archive.id
  source_code_hash  = data.archive_file.backend_archive.output_sha
  handler           = "main.handler"
  runtime           = "nodejs14.x"
  role              = aws_iam_role.lambda_api_exec.arn
}

resource "aws_iam_role" "lambda_api_exec" {
  name = "${projectName}-API-assume-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action    = "sts:AssumeRole"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
        Effect    = "Allow"
        Sid       = ""
      },
    ]
  })

  inline_policy {
    name = "${projectName}-API-cloudwatch-role"
    policy = jsonencode({
      Version = "2012-10-17"
      Statement = [
        {
          Action   = [
            "logs:CreateLogGroup",
            "logs:CreateLogStream",
            "logs:PutLogEvents"
          ]
          Effect   = "Allow"
          Resource = "arn:aws:logs:*:*:*"
        },
      ]
    })
  }
  
  inline_policy {
    name = "${projectName}-API-extra-role"
    policy = data.aws_iam_policy_document.lambda_extra_role.json
  }
}
`.trim();
}
