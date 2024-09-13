/* eslint-disable no-console */

'use strict';

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const moveFiles = (fileName, dest) => {
  const srcPath = path.resolve(fileName);
  let destPath = path.resolve(dest);

  if (!fs.existsSync(srcPath)) {
    console.error(`Error: Source file "${srcPath}" does not exist.`);

    return;
  }

  if (!fs.statSync(srcPath).isFile()) {
    console.error('Error: Only file moving is supported.');

    return;
  }

  if (
    destPath.endsWith(path.sep) ||
    (fs.existSync(destPath) && fs.statSync(destPath).isDirectory())
  ) {
    if (!fs.existsSync(destPath)) {
      console.error(`Error: Destination directory "${dest}" does not exist.`);

      return;
    }

    destPath = path.join(destPath, path.basename(srcPath));
  }

  try {
    fs.renameSync(srcPath, destPath);

    console.log(`File moved successfully from ${srcPath} to ${destPath}`);
  } catch (error) {
    console.error(`Error during file move: ${error.message}`);
  }
};

const handleUserInput = (userInput) => {
  const [command, fileName, dest] = userInput.split(' ');

  if (command !== 'mv') {
    console.error('Invalid command');
    rl.close();

    return;
  }

  if (!fileName || !dest) {
    console.error('Usage: node index.js <source> <destination>');
    rl.close();

    return;
  }

  moveFiles(fileName, dest);

  rl.close();
};

rl.question('Enter command:', handleUserInput);
