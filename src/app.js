'use strict';

const { moveFile } = require('./moveFile');

const args = process.argv;

moveFile(args.length, args[2], args[3]);
