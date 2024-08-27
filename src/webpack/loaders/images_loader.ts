import {WebpackLoader} from '@src/webpack/models';

export function imagesLoader(): WebpackLoader {
  return {
    test: /\.(?:png|jpg|jpeg)$/iu,
    type: 'asset/resource',
  };
}
