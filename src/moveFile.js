'use strict';

const fs = require('fs');

const moveFile = (addressFile, addressMove) => {
  try {
    fs.renameSync(addressFile, addressMove);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('Folder not found');
  }
};

module.exports = {
  moveFile,
};
