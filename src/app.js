/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

const [file, destination] = process.argv.slice(2);

function moveFile() {
  try {
    if (!file || !destination) {
      throw new Error('Both arguments are required');
    }

    if (file === destination) {
      console.log('Source and destination files are the same');

      return;
    }

    let destinationPath = path.resolve(destination);
    const fileName = path.basename(file);

    if (fs.existsSync(destinationPath)
      && fs.statSync(destinationPath).isDirectory()) {
      destinationPath = path.join(destinationPath, fileName);
    }

    fs.renameSync(file, destinationPath);
  } catch (error) {
    console.error(error);
  }
}

moveFile();

module.exports = { moveFile };
