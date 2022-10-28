'use strict';

const COMMAND_MOVE = 'MV';

const ERROR = {
  COMMAND_NOT_EXIST: `\nSuch a command does not exist.`
  + ` \nTry it 'mv <old path> <new path>'`,
  FILE_NOT_EXIST: '\nNo such file exists',
  FOLDER_NOT_EXIST: '\nТo such folder exists',
};

const SUCCESS = {
  MOVED: 'Successfully moved the file!',
  RENAMED: 'File renamed successfully!',
};

module.exports = {
  COMMAND_MOVE,
  ERROR,
  SUCCESS,
};
