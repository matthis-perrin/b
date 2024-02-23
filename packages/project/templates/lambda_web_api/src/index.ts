import {
  __APP_NAME_UPPERCASE___BACKEND_ROLE_ARN,
  __APP_NAME_UPPERCASE___BACKEND_URL,
  __APP_NAME_UPPERCASE___FRONTEND_CLOUDFRONT_DOMAIN_NAME,
} from '@shared/env';

import {enforceCloudfrontOrigin} from '@shared-node/api/api_cloudfront_origin';
import {
  apiResponseToLambdaResonse,
  LambdaEvent,
  lambdaEventToApiRequest,
  LambdaResponse,
} from '@shared-node/api/api_lambda';
import {handleApi} from '@shared-node/api/api_router';
import {getIndex, handleStatics} from '@shared-node/api/api_statics';
import {registerAwsRole} from '@shared-node/aws/credentials';

import {loginHandler} from '@src/handlers/login_handler';
import {session} from '@src/session';

registerAwsRole(__APP_NAME_UPPERCASE___BACKEND_ROLE_ARN);

const frontendName = '__APP_NAME___frontend';
const frontendDomain = __APP_NAME_UPPERCASE___FRONTEND_CLOUDFRONT_DOMAIN_NAME;
const websiteUrl = __APP_NAME_UPPERCASE___BACKEND_URL;

export async function handler(event: LambdaEvent): Promise<LambdaResponse> {
  enforceCloudfrontOrigin(event);
  const req = lambdaEventToApiRequest(event);
  const res = apiResponseToLambdaResonse({req, frontendDomain});

  // For CORS
  if (req.method === 'OPTIONS') {
    return res({});
  }

  // Static resources
  const staticsRes = await handleStatics(req, {
    frontendName,
    websiteUrl,
    session,
  });
  if (staticsRes) {
    return res(staticsRes);
  }

  // API handlers
  const apiRes = await handleApi(req, '__APP_NAME___backend', {
    'POST /login': loginHandler,
  });
  if (apiRes) {
    return res(apiRes);
  }

  // Default to the index
  const indexRes = await getIndex(req, {frontendName, session});
  return res(indexRes);
}
