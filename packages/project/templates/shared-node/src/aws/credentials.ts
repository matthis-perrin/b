import {ACCOUNT_ID, NODE_ENV} from '@shared/env';

import {assumeRole, getCallerAccountId} from '@shared-node/aws/sts';

let awsRole: string | undefined;

export function registerAwsRole(role: string): void {
  awsRole = role;
}

interface AwsCredentialIdentity {
  readonly accessKeyId: string;
  readonly secretAccessKey: string;
  readonly sessionToken?: string;
  readonly expiration?: Date;
}

export function credentialsProvider(): (() => Promise<AwsCredentialIdentity>) | undefined {
  if (NODE_ENV !== 'development') {
    return;
  }
  return async () => {
    // Ensure the aws credentials are for the correct account id
    const currentAccountId = await getCallerAccountId();
    if (currentAccountId !== ACCOUNT_ID) {
      throw new Error(
        `AWS credentials are for the account ${currentAccountId}, expected ${ACCOUNT_ID}`
      );
    }

    if (awsRole === undefined) {
      throw new Error(`No AWS role registered`);
    }

    const credentials = await assumeRole(awsRole);
    if (!credentials) {
      throw new Error(`Failure to retrieve credentials for role "${awsRole}"`);
    }
    const {AccessKeyId, SecretAccessKey, SessionToken, Expiration} = credentials;
    if (AccessKeyId === undefined || SecretAccessKey === undefined) {
      throw new Error(`Invalid credentials for role "${awsRole}"`);
    }
    return {
      accessKeyId: AccessKeyId,
      secretAccessKey: SecretAccessKey,
      sessionToken: SessionToken,
      expiration: Expiration,
    };
  };
}
