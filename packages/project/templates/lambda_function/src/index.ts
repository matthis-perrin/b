import {__PROJECT_NAME_UPPERCASE___ROLE_ARN} from '@shared/env';

import {registerAwsRole} from '@shared-node/aws/credentials';

registerAwsRole(__PROJECT_NAME_UPPERCASE___ROLE_ARN);

export async function handler(): Promise<unknown> {
  await Promise.resolve();
  return {hello: 'world'};
}
