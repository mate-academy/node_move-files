'use strict';

const fs = require('fs');

const renameFile = (fileToMovePath, destinationFileDirectory) => {
  try {
    fs.renameSync(fileToMovePath, destinationFileDirectory);
  } catch (error) {
    throw new Error('Something went wrong' + error.message);
  }
};

module.exports = { renameFile };
