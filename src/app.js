'use strict';

const path = require('path');
const fs = require('fs');
const fsp = fs.promises;

(async () => {
  const sourceFilePath = process.argv[2];
  const destinationFilePath = process.argv[3];

  if (process.argv.length !== 4) {
    // eslint-disable-next-line no-console
    console.error('Usage: node app.js <sourceFilePath> <destinationFilePath>');

    return;
  }

  if (sourceFilePath === destinationFilePath) {
    return;
  }

  if (!fs.existsSync(sourceFilePath)) {
    // eslint-disable-next-line no-console
    console.error('Source file does not exist');

    return;
  }

  if (fs.statSync(sourceFilePath).isDirectory()) {
    // eslint-disable-next-line no-console
    console.error('Source is a directory');

    return;
  }

  let finalPath = destinationFilePath;

  if (destinationFilePath.endsWith(path.sep)) {
    if (
      !fs.existsSync(destinationFilePath) ||
      !fs.statSync(destinationFilePath).isDirectory()
    ) {
      // eslint-disable-next-line no-console
      console.error('Destination directory does not exist');

      return;
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
      // eslint-disable-next-line no-console
      console.error('Destination directory does not exist');

      return;
    }
  }

  try {
    await fsp.rename(sourceFilePath, finalPath);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error moving file:', error.message);
  }
})();
