'use strict';

const path = require('node:path');
const { checkIsFile, checkIsFolder } = require('./helpers');
const { moveFile } = require('./moveFile');
const { renameFile } = require('./renameFile');

const moveOrRenameFile = (source, destination) => {
  const isSourceIsFile = checkIsFile(source);
  const isDestinationIsFolder = checkIsFolder(destination);
  const isFloderEnding = destination.endsWith(path.sep);

  if (isFloderEnding && !isDestinationIsFolder) {
    global.console.log('Invalid input destination path.');

    process.exit();
  }

  if (!isSourceIsFile) {
    global.console.log('Invalid input source path.');
  }

  if (isSourceIsFile && isDestinationIsFolder) {
    moveFile(source, destination);
    process.exit();
  }

  if (isSourceIsFile && !isFloderEnding) {
    renameFile(source, destination);
    process.exit();
  }

  global.console.error('Usage: node app.js <source> <destination>');
  process.exit();
};

module.exports = { moveOrRenameFile };
