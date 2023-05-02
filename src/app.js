'use strict';

const { moveOrRenameFile } = require('./helpers-move/moveOrRenameFile');

const [ source, destination ] = process.argv.slice(2);

if (!source || !destination) {
  global.console.error('Usage: node app.js <source> <destination>');

  process.exit();
}

moveOrRenameFile(source, destination);
