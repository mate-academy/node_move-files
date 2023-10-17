'use strict';

const { moveFile } = require('./moveFile.js');
const [sourcePath, destinationPath] = process.argv.slice(2);

if (!sourcePath || !destinationPath) {
  throw new Error('Function needs two parametrs.');
}

if (sourcePath === destinationPath) {
  return;
};

moveFile(sourcePath, destinationPath);
