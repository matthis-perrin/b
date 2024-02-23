import {apiCaller} from '@shared/api/core/api_call';
import {FORBIDDEN_CODE} from '@shared/api/core/api_errors';

import {setUser} from '@src/stores/user_store';

export const apiCall = apiCaller('__APP_NAME___backend', fetch, console.error, {
  schemaValidation: false,
  onHttpError: (statusCode: number) => {
    if (statusCode === FORBIDDEN_CODE) {
      setUser(undefined);
    }
  },
});
