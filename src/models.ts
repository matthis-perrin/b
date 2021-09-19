export interface EslintMetadata {
  plugin: string[];
  dependencies: Record<string, string>;
  settings: Record<string, unknown>;
  allOff: Record<string, 'off'>;
  onlyOn: Record<string, 'warn' | ['warn', ...unknown[]]>;
}

export enum ProjectType {
  Web = 'web',
  Node = 'node',
  Lib = 'lib',
}

export const ALL_TYPES = [ProjectType.Web, ProjectType.Node, ProjectType.Lib];
