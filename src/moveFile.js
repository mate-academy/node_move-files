'use strict';

const fs = require('fs');
const path = require('path');

module.exports = function move(dir, file, data, deleteFile) {
  fs.writeFile(path.join(dir, path.basename(file)), data, (err) => {
    if (err) {
      throw Error(err);
    } else {
      fs.unlink(deleteFile, (error) => {
        if (error) {
          throw Error(error);
        } else {
          // eslint-disable-next-line no-console
          console.log('File saved successfully!');
        }
      });
    }
  });
};
