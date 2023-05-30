/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

const [file, dest] = process.argv.slice(2);

moveFile(file, dest);

function moveFile(filePath, destPath) {
  const sourcePath = path.resolve(filePath);
  const destinationPath = path.resolve(destPath);

  if (!fs.existsSync(sourcePath)) {
    throw new Error(`File '${filePath}' does not exist.`);
  }

  const isDirectory = destPath.endsWith('/');
  const destinationDirectoryExists = fs.existsSync(destinationPath)
    && fs.statSync(destinationPath).isDirectory();

  if (isDirectory && !destinationDirectoryExists) {
    throw new Error(`Destination directory '${destPath}' does not exist.`);
  }

  if (!isDirectory && fs.existsSync(destinationPath)) {
    throw Error(`Сannot be renamed, file or directory '${destPath}' exists.`);
  }

  const newFileNameOrDirectory = isDirectory
    ? path.join(path.basename(destinationPath), path.basename(sourcePath))
    : path.basename(destinationPath);

  const newDestinationPath = path.join(
    path.dirname(sourcePath),
    newFileNameOrDirectory,
  );

  fs.renameSync(sourcePath, newDestinationPath);

  process.stdout.write(`File '${filePath}' moved to '${newDestinationPath}'.`);
}

module.exports = moveFile;
