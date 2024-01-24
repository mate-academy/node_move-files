/* eslint-disable no-console */
'use strict';

const fs = require('fs').promises;
const path = require('path');

const move = async() => {
  const [from, to] = process.argv.slice(2);

  let newUrl;
  const oldUrl = path.join(__dirname, from);

  const checkPossibleDir = () => {
    const checkIsDirect = path.join(__dirname, to, from);

    const isDirectory = path.dirname(checkIsDirect);

    return isDirectory;
  };

  const possibleDir = checkPossibleDir();

  if (to.endsWith('/')) {
    newUrl = path.join(__dirname, to, from);
  } else {
    try {
      await fs.access(possibleDir);
      newUrl = path.join(__dirname, to, from);
    } catch (error) {
      newUrl = path.join(__dirname, to);
    }
  }

  const sourseDirectory = path.dirname(oldUrl);
  const destDirectory = path.dirname(newUrl);

  if (sourseDirectory === destDirectory) {
    try {
      await fs.rename(oldUrl, newUrl);
      console.log('Successfully renamed');

      return;
    } catch (error) {
      console.log('Error in renamed process');
    }
  };

  try {
    await fs.access(destDirectory);
    // Here is 2 working method:
    // first with rename,
    await fs.rename(oldUrl, newUrl);
    console.log('Successfully moved');
    // second with create new and delete old file
    // const fileData = await fs.readFile(oldUrl, 'utf-8');
    // await fs.writeFile(newUrl, fileData);
    // await fs.unlink(oldUrl);
  } catch (err) {
    console.error('Destination directory does not exist');
  }
};

move();
