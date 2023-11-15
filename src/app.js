'use strict';

/* eslint no-console: ["error", { allow: ["log"] }] */

const fs = require('fs');
const path = require('path');

const copy = () => {
  const args = process.argv.slice(2);
  const sourcePath = path.join(path.join(process.cwd()), args[0]);
  let destPath = path.join(path.join(process.cwd()), args[1]);

  const lastBackslachIndex = sourcePath.lastIndexOf('\\');

  const fileName = sourcePath.slice(lastBackslachIndex);

  if (args[1].lastIndexOf('/') === args[1].length - 1) {
    destPath = destPath + sourcePath.slice(lastBackslachIndex);
  }

  if (args[1].lastIndexOf('/') !== args[1].length - 1
    && !destPath.includes('.')) {
    const ext = sourcePath.slice(lastBackslachIndex).split('.')[1];

    if (!fs.existsSync(destPath)) {
      destPath = destPath + '.' + ext;
    }

    if (fs.existsSync(destPath)) {
      destPath = destPath + fileName;
    }
  }

  fs.rename(sourcePath, destPath, (err) => {
    if (err) {
      console.log(`
        Error Found:,
        ${err.message}
      `);
    } else {
      console.log(`
        Successfully moved ${fileName} to ${destPath}
      `);
    }
  });
};

copy();
