/* eslint-disable no-console */
'use strict';

const fs = require('fs');

const [command, from, to] = process.argv.slice(2);

if (command === 'move' && from !== to) {
  fs.readFile(from, (error, fileData) => {
    if (error) {
      console.log(error);
    }

    const fileName = from.slice(from.lastIndexOf('/') + 1);
    let pathTo = to;

    if (pathTo.slice(-1) === '/') {
      pathTo += fileName;
    }

    if (pathTo.slice(0, 1) !== '.' || pathTo.slice(0, 2) !== './') {
      pathTo = './' + pathTo;
    }

    if (pathTo.slice(-4, -3) !== '.') {
      pathTo += fileName.slice(-4);
    }

    fs.writeFile(pathTo, fileData.toString(), (err) => {
      if (err) {
        console.error(err.code === 'ENOENT'
          ? 'no such file or directory'
          : err.code);

        return;
      }

      fs.rm(from, rmError => {
        if (rmError) {
          console.error(rmError);
        }
      });
    });
  });
}
