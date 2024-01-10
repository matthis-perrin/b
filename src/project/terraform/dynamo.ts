import {WorkspaceName} from '@src/models';

function toPascal(str: string): string {
  return str
    .toLowerCase()
    .split(/[^a-z0-9]/u)
    .map(str => (str[0]?.toUpperCase() ?? '') + str.slice(1))
    .join('');
}

function toSnake(str: string): string {
  return str
    .toLowerCase()
    .split(/[^a-z0-9]/u)
    .join('_');
}

export function generateDynamoTerraform(
  workspaceName: WorkspaceName,
  opts: {tableName: string}
): string {
  const {tableName} = opts;
  const namePascal = toPascal(workspaceName) + toPascal(tableName);
  const nameSnake = toSnake(workspaceName) + toSnake(tableName);
  const tableUpper = toSnake(tableName).toUpperCase();
  return `
//
// ${toPascal(tableName)} table
//

locals {
    ${tableUpper}_TABLE_NAME = "${namePascal}"
    ${tableUpper}_BY_EMAIL_INDEX_NAME = "${namePascal}_ByEmail_SortedByCreatedAt"
}
output "${tableUpper}_TABLE_NAME" { value = local.${tableUpper}_TABLE_NAME }
output "${tableUpper}_BY_EMAIL_INDEX_NAME" { value = local.${tableUpper}_BY_EMAIL_INDEX_NAME }

resource "aws_dynamodb_table" "${nameSnake}_table" {
  name           = local.${tableUpper}_TABLE_NAME
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "email"
    type = "S"
  }

  attribute {
    name = "createdAt"
    type = "N"
  }

  global_secondary_index {
    name               = local.${tableUpper}_BY_EMAIL_INDEX_NAME
    hash_key           = "email"
    range_key          = "createdAt"
    projection_type    = "ALL"
  }
}
    `.trim();
}
