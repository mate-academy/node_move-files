'use strict';

const fs = require('fs');

const file = process.argv[2];
const destination = process.argv[3];
let destinationDir = destination;
let destinationFile = '';

function normalizeUrl() {
  let checked = false;

  function setDestinationAsFile() {
    destinationDir = './';
    destinationFile = destination;
  }

  if (destination.endsWith('/')) {
    return;
  }

  if (destination.includes('/')) {
    const splitedDestination = destination.split('/');

    destinationDir = splitedDestination.slice(0, -1).join('/') + '/';
    destinationFile = splitedDestination[splitedDestination.length - 1];

    return;
  }

  if (destination.includes('.')) {
    setDestinationAsFile();
    checked = true;

    return;
  }

  checked = true;

  try {
    if (fs.statSync(destination).isDirectory()) {
      destinationDir = `./${destination}/`;
    }
  } catch (_err) {
    setDestinationAsFile();
  }

  if (!checked) {
    try {
      fs.statSync(destinationDir);
    } catch (err) {
      throw new Error('no such directory', err);
    }
  }

  if (!destinationFile) {
    destinationFile = file;
  }
}

normalizeUrl();

fs.renameSync(file, destinationDir + destinationFile);
