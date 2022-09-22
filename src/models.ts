import {Brand} from '@src/type_utils';

export type WorkspaceName = Brand<string, 'WorkspaceName'>;
export type ProjectName = Brand<string, 'ProjectName'>;

//
// Runtime types
//

export enum RuntimeType {
  Web = 'web',
  Node = 'node',
  Lib = 'lib',
  Lambda = 'lambda',
  ReactNative = 'react-native',
}

//
// Project type
//

export enum ProjectType {
  Web = 'web',
  LambdaFunction = 'lambda_function',
  LambdaApi = 'lambda_api',
  NodeLib = 'node_lib',
}

interface ProjectTypeMetadata {
  runtimeType: RuntimeType;
}

export const PROJECT_TYPE_TO_METADATA: Record<ProjectType, ProjectTypeMetadata> = {
  [ProjectType.Web]: {runtimeType: RuntimeType.Web},
  [ProjectType.LambdaFunction]: {runtimeType: RuntimeType.Lambda},
  [ProjectType.LambdaApi]: {runtimeType: RuntimeType.Lambda},
  [ProjectType.NodeLib]: {runtimeType: RuntimeType.Node},
};

export interface RuntimeTypeMetadata {
  eslint: RuntimeType;
  tsconfig: RuntimeType;
  webpack?: RuntimeType;
}

export const RUNTIME_TYPE_TO_METADATA: Record<RuntimeType, RuntimeTypeMetadata> = {
  [RuntimeType.Web]: {
    eslint: RuntimeType.Web,
    tsconfig: RuntimeType.Web,
    webpack: RuntimeType.Web,
  },
  [RuntimeType.Node]: {
    eslint: RuntimeType.Node,
    tsconfig: RuntimeType.Node,
    webpack: RuntimeType.Node,
  },
  [RuntimeType.Lib]: {
    eslint: RuntimeType.Lib,
    tsconfig: RuntimeType.Lib,
  },
  [RuntimeType.Lambda]: {
    eslint: RuntimeType.Node,
    tsconfig: RuntimeType.Node,
    webpack: RuntimeType.Lambda,
  },
  [RuntimeType.ReactNative]: {
    eslint: RuntimeType.ReactNative,
    tsconfig: RuntimeType.ReactNative,
  },
};

//
// Workspace Fragment type
//

export enum WorkspaceFragmentType {
  StaticWebsite = 'static-website',
  StandaloneLambda = 'standalone-lambda',
  WebApp = 'web-app',
  NodeLib = 'node-lib',
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
  [WorkspaceFragmentType.NodeLib]: {
    type: WorkspaceFragmentType.NodeLib;
    libName: ProjectName;
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
