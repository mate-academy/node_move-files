/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

const customMoveFile = (sourceFile, destinationFile) => {
  if (destinationFile === undefined) {
    console.error('should be 2 params');

    return;
  }

  try {
    let moveTo = destinationFile;

    if (fs.existsSync(destinationFile)
      && fs.statSync(destinationFile).isDirectory()) {
      moveTo = path.join(moveTo, path.basename(sourceFile));
    }

    fs.renameSync(sourceFile, moveTo);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  customMoveFile,
};
