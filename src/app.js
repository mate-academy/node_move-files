'use strict';

const fs = require('fs');
const path = require('path');

const moveFile = (src, dest) => {
  if (!src || !dest || src === dest) {
    return;
  }

  const srcPath = path.join(__dirname, src);
  let destPath = path.join(__dirname, dest);

  fs.stat(srcPath, (err, stats) => {
    if (err || !stats.isFile()) {
      throw new Error('Source is not file');
    }
  });

  fs.stat(destPath, (err, stats) => {
    if (err && err.code !== 'ENOENT') {
      throw new Error(err.message);
    }

    if (stats && (destPath[destPath.length - 1] === '/'
      || stats.isDirectory())) {
      const arr = srcPath.split('\\');

      destPath += `\\${arr[arr.length - 1]}`;
    }

    fs.rename(srcPath, destPath, (error) => {
      if (error) {
        throw new Error(error.message);
      }
    });
  });
};

moveFile(...process.argv.slice(2));
