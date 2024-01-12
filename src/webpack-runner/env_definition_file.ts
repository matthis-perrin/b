import {execSync} from 'node:child_process';
import {join} from 'node:path';

import {writeTsFile} from '@src/fs';
import {removeUndefined} from '@src/type_utils';
import {getEnv} from '@src/webpack/utils';

export async function generateEnvFile(overrides: Record<string, string>): Promise<void> {
  const terraformPath = join(process.cwd(), 'terraform');
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
        value.value !== null // eslint-disable-line no-null/no-null
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
  const envConstants: Record<string, unknown> = {
    REGION: 'RUN_TERRAFORM_APPLY',
    CODE_BUCKET: 'RUN_TERRAFORM_APPLY',
    ...Object.fromEntries(outputsEntries),
    ...overrides,
    NODE_ENV: getEnv(),
  };

  await writeTsFile(
    join(process.cwd(), 'shared', 'src', 'env.ts'),
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
