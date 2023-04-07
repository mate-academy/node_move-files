'use strict';

const { moveFile } = require('./move');

const [file, destination] = process.argv.slice(2);

moveFile(file, destination);
