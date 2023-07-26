'use strict';

const fs = require('fs');

const normalizePath = (path, fileName) => {
  if (path[path.length - 1] === '/') {
    return path + fileName;
  }

  if (fs.existsSync(path)) {
    return path + '/' + fileName;
  }

  return path;
};

const move = (oldPath, newPath) => {
  if (oldPath === newPath) {
    return;
  }

  const fileName = oldPath.split('/')[oldPath.split('/').length - 1];

  fs.rename(oldPath, normalizePath(newPath, fileName), (err) => {
    if (err) {
      throw new Error(err);
    }
  });
};

module.exports = { move };
