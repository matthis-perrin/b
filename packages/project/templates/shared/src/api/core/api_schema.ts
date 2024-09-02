interface SchemaBase {
  description?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface StringSchema<T> extends SchemaBase {
  type: 'String';
  optional: false;
}
export function Str<T = string>(): StringSchema<T> {
  return {type: 'String', optional: false};
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface OptStringSchema<T> extends SchemaBase {
  type: 'String';
  optional: true;
}
export function OptStr<T = string>(): OptStringSchema<T> {
  return {type: 'String', optional: true};
}

interface NumberSchema extends SchemaBase {
  type: 'Number';
  optional: false;
}
export function Num(): NumberSchema {
  return {type: 'Number', optional: false};
}

interface OptNumberSchema extends SchemaBase {
  type: 'Number';
  optional: true;
}
export function OptNum(): OptNumberSchema {
  return {type: 'Number', optional: true};
}

interface BooleanSchema extends SchemaBase {
  type: 'Boolean';
  optional: false;
}
export function Bool(): BooleanSchema {
  return {type: 'Boolean', optional: false};
}

interface OptBooleanSchema extends SchemaBase {
  type: 'Boolean';
  optional: true;
}
export function OptBool(): OptBooleanSchema {
  return {type: 'Boolean', optional: true};
}

interface ObjectSchema<T extends Record<string, Schema>> extends SchemaBase {
  type: 'Object';
  properties: T;
  optional: false;
}
export function Obj<T extends Record<string, Schema>>(schema: T): ObjectSchema<T> {
  return {type: 'Object', properties: schema, optional: false};
}

interface OptObjectSchema<T extends Record<string, Schema>> extends SchemaBase {
  type: 'Object';
  properties: T;
  optional: true;
}
export function OptObj<T extends Record<string, Schema>>(schema: T): OptObjectSchema<T> {
  return {type: 'Object', properties: schema, optional: true};
}

interface ArraySchema<T extends Schema> extends SchemaBase {
  type: 'Array';
  items: T;
  optional: false;
}
export function Arr<T extends Schema>(schema: T): ArraySchema<T> {
  return {type: 'Array', items: schema, optional: false};
}

interface OptArraySchema<T extends Schema> extends SchemaBase {
  type: 'Array';
  items: T;
  optional: true;
}
export function OptArr<T extends Schema>(schema: T): OptArraySchema<T> {
  return {type: 'Array', items: schema, optional: true};
}

interface UnknownSchema extends SchemaBase {
  type: 'Unknown';
  optional: false;
}
export function Unknown(): UnknownSchema {
  return {type: 'Unknown', optional: false};
}

export type Schema =
  | UnknownSchema
  | StringSchema<string>
  | OptStringSchema<string>
  | NumberSchema
  | OptNumberSchema
  | BooleanSchema
  | OptBooleanSchema
  | ArraySchema<Schema>
  | OptArraySchema<Schema>
  | ObjectSchema<Record<string, Schema>>
  | OptObjectSchema<Record<string, Schema>>;

export type SchemaToType<T extends Schema> = T extends UnknownSchema
  ? unknown
  : T extends StringSchema<infer StringType>
    ? StringType
    : T extends OptStringSchema<infer StringType>
      ? StringType | undefined
      : T extends NumberSchema
        ? number
        : T extends OptNumberSchema
          ? number | undefined
          : T extends BooleanSchema
            ? boolean
            : T extends OptBooleanSchema
              ? boolean | undefined
              : T extends ArraySchema<infer Item>
                ? SchemaToType<Item>[]
                : T extends OptArraySchema<infer Item>
                  ? SchemaToType<Item>[] | undefined
                  : T extends ObjectSchema<infer Properties>
                    ? {
                        [Key in keyof Properties]: SchemaToType<Properties[Key]>;
                      }
                    : T extends OptObjectSchema<infer Properties>
                      ?
                          | {
                              [Key in keyof Properties]: SchemaToType<Properties[Key]>;
                            }
                          | undefined
                      : undefined;

export type AllApiSchema = Record<
  string,
  Record<string, Record<string, {req?: Schema; res?: Schema; raw?: boolean}>>
>;

export function Opt<T extends Schema>(schema: T): ToOptional<T> {
  return {...schema, optional: true} as unknown as ToOptional<T>;
}

type ToOptional<T extends Schema> =
  T extends StringSchema<infer StringType>
    ? OptStringSchema<StringType>
    : T extends NumberSchema
      ? OptNumberSchema
      : T extends BooleanSchema
        ? OptBooleanSchema
        : T extends ArraySchema<infer Item>
          ? OptArraySchema<Item>
          : T extends ObjectSchema<infer Properties>
            ? OptObjectSchema<Properties>
            : never;
