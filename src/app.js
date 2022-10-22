/* eslint-disable no-console */
'use strict';

const fs = require('fs');

const [comName, sourse, destination] = process.argv.slice(2);

if (comName === 'mv') {
  fs.stat(destination, (errStat, stats) => {
    if (errStat) {
      console.log(errStat);

      return;
    }

    if (stats.isFile()) {
      fs.readFile(sourse, 'utf8', (err, data) => {
        if (err) {
          console.log(err);

          return;
        }
        fs.writeFile(destination, data, () => {});
        fs.rm(sourse, () => {});
      });
    }

    if (stats.isDirectory()) {
      fs.readFile(sourse, 'utf8', (err, data) => {
        if (err) {
          console.log(err);

          return;
        }
        fs.writeFile(`${destination}/${sourse}`, data, () => {});
        fs.rm(sourse, () => {});
      });
    }
  });
} else {
  console.log('Wrong command name');
}
