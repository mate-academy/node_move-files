'use strict';

const fs = require('fs');
const path = require('path');

const moveFile = (fileToMove, destination) => {
  if (!fileToMove || !destination) {
    throw new Error('Awaiting for 2 agruments, received only 1');
  }

  const oldPath = path.join(__dirname, fileToMove);
  const newPath = path.join(__dirname, destination);
  const fileName = path.basename(oldPath);
  let isFolder;

  try {
    isFolder = fs.lstatSync(newPath).isDirectory();
  } catch (error) {
    isFolder = false;
  }

  const newDestination = isFolder
    ? path.join(newPath, fileName)
    : newPath;

  try {
    fs.renameSync(oldPath, newDestination);
  } catch (error) {
    global.console.log(`Error code - ${error.message}`);
  }
};

module.exports = {
  moveFile,
};
