/* eslint-disable no-console */
'use strict';

const fs = require('fs');

function moveFiles(source, destination) {
  if (!fs.existsSync(source)) {
    console.log('This file does not exists');

    return;
  }

  const sourceStat = fs.statSync(source);

  if (!sourceStat.isFile()) {
    console.log('This is not a file');

    return;
  }

  if (destination.endsWith('/')) {
    const destinationDir = destination;

    if (!fs.existsSync(destinationDir)) {
      console.log('The directory does not exist');

      return;
    }

    try {
      fs.renameSync(source, destination + source);
      console.log('Moved successfully');
    } catch (error) {
      console.log(`Cannot move file \n ${error}`);
    }
  } else {
    if (!destination.includes('/') && !fs.existsSync(destination)) {
      fs.renameSync(source, `./${destination}.txt`);
      console.log('Renamed successfully');
    } else if (!destination.includes('/') && fs.existsSync(destination)) {
      try {
        fs.renameSync(source, `./${destination}/${source}`);
        console.log('Moved successfully');
      } catch (error) {
        console.log(`Cannot move file \n ${error}`);
      }
    } else {
      try {
        fs.renameSync(source, destination);
        console.log('Moved successfully');
      } catch (error) {
        console.log(`Cannot move file \n ${error}`);
      }
    }
  }
}

module.exports = { moveFiles };
