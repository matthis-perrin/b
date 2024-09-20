import {useEffect, useMemo, useRef} from 'react';

import {ReadOnlyRefObject} from '@shared-web/lib/react';

export function useMemoRef<T>(fn: () => T, deps: unknown[]): [T, ReadOnlyRefObject<T>] {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const val = useMemo(fn, deps);
  const ref = useRef<T>(val);
  useEffect(() => {
    ref.current = val;
  }, [val]);
  return [val, ref];
}
