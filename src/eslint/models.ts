export interface EslintMetadata {
  plugin?: {name: string; importName: string; module: string; requireFixup?: boolean};
  dependencies: Record<string, string>;
  settings: Record<string, unknown>;
  allOff: Record<string, 'off'>;
  onlyOn: Record<string, 'warn' | ['warn', ...unknown[]]>;
}
