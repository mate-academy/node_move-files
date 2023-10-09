'use strict';

const fs = require('fs');

function moveFiles(pathFrom, pathTo) {
  let fileData = '';
  let pathToNew = '' + pathTo;

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
}

module.exports = { moveFiles };
