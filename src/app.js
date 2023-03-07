'use strict';

const { moveFile } = require('./moveFile');

const [fileToMove, destination] = process.argv.slice(2);

moveFile(fileToMove, destination);
