import {
  IoTDataPlaneClient,
  PublishCommand,
  PublishCommandOutput,
} from '@aws-sdk/client-iot-data-plane';

import {REGION} from '@shared/env';

let client: IoTDataPlaneClient | undefined;
function getClient(): IoTDataPlaneClient {
  if (!client) {
    client = new IoTDataPlaneClient({region: REGION});
  }
  return client;
}

export async function publish(options: {
  topic: string;
  payload: string;
}): Promise<PublishCommandOutput> {
  const {topic, payload} = options;
  return await getClient().send(new PublishCommand({topic, payload}));
}
