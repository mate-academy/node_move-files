'use strict';
// eslint-disable-next-line max-len

const fs = require('fs');
const path = require('path');

const sourcePath = process.argv[2];
const destinationFolder = process.argv[3];
const sourceFileName = path.basename(sourcePath);
const destinationFolderName = path.basename(destinationFolder);
const destinationPath = path.join(destinationFolder, sourceFileName);

fs.existsSync(destinationFolder, (err) => {
  if (err) {
    throw new Error('Destination folder does not exist');
  }
});

fs.rename(sourcePath, destinationPath, (err) => {
  if (err) {
    throw new Error('Failed to move file');
  } else {
    console.log(`The file ${sourceFileName} has been moved to ${destinationFolderName} folder`);
  }
});
