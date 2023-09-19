/* eslint-disable no-console */
'use strict';

const fsPromises = require('fs/promises');
const path = require('path');
const { moveToDir } = require('./moveToDir');
const { renameTheFile } = require('./renameTheFile');

const [fileToMove, targteDir] = process.argv.slice(2);

const startPath = path.join(__dirname, fileToMove);
const endPath = path.join(__dirname, targteDir);

if (!targteDir.includes('.') && !targteDir.includes('/')) {
  fsPromises.readdir(endPath)
    .then(() => moveToDir(startPath, endPath, fileToMove))
    .catch(() => renameTheFile(fileToMove, startPath, endPath));

  return;
}

if (!fileToMove.includes('/') && !targteDir.includes('/')) {
  return renameTheFile(fileToMove, startPath, endPath);
};

if (endPath.endsWith('/')) {
  return moveToDir(startPath, endPath, fileToMove);
} else {
  const pathToDir = path.dirname(endPath);
  const nameOfFile = path.basename(endPath);
  const extsn = path.extname(fileToMove);

  return moveToDir(startPath, pathToDir, `${nameOfFile}${extsn}`);
};
