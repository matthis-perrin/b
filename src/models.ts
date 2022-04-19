export enum ProjectType {
  Web = 'web',
  Node = 'node',
  Lib = 'lib',
  Lambda = 'lambda',
  ReactNative = 'react-native',
}

export const ALL_TYPES = [
  ProjectType.Web,
  ProjectType.Node,
  ProjectType.Lib,
  ProjectType.Lambda,
  ProjectType.ReactNative,
];

export enum WorkspaceType {
  StaticWebsite = 'static-website',
  StandaloneLambda = 'standalone-lambda',
  WebApp = 'web-app',
}
