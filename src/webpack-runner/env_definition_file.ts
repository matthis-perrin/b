import {execSync} from 'node:child_process';
import {readdir} from 'node:fs/promises';
import {join} from 'node:path';

import {readFile, writeTsFile} from '@src/fs';
import {removeUndefined} from '@src/type_utils';
import {getEnv} from '@src/webpack/utils';

export async function generateEnvFile(
  root: string,
  overrides: Record<string, string>
): Promise<void> {
  // Get the outputs generated by terraform
  const terraformPath = join(root, 'terraform');
  const res: Record<string, {type: unknown; value: unknown; sensitive: boolean}> = JSON.parse(
    execSync(`terraform output -json`, {cwd: terraformPath}).toString()
  );
  const outputsEntries = removeUndefined(
    Object.entries(res).map(([key, value]) => {
      if (value.sensitive) {
        return undefined;
      }
      if (
        Array.isArray(value.type) &&
        value.type[0] === 'object' &&
        typeof value.value === 'object' &&
        value.value !== null
      ) {
        return [
          key.toUpperCase(),
          Object.fromEntries(Object.entries(value.value).map(([k, v]) => [k.toUpperCase(), v])),
        ];
      }
      if (value.type === 'string' && typeof value.value === 'string') {
        return [key.toUpperCase(), value.value];
      }
      return undefined;
    })
  );

  // Parse the outputs from the tf files to create defaults
  const terraformDir = await readdir(terraformPath);
  const terraformFiles = terraformDir.filter(f => f.endsWith('.tf'));
  const terraformFilesContent = await Promise.all(
    terraformFiles.map(async f => await readFile(join(terraformPath, f)))
  );
  const allTerraform = terraformFilesContent.join('\n');
  const outputMatches = allTerraform.matchAll(/output "(?<outputName>[^"]+)" \{/gu);
  const defaultOutputs = Object.fromEntries(
    [...outputMatches]
      .map(o => o.groups?.['outputName'])
      .filter(o => o !== undefined)
      .map(o => [o.toUpperCase(), 'RUN_TERRAFORM_APPLY'])
  );

  const envConstants: Record<string, unknown> = {
    ...defaultOutputs,
    ...Object.fromEntries(outputsEntries),
    ...overrides,
    NODE_ENV: getEnv(),
  };

  await writeTsFile(
    join(root, 'shared', 'src', 'env.ts'),
    Object.entries(envConstants)
      .map(
        ([key, value]) =>
          `export const ${key} = ${JSON.stringify(value)}${
            typeof value === 'string' ? ' as string' : ''
          };`
      )
      .join('\n')
  );
}
