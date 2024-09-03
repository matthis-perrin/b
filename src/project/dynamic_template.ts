import {
  filterFragments,
  WorkspaceFragment,
  WorkspaceFragmentRegistry,
  WorkspaceFragmentType,
} from '@src/models';
import {hasApi} from '@src/project/generate_workspace';
import {pascalCase} from '@src/string_utils';

interface TemplateFile {
  path: string;
  content: string;
}

export function generateSharedFiles(allFragments: WorkspaceFragment[]): TemplateFile[] {
  const webApps = filterFragments(allFragments, WorkspaceFragmentType.WebApp);
  const apiLambdas = filterFragments(allFragments, WorkspaceFragmentType.ApiLambda);
  const webAppsWithAuth = webApps.filter(app => app.authentication.enabled);
  return [
    ...(hasApi(allFragments) ? [generateSharedApiFile({webApps, apiLambdas})] : []),
    ...webApps.map(webApp => {
      const userType = `${pascalCase(webApp.appName)}User`;
      return {
        path: `shared/src/api/${webApp.appName}_api.ts`,
        content: webApp.authentication.enabled
          ? `
import {Obj, SchemaToType, Str} from '@shared/api/core/api_schema';
import {${userType}Id} from '@shared/models';

const Frontend${userType}Schema = Obj({
    id: Str<${userType}Id>(),
});
export type Frontend${userType} = SchemaToType<typeof Frontend${userType}Schema>;

export const ${webApp.appName.toUpperCase()}_API = {
    '/login': {
        POST: {
            req: Obj({id: Str(), password: Str()}),
            res: Frontend${userType}Schema,
        },
    },
    '/test': {
        POST: {
            req: Obj({query: Str()}),
            res: Obj({data: Str()}),
        },
    },
};
      `
          : `
import {Obj, Str} from '@shared/api/core/api_schema';

export const ${webApp.appName.toUpperCase()}_API = {
    '/test': {
        POST: {
            req: Obj({query: Str()}),
            res: Obj({data: Str()}),
        },
    },
};
          `,
      };
    }),
    ...apiLambdas.map(apiLambda => ({
      path: `shared/src/api/${apiLambda.apiName}.ts`,
      content: `
  import {Unknown} from '@shared/api/core/api_schema';
  
  export const ${apiLambda.apiName.toUpperCase()} = {
      '/test': {
          GET: {
              req: Unknown(),
              res: Unknown(),
          },
      },
  };
        `,
    })),
    ...(webAppsWithAuth.length === 0 ? [] : [generateSharedModelFile(webAppsWithAuth)]),
  ];
}

function generateSharedApiFile(opts: {
  webApps: WorkspaceFragmentRegistry['web-app'][];
  apiLambdas: WorkspaceFragmentRegistry['api-lambda'][];
}): TemplateFile {
  const {webApps, apiLambdas} = opts;

  // IMPORTS
  const imports = [
    ...webApps.map(
      webApp =>
        `import {${webApp.appName.toUpperCase()}_API} from '@shared/api/${webApp.appName}_api';`
    ),
    ...apiLambdas.map(
      apiLambda =>
        `import {${apiLambda.apiName.toUpperCase()}} from '@shared/api/${apiLambda.apiName}';`
    ),
    `import {AllApiSchema} from '@shared/api/core/api_schema';`,
    `import {ApiConfig, ApiName} from '@shared/api/core/api_types';`,
    `import {${[
      ...webApps.map(webApp => `${webApp.appName.toUpperCase()}_BACKEND_URL`),
      ...apiLambdas.map(apiLambda => `${apiLambda.apiName.toUpperCase()}_URL`),
    ].join(', ')}} from '@shared/env';`,
  ].join('\n');

  // APIs DEF
  const apisDef = `
    export const ALL = {
      ${[
        ...webApps.map(webApp => `${webApp.appName}_backend: ${webApp.appName.toUpperCase()}_API,`),
        ...apiLambdas.map(apiLambda => `${apiLambda.apiName}: ${apiLambda.apiName.toUpperCase()},`),
      ].join('\n')}
    } satisfies AllApiSchema;
  `.trim();

  // APIs CONFIG
  const apisConfig = `
    export const API_CONFIGS = {
      ${[
        ...webApps.map(
          webApp =>
            `${webApp.appName}_backend: {host: ${webApp.appName.toUpperCase()}_BACKEND_URL},`
        ),
        ...apiLambdas.map(
          apiLambda => `${apiLambda.apiName}: {host: ${apiLambda.apiName.toUpperCase()}_URL},`
        ),
      ].join('\n')}
    } satisfies Record<ApiName, ApiConfig>;
  `.trim();

  return {
    path: 'shared/src/api/api.ts',
    content: [imports, apisDef, apisConfig].join('\n\n'),
  };
}

function generateSharedModelFile(
  webAppsWithAuth: WorkspaceFragmentRegistry['web-app'][]
): TemplateFile {
  return {
    path: 'shared/src/models.ts',
    content: `
import {Brand} from '@shared/lib/type_utils';

${webAppsWithAuth
  .map(webApp => {
    const userType = `${pascalCase(webApp.appName)}User`;
    return `
export type ${userType}Id = Brand<'${userType}Id', string>;

export interface ${userType}Item {
id: ${userType}Id;
hash: string;
salt: string;
sessionDuration: number; // in seconds
}
`.trim();
  })
  .join('\n\n')}
`,
  };
}
