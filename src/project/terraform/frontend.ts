import {ProjectName} from '@src/models';
import {AppDomain} from '@src/project/terraform/all';

export function generateFrontendTerraform(
  projectName: ProjectName,
  opts: {domain: AppDomain | undefined}
): string {
  const {domain} = opts;
  const bucketName = projectName.toLowerCase().replace(/[^\d.a-z-]+/gu, '-');
  const originId = `${bucketName}-origin-id`;
  return `
output "${projectName}_cloudfront_domain_name" {
  value       = ${
    domain
      ? `"${domain.subDomain}.${domain.rootDomain}"`
      : `aws_cloudfront_distribution.${projectName}.domain_name`
  }
  description = "Domain (from cloudfront) where the \\"${projectName}\\" is available."
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

resource "aws_cloudfront_origin_access_identity" "${projectName}" {}
  
resource "aws_cloudfront_distribution" "${projectName}" {
  origin {
    domain_name = aws_s3_bucket.code.bucket_regional_domain_name
    origin_id   = "${originId}"
    origin_path = "/${projectName}"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.${projectName}.cloudfront_access_identity_path
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
  
  default_root_object = "/index.html"
  custom_error_response {
    error_code         = 400
    response_code      = 200
    response_page_path = "/index.html"
  }
  custom_error_response {
    error_code         = 403
    response_code      = 200
    response_page_path = "/index.html"
  }
  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
  }

  default_cache_behavior {
    allowed_methods        = ["HEAD", "GET"]
    cached_methods         = ["HEAD", "GET"]
    compress               = true
    target_origin_id       = "${originId}"
    viewer_protocol_policy = "redirect-to-https"
    
    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
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
}
  `.trim();
}
