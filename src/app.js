'use strict';

const fs = require('fs');

const moveFile = require('./moveFile');

const [source, destination] = process.argv.slice(2);

try {
  if (!fs.existsSync(source)) {
    throw new Error('File doesn\'t exist');
  }

  moveFile(source, destination);
} catch (error) {
  // eslint-disable-next-line no-console
  console.log(error);
}
