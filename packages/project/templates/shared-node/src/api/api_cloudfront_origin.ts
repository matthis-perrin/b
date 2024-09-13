import {LambdaEvent} from '@shared-node/api/api_lambda';

/* eslint-disable n/no-process-env */
const CLOUDFRONT_HEADER_NAME = process.env['CLOUDFRONT_HEADER_NAME'] ?? '';
const CLOUDFRONT_HEADER_VALUE = process.env['CLOUDFRONT_HEADER_VALUE'] ?? '';
/* eslint-enable n/no-process-env */

export function enforceCloudfrontOrigin(event: LambdaEvent): void {
  // Ensure the request comes from Cloudfront
  if (event.headers[CLOUDFRONT_HEADER_NAME] !== CLOUDFRONT_HEADER_VALUE) {
    throw new Error('Direct access not allowed');
  }
}
