/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const source = process.argv[2];
const destination = process.argv[3];

try {
  if (!source || !destination) {
    throw new Error('Source and destination files must be provided.');
  }

  if (!fs.existsSync(source)) {
    throw new Error(`Source file does not exist.`);
  }

  if (
    destination.endsWith('/') ||
    (fs.existsSync(destination) && fs.statSync(destination).isDirectory())
  ) {
    const finalDestination = path.join(destination, path.basename(source));

    fs.renameSync(source, finalDestination);
  } else {
    fs.renameSync(source, destination);
  }
} catch (error) {
  console.error(error);
}
