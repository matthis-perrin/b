// import config from '@matthis/webpack-node';
// export default config;

import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {config} from './packages/webpack-node/index.js';

export default config(dirname(fileURLToPath(import.meta.url)));
