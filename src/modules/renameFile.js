'use strict';

const fs = require('fs');

const renameFile = (fileToMovePath, destinationFileDirectory) => {
  try {
    fs.renameSync(fileToMovePath, destinationFileDirectory);
  } catch (error) {
    global.console.log('Unable to rename file, no such file or directory');
  }
};

module.exports = { renameFile };
