'use strict';

const fs = require('fs/promises');
const path = require('path');

const [source, destination] = process.argv.slice(2);

async function moveFile(sourceName, destinationName) {
  let isDir;

  try {
    isDir = (await fs.lstat(destinationName)).isDirectory();
  } catch (e) {
    if (destinationName.charAt(destinationName.length - 1) === '/') {
      isDir = true;
    }
  }

  let destPath = destinationName;

  if (isDir) {
    destPath = path.join(destPath, path.basename(sourceName));
  }

  return fs.rename(sourceName, destPath);
}

moveFile(source, destination)
  .catch(e => {
    if (e.code === 'ENOENT') {
      // eslint-disable-next-line no-console
      console.error(e.message);
    }
  });
