import {WorkspaceName} from '@src/models';
import {lowerCase, pascalCase} from '@src/string_utils';

export function generateDynamoUserSessionTerraform(
  workspaceName: WorkspaceName,
  appName: string
): string {
  const prefixLower = lowerCase(appName);
  const prefixPascal = `${pascalCase(workspaceName)}${pascalCase(appName)}`;
  return `output "${prefixLower}_user_session_table_name" {
  value = aws_dynamodb_table.${prefixLower}_user_session_table.name
}

output "${prefixLower}_user_session_index_name" {
  value = {
    for obj in aws_dynamodb_table.${prefixLower}_user_session_table.global_secondary_index : "${prefixLower}_user_session_by_\${obj.hash_key}\${ length(obj.range_key) > 0 ? "_sorted_by_\${obj.range_key}" : "" }" => obj.name
  }
}

resource "aws_dynamodb_table" "${prefixLower}_user_session_table" {
  name         = "${prefixPascal}UserSession"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "token"

  attribute {
    name = "token"
    type = "S"
  }

  ttl {
    attribute_name = "expiresAt"
    enabled        = true
  }
}`.trim();
}
