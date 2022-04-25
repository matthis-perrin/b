import {WorkspaceName} from '../../models';

export function generateAwsProviderTerraform(workspaceName: WorkspaceName): string {
  return `
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  region  = "eu-west-3"
  shared_credentials_file = "./.aws-credentials"
  default_tags {
    tags = {
      Project = "${workspaceName}"
    }
  }
}
`.trim();
}
