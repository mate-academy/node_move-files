/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

function moveFile(source, destination) {
  if (!source || !destination) {
    console.error('Please provide source and destination');

    return;
  }

  if (!fs.existsSync(source)) {
    console.error('Source file does not exist');

    return;
  }

  const sourcePath = path.resolve(source);
  const destinationPath = path.resolve(destination);

  const isDirectory =
    fs.existsSync(destinationPath) &&
    fs.lstatSync(destinationPath).isDirectory();

  const destinationDirectory = isDirectory
    ? destinationPath
    : path.dirname(destinationPath);

  if (!fs.existsSync(destinationDirectory)) {
    console.error('Destination directory does not exist');

    return;
  }

  const fileName = isDirectory
    ? path.basename(sourcePath)
    : path.basename(destinationPath);

  const destinationFilePath = path.join(destinationDirectory, fileName);

  fs.renameSync(sourcePath, destinationFilePath, (err) => {
    if (err) {
      console.error('Error moving file', err);
    }
  });
}

const [file, dest] = process.argv.slice(2);

moveFile(file, dest);
