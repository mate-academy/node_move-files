'use strict';

const fs = require('node:fs');
const path = require('node:path');

const moveFile = (source, destination) => {
  const fileName = path.basename(source);
  const newFilePath = path.join(destination, fileName);

  try {
    fs.renameSync(source, newFilePath);

    global.console.log(
      `File moved from ${source} to ${newFilePath}`,
    );
  } catch (error) {
    global.console.error(
      `Error moving file: ${error}`,
    );
  }
};

module.exports = { moveFile };
