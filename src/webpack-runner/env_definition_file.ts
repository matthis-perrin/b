import {execSync} from 'node:child_process';
import {join} from 'node:path';

import {writeTsFileSync} from '@src/fs';
import {removeUndefined} from '@src/type_utils';
import {getEnv} from '@src/webpack/utils';

export function generateEnvFile(overrides: Record<string, string>): void {
  const terraformPath = join(process.cwd(), 'terraform');
  const res: Record<string, {type: string; value: unknown; sensitive: boolean}> = JSON.parse(
    execSync(`terraform output -json`, {cwd: terraformPath}).toString()
  );

  const outputsEntries = removeUndefined(
    Object.entries(res).map(([key, value]) => {
      if (value.sensitive || value.type !== 'string' || typeof value.value !== 'string') {
        return undefined;
      }
      return [key.toUpperCase(), value.value] as const;
    })
  );
  const envConstants = {
    REGION: 'RUN_TERRAFORM_APPLY',
    CODE_BUCKET: 'RUN_TERRAFORM_APPLY',
    ...Object.fromEntries(outputsEntries),
    ...overrides,
    NODE_ENV: getEnv(),
  };

  writeTsFileSync(
    join(process.cwd(), 'shared', 'src', 'env.ts'),
    Object.entries(envConstants)
      .map(([key, value]) => `export const ${key} = ${JSON.stringify(value)} as string;`)
      .join('\n')
  );
}
