/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

function moveFile(source, destination) {
  if (!source || !destination) {
    console.error('Expected two arguments to be provided.');

    return;
  }

  if (source === destination) {
    return;
  }

  const absSrcPath = path.resolve(source);
  let absDestPath = path.resolve(destination);

  const isDirectory =
    fs.existsSync(absDestPath) && fs.statSync(absDestPath).isDirectory();

  try {
    if (isDirectory) {
      const newFile = path.basename(absSrcPath);

      absDestPath = path.join(absDestPath, newFile);
    }

    fs.renameSync(absSrcPath, absDestPath);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

moveFile(...process.argv.slice(2));
