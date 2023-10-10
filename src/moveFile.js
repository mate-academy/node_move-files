'use strict';

const fs = require('fs');
const path = require('path');

const moveFile = (from, to) => {
  let newTo = to;

  fs.stat(to, (err, stats) => {
    if (err) {
      throw err;
    }

    if (stats.isDirectory()) {
      const arr = from.split(path.sep);

      newTo += path.sep + arr[arr.length - 1];
    }
  });

  fs.rename(from, newTo, (err) => {
    if (err) {
      throw err;
    }

    // eslint-disable-next-line no-console
    console.log('Rename complete!');
  });
};

module.exports = { moveFile };
