/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

function moveFileToDirectory() {
  const [sourcePath, destinationPath] = process.argv.slice(2);

  if (process.argv.length < 4) {
    console.log('Please, enter correct file name and destination to move');

    return;
  }

  const isDirectory = destinationPath.endsWith('/');
  const newDestinationPath = isDirectory
    ? path.join(destinationPath, path.basename(sourcePath))
    : destinationPath;

  if (!fs.existsSync(sourcePath)) {
    console.error('Source file doesnt exist');

    return;
  }

  if (sourcePath === newDestinationPath) {
    console.error('You cant move file to the same folder');

    return;
  }

  if (!fs.existsSync(newDestinationPath) && isDirectory) {
    console.error('This directory doesnt exist');

    return;
  }

  fs.rename(sourcePath, newDestinationPath, (error) => {
    if (error) {
      console.error(error);
    }

    console.log('Operation was done');
  });
}

moveFileToDirectory();
