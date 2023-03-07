'use strict';

const fs = require('fs');

const readFile = (fileToMovePath) => {
  let data = '';

  try {
    data = fs.readFileSync(fileToMovePath, 'utf-8');
  } catch (error) {
    global.console.log('No such file of directory');
  }

  return data;
};

module.exports = { readFile };
