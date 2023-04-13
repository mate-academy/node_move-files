/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

const moveFile = (sourcePath, destPath) => {
  const isDir = destPath.endsWith('/');

  if (isDir && !fs.existsSync(destPath)) {
    console.error(`Directory ${destPath} does not exist`);
  } else {
    const destFile = isDir
      ? path.join(destPath, path.basename(sourcePath))
      : destPath;

    fs.rename(sourcePath, destFile, (err) => {
      if (err) {
        console.error(err);

        return;
      }

      console.log('Successfully moved');
    });
  }
};

module.exports = { moveFile };
