/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

function moveFile() {
  const moveArgs = process.argv.slice(2);

  if (moveArgs.length !== 2) {
    console.error('Script accepts 2 arguments: source and destination');

    return;
  }

  const [srcPath, destPath] = moveArgs;
  const srcFileName = path.basename(srcPath);

  if (!fs.existsSync(srcPath)) {
    console.error(`Source file "${srcPath}" does not exist`);

    return;
  }

  if (!fs.statSync(srcPath).isFile()) {
    console.error('Only file can be moved');

    return;
  }

  let destDir = path.dirname(destPath);
  let destFileName = path.basename(destPath);
  const lastCharOfDest = destPath.slice(-1);

  if (lastCharOfDest === '/' || lastCharOfDest === '\\') {
    destDir = destPath;
    destFileName = srcFileName;
  }

  if (fs.existsSync(destPath) && fs.statSync(destPath).isDirectory()) {
    destDir = destPath;
    destFileName = srcFileName;
  }

  if (!fs.existsSync(destDir) || !fs.statSync(destDir).isDirectory()) {
    console.error(
      `Destination directory ${destDir} does not exist or is not a directory`,
    );

    return;
  }

  const destPathChecked = path.join(destDir, destFileName);

  if (srcPath === destPathChecked) {
    return;
  }

  fs.renameSync(srcPath, destPathChecked);

  console.log('File moved');
}

moveFile();

module.exports = { moveFile };
