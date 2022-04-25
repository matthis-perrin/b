import {ProjectName} from '../../models';

export function generateApiGatewayTerraform(projectName: ProjectName): string {
  return `
resource "aws_api_gateway_rest_api" "${projectName}" {
  name        = "${projectName}-RestAPI"
  description = "Rest API for the \\"${projectName}\\" app"
}

resource "aws_api_gateway_resource" "${projectName}" {
  rest_api_id = aws_api_gateway_rest_api.${projectName}.id
  parent_id   = aws_api_gateway_rest_api.${projectName}.root_resource_id
  path_part   = "{proxy+}"
}
  
resource "aws_api_gateway_method" "${projectName}" {
  rest_api_id   = aws_api_gateway_rest_api.${projectName}.id
  resource_id   = aws_api_gateway_resource.${projectName}.id
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_method" "${projectName}_root" {
    rest_api_id   = aws_api_gateway_rest_api.${projectName}.id
    resource_id   = aws_api_gateway_rest_api.${projectName}.root_resource_id
    http_method   = "ANY"
    authorization = "NONE"
}

resource "aws_api_gateway_integration" "${projectName}" {
  rest_api_id = aws_api_gateway_rest_api.${projectName}.id
  resource_id = aws_api_gateway_method.${projectName}.resource_id
  http_method = aws_api_gateway_method.${projectName}.http_method
  
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.${projectName}.invoke_arn
}

resource "aws_api_gateway_integration" "${projectName}_root" {
  rest_api_id = aws_api_gateway_rest_api.${projectName}.id
  resource_id = aws_api_gateway_method.${projectName}_root.resource_id
  http_method = aws_api_gateway_method.${projectName}_root.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.${projectName}.invoke_arn
}

resource "aws_api_gateway_deployment" "${projectName}" {
  depends_on = [
    aws_api_gateway_integration.${projectName},
    aws_api_gateway_integration.${projectName}_root,
  ]
  rest_api_id = aws_api_gateway_rest_api.${projectName}.id
  stage_name  = "prod"

  triggers = {
    redeployment = sha1(jsonencode(aws_api_gateway_integration.${projectName}))
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_lambda_permission" "${projectName}" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.${projectName}.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "\${aws_api_gateway_rest_api.${projectName}.execution_arn}/*/*"
}      
`.trim();
}
