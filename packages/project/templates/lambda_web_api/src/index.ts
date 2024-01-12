import {__FRONTEND_NAME_UPPERCASE___CLOUDFRONT_DOMAIN_NAME} from '@shared/env';

import {
  apiResponseToLambdaResonse,
  LambdaEvent,
  lambdaEventToApiRequest,
  LambdaResponse,
} from '@shared-node/api/api_lambda';
import {handleApi} from '@shared-node/api/api_router';
import {getIndex, handleStatics} from '@shared-node/api/api_statics';

import {testHandler} from '@src/handlers/test_handlers';

const frontendName = '__FRONTEND_NAME__';
const frontendDomain = __FRONTEND_NAME_UPPERCASE___CLOUDFRONT_DOMAIN_NAME;

export async function handler(event: LambdaEvent): Promise<LambdaResponse> {
  const req = lambdaEventToApiRequest(event);
  const res = apiResponseToLambdaResonse({req, frontendDomain});

  // For CORS
  if (req.method === 'OPTIONS') {
    return res({});
  }

  // Static resources
  const staticsRes = await handleStatics(req, {frontendName, frontendDomain});
  if (staticsRes) {
    return res(staticsRes);
  }

  // API handlers
  const apiRes = await handleApi(req, '__PROJECT_NAME__', {
    'GET /test': testHandler,
  });
  if (apiRes) {
    return res(apiRes);
  }

  // Default to the index
  const indexRes = await getIndex({frontendName, frontendDomain});
  return res(indexRes);
}
