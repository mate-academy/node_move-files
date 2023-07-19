'use strict';

const fs = require('fs/promises');
const { sep, basename } = require('path');

const fileParam = process.argv[2];
const endpointParam = process.argv[3];

moveFile(fileParam, endpointParam);

async function moveFile(file, endpoint) {
  try {
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
  }
}
