import {Brand} from './type_utils';

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

export const ALL_RUNTIME_TYPES = [
  RuntimeType.Web,
  RuntimeType.Node,
  RuntimeType.Lib,
  RuntimeType.Lambda,
  RuntimeType.ReactNative,
];

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
