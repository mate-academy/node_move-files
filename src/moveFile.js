/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

function moveFile(sourcePath, destinationPath) {
  const destination = destinationPath.endsWith('/')
    ? path.join(destinationPath, path.basename(sourcePath)) : destinationPath;

  if (!fs.existsSync(path.dirname(destination))) {
    throw new Error('New destination dir does not exists.');
  }

  try {
    fs.renameSync(sourcePath, destination);
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { moveFile };
