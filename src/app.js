'use strict';
/* eslint-disable no-console */

const fs = require('fs');

const [command, inputFile, outputpPath] = process.argv.slice(2, 5);
let outputFileWithPath = outputpPath
  ? outputpPath.trim()
  : outputpPath;

if (!command || !inputFile || !outputpPath) {
  console.log('To move a file use command:',
    '\x1b[33m', 'mv <old path> <new path>');
} else if (!(fs.existsSync(inputFile))) {
  console.log('\x1b[31m', `file <${inputFile}> does not exists`);
} else if (!outputFileWithPath.includes('/')
  || (fs.existsSync(outputFileWithPath.endsWith(`/`)
    ? outputFileWithPath
    : outputFileWithPath.slice(0, outputFileWithPath.lastIndexOf('/') + 1)))) {
  if (outputFileWithPath.endsWith(`/`)) {
    outputFileWithPath += inputFile.slice(
      inputFile.lastIndexOf(`/`) < 0
        ? 0
        : inputFile.lastIndexOf(`/`) + 1);
  }

  fs.stat(outputFileWithPath, (err, stats) => {
    if (!err && !stats.isFile()) {
      outputFileWithPath += '/' + inputFile.slice(
        inputFile.lastIndexOf(`/`) < 0
          ? 0
          : inputFile.lastIndexOf(`/`) + 1);
    }

    if (command !== 'mv') {
      console.log('\x1b[31m', `Invalid command - ${command}, try to use <mv>`);
    } else if (inputFile !== outputFileWithPath) {
      fs.rename(inputFile, outputFileWithPath, error => {
        if (error) {
          console.log('\x1b[31m', `failed to move file, ${error}`);
        } else {
          console.log('\x1b[32m', 'File moved successfully');
        }
      });
    }
  });
} else {
  console.log('\x1b[31m', `folder ${outputFileWithPath.endsWith(`/`)
    ? outputFileWithPath
    : outputFileWithPath
      .slice(0, outputFileWithPath.lastIndexOf('/') + 1)} does not exists`);
}
