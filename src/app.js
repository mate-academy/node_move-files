/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const {
  COMMAND_MOVE,
  ERROR,
  SUCCESS,
} = require('./constants/constants');

const [ command, oldPath, newPath ] = process.argv.slice(2);
const fileName = oldPath.slice(oldPath.lastIndexOf('/') + 1);
const log = console.log;

const checkIsFileExist = (filePath) => {
  return fs.existsSync(filePath);
};

const moveFile = () => {
  if (!checkIsFileExist(oldPath)) {
    log(ERROR.FILE_NOT_EXIST);
    process.exit();
  }

  if (newPath.endsWith('/')) {
    if (!checkIsFileExist(newPath)) {
      log(ERROR.FOLDER_NOT_EXIST);
      process.exit();
    }
  }

  const newLocation = newPath.endsWith('/') ? newPath + fileName : newPath;

  fs.rename(oldPath, newLocation, (err) => {
    if (err) {
      throw err;
    } else {
      log(SUCCESS.MOVED);
    }
  });
};

if (command.toLocaleUpperCase() === COMMAND_MOVE) {
  moveFile();
} else {
  log(ERROR.COMMAND_NOT_EXIST);
};
