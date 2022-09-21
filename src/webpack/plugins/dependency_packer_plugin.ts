import {DependencyPackerPlugin} from 'dependency-packer-webpack-plugin';

import {WebpackPlugin} from '../models';

export function dependencyPackerPlugin(): WebpackPlugin {
  return new DependencyPackerPlugin({packageManager: 'yarn'});
}
