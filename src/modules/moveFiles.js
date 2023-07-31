'use strict';

const fs = require('fs');
const path = require('path');

const normalizePath = (filePath, newPath) => {
  switch (true) {
    case newPath.endsWith(path.sep):
      return path.join(newPath, filePath);

    case fs.existsSync(newPath):
      return path.join(newPath, path.sep, filePath);

    default:
      return newPath;
  }
};

const moveFiles = (oldPath, newPath) => {
  const filePath = oldPath.split(path.sep).pop();
  const normalizedPath = normalizePath(filePath, newPath);

  try {
    fs.renameSync(oldPath, normalizedPath);
  } catch (error) {
    throw new Error('Something went wrong\n: ', error);
  }
};

module.exports = { moveFiles };
