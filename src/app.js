'use strict';

const fs = require('fs');

const [moveFrom, moveTo] = process.argv.slice(2);

let modifiedMoveTo = moveTo;

if (moveTo[moveTo.length - 1] === '/') {
  const arr = moveFrom.split('/');

  modifiedMoveTo += arr[arr.length - 1];

  const fileContent = fs.readFileSync(moveFrom, 'utf-8', (err) => {
    if (err) {
      throw new Error('File does not exist');
    }
  });

  fs.writeFileSync(modifiedMoveTo, fileContent);
}

fs.renameSync(moveFrom, modifiedMoveTo, (error) => {
  if (error && error.code === 'ENOENT') {
    throw new Error('File does not exist');
  }
});
