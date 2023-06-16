export type Brand<Type, Name> = Type & {__brand: Name};

export function neverHappens(value: never, msg?: string): never {
  throw new Error(msg ?? `Unexpected value ${value}`);
}

function notUndefined<T>(val: T | undefined): val is T {
  return val !== undefined;
}

export function removeUndefined<T>(arr: (T | undefined)[]): T[] {
  return arr.filter(notUndefined);
}
