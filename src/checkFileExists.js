'use strict';

const fs = require('fs/promises');

async function checkFileExists(filePath) {
  try {
    await fs.stat(filePath);

    return 'File exists';
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error('Filepath does not exist.');
    }

    throw err;
  }
}

module.exports = checkFileExists;
