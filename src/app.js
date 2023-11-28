'use strict';

const fs = require('fs');

const moveFile = (sourse, newPath) => {
  try {
    const isDirectory = fs.existsSync(newPath)
    && fs.statSync(newPath).isDirectory();

    if (isDirectory && !fs.existsSync(newPath)) {
      return 'Destination directory does not exist';
    }

    fs.renameSync(sourse, newPath);
  } catch (error) {

  }
};

moveFile('file.txt', './someDir/');
