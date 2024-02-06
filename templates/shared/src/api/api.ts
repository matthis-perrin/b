import {AllApiSchema, Obj, OptStr, SchemaToType, Str} from '@shared/api/core/api_schema';
import {ApiConfig, ApiName} from '@shared/api/core/api_types';
import {__BACKEND_NAME_UPPERCASE___FUNCTION_URL} from '@shared/env';

const TestSchema = Obj({
  val1: Str(),
  val2: OptStr(),
});

export type Test = SchemaToType<typeof TestSchema>;

export const ALL = {
  __BACKEND_NAME__: {
    '/login': {
      POST: {
        req: Obj({id: Str(), password: Str()}),
        res: Obj({}),
      },
    },
    '/test': {
      GET: {
        req: Obj({val: Str()}),
        res: TestSchema,
      },
    },
  },
} satisfies AllApiSchema;

export const API_CONFIGS = {
  __BACKEND_NAME__: {
    host: __BACKEND_NAME_UPPERCASE___FUNCTION_URL,
  },
} satisfies Record<ApiName, ApiConfig>;
