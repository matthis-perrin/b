import {__BACKEND_NAME_UPPERCASE___FUNCTION_URL} from '@shared/env';

import {SessionManager} from '@shared-node/api/api_session';

export const session = new SessionManager({
  cookieName: 'session',
  domain: new URL(__BACKEND_NAME_UPPERCASE___FUNCTION_URL).hostname,
});
