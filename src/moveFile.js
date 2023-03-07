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
  let newDestination;

  try {
    fs.lstatSync(newPath).isDirectory();
    newDestination = path.join(newPath, fileName);

    fs.renameSync(oldPath, newDestination);
  } catch (error) {
    newDestination = newPath;

    fs.renameSync(oldPath, newDestination);
  }
};

module.exports = {
  moveFile,
};
