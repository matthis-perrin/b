export function generateBuildScript(): string {
  return `
import {resolve} from 'node:path';
import {runAllWebpacks} from '@matthis/webpack-runner';

runAllWebpacks(resolve('.')).catch(console.error);
`.trim();
}
