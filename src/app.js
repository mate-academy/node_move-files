/* eslint-disable no-console */
'use strict';

const fs = require('fs');

// eslint-disable-next-line prefer-const
let [prevPath, newPath] = process.argv.slice(2);

if (prevPath === newPath) {
  console.log('Error: You trying to move file to the same location.');

  return;
}

if (newPath.charAt(newPath.length - 1) === '/') {
  const prevDir = prevPath.split('/');
  const fileName = prevDir[prevDir.length - 1];

  newPath = newPath + fileName;
}

fs.readFile(prevPath, 'utf-8', (err, data) => {
  if (err) {
    console.log(err);

    return;
  }

  fs.writeFile(newPath, data, 'utf-8', (err2) => {
    if (err2) {
      console.log(err2);
    }
  });
});

fs.unlink(prevPath, (err2) => {
  if (err2) {
    console.log(err2);

    return;
  }

  console.log('File has been moved to a new location.');
});
