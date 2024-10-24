import {TerraformEnv, WorkspaceOptions} from '@src/project/vscode_workspace';

function stringOrNull(val?: string): string {
  return val === undefined ? 'null' : `"${val}"`;
}

export function generateAwsProviderTerraform(opts: WorkspaceOptions): string {
  const {region, envs, workspaceName} = opts;

  // If no envs are defined, create a virtual dummy env as default
  let envsAndDefault: {envs: Record<string, TerraformEnv>; defaultEnvName: string};
  const envNames = Object.keys(envs);
  if (envNames.length === 0) {
    const defaultEnv: TerraformEnv = {isDefault: true};
    envsAndDefault = {envs: {default: defaultEnv}, defaultEnvName: 'default'};
  } else if (envNames.length === 1) {
    const firstEnvName = envNames[0]!; // eslint-disable-line @typescript-eslint/no-non-null-assertion
    const firstEnv = {...envs[firstEnvName]!, isDefault: true}; // eslint-disable-line @typescript-eslint/no-non-null-assertion
    envsAndDefault = {envs: {[firstEnvName]: firstEnv}, defaultEnvName: firstEnvName};
  } else {
    const defaultEnvName = Object.entries(envs).find(([_, env]) => env.isDefault)?.[0];
    if (defaultEnvName === undefined) {
      throw new Error(
        `Encountered ${envNames.length} envs (${envNames.join(', ')}) but none is the default env`
      );
    }
    envsAndDefault = {envs, defaultEnvName};
  }

  return `

locals {
  all_envs = {
${Object.entries(envsAndDefault.envs)
  .map(
    ([name, env]) =>
      `    ${name} = {account_id = ${stringOrNull(env.accountId)}, hosted_zone = ${stringOrNull(env.hostedZone)}}${env.isDefault ? ' # default' : ''}`
  )
  .join('\n')}
  }
}

locals {
  current_env = lookup(local.all_envs, terraform.workspace, local.all_envs["${envsAndDefault.defaultEnvName}"])
  current_env_name = "${envsAndDefault.defaultEnvName}"
}

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0" # Use the latest 5.x versions
    }
  }
}

provider "aws" {
  region                   = "${region}"
  allowed_account_ids      = local.current_env.account_id != null ? [local.current_env.account_id] : null
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

output "current_env" {
  value = data.aws_caller_identity.current.account_id
}

data "aws_region" "current" {}
output "region" {
  value = data.aws_region.current.id
}

data "aws_caller_identity" "current" {}
output "account_id" {
  value = data.aws_caller_identity.current.account_id
}

data "aws_route53_zone" "main" {
  name = local.current_env.hosted_zone
}

`.trim();
}
