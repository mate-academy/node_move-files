/* eslint-disable no-console */
'use strict';

const fs = require('fs/promises');
const path = require('path');

async function moveFile() {
  const pathFile = process.argv[2];
  const pathToMove = process.argv[3];

  if (!pathFile || !pathToMove) {
    console.error('Both pathFile and destination pathToMove are required!');
    return;
  }

  const sourcePath = path.resolve(pathFile);
  const destPath = path.resolve(pathToMove);

  try {
    await fs.rename(sourcePath, destPath);
    console.log(`${sourcePath} moved to ${destPath}`);
  } catch (error) {
    console.error(error.message);
  }
}

moveFile();
