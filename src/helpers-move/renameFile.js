'use strict';

const fs = require('fs');
const path = require('path');

const renameFile = (source, destination) => {
  const newFileName = path.basename(destination);
  const dirName = path.dirname(source);
  const newFilePath = path.join(dirName, newFileName);

  try {
    fs.renameSync(source, newFilePath);

    global.console.log(
      `File renamed to ${newFileName}`,
    );
  } catch (error) {
    global.console.error(
      `Error renaming file: ${error}`,
    );
  }
};

module.exports = { renameFile };
