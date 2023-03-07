'use strict';

const { getMovedFile } = require('./getMovedFile');
const source = process.argv[2];
const destination = process.argv[3];

getMovedFile(source, destination);
