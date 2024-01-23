/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

const move = async () => {
  const [from, to] = process.argv.slice(-2);

  let newUrl = path.join(__dirname, '..', to);
  const oldUrl = path.join(__dirname, from);

  if (!path.extname(newUrl)) {
    newUrl = path.join(__dirname, '..', to, from);
  }

  await checkDirectoryInPath(newUrl);

  fs.stat(oldUrl, (error, stats) => {
    if (error) {
      throw new Error('Nie istnuje');
    }

    if (stats.isDirectory()) {
      console.log('Is directory');
    }
  });

  fs.rename(oldUrl, newUrl, (error) => {
    if (error) {
      throw new Error('Not rename');
    }

    console.log('Name renamed');
  });
};

move();

async function checkDirectoryInPath(filePath) {
  const dirname = path.dirname(filePath);

  try {
    await fs.promises.access(dirname, fs.constants.F_OK);
  } catch (error) {
    fs.mkdir(dirname, (err) => {
      if (err) {
        throw new Error('Can\'t make directory');
      }
    });
  }
}
