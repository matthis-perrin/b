import {Flatten} from '@shared/lib/type_utils';

interface SchemaBase {
  description?: string;
}

interface StringSchema extends SchemaBase {
  type: 'String';
  optional: false;
}
export function Str(): StringSchema {
  return {type: 'String', optional: false};
}

interface OptStringSchema extends SchemaBase {
  type: 'String';
  optional: true;
}
export function OptStr(): OptStringSchema {
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

export type Schema =
  | StringSchema
  | OptStringSchema
  | NumberSchema
  | OptNumberSchema
  | BooleanSchema
  | OptBooleanSchema
  | ArraySchema<Schema>
  | OptArraySchema<Schema>
  | ObjectSchema<Record<string, Schema>>
  | OptObjectSchema<Record<string, Schema>>;

export type SchemaToType<T extends Schema> = T extends StringSchema | OptStringSchema
  ? string
  : T extends NumberSchema | OptNumberSchema
  ? number
  : T extends BooleanSchema | OptBooleanSchema
  ? boolean
  : T extends ArraySchema<infer Item>
  ? SchemaToType<Item>[]
  : T extends OptArraySchema<infer Item>
  ? SchemaToType<Item>[]
  : T extends ObjectSchema<infer Properties> | OptObjectSchema<infer Properties>
  ? Flatten<
      Partial<{
        [Key in FilterKeysByOptional<Properties, true>]: SchemaToType<Properties[Key]>;
      }> & {
        [Key in FilterKeysByOptional<Properties, false>]: SchemaToType<Properties[Key]>;
      }
    >
  : never;

type FilterKeysByOptional<Properties extends Record<string, Schema>, Opt extends boolean> = {
  [Key in keyof Properties]: Properties[Key]['optional'] extends Opt ? Key : never;
}[keyof Properties];

export type AllApiSchema = Record<
  string,
  Record<string, Record<string, {req?: Schema; res?: Schema}>>
>;
