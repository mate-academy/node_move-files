'use strict';

const fs = require('fs');

function moveFiles(firstPath, secondPath) {
  const firstFile = firstPath.split('/')[firstPath.split('/').length - 1];
  let newPath = '';

  if (secondPath[secondPath.length - 1] === '/') {
    newPath = secondPath + firstFile;
  }

  if (fs.existsSync(secondPath)) {
    newPath = secondPath + '/' + firstFile;
  }

  fs.rename(firstPath, newPath, (err) => {
    if (err) {
      throw new Error(err);
    }
  });
};

module.exports = { moveFiles };
