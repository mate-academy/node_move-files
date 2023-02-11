'use strict';

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function moveFile(src, dest) {
  let destination = dest;
  const destIsDirectory = destination.endsWith('/');
  const destDir = path.dirname(destination);

  if (!fs.existsSync(src)) {
    throw new Error(`Source file ${src} does not exist`);
  }

  if (destIsDirectory) {
    destination = path.join(destination, path.basename(src));
  }

  if (!fs.existsSync(destDir)) {
    throw new Error(`Destination directory ${destDir} does not exist`);
  }

  fs.renameSync(src, destination);
}

terminal.question('Enter the source file path: ', (src) => {
  terminal.question('Enter the destination file path: ', (dest) => {
    try {
      moveFile(src, dest);
      // eslint-disable-next-line no-console
      console.log(`Moved ${src} to ${dest}`);
      terminal.close();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error.message);
      terminal.close();
    }
  });
});
