'use strict';

const { moveFileIn } = require('./moveFileIn.js');
const [sourcePath, destinationPath] = process.argv.slice(2);

moveFileIn(sourcePath, destinationPath);
