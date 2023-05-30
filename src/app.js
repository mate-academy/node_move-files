/* eslint-disable max-len */
/* eslint-disable no-console */
'use strict';

const readline = require('readline');
const { moveFile } = require('./moveFile');

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function move() {
  terminal.question('to move the file please use the command: mv <filePath> <destinationPath> \n', (answer) => {
    const [comand, sourcePath, destinationPath] = answer.split(' ');

    if (comand !== 'mv') {
      console.log(`The command '${comand}' is not supported. Please use the command: mv <filePath> <destinationPath> \n`);
      move();

      return;
    }

    moveFile(`src/${sourcePath}`, `src/${destinationPath}`);
    terminal.close();
  });
}

move();
