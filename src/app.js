/* eslint-disable no-console */
'use strict';

const { moveFile } = require('./moveFile');

function app(argv = process.argv) {
  const args = argv.slice(2);
  const [source, destination] = args;

  if (!source || !destination) {
    console.error('Error: Both source and destination paths are required.');

    return;
  }

  moveFile(source, destination);
}

if (require.main === module) {
  app();
}

module.exports = { app };
