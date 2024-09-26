/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

function moveFile(sourcePath, destinationPath) {
  const sourceAbsolutePath = path.resolve(sourcePath);
  let destinationAbsolutePath = path.resolve(destinationPath);

  if (destinationAbsolutePath.endsWith('/')) {
    if (!fs.existsSync(destinationAbsolutePath)) {
      throw new Error(
        `Destination directory "${destinationAbsolutePath}" does not exist.`
      );
    }

    destinationAbsolutePath = path.join(
      destinationAbsolutePath,
      path.basename(sourceAbsolutePath)
    );
  }

  if (sourceAbsolutePath === destinationAbsolutePath) {
    console.log('Source and destination are the same.');

    return;
  }

  try {
    fs.renameSync(sourceAbsolutePath, destinationAbsolutePath);

    console.log(
      `File "${sourceAbsolutePath}" moved to "${destinationAbsolutePath}"`
    );
  } catch (error) {
    console.error(`Error moving file: ${error.message}`);
  }
}

const sourceFile = process.argv[2];
const destinationFile = process.argv[3];

moveFile(sourceFile, destinationFile);
