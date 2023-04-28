/* eslint-disable no-console */
'use strict';

const { existsSync } = require('fs');
const fs = require('fs/promises');
const path = require('node:path');

const doesNotExistError = (pathName) => {
  console.error(`Error. Path ${pathName} does not exist.`);
};

const moveFile = async(input) => {
  if (input.length !== 4) {
    console.error('Please, enter exact two paths.');

    return;
  }

  const [fromPath, toPath] = input.slice(2);
  const isDirectory = toPath.endsWith('/');

  if (!existsSync(fromPath)) {
    doesNotExistError(fromPath);

    return;
  }

  if (isDirectory && !existsSync(toPath)) {
    doesNotExistError(toPath);

    return;
  }

  const dirName = existsSync(toPath)
    ? path.join(toPath, '/', path.basename(fromPath))
    : toPath;

  try {
    await fs.rename(fromPath, dirName);
    console.log(`Successfully moved from ${fromPath} to ${dirName}`);
  } catch (error) {
    if (error) {
      console.error(`Error occured when moving from ${fromPath} to ${dirName}`);
    }
  }
};

exports.moveFile = moveFile;
