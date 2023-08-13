'use strict';

const { moveFile } = require('./moveFile');

const [source, destination] = process.argv.slice(2);

moveFile(source, destination);
