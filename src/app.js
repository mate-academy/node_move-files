'use strict';
/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');

function moveFile(src, dest) {
  let destination = path.resolve(dest);
  const source = path.resolve(src);
  const isDestinationDirectory = destination.endsWith('/');

  if (!fs.existsSync(source)) {
    console.log(`Source file "${source}" does not exist.`);

    return;
  }

  if (!isDestinationDirectory && !fs.existsSync(path.dirname(destination))) {
    console.log(
      `Destination directory '${path.dirname(destination)}' doesn't exist.`
    );

    return;
  }

  if (isDestinationDirectory) {
    destination = path.join(destination, path.basename(source));
  }

  fs.rename(source, destination, (err) => {
    if (err) {
      if (err.code === 'ENOENT') {
        fs.rename(source, destination, (renameErr) => {
          if (renameErr) {
            console.log(`Error renaming file: ${renameErr}`);

            return;
          }

          console.log(
            `File "${source}" renamed to "${destination}" successfully.`
          );
        });

        return;
      }

      console.log(`Error moving file: ${err}`);

      return;
    }

    console.log(`File "${source}" moved to "${destination}" successfully.`);
  });
}

if (process.argv.length !== 4) {
  console.log('Usage: node moveFile.js source destination');
  process.exit(1);
}

const sourceFile = process.argv[2];
const destinationFile = process.argv[3];

moveFile(sourceFile, destinationFile);
