'use strict';

const moveFile = require('./moveFile');

const [command, source, destination] = process.argv.slice(2);

try {
  moveFile(command, source, destination);
} catch (error) {
  // eslint-disable-next-line no-console
  console.log(error);
}
