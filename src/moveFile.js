'use strict';

const { existsSync } = require('fs');
const fs = require('fs/promises');
const path = require('node:path');
const myConsole = require('console');

const doesNotExistError = (pathName) => {
  myConsole.error(`Error. Path ${pathName} does not exist.`);
};

const moveFile = async(terminalCommandsCount, fromPath, toPath) => {
  if (terminalCommandsCount !== 4) {
    myConsole.error('Please, enter exact two paths.');

    return;
  }

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
    myConsole.log(`Successfully moved from ${fromPath} to ${dirName}`);
  } catch (error) {
    myConsole.error(`Error occured when moving from ${fromPath} to ${dirName}`);
  }
};

exports.moveFile = moveFile;
