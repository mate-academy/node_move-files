/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

const file = process.argv[2];
const newFile = process.argv[3];

let newFilePath = newFile;

if (newFile[newFile.length - 1] === '/') {
  if (!fs.existsSync(newFile)) {
    console.log('This folder does not exist.');

    return;
  }

  newFilePath = path.join(newFile, path.basename(file));
} else {
  if (!path.extname(newFile) && fs.existsSync(newFile)) {
    newFilePath = newFilePath + '/' + path.basename(file);
  }
}

fs.rename(file, newFilePath, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Your file moved.');
  }
});
