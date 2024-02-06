import {WorkspaceName} from '@src/models';
import {lowerCase, pascalCase} from '@src/string_utils';

export function generateDynamoUserTerraform(workspaceName: WorkspaceName): string {
  const prefixLower = lowerCase(workspaceName);
  const prefixPascal = pascalCase(workspaceName);
  return `output "${prefixLower}_user_table_name" {
    value       = aws_dynamodb_table.${prefixLower}_user_table.name
  }
  
  output "${prefixLower}_user_index_name" {
    value = {
      for obj in aws_dynamodb_table.${prefixLower}_user_table.global_secondary_index : "\${aws_dynamodb_table.${prefixLower}_user_table.name }_By_\${obj.hash_key}\${ length(obj.range_key) > 0 ? "_Sorted_By_\${obj.range_key}" : "" }" => obj.name
    }
  }
  
  resource "aws_dynamodb_table" "${prefixLower}_user_table" {
    name           = "${prefixPascal}User"
    billing_mode   = "PAY_PER_REQUEST"
    hash_key       = "id"
  
    attribute {
      name = "id"
      type = "S"
    }
  }`.trim();
}
