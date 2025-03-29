/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

async function move(source, destination) {
  if (!fs.existsSync(source)) {
    console.error(`Error: Source file "${source}" does not exist.`);

    return;
  }

  if (!fs.existsSync(path.dirname(destination))) {
    console.error(
      `Error: Destination directory "${destination}" does not exist.`,
    );

    return;
  }

  let finalDestination = destination;

  if (fs.existsSync(destination) && fs.statSync(destination).isDirectory()) {
    finalDestination = path.join(destination, path.basename(source));
  }

  try {
    await fs.promises.rename(source, finalDestination);
  } catch (err) {
    console.error(`Error: Failed to move file. ${err.message}`);
  }
}

const sourceFile = process.argv[2];
const destinationFile = process.argv[3];

if (!sourceFile || !destinationFile) {
  console.error(`Please enter both source and destination file paths.`);
} else {
  move(sourceFile, destinationFile);
}
