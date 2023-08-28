/* eslint-disable no-console */
'use strict';

const { moveFile } = require('./moveFile');

const [, , src, dest] = process.argv;

moveFile(src, dest);
