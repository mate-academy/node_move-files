'use strict';

const moveFile = require('./moveFile').moveFile;

const [oldPath, newPath] = process.argv.slice(2);

moveFile(oldPath, newPath);
