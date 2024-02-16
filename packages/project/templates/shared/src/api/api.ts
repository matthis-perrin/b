import {AllApiSchema, Obj, OptStr, SchemaToType, Str} from '@shared/api/core/api_schema';
import {ApiConfig, ApiName} from '@shared/api/core/api_types';
import {__BACKEND_NAME_UPPERCASE___URL} from '@shared/env';
import {UserId} from '@shared/models';

const FrontendUserSchema = Obj({
  id: Str<UserId>(),
});
export type FrontendUser = SchemaToType<typeof FrontendUserSchema>;

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
        res: FrontendUserSchema,
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
    host: __BACKEND_NAME_UPPERCASE___URL,
  },
} satisfies Record<ApiName, ApiConfig>;
