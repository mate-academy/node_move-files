'use strict';

const fs = require('fs');
const path = require('path');

function writeError(message) {
  process.stderr.write(`${message}\n`);
}

function main() {
  const [source, destination] = process.argv.slice(2);

  if (!source || !destination) {
    writeError('Source and destination are required');

    return;
  }

  if (!fs.existsSync(source)) {
    writeError('Source file does not exist');

    return;
  }

  if (source === destination) {
    return;
  }

  let finalDestination = destination;

  if (destination.endsWith('/') || destination.endsWith('\\')) {
    if (!fs.existsSync(destination)) {
      writeError('Destination directory does not exist');

      return;
    }

    finalDestination = path.join(destination, path.basename(source));
  } else if (
    fs.existsSync(destination) &&
    fs.statSync(destination).isDirectory()
  ) {
    finalDestination = path.join(destination, path.basename(source));
  } else {
    const destinationDir = path.dirname(destination);

    if (destinationDir !== '.' && !fs.existsSync(destinationDir)) {
      writeError('Destination directory does not exist');

      return;
    }
  }

  fs.renameSync(source, finalDestination);
}

main();
