/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

function mv(from, to) {
  if (!from || !to) {
    console.error('Usage: node yourScript.js <source> <destination>');

    return;
  }

  const fullFromPath = path.resolve(from);
  const fullDestPath = path.resolve(to);

  if (!fs.existsSync(fullFromPath)) {
    console.error('Initial location do not exist!!!');

    return;
  }

  let newPath;
  const destDir = path.dirname(fullDestPath);
  const isDestExist = fs.existsSync(fullDestPath);

  if (!fs.existsSync(destDir)) {
    console.error('Destination directory do not exist!!!');

    return;
  }

  if (isDestExist) {
    const destStat = fs.statSync(fullDestPath);
    const destIsDirecory = destStat.isDirectory();

    newPath = destIsDirecory
      ? path.join(fullDestPath, path.basename(from))
      : fullDestPath;
  } else if (!path.extname(fullDestPath)) {
    newPath = fullDestPath;
  } else {
    console.error('Destination does not exist xD');

    return;
  }

  try {
    fs.renameSync(fullFromPath, newPath);
    console.log('File moved successfully');
  } catch (err) {
    console.error('Failed to move file:', err);
  }
}

const [source, destination] = process.argv.slice(2);

mv(source, destination);

module.exports = {
  mv,
};
