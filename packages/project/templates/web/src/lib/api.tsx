import {apiCaller} from '@shared/api/core/api_call';

export const apiCall = apiCaller('__BACKEND_NAME__', fetch, console.error);
