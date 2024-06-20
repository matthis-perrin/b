import {
  IoTDataPlaneClient,
  PublishCommand,
  PublishCommandOutput,
} from '@aws-sdk/client-iot-data-plane';

import {REGION} from '@shared/env';

import {credentialsProvider} from '@shared-node/aws/credentials';

let client: IoTDataPlaneClient | undefined;
function getClient(): IoTDataPlaneClient {
  if (!client) {
    client = new IoTDataPlaneClient({region: REGION, credentials: credentialsProvider()});
  }
  return client;
}

export async function publish(options: {
  topic: string;
  payload: string;
}): Promise<PublishCommandOutput> {
  const {topic, payload} = options;
  return getClient().send(new PublishCommand({topic, payload}));
}
