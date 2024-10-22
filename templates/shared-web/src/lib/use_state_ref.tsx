import {Dispatch, SetStateAction, useCallback, useRef, useState} from 'react';

import {ReadOnlyRefObject} from '@shared-web/lib/react';

function isFunction<S>(setStateAction: SetStateAction<S>): setStateAction is (prevState: S) => S {
  return typeof setStateAction === 'function';
}

type UseStateRef<T> = [T, Dispatch<SetStateAction<T>>, ReadOnlyRefObject<T>];

export function useStateRef<State>(): UseStateRef<State | undefined>;
export function useStateRef<Initial>(initialState: Initial | (() => Initial)): UseStateRef<Initial>;
export function useStateRef<Initial>(
  initialState?: Initial | (() => Initial)
): UseStateRef<Initial | undefined> {
  const [state, setState] = useState<Initial | undefined>(initialState);
  const ref = useRef(state);

  const dispatch = useCallback((setStateAction: SetStateAction<Initial | undefined>) => {
    ref.current = isFunction(setStateAction) ? setStateAction(ref.current) : setStateAction;
    setState(ref.current);
  }, []);

  return [state, dispatch, ref];
}
