'use strict';

const path = require('path');

const { moveFiles } = require('./modules/moveFiles.js');

const startMoving = () => {
  const [oldPath, newPath] = process.argv.slice(2);

  if (!oldPath || !newPath) {
    throw new Error(
      'You should pass the way to the old path and the new path.'
    );
  }

  const oldFullPath = path.join(__dirname, oldPath);
  const newFullPath = path.join(__dirname, newPath);

  moveFiles(oldFullPath, newFullPath);
};

startMoving();
