
module.exports = {
  entry: {
    tier: './src/index.js'
  },
  output: {
    filename: '[name].js'
  },
  optimize: {
    minimize: false
  },
  module: {
    loaders: [
      { test: /\.html$/, loader: 'jhtmls?with' },
      { test: /\.less$/, loader: 'css!less!autoprefixer' }
    ]
  }
};