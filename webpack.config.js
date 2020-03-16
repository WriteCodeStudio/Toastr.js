const path = require('path');

module.exports = [
  {
    name: 'toastrjs',
    mode: process.env.NODE_ENV,
    entry: {
      toastr: './index.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'toastr.js',
      library: 'Toastr'
    }
  }
];
