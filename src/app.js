/* eslint-disable no-console */
'use strict';

const { rename } = require('fs').promises;
const fs = require('fs');
const path = require('path');

function isDirectoryExists(pathToCheck) {
  try {
    return fs.statSync(pathToCheck).isDirectory();
  } catch (error) {
  }
}

async function moveFile(from, to) {
  try {
    let destinationPath = to;
    const fileName = path.basename(from);

    if (isDirectoryExists(to)) {
      destinationPath = path.join(to, fileName);
    }

    if (to.endsWith('/') && !isDirectoryExists(to)) {
      console.log('There is no such directory');
    }

    await rename(from, destinationPath);
  } catch (err) {
  }
}

module.exports = {
  moveFile,
};
