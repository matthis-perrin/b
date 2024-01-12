export function generateDynamoTerraform(): string {
  return `output "dummy_table_name" {
  value       = aws_dynamodb_table.dummy_table.name
}

output "dummy_index_name" {
  value = {
    for obj in aws_dynamodb_table.dummy_table.global_secondary_index : "\${aws_dynamodb_table.dummy_table.name }_By_\${obj.hash_key}\${ length(obj.range_key) > 0 ? '_Sorted_By_\${obj.range_key}' : '' }" => obj.name
  }
}

resource "aws_dynamodb_table" "dummy_table" {
  name           = "Dummy"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "group"
    type = "S"
  }

  attribute {
    name = "ts"
    type = "N"
  }

  global_secondary_index {
    name               = "Dummy_ByGroup_SortedByTs"
    hash_key           = "group"
    range_key          = "ts"
    projection_type    = "ALL"
  }

  global_secondary_index {
    name               = "Dummy_ByTs"
    hash_key           = "ts"
    projection_type    = "ALL"
  }
}`
    .trim()
    .split('\n')
    .map(l => `# ${l}`)
    .join('\n');
}
