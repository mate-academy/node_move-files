/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

const [sourceFile, destination] = process.argv.slice(2);

function moveFile(source, destinationName) {
  const absoluteSourcePath = path.resolve(source);
  let absoluteDestinationPath = path.resolve(destinationName);

  if (!fs.existsSync(absoluteSourcePath)) {
    console.error('Source file does not exist.');

    return;
  }

  const isDirectory = fs.existsSync(absoluteDestinationPath)
    && fs.statSync(absoluteDestinationPath).isDirectory();

  if (isDirectory) {
    const fileName = path.basename(absoluteSourcePath);

    absoluteDestinationPath = path.join(absoluteDestinationPath, fileName);
  } else {
    const destinationDir = path.dirname(absoluteDestinationPath);

    if (!fs.existsSync(destinationDir)) {
      console.error('Destination directory does not exist.');

      return;
    }
  }

  fs.renameSync(absoluteSourcePath, absoluteDestinationPath);
  console.log(`File '${source}' moved to '${destinationName}'.`);
}

moveFile(sourceFile, destination);
