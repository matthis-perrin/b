export function generateBuildScript(): string {
  return `
import {resolve} from 'node:path';
import {runAllWebpacks} from '@matthis/webpack-runner';

runAllWebpacks({root: resolve('.'), watch: false}).catch(console.error);
`.trim();
}
