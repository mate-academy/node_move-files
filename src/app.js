/* eslint-disable no-console */
'use strict';

const { moveFiles } = require('./helper');
const [source, destination] = process.argv.slice(2);

if (!source) {
  console.log('Please provide source and destination files');

  return;
}

if (!destination) {
  console.log('Please provide destination');

  return;
}

if (destination[destination.length - 1] === '/') {
  const pathArray = source.split('/');
  const fileName = pathArray[pathArray.length - 1];

  moveFiles(source, destination + fileName);
} else {
  moveFiles(source, destination);
}
