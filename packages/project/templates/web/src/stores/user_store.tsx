// @matthis/skip-file:AUTHENTICATION:not:true
import {Frontend__APP_NAME_PASCALCASE__User} from '@shared/api/__APP_NAME___api';
import {isNull} from '@shared/lib/type_utils';

import {createDataStore} from '@shared-web/lib/data_store';

const userStore = createDataStore(
  'USER' in window && typeof window['USER'] === 'object' && !isNull(window['USER'])
    ? (window['USER'] as Frontend__APP_NAME_PASCALCASE__User)
    : undefined
);
export const useUser = userStore.useData;
export const setUser = userStore.setData;
