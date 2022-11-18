/* eslint-disable no-console */
'use strict';

const chalk = require('chalk');
const { checkPath } = require('./checkPath.js');
const { moveFile } = require('./moveFile.js');
const fs = require('fs');
const path = require('path');

async function validation(from, to) {
  try {
    const isValidFrom = await checkPath(from, 'from');

    const nameCopiedFile = path.basename(from);
    const directoryOfCopiedFile = path.dirname(from);

    const isToDirectory = to.endsWith('/');
    const isDirectoryExist = fs.existsSync(to);

    if (isValidFrom === 'error from') {
      return 'Path to copied file not valid';
    }

    if (isToDirectory && !isDirectoryExist) {
      console.log(chalk.red.bgWhite(`${to} does not exist`));

      return `${to} does not exist`;
    }

    if (isToDirectory && isDirectoryExist) {
      const newToPath = path.resolve(to, nameCopiedFile);

      moveFile(from, newToPath);

      console.log(chalk.green('operation success'));

      return 'operation success';
    }

    const newDirectory = path.dirname(to);

    if (!to.includes('/') && !to.includes('.')) {
      const isNewDirectoryExist = fs.existsSync(to);

      if (isNewDirectoryExist) {
        const stats = fs.statSync(to);

        if (stats.isDirectory()) {
          const newToPath = path.resolve(`./${to}/`, nameCopiedFile);

          moveFile(from, newToPath);

          console.log(chalk.green('operation success'));

          return 'operation success';
        }

        if (stats.isFile() && nameCopiedFile === to) {
          console.log(chalk.red.bgWhite('File with such name already exist'));

          return 'File with such name already exist';
        }
      }
    }

    if (newDirectory !== directoryOfCopiedFile) {
      const isNewDirectoryExist = await checkPath(newDirectory, 'to');

      if (isNewDirectoryExist === 'error to') {
        return 'Path where move file not valid';
      } else {
        const isSuchFileExist = await checkPath(to, 'check');

        if (isSuchFileExist !== '') {
          console.log(chalk.red.bgWhite('File with such name already exist'));

          return 'File or folder with such name already exist';
        } else {
          moveFile(from, to);

          console.log(chalk.green('operation success'));

          return 'operation success';
        }
      }
    } else {
      const isSuchFileExist = await checkPath(to, 'check');

      if (isSuchFileExist !== '') {
        console.log(chalk.red.bgWhite('File with such name already exist'));

        return 'File with such name already exist';
      } else {
        moveFile(from, to);

        console.log(chalk.green('operation success'));

        return 'operation success';
      }
    }
  } catch (error) {
    console.log(error.code);
  }
}

module.exports = { validation };
