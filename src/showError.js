/* eslint-disable no-console */
'use strict';

const { terminal } = require('./terminal');

const showError = (errorMessage, moveFile) => {
  console.log(errorMessage);
  terminal.question('Try again: ', moveFile);
};

module.exports = { showError };
