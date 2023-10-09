'use strict';

const fs = require('fs');

function moveFiles(pathFrom, pathTo) {
  let fileData = '';
  let pathToNew = '' + pathTo;

  try {
    if (!fs.existsSync(pathTo)) {
      throw new Error('destination directory does not exist(');
    }
  } catch (error) {}

  if (pathTo[pathTo.length - 1] === '/') {
    const arr = pathFrom.split('/');

    pathToNew += arr[arr.length - 1];
  }

  try {
    fileData = fs.readFileSync(pathFrom, 'utf8');
  } catch (error) {}

  try {
    fs.writeFileSync(pathToNew, fileData);
  } catch (error) {}

  fs.rm(pathFrom, () => {});
}

module.exports = { moveFiles };
