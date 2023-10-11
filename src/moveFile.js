'use strict';

/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');

function moveFile(sourcePath, destinationPath) {
  const fileName = path.basename(sourcePath);
  let targetFilePath = destinationPath;

  const isDirectory = destinationPath.endsWith('/');

  if (isDirectory) {
    targetFilePath = path.join(targetFilePath, fileName);
  }

  const destinationDir = path.dirname(targetFilePath);

  if (!fs.existsSync(destinationDir)) {
    console.error('Destination directory does not exist.');

    return;
  }

  try {
    fs.renameSync(sourcePath, targetFilePath);
    console.log('File moved or renamed successfully.');
  } catch (error) {
    console.error('We got an error:', error);
  }
}

module.exports = { moveFile };
