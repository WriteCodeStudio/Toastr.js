const sass = require('node-sass');
const path = require('path');
const fs = require('fs');
const packageImporter = require('node-sass-package-importer');

const options = {
  cdw: process.cwd(),
  packageKeys: [
    'css'
  ],
  packagePrefix: '~'
};

try {
  let result = sass.renderSync({
    file: path.join(__dirname, '/src/toastr.scss'),
    outputStyle: process.env.NODE_ENV === 'development' ? 'expanded' : 'compressed',
    importer: packageImporter(options)
  });

  fs.writeFileSync(
    path.join(__dirname, '/dist/css/toastr.min.css'),
    result.css.toString()
  );

  console.log('\x1b[35m', 'Style built');
} catch (err) {
  throw err;
}
