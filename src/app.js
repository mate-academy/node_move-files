'use strict';

const path = require('path');
const fs = require('fs');
const myConsole = require('console');

function main() {
  if (process.argv.length !== 4) {
    myConsole.log('Error! You should start program with'
      + 'file that you want to move, and location to paste it');

    return;
  }

  const [,, file, insertTo] = process.argv;

  const fileLocation = path.join(__dirname, file);
  let insertLocation = path.join(__dirname, insertTo);

  if (fileLocation === insertLocation) {
    myConsole.log('Error! Same name and location');

    return;
  }

  if (insertTo.endsWith('/')) {
    insertLocation = path.join(insertLocation, path.basename(fileLocation));
  }

  if (!insertTo.includes('.')) {
    try {
      if (fs.lstatSync(insertLocation).isDirectory()) {
        insertLocation = path.join(insertLocation, path.basename(fileLocation));
      }
    } catch (err) {}
  }

  fs.renameSync(fileLocation, insertLocation);
  myConsole.log(insertLocation);
}

main();
