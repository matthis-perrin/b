import webpack from 'webpack';

export async function compile(entry: string, dst: string): Promise<void> {
  const config: webpack.Configuration = {
    mode: 'none',
    target: 'node',
    entry,
    output: {
      path: dst,
      filename: 'index.js',
      library: {
        type: 'commonjs',
        export: 'default',
      },
      libraryTarget: 'umd',
    },
    module: {rules: [{test: /\.ts$/, loader: 'ts-loader'}]},
    resolve: {extensions: ['.ts', '.js']},
    externals: ({request}, callback) =>
      request?.startsWith('./') || request?.startsWith('../') || request === entry
        ? callback()
        : callback(undefined, 'commonjs ' + request),
  };

  return new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
      if (err) {
        reject(err);
      } else if (stats?.hasErrors()) {
        reject(new Error(stats?.toString({errorDetails: true})));
      } else {
        resolve();
      }
    });
  });
}
