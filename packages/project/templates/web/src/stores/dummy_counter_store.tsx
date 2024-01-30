import {createDataStore} from '@shared-web/lib/data_store';

const dummyCounterStore = createDataStore(0);
export const useDummyCounter = dummyCounterStore.useData;
export const updateDummyCounter = dummyCounterStore.updateData;
export const setDummyCounter = dummyCounterStore.setData;
export const getDummyCounter = dummyCounterStore.getData;
