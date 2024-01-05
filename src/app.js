'use strict';

/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');

const moveFile = (sourcePath, destinationPath) => {
  const sourceAbsolutePath = path.resolve(sourcePath);
  let destinationAbsolutePath = path.resolve(destinationPath);

  if (destinationAbsolutePath.endsWith('/')) {
    if (!fs.existsSync(destinationAbsolutePath)) {
      throw new Error(
        `Destination directory '${destinationAbsolutePath}' doesn't exist.`
      );
    }

    destinationAbsolutePath = path.join(
      destinationAbsolutePath,
      path.basename(sourceAbsolutePath)
    );
  }

  if (sourceAbsolutePath === destinationAbsolutePath) {
    console.log('Source and destination paths are the same');

    return;
  }

  try {
    fs.renameSync(sourceAbsolutePath, destinationAbsolutePath);

    console.log(
      `File '${sourceAbsolutePath}' moved to '${destinationAbsolutePath}'`
    );
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

moveFile(process.argv[2], process.argv[3]);
