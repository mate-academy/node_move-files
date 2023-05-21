'use strict';

const fs = require('fs');
const path = require('path');

const sourcePath = process.argv[2];
const destinationPath = process.argv[3];

function moveFile(sourceFilePath, destinationFilePath) {
  const source = path.resolve(sourceFilePath);
  let destination = path.resolve(destinationFilePath);

  if (!fs.existsSync(source)) {
    throw new Error('Source path does not exist!');
  }

  if (!fs.statSync(source).isFile()) {
    throw new Error('Source is not a file!');
  }

  if (destinationFilePath.endsWith('/')) {
    if (!fs.existsSync(destination)) {
      throw new Error('Destination path already exists!');
    }

    destination = path.join(destination, path.basename(sourceFilePath));
  }

  try {
    fs.renameSync(source, destination);
  } catch (error) {
    throw new Error(error);
  }
}

moveFile(sourcePath, destinationPath);
