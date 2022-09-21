export type Brand<Type, Name> = Type & {__brand: Name};

export function neverHappens(value: never, msg: string): never {
  throw new Error(msg);
}
