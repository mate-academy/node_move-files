'use strict';

const fs = require('fs');
const path = require('path');

function moveFile(fileName, moveTo) {
  let movePath = path.join(__dirname, '..', moveTo);

  movePath = movePath.endsWith('/') ? movePath.slice(0, -1) : movePath;

  const isDir = fs.existsSync(movePath);
  const filePath = path.join(__dirname, fileName);
  const data = fs.readFileSync(filePath, 'utf-8', (err, result) => {
    if (err) {
      throw new Error(err);
    }
  });

  if (!isDir) {
    throw new Error(`Directory ${movePath} does not exist`);
  }

  movePath = path.join(movePath, fileName);

  fs.writeFile(movePath, data, (err, result) => {
    if (err) {
      throw new Error(err);
    }
  });
  fs.rmSync(filePath);
};

module.exports = moveFile;
