'use strict';

const fs = require('fs/promises');
const path = require('path');

const moveFile = async(file, destination) => {
  const filePath = path.join(__dirname, file);
  const fileName = path.basename(filePath);
  const destinationPath = destination.endsWith('/')
    ? path.join(__dirname, destination, fileName)
    : path.join(__dirname, destination);

  try {
    await fs.rename(filePath, destinationPath);
  } catch (err) {
    const newDestination = path.join(destinationPath, fileName);

    await fs.rename(filePath, newDestination);
  }
};

module.exports = { moveFile };
