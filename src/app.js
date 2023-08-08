/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

function moveFile() {
  const args = process.argv.splice(2);
  const [source, dest] = args;

  if (!source || !dest) {
    throw new Error('File name and destination are required!');
  }

  const sourcePath = path.resolve(source);
  const destPath = path.resolve(dest);

  const fileName = source.split(path.sep).pop();

  console.log(sourcePath, destPath);

  try {
    let finalDest = destPath;

    if (destPath.endsWith(path.sep)) {
      finalDest = path.join(destPath, fileName);
    } else if (fs.existsSync(destPath)) {
      finalDest = path.join(destPath, path.sep, fileName);
    }

    fs.renameSync(sourcePath, finalDest);
  } catch (e) {
    console.error(e);
  }
};

moveFile();
