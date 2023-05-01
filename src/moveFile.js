'use strict';

const fs = require('fs/promises');

async function moveFile(src, dest) {
  await fs.copyFile(src, dest);
  await fs.rm(src);
}

module.exports = {
  moveFile,
};
