'use strict';

const { moveFile } = require('./moveFile');

const [sourcePath, destPath] = process.argv.slice(2);

moveFile(sourcePath, destPath);
