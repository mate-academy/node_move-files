/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

function moveFile(file, destination) {
  if (!file || !destination) {
    console.error('Both parameters are required');

    return;
  }

  if (file === destination) {
    return;
  }

  let destinationPath = path.resolve(destination);
  const fileName = path.basename(file);

  try {
    if (fs.existsSync(destinationPath)) {
      destinationPath = path.join(destinationPath, fileName);
    }

    fs.renameSync(file, destinationPath);
  } catch (err) {
    console.error(err);
  }
}

moveFile(process.argv[2], process.argv[3]);

module.exports = {
  moveFile,
};
