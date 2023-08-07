'use strict';

const fs = require('fs').promises;
const path = require('path');

const moveFile = async(srcFile, destFile) => {
  const srcPath = path.resolve(srcFile);
  const destPath = path.resolve(destFile);

  const fileName = path.basename(srcPath);
  const isExist = await fs.access(srcPath)
    .then(() => true)
    .catch(() => false);

  if (!isExist) {
    throw new Error(
      `The file ${fileName} does not exist at the source location.`
    );
  }

  await fs.copyFile(srcPath, destPath);
  await fs.unlink(srcPath);
};

moveFile('file.txt', './src/file.txt');
