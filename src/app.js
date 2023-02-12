'use strict';

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const moveFile = (message) => {
  terminal.question(message, (recivedComand) => {
    const [command, fileToMove, destination] = recivedComand.split(' ');

    if (command !== 'mv') {
      throw new Error('You wrote a wrong command, please try again');
    }

    if (fileToMove === destination) {
      return;
    }

    const fileToMovePath = path.join(__dirname, '\\', fileToMove);
    let destinationPath = path.join(__dirname, '\\', destination);

    const isFileExists = fs.existsSync(fileToMovePath);
    const isDestinantionExists = fs.existsSync(destinationPath);
    const isDestFolder = destination.endsWith('\\');

    if (isDestFolder && !isDestinantionExists) {
      throw new Error(
        'Given destination path does not exist, please try again'
      );
    }

    if (!isFileExists) {
      throw new Error('There is no such file to remove, please try again');
    }

    if (
      destinationPath[destinationPath.length - 1] === '\\'
      || destinationPath[destinationPath.length - 1] === '/'
    ) {
      let divider = '/';

      if (!fileToMove.includes(divider)) {
        divider = '\\';
      }

      destinationPath += fileToMove.split(divider).slice(-1);
    }

    fs.copyFile(fileToMovePath, destinationPath, (error) => {
      if (error) {
        // eslint-disable-next-line no-console
        console.log(error.message);
      }
    });
  });
};

moveFile('Please select\n');
