/* eslint-disable no-console */
'use strict';

const fs = require('fs');

function moveFile(oldPlace, newPlace) {
  fs.cpSync(oldPlace, newPlace);
  fs.rmSync(oldPlace);
};

function moveFileProcess() {
  if (process.argv.length !== 4) {
    return console.error('You specified incorrect data');
  }

  const [,, oldFile, newFile] = process.argv;
  const path = require('path');
  const nameFile = path.basename(oldFile);

  if (oldFile === newFile) {
    return;
  }

  if (!fs.existsSync(oldFile)) {
    return console.error('The source is not exist');
  }

  if (newFile.slice(-1) === '/') {
    return !fs.existsSync(newFile)
      ? console.error('The destination is not exist')
      : moveFile(oldFile, newFile + nameFile);
  }

  if (fs.existsSync(newFile) && fs.statSync(newFile).isDirectory()) {
    return moveFile(oldFile, newFile + '/' + nameFile);
  }

  if (path.dirname(oldFile) === path.dirname(newFile)) {
    return fs.renameSync(oldFile, newFile);
  }

  if (!fs.existsSync(newFile)) {
    return console.error('The destination is not exist');
  }

  moveFile(oldFile, newFile);
};

moveFileProcess();
