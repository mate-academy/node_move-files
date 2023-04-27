'use strict';

const fs = require('fs');
const path = require('path');
const moveFile = require('./moveFile');

const [source, destination] = process.argv.slice(2);

if (!fs.existsSync(source)) {
  // eslint-disable-next-line no-console
  console.log('file not found');

  return;
}

const isDir = destination.endsWith('/');
const destPath = isDir ? destination.slice(0, -1) : destination;
const dirPath = path.dirname(destPath);
const fileName = path.basename(destPath);

fs.readFile(path.basename(source), (error, data) => {
  if (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  } else {
    if (path.extname(fileName)) {
      moveFile(dirPath, fileName, data);
    } else {
      moveFile(destPath, path.basename(source), data);
    }
  }
});
