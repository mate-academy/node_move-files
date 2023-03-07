'use strict';

const fs = require('fs');

const deleteFile = (fileToMovePath) => {
  try {
    fs.unlinkSync(fileToMovePath);
  } catch (error) {
    global.console.log('Unable delete file - no such file or directory');
  }
};

module.exports = { deleteFile };
