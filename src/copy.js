'use strict';

const fs = require('fs');

const copy = (fileName) => {
  try {
    const fileContent = fs.readFileSync(`src/${fileName}`, 'utf8');

    return fileContent;
  } catch (error) {
    throw error;
  }
};

module.exports = copy;
