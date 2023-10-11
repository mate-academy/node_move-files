'use strict';

/* eslint-disable no-console */

const { moveFile } = require('./moveFile');

const [sourcePath, destinationPath] = process.argv.slice(2);

if (sourcePath !== destinationPath) {
  moveFile(sourcePath, destinationPath);
} else {
  console.log(`You're trying to copy to the same location.`);
}
