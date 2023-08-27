import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {config} from '@matthis/webpack-web';
import {NZB_FRONTEND_CLOUDFRONT_DOMAIN_NAME} from '@shared/env';

export const getConfig = config;
export default getConfig({context: dirname(fileURLToPath(import.meta.url)), watch: false, publicPath: NZB_FRONTEND_CLOUDFRONT_DOMAIN_NAME});
