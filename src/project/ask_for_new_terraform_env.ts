import {
  askForTerraformAccountId,
  askForTerraformEnvIsDefault,
  askForTerraformEnvName,
  askForTerraformHostedZone,
} from '@src/project/ask_for_common';
import {TerraformEnv} from '@src/project/vscode_workspace';

export async function askForNewTerraformEnv(
  envs: Record<string, TerraformEnv>
): Promise<Record<string, TerraformEnv>> {
  const name = await askForTerraformEnvName();
  if (name === undefined) {
    return envs;
  }
  const accountId = await askForTerraformAccountId();
  const isDefault = await askForTerraformEnvIsDefault();
  const hostedZone = await askForTerraformHostedZone();
  if (name in envs) {
    throw new Error(`env ${name} already exists`);
  }
  return {...envs, [name]: {accountId, hostedZone, isDefault}};
}
