/* eslint-disable max-len */
/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

const fileToCut = process.argv[2];
const pathToPaste = process.argv[3];

const processPathToPaste = (pathToPasteW) => {
  const pathToPasteArr = pathToPasteW.split('/');
  let checkIfDirExist = '';

  if (pathToPasteArr[pathToPasteArr.length - 1] !== '/' && pathToPasteW.includes('/')) {
    pathToPasteArr[pathToPasteArr.length - 1] = '';
    checkIfDirExist = pathToPasteArr.join('/');
  }

  return checkIfDirExist;
};

const pathToPasteDir = processPathToPaste(pathToPaste);

const relativePath = pathToPasteDir || pathToPaste;

const dirExists = (dirPath) => {
  try {
    return fs.statSync(dirPath).isDirectory();
  } catch (err) {
    return false;
  }
};

if (!fs.existsSync(fileToCut)) {
  console.error(`Error: Source file ${fileToCut} does not exist.`);
} else if (!dirExists(relativePath)) {
  const newFileName = path.basename(pathToPaste);
  const newDestination = path.join(path.dirname(fileToCut), newFileName);

  fs.rename(fileToCut, newDestination, (err) => {
    if (err) {
      console.error(`Error renaming file: ${err.message}`);
    } else {
      console.log('Rename complete!');
    }
  });
} else if (dirExists(relativePath) && path.basename(pathToPaste) !== relativePath) {
  const newDestination = path.join(relativePath, path.basename(pathToPaste));

  fs.rename(fileToCut, newDestination, (err) => {
    if (err) {
      console.error(`Error renaming file: ${err.message}`);
    } else {
      console.log('Rename complete!');
    }
  });
} else {
  const newDestination = path.join(pathToPaste, path.basename(fileToCut));

  fs.rename(fileToCut, newDestination, (err) => {
    if (err) {
      console.error(`Error renaming file: ${err.message}`);
    } else {
      console.log('Rename complete!');
    }
  });
}
