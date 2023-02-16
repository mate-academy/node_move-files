'use strict';

const fs = require('fs/promises');
const path = require('path');

// eslint-disable-next-line no-shadow
const move = async(file, newPath) => {
  let np = newPath;

  try {
    const stats = await fs.stat(np);
    const endpoint = (/.+\/$/.test(np) ? '' : '/') + path.basename(file);

    if (stats.isDirectory()) {
      np += endpoint;
    }

    await fs.rename(file, np);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

const [file, newPath] = process.argv.slice(2);

move(file, newPath);
