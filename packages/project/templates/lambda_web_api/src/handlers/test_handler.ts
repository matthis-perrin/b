import {ApiHandler} from '@shared/api/core/api_types';

export const testHandler: ApiHandler<'__APP_NAME___backend', 'POST /test'> = async req => {
  const {query} = req;
  await Promise.resolve();
  return {data: `You sent ${query}`};
};
