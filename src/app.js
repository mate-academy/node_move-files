/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const copy = require('./copy');

const fileName = process.argv[2];
const destination = process.argv[3];
const explicitDirCheck = destination[destination.length - 1] === '/';
const implicitDirCheck = fs.existsSync(`src/${destination}`);
const successMessage = 'File was moved successfully';

if (explicitDirCheck || implicitDirCheck) {
  const data = copy(fileName);
  const newPath = explicitDirCheck
    ? `src/${destination}${fileName}`
    : `src/${destination}/${fileName}`;

  fs.writeFileSync(newPath, data);
  fs.rmSync(`src/${fileName}`);
  console.log(successMessage);

  return;
}

fs.rename(`src/${fileName}`, `src/${destination}`, (error) => {
  if (error) {
    throw error;
  }

  console.log(successMessage);
});
