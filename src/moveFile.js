/* eslint-disable no-console */
'use strict';

const fs = require('fs-extra');

const moveFile = (src, dest) => {
  if (!fs.existsSync(src)) {
    console.log(`Source file ${src} does not exists.`);

    return;
  }

  const isDestinationDirectory = dest.endsWith('/');

  const destinationDir = isDestinationDirectory
    ? dest
    : require('path').dirname(dest);

  if (!fs.existsSync(destinationDir)) {
    console.log(`Destination directory ${destinationDir} does not exist.`);

    return;
  }

  const destinationFileName = isDestinationDirectory
    ? require('path').basename(src)
    : require('path').basename(dest);

  const newDestinationPath = require('path')
    .join(destinationDir, destinationFileName);

  try {
    fs.moveSync(src, newDestinationPath);
    console.log(`Moved ${src} to ${newDestinationPath}`);
  } catch (err) {
    console.log(`Error moving file: ${err.message}`);
  }
};

module.exports = { moveFile };
