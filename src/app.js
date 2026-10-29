'use strict';

const fs = require('fs');
const path = require('path');

function app(source, destination) {
  if (!source || !destination) {
    throw new Error('Source and destination are required');
  }

  if (!fs.existsSync(source)) {
    throw new Error('Source does not exist');
  }

  if (!fs.statSync(source).isFile()) {
    throw new Error('Source must be a file');
  }

  let newPath = destination;

  if (destination.endsWith('/')) {
    if (!fs.existsSync(destination)) {
      throw new Error('Destination directory does not exist');
    }

    newPath = path.join(destination, path.basename(source));
  } else if (
    fs.existsSync(destination) &&
    fs.statSync(destination).isDirectory()
  ) {
    newPath = path.join(destination, path.basename(source));
  } else {
    const parentDirectory = path.dirname(destination);

    if (!fs.existsSync(parentDirectory)) {
      throw new Error('Destination directory does not exist');
    }
  }

  fs.renameSync(source, newPath);
}

if (require.main === module) {
  const [source, destination] = process.argv.slice(2);

  try {
    app(source, destination);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error: ${error.message}`);
  }
}

module.exports = { app };
