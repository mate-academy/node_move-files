/* eslint-disable no-console */
'use strict';

const { moveFiles } = require('./moveFiles');

const [source, destination] = process.argv.slice(2);

if (!source || !destination) {
  console.log('Please provide both source and destination files');
} else {
  moveFiles(source, destination);
}
