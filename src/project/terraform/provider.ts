import {WorkspaceName} from '@src/models';

export function generateAwsProviderTerraform(workspaceName: WorkspaceName): string {
  return `
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.1"
    }
  }
}

provider "aws" {
  region                   = "eu-west-3"
  default_tags {
    tags = {
      Project = "${workspaceName}"
    }
  }
}

provider "aws" {
  alias                    = "us-east-1"
  region                   = "us-east-1"
  default_tags {
    tags = {
      Project = "${workspaceName}"
    }
  }
}

data "aws_region" "current" {}
output "region" {
  value = data.aws_region.current.id
}

data "aws_caller_identity" "current" {}
output "account_id" {
  value = data.aws_caller_identity.current.account_id
}

data "aws_iam_roles" "administrator_roles" {
  name_regex = "AdministratorAccess"
}
output "administrator_role_arn" {
  value = tolist(data.aws_iam_roles.administrator_roles.arns)[0]
}
`.trim();
}
