import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {config} from '@matthis/webpack-node-script';
// import {config} from './packages/webpack-node-script/index.js';
import webpack from 'webpack';

const base = config({context: dirname(fileURLToPath(import.meta.url)), watch: false});
export default {
  ...base,
  plugins: base.plugins.filter(p => !(p instanceof webpack.DefinePlugin)),
  stats: 'warning-errors',
};
