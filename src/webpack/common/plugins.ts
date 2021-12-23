import {join} from 'path';
import {getEnv, getProjectDir, isProd, WebpackConfigFragment} from './utils';

export function definePlugin(): WebpackConfigFragment {
  return {
    dependencies: {},
    config: () => {
      const {DefinePlugin} = require('webpack');
      return new DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(getEnv()),
      });
    },
  };
}

export function htmlPlugin(): WebpackConfigFragment {
  return {
    dependencies: {
      'html-webpack-plugin': '5.5.x',
    },
    config: () => {
      const HtmlWebpackPlugin = require('html-webpack-plugin');
      return new HtmlWebpackPlugin({
        template: join(getProjectDir(), 'src/index.html'),
        minify: isProd(),
      });
    },
  };
}

export function forkTsCheckerPlugin(): WebpackConfigFragment {
  return {
    dependencies: {
      'fork-ts-checker-webpack-plugin': '6.5.x',
    },
    config: () => {
      const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
      return new ForkTsCheckerWebpackPlugin({
        typescript: {
          diagnosticOptions: {
            semantic: true,
            syntactic: true,
          },
          mode: 'write-references',
          configFile: join(getProjectDir(), 'tsconfig.json'),
        },
        eslint: {
          enabled: true,
          files: [join(getProjectDir(), 'src/**/*.ts*')],
        },
      });
    },
  };
}

export function cleanTerminalPlugin(): WebpackConfigFragment {
  return {
    dependencies: {
      'clean-terminal-webpack-plugin': '3.0.x',
    },
    config: () => {
      const CleanTerminalPlugin = require('clean-terminal-webpack-plugin');
      return new CleanTerminalPlugin();
    },
  };
}

export function terserPlugin(): WebpackConfigFragment {
  return {
    dependencies: {
      'terser-webpack-plugin': '5.3.x',
    },
    config: () => {
      const TerserWebpackPlugin = require('terser-webpack-plugin');
      return new TerserWebpackPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      });
    },
  };
}
