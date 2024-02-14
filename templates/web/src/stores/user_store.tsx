import {FrontendUser} from '@shared/api/api';
import {isNull} from '@shared/lib/type_utils';

import {createDataStore} from '@shared-web/lib/data_store';

const userStore = createDataStore(
  'USER' in window && typeof window['USER'] === 'object' && !isNull(window['USER'])
    ? (window['USER'] as FrontendUser)
    : undefined
);
export const useUser = userStore.useData;
export const setUser = userStore.setData;
