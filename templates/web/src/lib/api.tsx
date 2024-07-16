import {apiCaller} from '@shared/api/core/api_call';
// @matthis/start:AUTHENTICATION:true
import {FORBIDDEN_CODE} from '@shared/api/core/api_errors';

import {setUser} from '@src/stores/user_store';
// @matthis/end

export const apiCall = apiCaller('__APP_NAME___backend', fetch, console.error, {
  schemaValidation: false,
  // @matthis/start:AUTHENTICATION:true
  onHttpError: (statusCode: number) => {
    if (statusCode === FORBIDDEN_CODE) {
      setUser(undefined);
    }
  },
  // @matthis/end
});
