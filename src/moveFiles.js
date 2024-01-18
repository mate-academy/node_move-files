/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

function normalizePaths(source, destination) {
  const currentPath = path.join(__dirname, source);
  let newPath = '';

  if (destination.endsWith('/')) {
    const dirPath = path.join(__dirname, destination);

    newPath = path.join(dirPath, source);
  } else {
    if (destination.includes('./')) {
      newPath = path.join(destination, source);
    } else if (!destination.includes('/') && !destination.includes('.')) {
      newPath = path.join(__dirname, destination, source);

      // if directory is not exist, we rename the file
      if (!fs.existsSync(path.dirname(newPath))) {
        newPath = path.join(__dirname, './' + destination);
      }
    } else {
      newPath = path.join(__dirname, destination);
    }
  }

  return {
    currentPath, newPath,
  };
}

function moveFiles(source, destination) {
  const { currentPath, newPath } = normalizePaths(source, destination);

  fs.rename(currentPath, newPath, (err) => {
    if (err) {
      console.log('Error Found:', err);
    } else {
      console.log('You succefully moved a file');
    }
  });
}

module.exports = { moveFiles };
