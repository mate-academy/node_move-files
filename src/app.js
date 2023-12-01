/* eslint-disable max-len */
/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

const fileToCut = process.argv[2];
const pathToPaste = process.argv[3];

let checkIfDirExist = '';
const pathToPasteArr = pathToPaste.split('/');

if (pathToPasteArr[pathToPaste.length - 1] !== '/' && pathToPaste.includes('/')) {
  if (pathToPaste.includes('/')) {
    pathToPasteArr[pathToPasteArr.length - 1] = '';

    checkIfDirExist = pathToPasteArr.join('/');
  }

  console.log(checkIfDirExist);
} else if (fs.existsSync(`/${pathToPaste}`)) {
  checkIfDirExist = `/${pathToPaste}/`;
}

if (!fs.existsSync(fileToCut)) {
  console.error(`Error: Source file ${fileToCut} does not exist.`);
} else if (!fs.existsSync(checkIfDirExist) && checkIfDirExist !== '') {
  console.error(`Error: Destination directory ${checkIfDirExist} does not exist.`);
} else {
  const newFileName = path.basename(pathToPaste); // Extract the file name

  console.log(newFileName);

  const newDestination = path.join(checkIfDirExist, newFileName);

  fs.rename(fileToCut, newDestination, (err) => {
    if (err) {
      console.error(`Error renaming file: ${err.message}`);
    } else {
      console.log('Rename complete!');
    }
  });
}
