import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {config} from '@matthis/webpack-node-script';
// import {config} from './packages/webpack-node-script/index.js';
import webpack from 'webpack';

const base = config({context: dirname(fileURLToPath(import.meta.url)), watch: false});
export default {
  ...base,
  plugins: [
    ...base.plugins.filter(p => !(p instanceof webpack.DefinePlugin)),
    new (class CleanTerminalPlugin {
      apply(compiler) {
        compiler.hooks.beforeCompile.tap('CleanTerminalPlugin', () => {
          if (compiler.watchMode) {
            process.stdout.write('\u001B[2J\u001B[3J\u001B[H');
          }
        });
      }
    })(),
  ],
  stats: 'warning-errors',
};
