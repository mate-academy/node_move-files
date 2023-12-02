/* eslint-disable no-console */
'use strict';

const fs = require('fs/promises');
const path = require('path');

const source = process.argv[2];
const sourceFileName = path.basename(source);
let destination = process.argv[3];

(async() => {
  if (source === destination || !source || !destination) {
    return;
  }

  if (destination[destination.length - 1] === `/`) {
    destination = destination + sourceFileName;
  }

  try {
    const folder = await fs.readdir(destination);

    if (folder) {
      destination = destination + '/' + sourceFileName;
    }
  } catch (e) {}

  try {
    await fs.rename(source, destination);
    console.log('File moved successfully');
  } catch (error) {
    console.log(error);
  }
})();
