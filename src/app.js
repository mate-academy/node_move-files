'use strict';

const fs = require('fs/promises');
const { sep, basename, dirname } = require('path');

const fileParam = process.argv[2];
const endpointParam = process.argv[3];

moveFile(fileParam, endpointParam);

async function moveFile(file, endpoint) {
  try {
    const isOnTheSameDir = dirname(fileParam) === dirname(endpointParam);

    if (isOnTheSameDir) {
      await fs.rename(fileParam, endpointParam);

      return;
    }

    const dataOfFile = await fs.readFile(file);

    await fs.writeFile(endpoint, dataOfFile);
    await fs.rm(file);
  } catch (err) {
    if (err.code === 'EROFS') {
      return moveFile(file, `.${endpoint + sep}`);
    }

    if (err.code === 'EISDIR') {
      return moveFile(file, endpoint + sep + basename(file));
    }

    // eslint-disable-next-line no-console
    console.log('ERROR: ', err.message);
  }
}
