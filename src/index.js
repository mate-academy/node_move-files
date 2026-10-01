// write code here
'use strict';
/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');

function moveFile(from, destination) {
  if (!from || !destination) {
    return console.error('Not enough args');
  }

  const isFileExist = fs.existsSync(from);
  const isFile = isFileExist && fs.statSync(from).isFile();

  if (!isFile) {
    return console.error('Is not a file');
  }

  const isDirectoryExist = fs.existsSync(destination);
  const isDirectory =
    isDirectoryExist && fs.statSync(destination).isDirectory();

  const endsWithSlash = destination.endsWith('/');

  if (endsWithSlash && !isDirectory) {
    return console.error('Destination is not existed');
  }

  const file = path.basename(from);
  const finalPath = isDirectory ? path.join(destination, file) : destination;
  const parentDir = path.dirname(finalPath);
  const isParentDirExist = fs.existsSync(parentDir);
  const isParentDir = isParentDirExist && fs.statSync(parentDir).isDirectory();

  if (!isParentDir) {
    return console.error("Parent directory doesn't exist");
  }

  fs.rename(from, finalPath, (err) => {
    if (err) {
      return console.error(err);
    }
  });
}

moveFile(process.argv[2], process.argv[3]);
