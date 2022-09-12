'use strict';

const { moveFile } = require('./file');

const argv = process.argv.slice(2);
const file = argv[0];
const moveTo = argv[1];

moveFile(file, moveTo);
