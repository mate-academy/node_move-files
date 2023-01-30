/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

function moveFile() {
  const [pathMoveFrom, pathMoveTo] = process.argv.slice(2);
  const fileName = path.basename(pathMoveFrom);

  const idPathIsDirectory = pathMoveTo.endsWith('/');
  const isPathExist = fs.existsSync(pathMoveTo);

  if (idPathIsDirectory && !isPathExist) {
    console.log(123);
    throw new Error('Those path does not exist');
  }

  let contentOfFile = '';

  try {
    const data = fs.readFileSync(pathMoveFrom, 'utf8');

    contentOfFile = data;
  } catch (err) {
    console.log('Error occur while reading file. Try again...');

    return;
  }

  if (!isPathExist) {
    fs.writeFileSync(pathMoveTo, contentOfFile);
  } else {
    fs.writeFileSync(`${pathMoveTo}/${fileName}`, contentOfFile);
  }

  fs.rmSync(pathMoveFrom);
}

moveFile();

module.exports.moveFile = moveFile;
