/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

const moveFiles = (source, destination) => {
  if (!source) {
    throw new Error('Source must be provided');
  }

  if (!destination) {
    throw new Error('Destination must be provided');
  }

  const resolvedSource = path.resolve(source);
  const resolvedDestination = path.resolve(destination);

  if (resolvedSource === resolvedDestination) {
    return;
  }

  if (!fs.existsSync(source)) {
    throw new Error(`${source} doesn't exist, check the file path`);
  }

  const sourceStats = fs.statSync(source);

  if (!sourceStats.isFile()) {
    throw new Error('Only files can be moved');
  }

  const destStats = fs.existsSync(destination) && fs.statSync(destination);

  if (destStats && destStats.isDirectory()) {
    const fileName = path.basename(source);

    destination = path.join(destination, fileName);
  }

  const parentDir = path.dirname(destination);

  if (!fs.existsSync(parentDir)) {
    throw new Error(`Destination directory ${parentDir} doesn't exist`);
  }

  fs.renameSync(source, destination);

  console.log(`File moved from ${source} to ${destination}`);
};

const [source, destination] = process.argv.slice(2);

try {
  moveFiles(source, destination);
} catch (err) {
  console.error(err.message);
}
