/* eslint-disable no-console */
'use strict';

const { moveFile } = require('./moveFile');

const [source, destination] = process.argv.slice(2);

if (!source || !destination) {
  console.error('Usage: node index.js <source> <destination>');
  process.exit(1);
} else {
  moveFile(source, destination);
}
