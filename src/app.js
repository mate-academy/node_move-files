'use strict';

const minimist = require('minimist');
const { moveFile } = require('./moveFile');

function startProgram() {
  const { _: args } = minimist(process.argv.slice(2));

  const movedFilePath = args[0];
  const newFilePath = args[1];

  moveFile(movedFilePath, newFilePath);
};

startProgram();
