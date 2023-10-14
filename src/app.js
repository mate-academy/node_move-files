'use strict';

const fs = require('fs');
const path = require('path');

const [,, source, destination] = process.argv;

if (!source || !destination) {
  throw new Error('Source and destination must be specified');
}

const sourcePath = path.resolve(source);
const destinationPath = path.resolve(destination);

if (!fs.existsSync(sourcePath)) {
  throw new Error('Source file does not exist');
}

if (destination.endsWith('/')) {
  const destinationDir = path.resolve(destination.slice(0, -1));

  if (!fs.existsSync(destinationDir)
      || !fs.lstatSync(destinationDir).isDirectory()) {
    throw new Error('Destination directory does not exist');
  }

  fs.renameSync(sourcePath, path.join(destinationDir, path.basename(source)));
} else {
  const destinationDir = path.dirname(destinationPath);

  if (fs.existsSync(destinationPath)
      && fs.lstatSync(destinationPath).isDirectory()) {
    fs.renameSync(sourcePath,
      path.join(destinationPath, path.basename(source)));
  } else if (fs.existsSync(destinationDir)
             && fs.lstatSync(destinationDir).isDirectory()) {
    fs.renameSync(sourcePath, destinationPath);
  } else {
    throw new Error('Invalid destination');
  }
}
