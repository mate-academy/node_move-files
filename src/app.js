// write code here
'use strict';

const { moveFile } = require('./moveFile');

try {
  if (process.argv.length < 2 + 2) {
    throw new Error('Script accepts 2 arguments');
  }
} catch (error) {
  /* eslint-disable no-console */
  console.error(error);
}

moveFile(...process.argv.slice(2));
