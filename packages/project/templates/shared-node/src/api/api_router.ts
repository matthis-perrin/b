import {ALL} from '@shared/api/api';
import {HttpError} from '@shared/api/core/api_errors';
import {parseSchema} from '@shared/api/core/api_parser';
import {AllApiSchema} from '@shared/api/core/api_schema';
import {ApiContext, ApiName, FlatApi} from '@shared/api/core/api_types';

import {ApiRequest, ApiResponse} from '@shared-node/api/api_interface';

export async function handleApi<Name extends ApiName>(
  req: ApiRequest,
  apiName: Name,
  handlers: {
    [Endpoint in keyof FlatApi<Name>]: (
      req: FlatApi<Name>[Endpoint]['req'],
      context: ApiContext
    ) => FlatApi<Name>[Endpoint]['res'] | Promise<FlatApi<Name>[Endpoint]['res']>;
  }
): Promise<ApiResponse | undefined> {
  // Retrieve handler and request schema
  const {path, method, headers, body} = req;
  const schema = (ALL as AllApiSchema)[apiName as string]?.[path]?.[method];
  const handler = (handlers as Record<string, (req: unknown, context: ApiContext) => unknown>)[
    `${method} ${path}`
  ];
  if (!schema || !handler) {
    return undefined;
  }

  // Create Api context
  const extraHeaders: Record<string, string> = {};
  const context: ApiContext = {
    getRequestHeader: headerName => headers[headerName.toLowerCase()],
    setResponseHeader: (headerName, headerValue) => {
      extraHeaders[headerName] = headerValue;
    },
  };

  // Run the handler
  try {
    const handlerReq = parseSchema(body, schema.req);
    const handlerRes = await Promise.resolve(handler(handlerReq, context));
    return {body: JSON.stringify(handlerRes), opts: {extraHeaders}};
  } catch (err: unknown) {
    // Error handling
    if (err instanceof HttpError) {
      const {statusCode, userMessage, stack, extra} = err;
      console.log(statusCode, extra, stack);
      return {body: JSON.stringify({err: userMessage}), opts: {statusCode}};
    }
    console.error(err);
    return {body: JSON.stringify({err: 'internal error'}), opts: {statusCode: 500}};
  }
}
