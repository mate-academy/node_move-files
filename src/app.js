'use strict';

const fs = require('fs');

const pathFrom = process.argv[2];
const pathTo = process.argv[3];

try {
  fs.copyFileSync(pathFrom, pathTo);
} catch (e) {
  throw new Error('Unable to copy');
}

try {
  fs.rmSync(pathFrom);
} catch (e) {
  throw new Error('Unable to delete old file');
}
