/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

function moveFile(file, newDestination) {
  if (!file || !newDestination) {
    console.error('Such directory or file does not exist');

    return;
  }

  const isExistsSource = fs.existsSync(file);
  const isExistsDest = fs.existsSync(newDestination);

  if (!isExistsSource) {
    console.error('Such source file does not exist');

    return;
  }

  if (file === newDestination) {
    console.log('Source and destination files are the same');

    return;
  }

  let fullDest = path.resolve(newDestination);
  const fullSource = path.resolve(file);
  const fileName = path.basename(file);

  if (isExistsDest) {
    fullDest = path.join(fullDest, fileName);
  }

  try {
    fs.renameSync(fullSource, fullDest);
  } catch (e) {
    console.error(e);
  }
}

const source = process.argv[2];
const destination = process.argv[3];

moveFile(source, destination);
