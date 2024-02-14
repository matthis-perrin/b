import {BadRequestError} from '@shared/api/core/api_errors';
import {ApiHandler} from '@shared/api/core/api_types';
import {__WORKSPACE_NAME_UPPERCASE___USER_TABLE_NAME} from '@shared/env';
import {UserItem} from '@shared/model';

import {getItem} from '@shared-node/aws/dynamodb';
import {hashPassword} from '@shared-node/lib/hash';

import {session} from '@src/session';

export const loginHandler: ApiHandler<'__PROJECT_NAME__', 'POST /login'> = async (req, context) => {
  const {id, password} = req;

  // Lookup user
  const user = await getItem<UserItem>({
    tableName: __WORKSPACE_NAME_UPPERCASE___USER_TABLE_NAME,
    key: {id},
  });
  if (!user) {
    throw new BadRequestError({userMessage: 'Invalid credentials'});
  }

  // Check password
  const {hash, salt} = user;
  const passwordHash = hashPassword(password, salt);
  if (passwordHash !== hash) {
    throw new BadRequestError({userMessage: 'Invalid credentials'});
  }

  // Create the session
  return session.createSession(context, user);
};

// await createUser({
//   id: 'foo' as UserId,
//   password: 'bar',
//   // eslint-disable-next-line @typescript-eslint/no-magic-numbers
//   sessionDuration: 30 * 24 * 3600, // 1 month
// });

// async function createUser(opts: {
//   id: UserId;
//   password: string;
//   sessionDuration: number;
// }): Promise<void> {
//   const {id, password, sessionDuration} = opts;
//   const salt = uidSafe();
//   const hash = hashPassword(password, salt);
//   await putItem<UserItem>({
//     tableName: __WORKSPACE_NAME_UPPERCASE___USER_TABLE_NAME,
//     item: {id, hash, salt, sessionDuration},
//   });
// }
