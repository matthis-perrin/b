import {Brand} from '@src/type_utils';

export type WorkspaceName = Brand<string, 'WorkspaceName'>;
export type ProjectName = Brand<string, 'ProjectName'>;

//
// Project type
//

export enum ProjectType {
  Web = 'web',
  LambdaFunction = 'lambda_function',
  LambdaApi = 'lambda_api',
  NodeScript = 'node_script',
  Shared = 'shared',
  SharedNode = 'shared-node',
}

export enum EslintType {
  Web = 'web',
  Node = 'node',
  Lib = 'lib',
}

export enum TsConfigType {
  Web = 'web',
  Node = 'node',
  Lib = 'lib',
}
export enum WebpackType {
  Web = 'web',
  Lib = 'lib', // shared
  Lambda = 'lambda',
  NodeScript = 'node-script',
}

export interface ProjectTypeMetadata {
  eslint: EslintType;
  tsconfig: TsConfigType;
  webpack?: WebpackType;
}

export const PROJECT_TYPE_TO_METADATA = {
  [ProjectType.Web]: {
    eslint: EslintType.Web,
    tsconfig: TsConfigType.Web,
    webpack: WebpackType.Web,
  },
  [ProjectType.LambdaFunction]: {
    eslint: EslintType.Node,
    tsconfig: TsConfigType.Node,
    webpack: WebpackType.Lambda,
  },
  [ProjectType.LambdaApi]: {
    eslint: EslintType.Node,
    tsconfig: TsConfigType.Node,
    webpack: WebpackType.Lambda,
  },
  [ProjectType.NodeScript]: {
    eslint: EslintType.Node,
    tsconfig: TsConfigType.Node,
    webpack: WebpackType.NodeScript,
  },
  [ProjectType.Shared]: {
    eslint: EslintType.Lib,
    tsconfig: TsConfigType.Lib,
    webpack: WebpackType.Lib,
  },
  [ProjectType.SharedNode]: {
    eslint: EslintType.Node,
    tsconfig: TsConfigType.Node,
    webpack: WebpackType.Lib,
  },
} satisfies Record<ProjectType, ProjectTypeMetadata>;

//
// Workspace Fragment type
//

export enum WorkspaceFragmentType {
  StaticWebsite = 'static-website',
  StandaloneLambda = 'standalone-lambda',
  WebApp = 'web-app',
  NodeScript = 'node-script',
  Shared = 'shared',
  SharedNode = 'shared-node',
}

interface WorkspaceFragmentBase {
  type: WorkspaceFragmentType;
}

export interface WorkspaceFragmentRegistry {
  [WorkspaceFragmentType.StaticWebsite]: {
    type: WorkspaceFragmentType.StaticWebsite;
    websiteName: ProjectName;
  };
  [WorkspaceFragmentType.StandaloneLambda]: {
    type: WorkspaceFragmentType.StandaloneLambda;
    lambdaName: ProjectName;
  };
  [WorkspaceFragmentType.WebApp]: {
    type: WorkspaceFragmentType.WebApp;
    websiteName: ProjectName;
    lambdaName: ProjectName;
  };
  [WorkspaceFragmentType.NodeScript]: {
    type: WorkspaceFragmentType.NodeScript;
    scriptName: ProjectName;
  };
  [WorkspaceFragmentType.Shared]: {
    type: WorkspaceFragmentType.Shared;
  };
  [WorkspaceFragmentType.SharedNode]: {
    type: WorkspaceFragmentType.SharedNode;
  };
}

type RegistryIsValid = WorkspaceFragmentRegistry extends Record<
  WorkspaceFragmentType,
  WorkspaceFragmentBase
>
  ? boolean
  : never;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function validateRegistry(): RegistryIsValid {
  return true;
}

export type WorkspaceFragment = WorkspaceFragmentRegistry[keyof WorkspaceFragmentRegistry];
