'use strict';

const fs = require('fs-extra/lib/move');
const existsSync = require('fs-extra/lib/fs').existsSync;

const sourceFileName = process.argv[2].split('/').slice(-1)[0];
const destinationFileName = process.argv[3].split('/').slice(-1)[0];
const destinationFolder = process.argv[3].split('/')[0];
const isExistingDirectory = existsSync('src/' + destinationFolder);
const destinationFileLength = process.argv[3].split('/').length;
const source = 'src/dir1/' + process.argv[2];

const dest = () => {
  if (destinationFileLength === 1) {
    return !isExistingDirectory
      ? 'src/dir1/' + process.argv[3]
      : 'src/' + process.argv[3] + '/' + sourceFileName;
  }

  if (destinationFileName.length === 0) {
    return 'src/' + process.argv[3] + sourceFileName;
  }

  return 'src/' + process.argv[3];
};

const callBack = (error) => {
  if (error) {
    throw error;
  }
};

fs.move(source, dest(), callBack);
