'use strict';

const { moveFiles } = require('./moveFiles');

const sourceFile = process.argv[2];
const destinationPath = process.argv[3];

moveFiles(sourceFile, destinationPath);
