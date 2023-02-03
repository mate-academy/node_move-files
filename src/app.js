'use strict';

const readLine = require('readline');
const fs = require('fs');
const path = require('path');

const terminal = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

terminal.question(
  'Please enter data to move a file from one specified location to another\n',
  (fullComand) => {
    const [command, source, dest] = fullComand.split(' ');
    const isDestExist = fs.existsSync(dest);
    const isDestFolder = dest.endsWith('/');
    const isSourceExist = fs.existsSync(source);
    const fileName = path.basename(source);

    if (command !== 'mv') {
      throw new Error('Invalid command (it should be \'mv\'');
    }

    if (isDestFolder && !isDestExist) {
      throw new Error(`Folder is not exist at '${dest}'`);
    }

    if (!isSourceExist) {
      throw new Error(`File is not exist at '${source}'`);
    }

    if (isDestExist) {
      fs.copyFileSync(source, `${dest}/${fileName}`);
    } else {
      fs.copyFileSync(source, dest);
    }

    fs.rmSync(source);
    terminal.close();
  }
);
