export function generateAwsProviderTerraform(projectName: string): string {
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
      Project = "${projectName}"
    }
  }
}
`.trim();
}
