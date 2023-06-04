'use strict';

const fs = require('fs');
const path = require('path');

const move = (fileName, newPath) => {
  let movePath = path.join(__dirname, newPath);
  const isDir = fs.existsSync(movePath);

  if (!isDir && newPath[newPath.length - 1] === '/') {
    throw new Error(
      `Directory ${newPath} does not exist`
    );
  }

  if (isDir) {
    movePath = path.join(movePath, fileName);
  }

  const filePath = path.join(__dirname, fileName);
  const fileData = fs.readFileSync(filePath).toString();

  fs.writeFileSync(movePath, fileData);
  fs.rmSync(filePath);
};

module.exports = {
  move,
};
