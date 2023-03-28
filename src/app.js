/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

function moveFile(sourceFile, destinationFile) {
  const sourcePath = path.resolve(sourceFile);
  const sourceDestination = path.resolve(destinationFile);
  const fileName = path.basename(sourcePath);

  if (!fs.existsSync(sourcePath)) {
    console.error(
      `The file ${fileName} does not exist at the source location.`
    );

    return;
  }

  fs.copyFileSync(sourcePath, sourceDestination);
  fs.rm(sourcePath);
}

moveFile('file.txt', 'src/file.txt');
