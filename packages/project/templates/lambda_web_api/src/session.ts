import {FrontendUser} from '@shared/api/api';
import {
  __BACKEND_NAME_UPPERCASE___URL,
  __WORKSPACE_NAME_UPPERCASE___USER_SESSION_TABLE_NAME,
  __WORKSPACE_NAME_UPPERCASE___USER_TABLE_NAME,
} from '@shared/env';
import {UserItem} from '@shared/model';

import {SessionManager} from '@shared-node/api/api_session';

export const session = new SessionManager<UserItem, FrontendUser>({
  cookieName: 'session',
  cookieEncryptionKey: '__COOKIE_ENCRYPTION_KEY__',
  domain: new URL(__BACKEND_NAME_UPPERCASE___URL).hostname,
  userTableName: __WORKSPACE_NAME_UPPERCASE___USER_TABLE_NAME,
  userSessionTableName: __WORKSPACE_NAME_UPPERCASE___USER_SESSION_TABLE_NAME,
  userItemToFrontendUser: user => ({id: user.id}),
});
