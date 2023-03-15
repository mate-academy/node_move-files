'use strict';

const { terminal } = require('./terminal');
const { moveFile } = require('./moveFile');

terminal.question(
  'Enter the command to move the file to another directory.'
  + '\nFor example, "mv file.txt ./someDir/" ',
  moveFile,
);
