'use strict';
/* eslint-disable no-console */
/* eslint-disable max-len */

const fs = require('fs');
const path = require('path');

const sourcePath = process.argv[2];
const destinationFolder = process.argv[3];
const sourceFileName = path.basename(sourcePath);
const destinationFolderName = path.basename(destinationFolder);
const destinationPath = path.join(destinationFolder, sourceFileName);
const isDestinationExists = fs.existsSync(destinationFolder);

if (!isDestinationExists) {
  console.error('Destination folder does not exist');
}

try {
  fs.renameSync(sourcePath, destinationPath);
  console.log(`The file ${sourceFileName} has been moved to ${destinationFolderName} folder`);
} catch (error) {
  throw new Error('Failed to move file');
}
