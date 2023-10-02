/* eslint-disable no-console */
'use strict';

const path = require('path');
const fs = require('fs');
const { moveFile } = require('./moveFile.js');
const params = process.argv.slice(2);

if (params.length !== 2) {
  console.log('Incorrect parameters');

  return;
}

const addressFile = path.join(__dirname, params[0]);
const addressMove = path.join(__dirname, params[1]);
const file = params[0].split('/').slice(-1);

if (!fs.existsSync(addressFile)) {
  console.log('File not found');

  return;
}

if (params[1].includes('/')) {
  if (params[1].lastIndexOf('/') === params[1].length - 1) {
    moveFile(addressFile, path.join(addressMove, file[0]));
  } else {
    moveFile(addressFile, addressMove);
  }

  return;
}

if (!params[1].includes('.')) {
  try {
    fs.readdirSync(addressMove);
    moveFile(addressFile, path.join(addressMove, `/${file[0]}`));
  } catch (err) {
    moveFile(addressFile, addressMove);
  };

  return;
}

moveFile(addressFile, addressMove);
