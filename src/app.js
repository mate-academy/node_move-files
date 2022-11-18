'use strict';

const fs = require('fs');
const path = require('path');

const moveFile = (file, moveTo) => {
  const pathToMove = path.join(__dirname, moveTo);
  const currFilePath = path.join(__dirname, file);

  const isEndsWithSlash = moveTo.endsWith('/');
  let isDirectory = false;

  if (currFilePath === pathToMove) {
    return;
  }

  if (!fs.existsSync(currFilePath)) {
    throw new Error('The file does not exist!');
  }

  if (fs.existsSync(pathToMove)) {
    const stats = fs.statSync(pathToMove);

    isDirectory = stats.isDirectory();
  }

  if (isEndsWithSlash && !isDirectory) {
    throw new Error('The directory does not exist!');
  }

  if (!isDirectory && !isEndsWithSlash) {
    try {
      fs.renameSync(currFilePath, pathToMove);
    } catch (e) {
      throw new Error(e);
    }
  }

  if (isDirectory) {
    const dirPath = (isEndsWithSlash) ? moveTo : moveTo + '/';
    const newFilePath = path.join(__dirname, dirPath + file);

    try {
      const data = fs.readFileSync(currFilePath, 'utf-8');

      fs.writeFileSync(newFilePath, data);
      fs.unlinkSync(currFilePath);
    } catch (e) {
      throw new Error(e);
    }
  }
};

moveFile('test.txt', 'test');

module.exports = { moveFile };
