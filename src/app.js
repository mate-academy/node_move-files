/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

const [source, param] = process.argv.slice(2);

function moveFile() {
  const sourcePath = path.resolve(source);
  const destinationPath = path.resolve(param);

  const isRename = path.dirname(sourcePath) === path.dirname(destinationPath);

  if (isRename) {
    fs.renameSync(sourcePath, destinationPath);
    console.log('File renamed successfully.');

    return;
  }

  if (!fs.existsSync(sourcePath)) {
    throw new Error('Source file does not exist.');
  }

  const directory = path.dirname(destinationPath);

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  fs.renameSync(sourcePath, destinationPath);
  console.log('File moved successfully.');
}

moveFile();
