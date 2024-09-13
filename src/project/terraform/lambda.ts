import {ProjectName, WebAppAuthentication, WorkspaceName} from '@src/models';
import {AppDomain} from '@src/project/terraform/all';
import {lowerCase} from '@src/string_utils';

export interface WorkspaceProjectTerraformLambda {
  type: 'lambda';
  api: boolean;
  webAppName: string | undefined;
  alarmEmail: string | undefined;
  cloudwatchTriggerMinutes: number | undefined;
  domain: AppDomain | undefined;
  authentication: WebAppAuthentication | undefined;
}

export function generateLambdaTerraform(
  workspaceName: WorkspaceName,
  projectName: ProjectName,
  opts: WorkspaceProjectTerraformLambda
): string {
  const {api, webAppName, alarmEmail, cloudwatchTriggerMinutes, domain, authentication} = opts;
  return `
# Define any extra role for the lambda here
data "aws_iam_policy_document" "${projectName}_extra_policy" {
  ${
    authentication?.enabled
      ? `statement {
    actions = [
      "dynamodb:GetItem",
      "dynamodb:BatchGetItem",
      "dynamodb:Query",
      "dynamodb:Scan",
      "dynamodb:PutItem",
      "dynamodb:UpdateItem",
      "dynamodb:DeleteItem",
    ]
    resources = [${
      webAppName === undefined
        ? ''
        : `
      "\${aws_dynamodb_table.${lowerCase(webAppName)}_user_table.arn}",
      "\${aws_dynamodb_table.${lowerCase(webAppName)}_user_table.arn}/index/*",
      "\${aws_dynamodb_table.${lowerCase(webAppName)}_user_session_table.arn}",
      "\${aws_dynamodb_table.${lowerCase(webAppName)}_user_session_table.arn}/index/*",
    `
    }]
  }`
      : ''
  }${
    webAppName !== undefined
      ? `

  statement {
    actions = [
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
  function_name = "${workspaceName}-${projectName}"
  s3_bucket     = aws_s3_object.${projectName}_archive.bucket
  s3_key        = aws_s3_object.${projectName}_archive.key
  handler       = "index.handler"
  runtime       = "nodejs20.x"
  role          = aws_iam_role.${projectName}_role.arn
  timeout       = 900 // 15 minutes
  memory_size   = 128 // Mo
  environment {
    variables = {${
      api
        ? `
      NODE_OPTIONS            = "--enable-source-maps"
      CLOUDFRONT_HEADER_NAME  = random_string.${projectName}_cloudfront_header_name.result
      CLOUDFRONT_HEADER_VALUE = random_string.${projectName}_cloudfront_header_value.result`
        : `
      NODE_OPTIONS = "--enable-source-maps"`
    }
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

output "${projectName}_url" {
  value       = "${
    domain
      ? `https://${domain.subDomain}.${domain.rootDomain}/`
      : `https://\${aws_cloudfront_distribution.${projectName}.domain_name}/`
  }"
  description = "URL of \\"${projectName}\\""
}${
        domain !== undefined
          ? `

# Domain

data "aws_route53_zone" "${projectName}" {
  name = "${domain.rootDomain}"
}

resource "aws_route53_record" "${projectName}_a" {
  zone_id = data.aws_route53_zone.${projectName}.zone_id
  name    = "${domain.subDomain}.${domain.rootDomain}"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.${projectName}.domain_name
    zone_id                = aws_cloudfront_distribution.${projectName}.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "${projectName}_aaaa" {
  zone_id = data.aws_route53_zone.${projectName}.zone_id
  name    = "${domain.subDomain}.${domain.rootDomain}"
  type    = "AAAA"

  alias {
    name                   = aws_cloudfront_distribution.${projectName}.domain_name
    zone_id                = aws_cloudfront_distribution.${projectName}.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_acm_certificate" "${projectName}" {
  domain_name               = "*.${domain.subDomain}.${domain.rootDomain}"
  subject_alternative_names = ["${domain.subDomain}.${domain.rootDomain}"]
  validation_method         = "DNS"
  provider                  = aws.us-east-1
}

resource "aws_route53_record" "${projectName}_certificate_validation" {
  for_each = {
    for dvo in aws_acm_certificate.${projectName}.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }
  provider        = aws.us-east-1
  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = data.aws_route53_zone.${projectName}.zone_id
}

resource "aws_acm_certificate_validation" "${projectName}" {
  provider                = aws.us-east-1
  certificate_arn         = aws_acm_certificate.${projectName}.arn
  validation_record_fqdns = [for record in aws_route53_record.${projectName}_certificate_validation : record.fqdn]
}`
          : ''
      }

# Cloudfront Distribution

resource "random_string" "${projectName}_cloudfront_header_name" {
  length  = 16
  upper   = false
  numeric = false
  special = false
}

resource "random_string" "${projectName}_cloudfront_header_value" {
  length  = 32
  special = false
}

resource "aws_cloudfront_distribution" "${projectName}" {
  origin {
    # Remove "https://" prefix and "/" suffix
    domain_name = replace(replace(aws_lambda_function_url.${projectName}.function_url, "https://", ""), "/", "")
    origin_id   = aws_lambda_function.${projectName}.function_name

    custom_origin_config {
      https_port             = 443
      http_port              = 80
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }

    custom_header {
      name  = random_string.${projectName}_cloudfront_header_name.result
      value = random_string.${projectName}_cloudfront_header_value.result
    }
  }

  enabled             = true
  wait_for_deployment = false
  is_ipv6_enabled     = true
  price_class         = "PriceClass_100"${
    domain
      ? `
  aliases             = ["${domain.subDomain}.${domain.rootDomain}"]`
      : ''
  }

  default_cache_behavior {
    allowed_methods        = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods         = ["HEAD", "GET"]
    compress               = true
    target_origin_id       = aws_lambda_function.${projectName}.function_name
    viewer_protocol_policy = "redirect-to-https"
    # Managed-CachingDisabled
    cache_policy_id = "4135ea2d-6df8-44a3-9df3-4b5a84be39ad"
    # Managed-AllViewerExceptHostHeader
    origin_request_policy_id = "b689b0a8-53d0-40ab-baf2-68738e2966ac"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {${
    domain
      ? `
    acm_certificate_arn      = aws_acm_certificate.${projectName}.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"`
      : `
    cloudfront_default_certificate = true`
  }
  }
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
  rule = aws_cloudwatch_event_rule.${projectName}_trigger_rate.name
  arn  = aws_lambda_function.${projectName}.arn
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
        Action = "sts:AssumeRole"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
        Effect = "Allow"
      },
    ]
  })
  
  inline_policy {
    name   = "${workspaceName}-${projectName}-extra-policy"
    policy = data.aws_iam_policy_document.${projectName}_extra_policy.json
  }
}

output "${projectName}_role_arn" {
  value = aws_iam_role.${projectName}_role.arn
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
        Action = [
          "logs:CreateLogStream",
          "logs:PutLogEvents",
        ]
        Effect = "Allow"
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
    name          = "${workspaceName}-${projectName}-errors"
    namespace     = "${workspaceName}"
    value         = "1"
    default_value = "0"
    unit          = "Count"
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
  treat_missing_data  = "notBreaching"
}

resource "aws_sns_topic" "${projectName}_log_errors" {
  name = "${workspaceName}-${projectName}-log-error-sns-topic"
}

resource "aws_sns_topic_subscription" "${projectName}_log_errors" {
  endpoint  = "${alarmEmail}"
  protocol  = "email"
  topic_arn = aws_sns_topic.${projectName}_log_errors.arn
}
`
    : ''
}
# Dummy source code useful only during the initial setup
resource "aws_s3_object" "${projectName}_archive" {
  bucket         = aws_s3_bucket.code.id
  key            = "${projectName}/dist.zip"
  content_base64 = "UEsDBBQACAAIAGaKwlYAAAAAAAAAADYAAAAIACAAaW5kZXguanNVVA0AB3AIemRyCHpkcAh6ZHV4CwABBPUBAAAEFAAAAEutKMgvKinWy0jMS8lJLVKwVUgsrsxLVkgrzUsuyczPU9DQVKjmUlAoSi0pLcpTUFe35qq15gIAUEsHCP0ak1o4AAAANgAAAFBLAQIUAxQACAAIAGaKwlb9GpNaOAAAADYAAAAIACAAAAAAAAAAAACkgQAAAABpbmRleC5qc1VUDQAHcAh6ZHIIemRwCHpkdXgLAAEE9QEAAAQUAAAAUEsFBgAAAAABAAEAVgAAAI4AAAAAAA=="
}

`.trim();
}
