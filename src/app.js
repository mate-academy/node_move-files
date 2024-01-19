'use strict';

const fs = require('fs');
const path = require('path');

async function moveFile(source, dest) {
  let destination = dest;

  if (!source || !destination) {
    throw new Error('Both source and destination paths are required.');
  }

  if (!fs.existsSync(source)) {
    throw new Error('Source file does not exist.');
  }

  const destinationDir = path.dirname(destination);

  // Check if destination is a directory
  if (fs.existsSync(destination) && fs.lstatSync(destination).isDirectory()) {
    destination = path.join(destination, path.basename(source));
  } else if (!fs.existsSync(destinationDir)) {
    // Check if the directory of the destination exists
    throw new Error('Destination directory does not exist.');
  }

  fs.renameSync(source, destination);
}

const args = process.argv.slice(2);

moveFile(args[0], args[1])
  // eslint-disable-next-line no-console
  .then(() => console.log('File moved successfully'))
  // eslint-disable-next-line no-console
  .catch(error => console.error('Error:', error.message));
