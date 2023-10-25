'use strict';

const fs = require('fs');
const path = require('path');

function moveFile(sourcePath, destinationPath) {
  if (!fs.existsSync(sourcePath)) {
    // eslint-disable-next-line
    console.error(`Source file '${sourcePath}' does not exist.`);

    return;
  }

  let finalDestinationPath = destinationPath;

  const isDestinationDirectory = fs.lstatSync(destinationPath).isDirectory();

  if (isDestinationDirectory) {
    const sourceFileName = path.basename(sourcePath);

    finalDestinationPath = path.join(destinationPath, sourceFileName);
  }

  const destinationDir = path.dirname(finalDestinationPath);

  if (!fs.existsSync(destinationDir)) {
    // eslint-disable-next-line
    console.error(`Destination directory '${destinationDir}' does not exist.`);

    return;
  }

  fs.rename(sourcePath, finalDestinationPath, (err) => {
    if (err) {
      // eslint-disable-next-line
      console.error(`Error moving '${sourcePath}' to
      '${finalDestinationPath}': ${err.message}`);
    } else {
      // eslint-disable-next-line
      console.log(`Moved '${sourcePath}' to '${finalDestinationPath}'.`);
    }
  });
}

const sourceFilePath = process.argv[2];
const destinationFilePath = process.argv[3];

if (!sourceFilePath || !destinationFilePath) {
  // eslint-disable-next-line
  console.error('Usage: node index.js sourcePath destinationPath');
} else {
  moveFile(sourceFilePath, destinationFilePath);
}
