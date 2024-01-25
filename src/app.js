/* eslint-disable no-console */
'use strict';

const checkFileExists = require('./checkFileExists');

const fs = require('fs');
const { argv } = require('process');

const [pathFrom, pathTo] = argv.slice(2);

async function moveFile(from, to) {
  if (!from || !to) {
    console.error('Missing arguments');

    return;
  }

  if (from === to) {
    return;
  }

  checkFileExists(from).catch((err) => console.error(err.message));

  const destinationIsDirectory = to.endsWith('/');

  if (!destinationIsDirectory) {
    fs.rename(from, to, (err) => {
      if (err) {
        console.error(err.message);
      }
    });
  }

  if (destinationIsDirectory) {
    const fileName = from.split('/').pop();

    fs.rename(from, `${to}/${fileName}`, (err) => {
      if (err) {
        console.error(err.message);
      }
    });
  }
}

moveFile(pathFrom, pathTo);
