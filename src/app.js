/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

function moveFile() {
  const [enteredSourcePath, enteredDestinationPath] = process.argv.slice(2);
  const fileName = path.basename(enteredSourcePath);
  const basePath = path.resolve(__dirname, `../`);
  const sourcePath = path.resolve(basePath, enteredSourcePath);
  const destinationPath = path
    .resolve(basePath, enteredDestinationPath);
  const destinationStats = fs.statSync(
    destinationPath,
    { throwIfNoEntry: false }
  );

  if (!fs.existsSync(sourcePath)) {
    console.info('The file does not exist!!!');

    return;
  }

  if (!fs.existsSync(destinationPath) && enteredDestinationPath.endsWith('/')) {
    console.info('Invalid destination path!!!');

    return;
  } else if (!fs.existsSync(destinationPath)) {
    console.info('Invalid destination directory. Trying to rename file...');
  }

  if (destinationStats && destinationStats.isDirectory()) {
    try {
      fs.copyFileSync(sourcePath, `${destinationPath}/${fileName}`);
    } catch (error) {
      throw new Error(`An error ocurred during copying file: ${error}`);
    }

    try {
      fs.rmSync(sourcePath);
    } catch (error) {
      throw new Error(`An error ocurred during removing old file: ${error}`);
    }

    console.info('File successfully moved )))');
  } else {
    fs.rename(sourcePath, destinationPath, (error) => {
      if (error) {
        console.error('An error ocurred during renaming file:', error);
      } else {
        console.info('File successfully renamed )))');
      }
    });
  }
}

moveFile();
