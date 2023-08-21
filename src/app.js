'use strict';

const fs = require('fs');
const path = require('path');

const moveFile = (sourceFile, destFile) => {
  const sourcePath = path.resolve(sourceFile);
  const sourceDestination = path.resolve(destFile);
  const fileName = path.basename(sourcePath);

  if (!fs.existsSync(sourcePath)) {
    throw new Error(`The file ${fileName} does not found`);
  }

  fs.copyFileSync(sourcePath, sourceDestination);
  fs.rm(sourcePath);
};

const [source, dest] = process.argv.slice(2);

moveFile(source, dest);
