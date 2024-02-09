/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

function moveFile(source, destination) {
  console.log(source, destination);

  if (!source || !destination) {
    console.error('Only one argument is provided');

    return;
  }

  if (!fs.existsSync(source)) {
    console.error(`Error: Source file '${source}' not found.`);

    return;
  }

  const sourcePath = path.resolve(source);
  const destinationPath = path.resolve(destination);

  const isDirectory = fs.existsSync(destinationPath)
    && fs.statSync(destinationPath).isDirectory();

  const directory = isDirectory
    ? destinationPath
    : path.dirname(destinationPath);

  if (!fs.existsSync(directory)) {
    console.error(`Error: Directory '${directory}' not found.`);

    return;
  }

  const fileName = isDirectory
    ? path.basename(sourcePath)
    : path.basename(destinationPath);

  fs.renameSync(sourcePath, path.join(directory, fileName));
};

const args = process.argv.slice(2);

moveFile(...args);
