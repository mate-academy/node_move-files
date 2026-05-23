/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

function app() {
  const params = process.argv.slice(2);

  if (params.length !== 2) {
    throw new Error('Function works only with 2 parameters');
  } else if (!fs.existsSync(params[0])) {
    throw new Error('This file or destination does not exist');
  } else {
    const sourcePath = params[0];
    let destPath = params[1];

    if (destPath.endsWith('/')) {
      if (fs.existsSync(destPath) && fs.lstatSync(destPath).isDirectory()) {
        destPath = path.join(destPath, path.basename(sourcePath));
      } else {
        throw new Error('This file or destination does not exist');
      }
    } else if (
      fs.existsSync(destPath) &&
      fs.lstatSync(destPath).isDirectory()
    ) {
      destPath = path.join(destPath, path.basename(sourcePath));
    } else {
      const destDir = path.dirname(destPath);

      if (!fs.existsSync(destDir)) {
        throw new Error('This file or destination does not exist');
      }
    }

    if (path.resolve(sourcePath) !== path.resolve(destPath)) {
      fs.renameSync(sourcePath, destPath);
    }
  }
}

app();
