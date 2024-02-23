/* eslint-disable no-console */
'use strict';

const { customMoveFile } = require('./modules/customMoveFile');

customMoveFile(...process.argv.slice(2));
