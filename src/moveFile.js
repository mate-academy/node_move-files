/* eslint-disable no-console */
'use strict';

const fs = require('fs');

const moveFile = (source, destination) => {
  let destinationPath = destination;

  if (destinationPath.endsWith('/')) {
    destinationPath = `${destinationPath}${source}`;
  }

  if (fs.existsSync(destinationPath)) {
    destinationPath = `${destinationPath}/${source}`;
  }

  try {
    fs.renameSync(source, destinationPath);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error(
        `mv: rename ${source} to ${destination}: No such file or directory`,
      );
    }
  }
};

module.exports = { moveFile };
