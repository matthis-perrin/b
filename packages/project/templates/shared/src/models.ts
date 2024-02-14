import {Brand} from '@shared/lib/type_utils';

export type UserId = Brand<'UserId', string>;

export interface UserItem {
  id: UserId;
  hash: string;
  salt: string;
  sessionDuration: number; // in seconds
}
