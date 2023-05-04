'use strict';

const moveFile = require('./moveFile');

const command = process.argv[2];
const source = process.argv[3];
const destination = process.argv[4];

moveFile(command, source, destination);
