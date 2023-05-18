/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

const moveFile = (filePath, destPath) => {
  const fileName = path.basename(filePath);
  const destDir = path.dirname(destPath);
  const isDestDir = destPath.endsWith('/');
  const newFilePath = isDestDir ? path.join(destPath, fileName) : destPath;

  if (!fs.existsSync(destDir)) {
    console.error('Destination directory does not exist');

    return;
  }

  fs.rename(filePath, newFilePath, error => {
    if (error) {
      console.error(`Error while moving file: ${error}`);
    } else {
      console.log(`Moved ${filePath} to ${newFilePath}`);
    }
  });
};

const [file, dest] = process.argv(2);

moveFile(file, dest);
