var path = require('path');

module.exports = {
  entry: './app/assets/scripts/App.js',
  output: {
    path: path.join(__dirname, './app/temp/scripts'),
    filename: 'App.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}

