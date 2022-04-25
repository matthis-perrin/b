export type Brand<Type, Name> = Type & {__brand: Name};

export function neverHappens(value: never, typeName: string): never {
  throw new Error(`Invalid ${typeName} value "${value}"`);
}
