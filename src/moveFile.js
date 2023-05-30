/* eslint-disable max-len */
/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

function moveFile(sourcePath, destinationPath) {
  const source = path.resolve(sourcePath);
  const destination = path.resolve(destinationPath);

  if (!fs.existsSync(source)) {
    console.log(`The file '${source}' does not exist.`);

    return;
  }

  if (!fs.existsSync(path.dirname(destination))) {
    console.log(`The destination directory '${path.dirname(destination)}' does not exist.`);

    return;
  }

  if (fs.existsSync(destination) && fs.lstatSync(destination).isDirectory()) {
    console.log(`Cannot overwrite a directory with a file. Please provide a different destination path.`);

    return;
  }

  try {
    fs.renameSync(source, destination);
    console.log(`File '${source}' moved to '${destination}'.`);
  } catch (err) {
    console.log(`An error occurred while moving the file: ${err}`);
  }
}

module.exports = { moveFile };
