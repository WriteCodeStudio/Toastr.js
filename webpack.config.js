const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
  {
    name: 'toastrjs',
    mode: process.env.NODE_ENV || 'development',
    entry: {
      toastr: './index.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'toastr.js',
      library: 'Toastr'
    }
  },
  {
    name: 'build-example',
    mode: 'development',
    entry: './example/import/app.js',
    output: {
      path: path.resolve(__dirname, 'example/import'),
      filename: 'app.example.js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './example/import/template.html'
      })
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            'style-loader',
            'css-loader'
          ]
        }
      ]
    }
  }
];
