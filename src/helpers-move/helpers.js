'use strict';

const fs = require('node:fs');

const checkIsFile = (path) => {
  const isExist = fs.existsSync(path);

  if (!isExist) {
    return false;
  }

  return fs.statSync(path).isFile();
};

const checkIsFolder = (path) => {
  const isExist = fs.existsSync(path);

  if (!isExist) {
    return false;
  }

  return fs.statSync(path).isDirectory();
};

module.exports = {
  checkIsFile,
  checkIsFolder,
};
