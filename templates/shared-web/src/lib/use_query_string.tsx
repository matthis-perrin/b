import {Dispatch, SetStateAction, useCallback, useEffect, useRef} from 'react';
import {useLocation, useSearch} from 'wouter';

import {asDate, asNumber, NumberBrand, StringBrand} from '@shared/lib/type_utils';

import {ReadOnlyRefObject} from '@shared-web/lib/react';
import {useStateRef} from '@shared-web/lib/use_state_ref';

type UseQueryStringReturnType<T> = [T, Dispatch<SetStateAction<T>>, ReadOnlyRefObject<T>];

export function useStringQueryString<T extends StringBrand | string = string>(
  key: string,
  initial: string
): UseQueryStringReturnType<T> {
  const serialize = useCallback((v: T) => v, []);
  const deserialize = useCallback((v: string) => v as T, []);
  return useGenericQueryString(key, initial as T, serialize, deserialize);
}
export function useOptionalStringQueryString<T extends StringBrand | string = string>(
  key: string,
  initial?: T | undefined
): UseQueryStringReturnType<T | undefined> {
  const serialize = useCallback((v: T) => v, []);
  const deserialize = useCallback((v: string) => v as T, []);
  return useGenericOptionalQueryString(key, initial, serialize, deserialize);
}

export function useNumberQueryString<T extends NumberBrand | number = number>(
  key: string,
  initial: number
): UseQueryStringReturnType<T> {
  const deserialize = useCallback((v: string) => asNumber<T>(v, initial), [initial]);
  return useGenericQueryString(key, initial as T, String, deserialize);
}
export function useOptionalNumberQueryString<T extends NumberBrand | number = number>(
  key: string,
  initial?: T | undefined
): UseQueryStringReturnType<T | undefined> {
  const deserialize = useCallback((v: string) => asNumber<T>(v, initial as T), [initial]);
  return useGenericOptionalQueryString(key, initial, String, deserialize);
}

export function useStringArrayQueryString<T extends StringBrand | string = string>(
  key: string,
  initial: string[]
): UseQueryStringReturnType<T[]> {
  const serialize = useCallback((arr: T[]) => arr.join(','), []);
  const deserialize = useCallback((v: string) => (v.length === 0 ? [] : v.split(',')) as T[], []);
  return useGenericQueryString(key, initial as T[], serialize, deserialize);
}

export function useDateQueryString(key: string, initial: Date): UseQueryStringReturnType<Date> {
  const serialize = useCallback((v: Date) => String(v.getTime()), []);
  const deserialize = useCallback((v: string) => asDate(v, initial), [initial]);
  return useGenericQueryString(key, initial, serialize, deserialize);
}

export function useBooleanQueryString(
  key: string,
  initial: boolean
): UseQueryStringReturnType<boolean> {
  const serialize = useCallback((v: boolean) => (v ? '1' : '0'), []);
  const deserialize = useCallback((v: string) => v.length > 0 && v !== '0', []);
  return useGenericQueryString(key, initial, serialize, deserialize);
}

export function useOptionalBooleanQueryString(
  key: string,
  initial?: boolean | undefined
): UseQueryStringReturnType<boolean | undefined> {
  const serialize = useCallback((v: boolean) => (v ? '1' : '0'), []);
  const deserialize = useCallback((v: string) => v.length > 0 && v !== '0', []);
  return useGenericOptionalQueryString(key, initial, serialize, deserialize);
}

////////////////

function useGenericQueryString<T>(
  key: string,
  initialValue: T,
  serializer: (val: T) => string,
  deserializer: (val: string) => T
): UseQueryStringReturnType<T> {
  return useGenericOptionalQueryString(
    key,
    initialValue,
    serializer,
    deserializer
  ) as UseQueryStringReturnType<T>;
}

function useGenericOptionalQueryString<T>(
  key: string,
  initialValue: T | undefined,
  serializer: (val: T) => string,
  deserializer: (val: string) => T
): UseQueryStringReturnType<T | undefined> {
  const search = useSearch();
  const [location, setLocation] = useLocation();
  const current = getQueryString(key);

  const initialValueRef = useRef(initialValue);
  useEffect(() => {
    initialValueRef.current = initialValue;
  }, [initialValue]);

  const [state, setState, stateRef] = useStateRef<T | undefined>(
    current === undefined ? initialValueRef.current : deserializer(current)
  );

  const setQueryString = useCallback(
    (key: string, value: string | undefined) => {
      const qs = new URLSearchParams(search);
      if (value === undefined) {
        qs.delete(key);
      } else {
        qs.set(key, value);
      }
      const qss = qs.toString();
      setLocation(location + (qss.length > 0 ? `?${qss}` : ''), {replace: true});
    },
    [location, search, setLocation]
  );

  // On the first call, check if the value for "key" is not defined.
  // If that's the case and we have a default value, we update the URL
  useEffect(() => {
    const current = getQueryString(key);
    if (current === undefined && initialValueRef.current !== undefined) {
      setQueryString(key, serializer(initialValueRef.current));
    }
  }, [key, serializer, setQueryString]);

  useEffect(() => {
    const current = getQueryString(key);
    const newVal = current === undefined ? initialValueRef.current : deserializer(current);
    setState(newVal);
  }, [deserializer, key, search, serializer, setQueryString, setState]);

  const setParam = useCallback(
    (setter: T | undefined | ((current: T | undefined) => T | undefined)) => {
      const stringVal = getQueryString(key);
      const newVal =
        typeof setter === 'function'
          ? (setter as (current: T | undefined) => T | undefined)(
              stringVal === undefined ? initialValueRef.current : deserializer(stringVal)
            )
          : setter;
      setQueryString(key, newVal === undefined ? undefined : serializer(newVal));
      setState(newVal);
    },
    [deserializer, key, serializer, setQueryString, setState]
  );

  return [state, setParam, stateRef];
}

function getQueryString(key: string): string | undefined {
  return new URLSearchParams(window.location.search).get(key) ?? undefined;
}
