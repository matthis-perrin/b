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
}

interface ProjectTypeMetadata {
  runtimeType: RuntimeType;
}

export const PROJECT_TYPE_TO_METADATA: Record<ProjectType, ProjectTypeMetadata> = {
  [ProjectType.Web]: {runtimeType: RuntimeType.Web},
  [ProjectType.LambdaFunction]: {runtimeType: RuntimeType.Lambda},
  [ProjectType.LambdaApi]: {runtimeType: RuntimeType.Lambda},
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
}

interface WorkspaceFragmentBase {
  type: WorkspaceFragmentType;
}

export interface StaticWebsiteWorkspaceFragment extends WorkspaceFragmentBase {
  type: WorkspaceFragmentType.StaticWebsite;
  websiteName: ProjectName;
}

export interface StandaloneLambdaWorkspaceFragment extends WorkspaceFragmentBase {
  type: WorkspaceFragmentType.StandaloneLambda;
  lambdaName: ProjectName;
}

export interface WebAppWorkspaceFragment extends WorkspaceFragmentBase {
  type: WorkspaceFragmentType.WebApp;
  websiteName: ProjectName;
  lambdaName: ProjectName;
}

export type WorkspaceFragment =
  | StaticWebsiteWorkspaceFragment
  | StandaloneLambdaWorkspaceFragment
  | WebAppWorkspaceFragment;
