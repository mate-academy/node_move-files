/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

function moveFile(sourcePath, destinationPath) {
  const sourceName = path.basename(sourcePath);
  const destinationDirName = path.dirname(destinationPath);
  const isDirectory = destinationDirName.endsWith('/');

  const newFilePath = isDirectory
    ? path.join(destinationPath, sourceName)
    : destinationPath;

  if (!fs.existsSync(destinationDirName)) {
    throw new Error('Destination directory does not exist');
  }

  fs.rename(sourcePath, destinationPath, error => {
    if (error) {
      throw new Error(`Error while moving file: ${error}`);
    }

    console.log(`Moved ${sourcePath} to ${newFilePath}`);
  });
}

const [, , source, destination] = process.argv;

moveFile(source, destination);
