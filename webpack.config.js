import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
// import {config} from '@matthis/webpack-node';
import {config} from './packages/webpack-node/index.js';

// export default config(dirname(fileURLToPath(import.meta.url)));
export default config({context: dirname(fileURLToPath(import.meta.url)), watch: false});
