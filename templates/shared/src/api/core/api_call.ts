import {ALL, API_CONFIGS} from '@shared/api/api';
import {parseSchema} from '@shared/api/core/api_parser';
import {AllApiSchema} from '@shared/api/core/api_schema';
import {ApiName, ApiRes, FlatApi} from '@shared/api/core/api_types';
import {asJson, asString} from '@shared/lib/type_utils';

interface RequestInit {
  method?: string;
  body?: string;
  headers?: Record<string, string>;
}
interface Response {
  text: () => Promise<string>;
  status: number;
}
type Fetcher = (input: string, init?: RequestInit) => Promise<Response>;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
export function apiCaller<Name extends ApiName>(
  api: Name,
  fetcher: Fetcher,
  logger: (msg: string, info?: unknown, err?: unknown) => void,
  opts?: {schemaValidation: boolean; onHttpError?: (statusCode: number) => void}
) {
  const {schemaValidation = true, onHttpError} = opts ?? {};
  const {host} = API_CONFIGS[api];
  const sanitizedHost = host.endsWith('/') ? host.slice(0, -1) : host;
  const apiSchemas = (ALL as AllApiSchema)[api as string];

  async function apiCall<Endpoint extends keyof FlatApi<Name>>(
    endpoint: Endpoint,
    req: FlatApi<Name>[Endpoint]['req']
  ): Promise<ApiRes<Name, Endpoint>> {
    const [method = 'GET', path = ''] = endpoint.split(' ', 2);

    const schema = apiSchemas?.[path]?.[method];
    if (!schema) {
      throw new Error(`No schema for endpoint ${String(endpoint)}`);
    }

    const sanitizedPath = path.startsWith('/') ? path : `/${path}`;

    const body = method === 'GET' ? undefined : JSON.stringify(req);

    let url = `${sanitizedHost}${sanitizedPath}`;
    if (method === 'GET') {
      const urlParams = Object.entries(req)
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
        .join('&');
      if (urlParams.length > 0) {
        url += `?${urlParams}`;
      }
    }

    const res = await fetcher(url, {
      method,
      body,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const resText = await res.text();
    const debugInfo = {api, method, path, res: resText};
    // ERROR
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (res.status >= 400) {
      onHttpError?.(res.status);
      const resErr = asString(asJson(resText, {})['err']);
      if (resErr === undefined) {
        logger(`Invalid API response, no err field in response`, debugInfo);
        throw new Error('Unexpected error');
      }
      throw new Error(resErr);
    }
    // SUCCESS
    else {
      const resJson = asJson(resText);
      if (resJson === undefined) {
        logger(`Invalid API response, not a json`, debugInfo);
        throw new Error('Unexpected error');
      }
      try {
        return (schemaValidation ? parseSchema(resJson, schema.res) : resJson) as ApiRes<
          Name,
          Endpoint
        >;
      } catch (err: unknown) {
        logger(`Invalid API response, schema not respected`, debugInfo, err);
        throw new Error('Unexpected error');
      }
    }
  }
  return apiCall;
}
