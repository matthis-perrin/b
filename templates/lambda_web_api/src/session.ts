// @matthis/skip-file:AUTHENTICATION:not:true
import {Frontend__APP_NAME_PASCALCASE__User} from '@shared/api/__APP_NAME___api';
import {
  __APP_NAME_UPPERCASE___BACKEND_URL,
  __APP_NAME_UPPERCASE___USER_SESSION_TABLE_NAME,
  __APP_NAME_UPPERCASE___USER_TABLE_NAME,
} from '@shared/env';
import {__APP_NAME_PASCALCASE__UserItem} from '@shared/models';

import {SessionManager} from '@shared-node/api/api_session';

const COOKIE_ENCRYPTION_KEY = '__COOKIE_ENCRYPTION_KEY__'; // @matthis/ignore

export const session = new SessionManager<
  __APP_NAME_PASCALCASE__UserItem,
  Frontend__APP_NAME_PASCALCASE__User
>({
  cookieName: '__APP_NAME___session',
  cookieEncryptionKey: COOKIE_ENCRYPTION_KEY,
  domain: new URL(__APP_NAME_UPPERCASE___BACKEND_URL).hostname,
  userTableName: __APP_NAME_UPPERCASE___USER_TABLE_NAME,
  userSessionTableName: __APP_NAME_UPPERCASE___USER_SESSION_TABLE_NAME,
  userItemToFrontendUser: user => ({id: user.id}),
});
