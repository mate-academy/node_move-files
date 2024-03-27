/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

function moveFile(sourcePath, pathToMove) {
  if (!sourcePath || !pathToMove) {
    console.error('Failed with only one argument');

    return;
  }

  if (sourcePath === pathToMove) {
    return;
  }

  const absoluteSourcePath = path.resolve(sourcePath);
  let absolutePathToMove = path.resolve(pathToMove);

  const isDir = fs.existsSync(absolutePathToMove)
    && fs.statSync(absolutePathToMove).isDirectory();

  try {
    if (isDir) {
      const fileName = path.basename(absoluteSourcePath);

      absolutePathToMove = path.join(absolutePathToMove, fileName);
    }

    fs.renameSync(absoluteSourcePath, absolutePathToMove);
  } catch (err) {
    console.error(`Moving failed with an err ${err}`);
  }
};

moveFile(...process.argv.slice(2));
