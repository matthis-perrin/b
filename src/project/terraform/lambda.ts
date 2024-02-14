import {ProjectName, WorkspaceName} from '@src/models';
import {lowerCase} from '@src/string_utils';

export function generateLambdaTerraform(
  workspaceName: WorkspaceName,
  projectName: ProjectName,
  opts: {
    api: boolean;
    web: boolean;
    alarmEmail: string | undefined;
    cloudwatchTriggerMinutes: number | undefined;
  }
): string {
  const {api, web, alarmEmail, cloudwatchTriggerMinutes} = opts;
  const prefixLower = lowerCase(workspaceName);
  return `
# Define any extra role for the lambda here
data "aws_iam_policy_document" "${projectName}_extra_policy" {
  statement {
    actions   = [
      "dynamodb:GetItem",
      "dynamodb:BatchGetItem",
      "dynamodb:Query",
      "dynamodb:Scan",
      "dynamodb:PutItem",
      "dynamodb:UpdateItem",
      "dynamodb:DeleteItem",
    ]
    resources = [
      "\${aws_dynamodb_table.${prefixLower}_user_table.arn}",
      "\${aws_dynamodb_table.${prefixLower}_user_table.arn}/index/*",
      "\${aws_dynamodb_table.${prefixLower}_user_session_table.arn}",
      "\${aws_dynamodb_table.${prefixLower}_user_session_table.arn}/index/*",
    ]
  }${
    web
      ? `

  statement {
    actions   = [
      "s3:GetObject",
      "s3:GetObjectTagging"
    ]
    resources = [
      "\${aws_s3_bucket.code.arn}/*"
    ]
  }`
      : ''
  }
}

resource "aws_lambda_function" "${projectName}" {
  function_name     = "${workspaceName}-${projectName}"
  s3_bucket         = aws_s3_object.${projectName}_archive.bucket
  s3_key            = aws_s3_object.${projectName}_archive.key
  handler           = "index.handler"
  runtime           = "nodejs20.x"
  role              = aws_iam_role.${projectName}_role.arn
  timeout           = 900 // 15 minutes
  memory_size       = 128 // Mo
  environment {
    variables = {
      NODE_OPTIONS = "--enable-source-maps"
    }
  }
}

output "${projectName}_function_name" {
  value       = aws_lambda_function.${projectName}.function_name
  description = "Function name of the \\"${workspaceName}-${projectName}\\" lambda"
}
${
  api
    ? `
# Lambda URL

resource "aws_lambda_function_url" "${projectName}" {
  function_name      = aws_lambda_function.${projectName}.function_name
  authorization_type = "NONE"
}

output "${projectName}_function_url" {
  value       = aws_lambda_function_url.${projectName}.function_url
  description = "Function url of the \\"${workspaceName}-${projectName}\\" lambda"
}`
    : ''
}
${
  cloudwatchTriggerMinutes !== undefined
    ? `# Cloudwatch trigger

resource "aws_lambda_permission" "cloudwatch_invoke_${projectName}" {
  statement_id  = "AllowExecutionFromCloudWatch"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.${projectName}.arn
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.${projectName}_trigger_rate.arn
}

resource "aws_cloudwatch_event_rule" "${projectName}_trigger_rate" {
  name_prefix         = "${projectName}.rate-${cloudwatchTriggerMinutes}-minutes."
  schedule_expression = "rate(${cloudwatchTriggerMinutes} minute${
    cloudwatchTriggerMinutes > 1 ? 's' : ''
  })"
}

resource "aws_cloudwatch_event_target" "${projectName}_trigger_target" {
  rule  = aws_cloudwatch_event_rule.${projectName}_trigger_rate.name
  arn   = aws_lambda_function.${projectName}.arn
}
`
    : ''
}
# IAM role

resource "aws_iam_role" "${projectName}_role" {
  name = "${workspaceName}-${projectName}-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action    = "sts:AssumeRole"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
        Effect    = "Allow"
      },
    ]
  })
  
  inline_policy {
    name = "${workspaceName}-${projectName}-extra-policy"
    policy = data.aws_iam_policy_document.${projectName}_extra_policy.json
  }
}

# Cloudwatch logging

resource "aws_cloudwatch_log_group" "${projectName}" {
  name = "/aws/lambda/${workspaceName}-${projectName}"
}

resource "aws_iam_policy" "${projectName}_cloudwatch" {
  name = "${workspaceName}-${projectName}-cloudwatch-policy"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action   = [
          "logs:CreateLogStream",
          "logs:PutLogEvents",
        ]
        Effect   = "Allow"
        Resource = [
          "\${aws_cloudwatch_log_group.${projectName}.arn}",
          "\${aws_cloudwatch_log_group.${projectName}.arn}:*",
        ]
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "${projectName}_cloudwatch" {
  role       = aws_iam_role.${projectName}_role.name
  policy_arn = aws_iam_policy.${projectName}_cloudwatch.arn
}
${
  alarmEmail !== undefined
    ? `
# Cloudwatch error monitoring

resource "aws_cloudwatch_log_metric_filter" "${projectName}_log_errors" {
  name           = "${workspaceName}-${projectName}-log-error-metric-filter"
  pattern        = "[ts, id, level = \\"ERROR\\", msg]"
  log_group_name = aws_cloudwatch_log_group.${projectName}.name

  metric_transformation {
    name      = "${workspaceName}-${projectName}-errors"
    namespace = "${workspaceName}"
    value     = "1"
    default_value = "0"
    unit      = "Count"
  }
}

resource "aws_cloudwatch_metric_alarm" "${projectName}_log_errors" {
  alarm_name          = "${workspaceName}-${projectName}-log-error-metric-alarm"
  metric_name         = aws_cloudwatch_log_metric_filter.${projectName}_log_errors.metric_transformation[0].name
  namespace           = aws_cloudwatch_log_metric_filter.${projectName}_log_errors.metric_transformation[0].namespace
  
  evaluation_periods  = 1
  period              = 3600
  statistic           = "Sum"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  threshold           = 1
  actions_enabled     = true
  alarm_actions       = [aws_sns_topic.${projectName}_log_errors.arn]
  ok_actions          = [aws_sns_topic.${projectName}_log_errors.arn]
}

resource "aws_sns_topic" "${projectName}_log_errors" {
  name = "${workspaceName}-${projectName}-log-error-sns-topic"
}

resource "aws_sns_topic_subscription" "${projectName}_log_errors" {
  endpoint = "${alarmEmail}"
  protocol = "email"
  topic_arn = aws_sns_topic.${projectName}_log_errors.arn
}
`
    : ''
}
# Dummy source code useful only during the initial setup
resource "aws_s3_object" "${projectName}_archive" {
  bucket       = aws_s3_bucket.code.id
  key          = "${projectName}/dist.zip"
  content_base64 = "UEsDBBQACAAIAGaKwlYAAAAAAAAAADYAAAAIACAAaW5kZXguanNVVA0AB3AIemRyCHpkcAh6ZHV4CwABBPUBAAAEFAAAAEutKMgvKinWy0jMS8lJLVKwVUgsrsxLVkgrzUsuyczPU9DQVKjmUlAoSi0pLcpTUFe35qq15gIAUEsHCP0ak1o4AAAANgAAAFBLAQIUAxQACAAIAGaKwlb9GpNaOAAAADYAAAAIACAAAAAAAAAAAACkgQAAAABpbmRleC5qc1VUDQAHcAh6ZHIIemRwCHpkdXgLAAEE9QEAAAQUAAAAUEsFBgAAAAABAAEAVgAAAI4AAAAAAA=="
}

`.trim();
}
