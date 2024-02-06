import {createDataStore} from '@shared-web/lib/data_store';

const userStore = createDataStore({
  isConnected: 'IS_CONNECTED' in window && window['IS_CONNECTED'] === true,
});
export const useUser = userStore.useData;
export const setUser = userStore.setData;
