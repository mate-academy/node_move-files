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

  if (destination.endsWith('/') && !fs.existsSync(newPath)) {
    throw new Error('no such directory');
  }

  let newDestination = destination.endsWith('/')
    ? path.join(__dirname, destination, fileName)
    : path.join(__dirname, destination);

  try {
    fs.renameSync(oldPath, newDestination);
  } catch (error) {
    newDestination = path.join(newDestination, fileName);

    fs.renameSync(oldPath, newDestination);
  }
};

module.exports = {
  moveFile,
};
