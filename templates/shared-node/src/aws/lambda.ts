import {InvokeCommand, LambdaClient} from '@aws-sdk/client-lambda';

import {REGION} from '@shared/env';

import {readCredentials} from '@shared-node/aws/credentials';

export interface LambdaContext {
  getRemainingTimeInMillis: () => number;
}

const client = new LambdaClient({region: REGION, credentials: readCredentials()});

export async function invokeFunctionAsync(opts: {functionName: string}): Promise<void> {
  const {functionName} = opts;
  await client.send(new InvokeCommand({FunctionName: functionName, InvocationType: 'Event'}));
}
