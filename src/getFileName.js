'use strict';

const { PATH_SLASH } = require('./constants');

function getFileName(filePath) {
  const splitedPath = filePath.split(PATH_SLASH);

  return splitedPath[splitedPath.length - 1];
};

module.exports = {
  getFileName,
};
