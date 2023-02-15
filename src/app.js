'use strict';

const fs = require('fs');

function moveFile() {
  const [command, originFile, newPath] = process.argv.slice(2);
  const formatOfFile = originFile.split('.')[1];
  const isPathIsFile = newPath.split('.').length === 2;

  const originPath = `${__dirname}/${originFile}`;
  const pathIncludesFolder = newPath.split('')[newPath.length - 1] === '/'
    ? (`${__dirname}/${newPath}${originFile}`)
    : (`${__dirname}${newPath}.${formatOfFile}`);

  const generatedPath = isPathIsFile
    ? `${__dirname}/${newPath}`
    : pathIncludesFolder;

  if (originFile[0] === '-') {
    throw new Error('Program don`t use flags');
  }

  if (command !== 'mv') {
    throw new Error('Unknown command');
  }

  fs.rename(
    originPath,
    generatedPath,
    (error) => {
      if (error) {
        throw new Error(error);
      }
    });
}

moveFile();
