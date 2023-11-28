/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

function moveFile(sourcePathOfFile, destinationPathOfFile) {
  if (!fs.existsSync(sourcePathOfFile)) {
    console.error(`Error: Source file "${sourcePathOfFile}" does not exist.`);

    return;
  }

  const isDirectory = fs.statSync(destinationPathOfFile).isDirectory();

  const newDestinationPath = isDirectory
    ? path.join(destinationPathOfFile, path.basename(sourcePathOfFile))
    : destinationPathOfFile;

  if (isDirectory && !fs.existsSync(destinationPathOfFile)) {
    console.error(
      `Error: Destination directory "${destinationPathOfFile}" does not exist.`
    );

    return;
  }

  fs.renameSync(sourcePathOfFile, newDestinationPath);

  console.log(
    `File "${path.basename(sourcePathOfFile)}" moved to "${newDestinationPath}"`
  );
}

const [, , sourcePath, destinationPath] = process.argv;

if (!sourcePath || !destinationPath) {
  console.error('Error: Please provide both source and destination paths.');
} else {
  moveFile(sourcePath, destinationPath);
}
