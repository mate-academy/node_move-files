/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

function moveFile(file, directory) {
  console.log(file, directory);

  if (!file || !directory) {
    console.error('only one argument');

    return;
  }

  if (!fs.existsSync(file)) {
    console.error(`File '${file}' does not exist.`);

    return;
  }

  const filePath = path.resolve(file);
  const directoryPath = path.resolve(directory);

  const isDirectory = fs.existsSync(directoryPath)
    && fs.statSync(directoryPath).isDirectory();

  const destinationPath = isDirectory
    ? directoryPath : path.dirname(directoryPath);

  if (!fs.existsSync(destinationPath)) {
    console.error(`Destination directory does not exist.`);

    return;
  }

  const fileName = isDirectory
    ? path.basename(filePath)
    : path.basename(directoryPath);

  fs.renameSync(filePath, path.join(destinationPath, fileName), (err) => {
    if (err) {
      console.error(err);
    }
  });
}

const oldPath = process.argv[2];
const newPath = process.argv[3];

moveFile(oldPath, newPath);
