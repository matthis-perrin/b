import {useEffect, useState} from 'react';

import {asJsonString} from '@shared/lib/type_utils';

export interface DataStoreOptions {
  persist?: {
    key: string;
  };
}

export interface DataStoreApi<GetData, SetData> {
  getData: () => GetData;
  setData: (data: SetData) => void;
  updateData: (fn: (current: GetData) => SetData) => void;
  useData: () => GetData;
}

export function createDataStore<T>(
  initialValue?: undefined,
  opts?: DataStoreOptions
): DataStoreApi<T | undefined, T>;
export function createDataStore<T>(initialValue: T, opts?: DataStoreOptions): DataStoreApi<T, T>;
export function createDataStore<T>(
  initialValue?: T,
  opts?: DataStoreOptions
): DataStoreApi<T | undefined, T> {
  const {persist} = opts ?? {};
  let currentData =
    initialValue ??
    (persist ? (asJsonString(localStorage.getItem(persist.key)) as T | undefined) : undefined);
  const storeListeners: ((dataStore: T | undefined) => void)[] = [];

  function getData(): T | undefined {
    return currentData;
  }

  function setData(data: T | undefined): void {
    currentData = data;
    if (persist) {
      if (data === undefined) {
        localStorage.removeItem(persist.key);
      } else {
        localStorage.setItem(persist.key, JSON.stringify(data));
      }
    }
    for (const listener of storeListeners) {
      listener(currentData);
    }
  }

  function updateData(fn: (current: T | undefined) => T): void {
    setData(fn(currentData));
  }

  function useData(): T | undefined {
    const [internalData, setInternalData] = useState(currentData);
    useEffect(() => {
      // In case the rev of the data store changed between the time we did the `useState`
      // and the time of the `useEffect` we need to refresh manually the state.
      if (internalData !== currentData) {
        setInternalData(currentData);
      }
      // Register the state setter to be called for any subsequent data store change
      storeListeners.push(setInternalData);
      return () => {
        storeListeners.splice(storeListeners.indexOf(setInternalData), 1);
      };
    }, []); /* eslint-disable-line react-hooks/exhaustive-deps */
    return internalData;
  }

  return {getData, setData, updateData, useData};
}
