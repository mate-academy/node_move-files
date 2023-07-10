/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

function moveFile(from, to) {
  const sourcePath = path.resolve(from);
  const destinationPath = path.resolve(to);

  if (!fs.existsSync(sourcePath)) {
    console.log('Source file does not exist.');

    return;
  }

  const directory = path.dirname(destinationPath);

  if (!fs.existsSync(directory)) {
    console.log('Destination directory does not exist.');

    return;
  }

  const finalDestinationPath = destinationPath.endsWith('/')
    ? path.join(destinationPath, path.basename(sourcePath))
    : destinationPath;

  fs.rename(sourcePath, finalDestinationPath);
  console.log('File moved successfully.');
}

const [source, destination] = process.argv.slice(2);

moveFile(source, destination);
