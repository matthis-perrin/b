export interface EslintMetadata {
  plugin: string[];
  dependencies: Record<string, string>;
  settings: Record<string, unknown>;
  allOff: Record<string, 'off'>;
  onlyOn: Record<string, 'warn' | ['warn', ...unknown[]]>;
}
