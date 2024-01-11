import {readFileSync} from 'node:fs';

import {NODE_ENV} from '@shared/env';
import {splitOnceOrThrow} from '@shared/lib/array_utils';

export function readCredentials(): {accessKeyId: string; secretAccessKey: string} | undefined {
  if (NODE_ENV !== 'development') {
    return;
  }
  const credentialsFile = readFileSync('./terraform/.aws-credentials').toString();
  const credentialsLines = credentialsFile.split('\n');
  const credentials = Object.fromEntries(
    credentialsLines
      .filter(line => line.includes(' = '))
      .map(line => {
        const [key, value] = splitOnceOrThrow(line, ' = ');
        return [key, value];
      })
  );
  const {aws_access_key_id, aws_secret_access_key} = credentials;
  if (aws_access_key_id === undefined || aws_secret_access_key === undefined) {
    return undefined;
  }
  return {accessKeyId: aws_access_key_id, secretAccessKey: aws_secret_access_key};
}
