import {
  AssumeRoleCommand,
  Credentials,
  GetCallerIdentityCommand,
  STSClient,
} from '@aws-sdk/client-sts';

import {REGION} from '@shared/env';

let client: STSClient | undefined;
function getClient(): STSClient {
  if (!client) {
    client = new STSClient({region: REGION});
  }
  return client;
}

export async function assumeRole(role: string): Promise<Credentials | undefined> {
  const res = await getClient().send(
    new AssumeRoleCommand({RoleArn: role, RoleSessionName: 'local_dev'})
  );
  return res.Credentials;
}

export async function getCallerAccountId(): Promise<string | undefined> {
  const res = await getClient().send(new GetCallerIdentityCommand({}));
  return res.Account;
}
