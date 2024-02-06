import {error} from 'node:console';

import {ForbiddenError} from '@shared/api/core/api_errors';
import {ApiContext} from '@shared/api/core/api_types';
import {
  __WORKSPACE_NAME_UPPERCASE___USER_SESSION_TABLE_NAME,
  __WORKSPACE_NAME_UPPERCASE___USER_TABLE_NAME,
  NODE_ENV,
} from '@shared/env';
import {splitOnce} from '@shared/lib/array_utils';
import {asMapOrThrow, asNumberOrThrow, asStringOrThrow} from '@shared/lib/type_utils';

import {getItem, putItem, updateItem} from '@shared-node/aws/dynamodb';
import {uidSafe} from '@shared-node/lib/rand_safe';
import {decrypt, encrypt} from '@shared-node/lib/symmetric_encryption';
import {UserId, UserItem, UserSessionItem, UserSessionToken} from '@shared-node/model';

export class SessionManager {
  private static readonly COOKIE_ENCRYPTION_KEY = '__COOKIE_ENCRYPTION_KEY__';
  private static readonly COOKIE_SECURE = NODE_ENV === 'development' ? '' : 'Secure; ';

  public constructor(private readonly opts: {cookieName: string; domain: string}) {}

  public isLikelyConnected<Context extends Pick<ApiContext, 'getRequestHeader'>>(
    context: Context
  ): boolean {
    const session = this.getSessionCookie(context);
    if (!session) {
      return false;
    }
    return Math.floor(Date.now() / 1000) < session.expiresAt;
  }

  public async enforceSession(context: ApiContext): Promise<UserItem> {
    const session = this.getSessionCookie(context);
    const forbiddenMsg = {userMessage: 'Not connected'};
    if (!session) {
      throw new ForbiddenError(forbiddenMsg);
    }
    if (Math.floor(Date.now() / 1000) < session.expiresAt) {
      try {
        const sessionItem = await getItem<UserSessionItem>({
          tableName: __WORKSPACE_NAME_UPPERCASE___USER_SESSION_TABLE_NAME,
          key: {token: session.token},
        });
        if (!sessionItem) {
          throw new ForbiddenError(forbiddenMsg);
        }
        const userItem = await getItem<UserItem>({
          tableName: __WORKSPACE_NAME_UPPERCASE___USER_TABLE_NAME,
          key: {id: sessionItem.userId},
        });
        if (!userItem) {
          throw new ForbiddenError(forbiddenMsg);
        }
        // Extend session if we've passed half the session duration
        if (sessionItem.expiresAt - Math.floor(Date.now() / 1000) < userItem.sessionDuration / 2) {
          updateItem({
            tableName: __WORKSPACE_NAME_UPPERCASE___USER_SESSION_TABLE_NAME,
            key: {token: session.token},
            updateExpression: {set: [`#expiresAt = :expiresAt`]},
            expressionAttributeNames: {'#expiresAt': 'expiresAt'},
            expressionAttributeValues: {
              ':expiresAt': Math.floor(Date.now() / 1000) + userItem.sessionDuration,
            },
          }).catch(err => console.error('Failure to extent session', {session}, err));
        }
        return userItem;
        // eslint-disable-next-line no-empty
      } catch {}
    }
    this.removeSessionCookie(context);
    throw new ForbiddenError(forbiddenMsg);
  }

  public async createSession(
    context: ApiContext,
    userId: UserId,
    sessionDuration: number
  ): Promise<void> {
    // Create session
    const token = uidSafe() as UserSessionToken;
    const expiresAt = Math.floor(Date.now() / 1000) + sessionDuration;
    const sessionItem: UserSessionItem = {userId, expiresAt, token};
    await putItem<UserSessionItem>({
      tableName: __WORKSPACE_NAME_UPPERCASE___USER_SESSION_TABLE_NAME,
      item: sessionItem,
    });

    // Set session cookie
    this.setSessionCookie(context, {token, expiresAt, sessionDuration});
  }

  // COOKIE MANIPULATION

  private setSessionCookie(
    context: ApiContext,
    session: {token: UserSessionToken; expiresAt: number; sessionDuration: number}
  ): void {
    const {token, expiresAt, sessionDuration} = session;
    context.setResponseHeader(
      'Set-Cookie',
      `${this.opts.cookieName}=${this.serializeSession(
        token,
        expiresAt
      )}; Max-Age=${sessionDuration}; ${SessionManager.COOKIE_SECURE}HttpOnly; Path=/; Domain=${
        this.opts.domain
      }; SameSite=Strict`
    );
  }

  private getSessionCookie<Context extends Pick<ApiContext, 'getRequestHeader'>>(
    context: Context
  ): {token: UserSessionToken; expiresAt: number} | undefined {
    const raw = context.getRequestHeader('Cookie');
    if (raw === undefined) {
      return undefined;
    }
    const rawCookies = (Array.isArray(raw) ? raw[0] ?? '' : raw)
      .split(/; */u)
      .filter(str => str.trim().length > 0);
    for (const rawCookie of rawCookies) {
      const [name, value] = splitOnce(rawCookie, '=');
      if (value === undefined) {
        continue;
      }
      if (name.trim() === this.opts.cookieName) {
        return this.deserializeSession(value.trim());
      }
    }
    return undefined;
  }

  private removeSessionCookie(context: ApiContext): void {
    context.setResponseHeader(
      'Set-Cookie',
      `${this.opts.cookieName}=; Max-Age=0; ${SessionManager.COOKIE_SECURE}HttpOnly; Path=/; Domain=${this.opts.domain}; SameSite=Strict`
    );
  }

  // SESSION SERIALIZATION

  private serializeSession(token: UserSessionToken, expiresAt: number): string {
    return encrypt(JSON.stringify({token, expiresAt}), SessionManager.COOKIE_ENCRYPTION_KEY);
  }

  private deserializeSession(
    raw: string
  ): {token: UserSessionToken; expiresAt: number} | undefined {
    try {
      const rawMap = asMapOrThrow(JSON.parse(decrypt(raw, SessionManager.COOKIE_ENCRYPTION_KEY)));
      const token = asStringOrThrow<UserSessionToken>(rawMap['token']);
      const expiresAt = asNumberOrThrow(rawMap['expiresAt']);
      return {token, expiresAt};
    } catch (err: unknown) {
      error('Cannot deserialize session', err, {raw});
      return undefined;
    }
  }
}
