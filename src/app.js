'use strict';

const fs = require('fs');
const path = require('path');

function moveFile() {
  const [source, destination] = process.argv.slice(2);

  if (process.argv.slice(2).length !== 2) {
    throw new Error('Provide both source and destination paths');
  }

  const sourcePath = path.resolve(source);
  const destinationPath = path.resolve(destination);

  if (!fs.existsSync(sourcePath) || !fs.statSync(sourcePath).isFile()) {
    throw new Error('Source file does not exist or is not a file');
  }

  const destinationLooksLikeDir =
    destination.endsWith('/') ||
    (fs.existsSync(destinationPath) &&
      fs.statSync(destinationPath).isDirectory());

  if (destinationLooksLikeDir) {
    if (!fs.existsSync(destinationPath)) {
      throw new Error('Destination directory does not exist');
    }

    const newFilePath = path.join(destinationPath, path.basename(sourcePath));

    fs.renameSync(sourcePath, newFilePath);
  } else {
    const destinationDir = path.dirname(destinationPath);

    if (!fs.existsSync(destinationDir)) {
      throw new Error(' Destination directory does not exist');
    }
    fs.renameSync(sourcePath, destinationPath);
  }

  return `File moved successfully: ${sourcePath} -> ${destinationPath}`;
}

moveFile();
