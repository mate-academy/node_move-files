'use strict';

const fs = require('fs');
const path = require('path');

function isExistingDirectory(targetPath) {
  return fs.existsSync(targetPath) && fs.statSync(targetPath).isDirectory();
}

function resolveDestination(sourcePath, destinationPath) {
  if (sourcePath === destinationPath) {
    return sourcePath;
  }

  if (destinationPath.endsWith(path.sep) || destinationPath.endsWith('/')) {
    if (!isExistingDirectory(destinationPath)) {
      throw new Error('Destination directory does not exist');
    }

    return path.join(destinationPath, path.basename(sourcePath));
  }

  if (fs.existsSync(destinationPath)) {
    if (fs.statSync(destinationPath).isDirectory()) {
      return path.join(destinationPath, path.basename(sourcePath));
    }

    return destinationPath;
  }

  const destinationDir = path.dirname(destinationPath);

  if (destinationDir !== '.' && !isExistingDirectory(destinationDir)) {
    throw new Error('Destination directory does not exist');
  }

  return destinationPath;
}

function moveFile(sourcePath, destinationPath) {
  if (!fs.existsSync(sourcePath) || !fs.statSync(sourcePath).isFile()) {
    throw new Error('Source file does not exist');
  }

  const targetPath = resolveDestination(sourcePath, destinationPath);

  if (sourcePath === targetPath) {
    return;
  }

  fs.renameSync(sourcePath, targetPath);
}

try {
  const [, , sourcePath, destinationPath] = process.argv;

  if (!sourcePath || !destinationPath) {
    throw new Error('Source and destination are required');
  }

  moveFile(sourcePath, destinationPath);
} catch (error) {
  process.stderr.write(`${error.message}\n`);
}
