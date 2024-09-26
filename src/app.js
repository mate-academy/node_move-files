'use strict';
/* eslint-disable no-console */

const { moveFile } = require('./moveFile');

if (!process.argv.slice(2).length) {
  console.log('Enter source location and destination location');
} else {
  moveFile(process.argv[2], process.argv[3]);
}
