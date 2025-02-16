/* eslint-disable no-console */
'use strict';

const fs = require('fs-extra');
const path = require('path');

const moveFiles = async () => {
  const args = process.argv.slice(2);

  const [from, to] = args;

  try {
    if (!from) {
      throw new Error('No source!');
    }

    if (!to) {
      throw new Error('No destination!');
    }

    const isDirectory = fs.existsSync(to) && fs.lstatSync(to).isDirectory();

    const updatedPath = isDirectory ? path.join(to, path.basename(from)) : to;

    // await fs.move(from, updatedPath);
    fs.renameSync(from, updatedPath);
    // fs.promises.rename(from, updatedPath);
  } catch (e) {
    console.error('Rename error!', e.message);
  }
};

moveFiles();

module.exports = {
  moveFiles,
};
