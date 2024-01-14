/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

function isDirectory(pathToCheck) {
  if (pathToCheck.slice(-1) === '/') {
    return true;
  }

  try {
    return fs.statSync(pathToCheck).isDirectory();
  } catch (error) {
    return false;
  }
}

function moveFile(source, destination) {
  const destinationFilePath = isDirectory(destination)
    ? path.join(destination, path.basename(source))
    : destination;

  fs.readFile(source, 'utf-8', (sourceError, data) => {
    if (sourceError) {
      console.log(sourceError.message);

      return;
    }

    fs.writeFile(destinationFilePath, data, (destinationError) => {
      if (destinationError) {
        console.log(destinationError.message);

        return;
      }

      fs.rm(source, (removeError) => {
        if (removeError) {
          console.log(removeError.message);
        }
      });

      console.log(`File ${source} was moved to ${destination}`);
    });
  });
}

module.exports.moveFile = moveFile;
