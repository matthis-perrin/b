import {
  apiResponseToLambdaResonse,
  LambdaEvent,
  lambdaEventToApiRequest,
  LambdaResponse,
} from '@shared-node/api/api_lambda';
import {handleApi} from '@shared-node/api/api_router';

import {testHandler} from '@src/handlers/test_handlers';

export async function handler(event: LambdaEvent): Promise<LambdaResponse> {
  const req = lambdaEventToApiRequest(event);
  const res = apiResponseToLambdaResonse({req});

  // For CORS
  if (req.method === 'OPTIONS') {
    return res({});
  }

  // API handlers
  const apiRes = await handleApi(req, '__PROJECT_NAME__', {
    'GET /test': testHandler,
  });
  if (apiRes) {
    return res(apiRes);
  }

  // Not found
  return res({opts: {statusCode: 404}});
}
