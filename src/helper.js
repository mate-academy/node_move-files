'use strict';

const fs = require('fs');

const moveFiles = (source, destination) => {
  fs.copyFile(source, destination, err => {
    if (err) {
      throw err;
    }
  });

  fs.unlink(source, err => {
    if (err) {
      throw err;
    }
  });
};

module.exports = {
  moveFiles,
};
