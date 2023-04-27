/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

function moveFileToDirectory() {
  const [src, dest] = process.argv.slice(2);

  if (process.argv.length < 4) {
    console.log('Please, enter correct file name and destination to move');

    return;
  }

  const oldPath = path.join(__dirname, src);
  const newPath = path.join(__dirname, dest);
  const isDirectory = dest.endsWith('/');
  const newDestination = isDirectory
    ? path.join(newPath, path.basename(oldPath))
    : newPath;

  if (!fs.existsSync(oldPath)) {
    console.error('Source file doesnt exist');

    return;
  }

  if (oldPath === newPath) {
    console.log('You cant move file to the same folder');

    return;
  }

  if (!fs.existsSync(newPath) && isDirectory) {
    console.log('This directory doesnt exist');

    return;
  }

  fs.rename(oldPath, newDestination, (error) => {
    if (error) {
      console.log(error);
    }

    console.log('Operation was done');
  });
}

moveFileToDirectory();
