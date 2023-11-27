'use strict';

const chalk = require('chalk');
const p = require('path');

const { pathInfo } = require('../helpers/pathInfo');
const { getBasePath } = require('../helpers/getBasePath');

const handleFileErrors = async(path) => {
  const file = await pathInfo(path);

  if (!file.isFile && file.isExist) {
    throw new Error(chalk.bgRed('Enter path to file...'));
  }

  if (!file.isExist) {
    throw new Error(chalk.bgRed('File not found'));
  }
};

const handleDestErrors = async(path, filePath) => {
  const destination = await pathInfo(path);
  const basePath = getBasePath(filePath);

  const newFile = await pathInfo(
    path.includes('/') ? path : p.join(basePath, path)
  );

  if (!destination.isExist && path && path.endsWith('/')) {
    throw new Error(chalk.bgRed('No such directory...'));
  }

  if (newFile.isExist && newFile.isFile) {
    throw new Error(chalk.bgRed('File already exist - ' + path));
  }
};

module.exports = {
  handleFileErrors,
  handleDestErrors,
};
