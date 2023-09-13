/* eslint-disable no-console */
'use strict';

const fs = require('fs-extra');
const path = require('path');

const moveFile = async(src, dest) => {
  if (!fs.existsSync(src)) {
    throw new Error(`Source file ${src} doesn't exists.`);
  }

  const destinationDir = dest.endsWith('/')
    ? dest
    : path.dirname(dest);

  if (!fs.existsSync(destinationDir)) {
    throw new Error(`Destination directory ${destinationDir} doesn't exist.`);
  }

  const fileName = dest.endsWith('/')
    ? path.basename(src)
    : path.basename(dest);

  const newPath = path.join(destinationDir, fileName);

  try {
    await fs.move(src, newPath);
    console.log(`Moved ${src} to ${newPath}`);
  } catch (err) {
    console.log(`Error moving file: ${err.message}`);
  }
};

module.exports = {
  moveFile,
};
