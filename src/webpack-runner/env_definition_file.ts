import {execSync} from 'node:child_process';
import {join} from 'node:path';

import {writeTsFile} from '@src/fs';

export async function generateEnvDefinitionFile(): Promise<Record<string, string>> {
  const terraformPath = join(process.cwd(), 'terraform');
  const res: Record<string, {type: string; value: unknown; sensitive: boolean}> = JSON.parse(
    execSync(`terraform output -json`, {cwd: terraformPath}).toString()
  );

  const outputs = Object.entries(res).filter(
    ent => !ent[1].sensitive && ent[1].type === 'string' && typeof ent[1].value === 'string'
  );

  await writeTsFile(
    join(process.cwd(), 'shared', 'src', 'env.d.ts'),
    [...outputs, ['NODE_ENV']]
      .map(([key]) => `declare const ${key.toUpperCase()}: string;`)
      .join('\n')
  );

  return Object.fromEntries(outputs.map(([key, obj]) => [key.toUpperCase(), obj.value as string]));
}
