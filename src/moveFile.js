'use strict';

const fs = require('fs');
const path = require('path');

function moveFile(source, destination) {
  const sourceFile = path.basename(source);
  const destinationDir = path.dirname(destination);
  const isDirectoryExists = fs.existsSync(destinationDir);

  if (!isDirectoryExists) {
    throw new Error(`directory '${destinationDir}' does not exist`);
  }

  const isDir = fs.lstatSync(destination).isDirectory();

  const finalPath = isDir
    ? path.join(destination, sourceFile)
    : destination;

  fs.renameSync(source, finalPath);
}

module.exports.moveFile = moveFile;
