/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

function moveFile(sourcePath, destinationPath) {
  fs.stat(destinationPath, (error, stats) => {
    if (error && error.code !== 'ENOENT') {
      return console.error('There no such file or directory');
    }

    const directionPath =
      stats && stats.isDirectory()
        ? path.join(destinationPath, path.basename(sourcePath))
        : destinationPath;

    fs.rename(sourcePath, directionPath, (renameError) => {
      if (renameError) {
        return console.error('Error: Failed to move file.', renameError);
      }

      console.log(`File moved successfully to ${directionPath}`);
    });
  });
}

const [sourceFile, destinationFile] = process.argv.slice(2);

if (!sourceFile || !destinationFile) {
  console.error('There must be 2 arguments');
} else {
  moveFile(sourceFile, destinationFile);
}
