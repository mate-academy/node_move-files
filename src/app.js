'use strict';

const path = require('path');
const fs = require('fs');
const fsp = fs.promises;

(async () => {
  try {
    const sourceFilePath = process.argv[2];
    const destinationFilePath = process.argv[3];

    if (process.argv.length !== 4) {
      throw new Error(
        'Usage: node index <sourceFilePath> <destinationFilePath>',
      );
    }

    if (sourceFilePath === destinationFilePath) {
      return;
    }

    if (!fs.existsSync(sourceFilePath)) {
      throw new Error('Source file does not exist');
    }

    if (fs.statSync(sourceFilePath).isDirectory()) {
      throw new Error('Source is a directory');
    }

    let finalPath = destinationFilePath;

    if (destinationFilePath.endsWith(path.sep)) {
      if (
        !fs.existsSync(destinationFilePath) ||
        !fs.statSync(destinationFilePath).isDirectory()
      ) {
        throw new Error('Destination directory does not exist');
      }

      finalPath = path.join(destinationFilePath, path.basename(sourceFilePath));
    } else if (
      fs.existsSync(destinationFilePath) &&
      fs.statSync(destinationFilePath).isDirectory()
    ) {
      finalPath = path.join(destinationFilePath, path.basename(sourceFilePath));
    } else {
      const parentDir = path.dirname(destinationFilePath);

      if (!fs.existsSync(parentDir)) {
        throw new Error('Destination directory does not exist');
      }
    }

    await fsp.rename(sourceFilePath, finalPath);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error.message);
  }
})();
