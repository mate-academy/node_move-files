/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
'use strict';

const fs = require('fs');
const path = require('path');

function showError(message) {
  process.stderr.write(`${message}\n`);
}

function moveFile(source, destination) {
  if (!fs.existsSync(source)) {
    showError('Source file does not exist');

    return;
  }

  if (!fs.statSync(source).isFile()) {
    showError('Source must be a file');

    return;
  }

  const sourcePath = path.resolve(source);
  const destinationPath = path.resolve(destination);

  if (sourcePath === destinationPath) {
    return;
  }

  const destinationEndsWithSlash =
    destination.endsWith('/') || destination.endsWith('\\');

  if (fs.existsSync(destination)) {
    if (fs.statSync(destination).isDirectory()) {
      const newPath = path.join(destination, path.basename(source));

      fs.renameSync(source, newPath);

      return;
    }

    showError('Destination file already exists');

    return;
  }

  if (destinationEndsWithSlash) {
    showError('Destination directory does not exist');

    return;
  }

  const parentDirectory = path.dirname(destination);

  if (!fs.existsSync(parentDirectory)) {
    showError('Destination directory does not exist');

    return;
  }

  fs.renameSync(source, destination);
}

const args = process.argv.slice(2);

if (args.length !== 2) {
  showError('Expected source and destination');
} else {
  const [sourcePath, destinationPath] = args;

  moveFile(sourcePath, destinationPath);
}
