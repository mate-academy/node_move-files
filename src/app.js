/* eslint-disable no-console */

'use strict';

const fs = require('fs').promises;
const p = require('path');
const chalk = require('chalk');
const { pathInfo } = require('./helpers/pathInfo');
const { getBasePath } = require('./helpers/getBasePath');
const {
  handleFileErrors,
  handleDestErrors,
} = require('./handleErrors/handleErrors');

const handleFileRenaming = async(filePath, newName) => {
  const indexBeforeName = filePath.lastIndexOf('/');
  const basePath = getBasePath(filePath);
  const oldName = filePath.slice(indexBeforeName + 1);

  try {
    await fs.rename(filePath, p.join(basePath, newName));

    console.log(
      chalk.bgGreen(`Successfully renamed from ${oldName} to ${newName}`)
    );
  } catch (err) {
    console.error(err);
  }
};

const handleFileMoving = async(filePath, destination) => {
  const indexBeforeName = filePath.lastIndexOf('/');
  const oldName = filePath.slice(indexBeforeName + 1);

  try {
    let newFilePath = destination;

    if (destination.endsWith('/')) {
      newFilePath += oldName;
    }

    await fs.copyFile(filePath, newFilePath);
    await fs.rm(filePath);

    console.log(chalk.bgGreen('Moved ' + filePath + ' to ' + newFilePath));
  } catch (err) {
    console.log(err);
  }
};

const handleInput = async(filePath, destination) => {
  const basePath = getBasePath(filePath);
  const dest = await pathInfo(p.join(basePath, destination));

  try {
    await handleFileErrors(filePath);
    await handleDestErrors(destination, filePath);

    if (!dest.isExist && !destination.includes('/')) {
      handleFileRenaming(filePath, destination);
    } else {
      handleFileMoving(filePath, destination);
    }
  } catch (err) {
    console.log(err);
  }
};

const app = () => {
  const [filePath, destination] = process.argv.slice(2);

  handleInput(filePath, destination);
};

app();
