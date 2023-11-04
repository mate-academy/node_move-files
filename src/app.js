/* eslint-disable no-console */
'use strict';

const fs = require('fs-extra');
const path = require('path');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

function move(file, pathToMove, overWrite = false) {
  fs.move(file, pathToMove, { overwrite: overWrite })
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
    } else {
      readline.question(`${pathTo} already exist. Rewrite? y/n`, answer => {
        if (answer === 'y') {
          move(fileName, pathTo, true);
        }
        readline.close();
      });
    }
  });
}
