/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

function moveFile() {
  const [moveFrom, moveTo] = process.argv.slice(2);

  if (!moveFrom || !moveTo) {
    console.error('Is missing fields');

    return;
  }

  if (moveFrom === moveTo) {
    return;
  }

  let destinationPath = path.resolve(moveTo);

  const isDirectory =
    fs.existsSync(destinationPath) &&
    fs.statSync(destinationPath).isDirectory();

  try {
    if (isDirectory) {
      const basename = path.basename(moveFrom);

      destinationPath = path.join(destinationPath, basename);
      console.log(destinationPath);
    }

    fs.renameSync(moveFrom, destinationPath);
  } catch (error) {
    console.error(error);
  }
}

moveFile();
