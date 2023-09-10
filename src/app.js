'use strict';

const { moveFile } = require('./moveFile');

const myData = process.argv.slice(2);
const src = myData[0];
const dest = myData[1];

moveFile(src, dest);
