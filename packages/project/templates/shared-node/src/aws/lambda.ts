import {InvokeCommand, LambdaClient} from '@aws-sdk/client-lambda';

import {REGION} from '@shared/env';

export interface LambdaContext {
  getRemainingTimeInMillis: () => number;
}

let client: LambdaClient | undefined;
function getClient(): LambdaClient {
  if (!client) {
    client = new LambdaClient({region: REGION});
  }
  return client;
}

export async function invokeFunctionAsync(opts: {functionName: string}): Promise<void> {
  const {functionName} = opts;
  if (functionName === 'DISABLED') {
    console.log('Function is disabled in Terraform');
    return;
  }
  await getClient().send(new InvokeCommand({FunctionName: functionName, InvocationType: 'Event'}));
}
