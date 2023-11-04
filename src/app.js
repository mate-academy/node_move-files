/* eslint-disable no-console */
'use strict';

const fs = require('fs-extra');
const path = require('path');

function move(file, pathToMove) {
  fs.move(file, pathToMove)
    .then(() => console.log('Move succses'))
    .catch(() => console.error('Error moving'));
}

const fileName = process.argv[2];
const pathTo = process.argv[3];

if (process.argv[4]) {
  console.log('Only 2 param accept');
} else {
  fs.stat(pathTo, (err, stats) => {
    if (err) {
      if (pathTo[pathTo.length - 1] !== '/') {
        move(fileName, pathTo);

        return;
      } else {
        console.log('No such dir');

        return;
      }
    }

    if (stats.isDirectory()) {
      move(fileName, path.join(pathTo, fileName));
    }
  });
}
