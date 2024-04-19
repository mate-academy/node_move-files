/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

function moveFiles() {
  const [srcPath, destPath] = process.argv.slice(2);

  if (!srcPath || !destPath) {
    console.error('Provide 2 correct arguments');

    return;
  }

  const absSrcPath = path.resolve(srcPath);
  let absDestPath = path.resolve(destPath);

  const isDir =
    fs.existsSync(absDestPath) && fs.statSync(absDestPath).isDirectory();

  try {
    if (isDir) {
      const basename = path.basename(absSrcPath);

      absDestPath = path.join(absDestPath, basename);
    }

    fs.renameSync(absSrcPath, absDestPath);
  } catch (err) {
    console.error(err);
  }
}

moveFiles();
