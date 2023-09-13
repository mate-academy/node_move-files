/* eslint-disable no-console */
'use strict';

const { moveFile } = require('./moveFile');
const [src, dest] = process.argv.slice(2);

moveFile(src, dest);
