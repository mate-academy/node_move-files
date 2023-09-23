/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

function moveFile(file, destinationPath) {
  if (file === destinationPath) {
    console.log('The destination paths are the same');

    return;
  }

  if (!fs.existsSync(file)) {
    throw new Error(`The file doesn't exists`);
  }

  if (!fs.existsSync(destinationPath)) {
    throw new Error(`The destination paths doesn't exist`);
  }

  if (destinationPath.endsWith('/')) {
    const pureFile = path.basename(file);
    const newDestinationPath = path.join(destinationPath, pureFile);

    fs.renameSync(file, newDestinationPath);
  } else {
    fs.renameSync(file, destinationPath);
  }
}

moveFile(process.argv[2], process.argv[3]);
