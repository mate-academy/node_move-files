/* eslint-disable no-console */
'use strict';

const fs = require('fs/promises');
const path = require('path');

async function moveFile(sourcePath, destinationPath) {
  try {
    const destinationIsDirectory = destinationPath.endsWith('/');

    const finalDestination = destinationIsDirectory
      ? path.join(destinationPath, path.basename(sourcePath))
      : destinationPath;

    const destinationDirectory = path.dirname(finalDestination);

    try {
      await fs.access(destinationDirectory);
    } catch (error) {
      throw new Error(
        `Destination directory '${destinationDirectory}' does not exist.`
      );
    }

    await fs.rename(sourcePath, finalDestination);

    console.log(`File moved from ${sourcePath} to ${finalDestination}`);
  } catch (error) {
    console.error('Error while moving file:', error.message);
  }
}

moveFile(process.argv[2], process.argv[3]);
