/* eslint-disable no-console */
'use strict';

const fs = require('fs');

const changeFile = (moveFrom, moveTo) => {
  const isDirectory = moveTo[moveTo.length - 1] === '/';
  const fileName = moveFrom.split('/')[moveFrom.split('/').length - 1];

  if (!fs.existsSync(moveTo) && isDirectory) {
    throw new Error('Directory does not exist');
  }

  try {
    if (fs.existsSync(moveTo) && !isDirectory) {
      fs.renameSync(moveFrom, moveTo + '/' + fileName);

      return console.log('Successfully');
    }

    if (isDirectory) {
      fs.renameSync(moveFrom, moveTo + fileName);

      return console.log('Successfully');
    }

    fs.renameSync(moveFrom, moveTo);
  } catch (error) {
    throw new Error('Failed to move or rename file');
  }
};

const [origin, destination] = process.argv.slice(2);

changeFile(origin, destination);
