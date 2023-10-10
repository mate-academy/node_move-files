'use strict';

const { moveFile } = require('./moveFile');

const args = process.argv.slice(2);

if (args[0] === 'mv' && args.length === 3) {
  moveFile(...args.slice(1));
}
